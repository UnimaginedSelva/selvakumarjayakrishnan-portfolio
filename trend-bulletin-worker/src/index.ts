// Industry Trend Bulletin — daily refresh Worker
//
// Separate from the Pages project because Cron Triggers are a Workers-only
// feature. Shares the D1 database ("portfolio-comments") that the Pages
// project already uses for comments — the Pages side only ever reads the
// bulletin_items table this Worker writes.

export interface Env {
  BULLETIN_DB: D1Database;
  GEMINI_API_KEY: string;
  // Set as a Worker secret. Required on the manual-trigger endpoint so this
  // isn't a public "run the pipeline on demand" button.
  TRIGGER_SECRET: string;
}

// ---------------------------------------------------------------------------
// 1. Source allowlist — LOCKED. Free-access only. Do not add a source here
//    without first re-confirming it is not paywalled/metered.
// ---------------------------------------------------------------------------

type SourceKind = 'rss' | 'scoped-fetch';

interface Source {
  name: string;
  kind: SourceKind;
  url: string;
  // For scoped-fetch sources: only <a> tags whose href contains one of these
  // path fragments are treated as article links (filters out nav/footer noise).
  articlePathIncludes?: string[];
  // Minimum non-empty URL path segments required — filters out category/
  // section root pages (e.g. /stories/artificial-intelligence/) that pass
  // the articlePathIncludes check but aren't themselves articles. Depth
  // varies per site's URL structure, so this is per-source, not global.
  minPathSegments?: number;
}

const SOURCES: Source[] = [
  { name: 'McKinsey Insights', kind: 'rss', url: 'https://www.mckinsey.com/insights/rss' },
  { name: 'World Economic Forum', kind: 'scoped-fetch', url: 'https://www.weforum.org/stories/', articlePathIncludes: ['/stories/'], minPathSegments: 3 },
  { name: 'Microsoft', kind: 'rss', url: 'https://news.microsoft.com/feed/' },
  { name: 'Google AI', kind: 'rss', url: 'https://blog.google/innovation-and-ai/technology/ai/rss/' },
  { name: 'AWS Machine Learning Blog', kind: 'rss', url: 'https://aws.amazon.com/blogs/machine-learning/feed/' },
  { name: 'Reuters Technology', kind: 'scoped-fetch', url: 'https://www.reuters.com/technology/', articlePathIncludes: ['/technology/'], minPathSegments: 2 },
  { name: 'TechCrunch', kind: 'rss', url: 'https://techcrunch.com/feed/' },
  { name: 'Stanford HAI', kind: 'scoped-fetch', url: 'https://hai.stanford.edu/news', articlePathIncludes: ['/news/'], minPathSegments: 2 },
];

const MAX_CANDIDATES_PER_SOURCE = 6;
const MAX_STORIES_PER_RUN = 15; // keeps Gemini calls + subrequests well inside free-tier limits

// ---------------------------------------------------------------------------
// 2. Topic scope — Gate 1 (pre-summarization, rule-based)
// ---------------------------------------------------------------------------

const TOPIC_KEYWORDS = [
  'ai', 'artificial intelligence', 'machine learning', 'genai', 'generative ai', 'llm', 'large language model',
  'agentic', 'digital transformation', 'automation', 'cloud', 'enterprise tech', 'enterprise technology',
  'cybersecurity', 'cyber security', 'data privacy', 'change management', 'workforce transformation',
  'organizational change', 'digital adoption', 'algorithm', 'chatbot', 'copilot', 'robotics',
];

// If any of these appear, the story is excluded regardless of AI/tech keyword
// matches — e.g. "AI regulation debate in Congress" must be filtered out.
const HARD_EXCLUDE_KEYWORDS = [
  'election', 'elections', 'president', 'presidential', 'congress', 'senate', 'parliament',
  'war', 'invasion', 'ceasefire', 'military strike', 'airstrike', 'troops', 'combat',
  'protest', 'protesters', 'riot', 'partisan', 'republican', 'democrat', 'geopolitic',
  'abortion', 'immigration policy', 'gun control', 'impeach',
];

function matchesAny(text: string, keywords: string[]): boolean {
  const lower = text.toLowerCase();
  return keywords.some((k) => lower.includes(k));
}

function passesTopicGate(title: string, excerpt: string): boolean {
  const combined = `${title} ${excerpt}`;
  if (matchesAny(combined, HARD_EXCLUDE_KEYWORDS)) return false;
  return matchesAny(combined, TOPIC_KEYWORDS);
}

// ---------------------------------------------------------------------------
// 3. Candidate extraction
// ---------------------------------------------------------------------------

interface Candidate {
  sourceName: string;
  title: string;
  url: string;
  excerpt: string; // real excerpt from the source when available, else empty
}

function stripTags(html: string): string {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

// A "daily" bulletin repeating year-old evergreen posts (some of these feeds
// mix in older popular items) would defeat the point — only accept RSS items
// published within this window. Generous enough to survive a quiet weekend.
const FRESHNESS_WINDOW_HOURS = 72;

function parseRssItems(xml: string): { title: string; link: string; excerpt: string; pubDate: string }[] {
  const items: { title: string; link: string; excerpt: string; pubDate: string }[] = [];
  const itemBlocks = xml.match(/<item[\s\S]*?<\/item>/g) ?? [];
  for (const block of itemBlocks) {
    const titleMatch = block.match(/<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/);
    const linkMatch = block.match(/<link>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/link>/);
    const descMatch =
      block.match(/<content:encoded>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/content:encoded>/) ??
      block.match(/<description>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/description>/);
    const dateMatch =
      block.match(/<pubDate>([\s\S]*?)<\/pubDate>/) ?? block.match(/<dc:date>([\s\S]*?)<\/dc:date>/);

    const title = titleMatch ? stripTags(titleMatch[1]).trim() : '';
    const link = linkMatch ? linkMatch[1].trim() : '';
    const excerpt = descMatch ? stripTags(descMatch[1]).slice(0, 600) : '';
    const pubDate = dateMatch ? dateMatch[1].trim() : '';

    if (title && link) items.push({ title, link, excerpt, pubDate });
  }
  return items;
}

function isFresh(pubDate: string): boolean {
  if (!pubDate) return true; // no date field on this feed — don't punish it, let the topic gate decide
  const t = Date.parse(pubDate);
  if (Number.isNaN(t)) return true;
  const ageHours = (Date.now() - t) / (1000 * 60 * 60);
  return ageHours >= 0 && ageHours <= FRESHNESS_WINDOW_HOURS;
}

async function fetchRssCandidates(source: Source): Promise<Candidate[]> {
  try {
    const res = await fetch(source.url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; SelvaTrendBulletin/1.0)' },
    });
    if (!res.ok) return [];
    const xml = await res.text();
    const items = parseRssItems(xml)
      .filter((i) => isFresh(i.pubDate))
      .slice(0, MAX_CANDIDATES_PER_SOURCE);
    return items.map((i) => ({ sourceName: source.name, title: i.title, url: i.link, excerpt: i.excerpt }));
  } catch {
    return [];
  }
}

async function fetchScopedCandidates(source: Source): Promise<Candidate[]> {
  try {
    const res = await fetch(source.url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36',
        Accept: 'text/html',
      },
    });
    if (!res.ok) return [];
    const html = await res.text();
    const origin = new URL(source.url).origin;

    // Extract <a href="...">text</a> pairs where href matches an article path.
    const anchorRe = /<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g;
    const seen = new Set<string>();
    const out: Candidate[] = [];
    let m: RegExpExecArray | null;
    while ((m = anchorRe.exec(html)) && out.length < MAX_CANDIDATES_PER_SOURCE) {
      const href = m[1];
      const text = stripTags(m[2]);
      if (!text || text.length < 20) continue; // skip nav links / icons
      if (text.includes('{') || text.includes('}')) continue; // stray CSS/JS caught by the regex, not real link text
      const matchesPath = (source.articlePathIncludes ?? []).some((p) => href.includes(p));
      if (!matchesPath) continue;

      // Require an article-shaped path — category/section root pages
      // (e.g. /stories/artificial-intelligence/) pass the includes check
      // above but are shallower than real articles on the same site.
      const pathSegments = href.split('?')[0].split('/').filter(Boolean);
      if (pathSegments.length < (source.minPathSegments ?? 2)) continue;

      const fullUrl = href.startsWith('http') ? href : `${origin}${href.startsWith('/') ? '' : '/'}${href}`;
      if (seen.has(fullUrl)) continue;
      seen.add(fullUrl);
      out.push({ sourceName: source.name, title: text, url: fullUrl, excerpt: '' });
    }
    return out;
  } catch {
    return [];
  }
}

// ---------------------------------------------------------------------------
// 4. Gemini summarization — neutral, factual, attributed, Selva's site voice
// ---------------------------------------------------------------------------

const SYSTEM_PROMPT = `You summarize a single news item for Selvakumar Jayakrishnan's professional website — an Industry Trend Bulletin covering AI, digital transformation, and enterprise technology.

Rules:
- Factual and attributed only. Never editorialize, speculate, or take a political or partisan stance.
- Write in Selva's site voice: concise, professional, American English, no dashes in long sentences (use commas instead).
- You are sometimes given only a headline with no article excerpt. In that case, restate the headline informatively as a single sentence — do NOT invent statistics, quotes, outcomes, or details that are not present in what you were given.
- If the item is primarily about elections, war, partisan politics, or social controversy, even if AI or technology is mentioned in passing, respond with exactly: {"skip": true}
- Otherwise return ONLY this JSON shape, no markdown, no code fences:
{"headline": "concise, faithful headline, max 110 characters", "summary": "one factual sentence, max 220 characters"}`;

async function summarizeWithGemini(
  candidate: Candidate,
  apiKey: string
): Promise<{ headline: string; summary: string } | null> {
  try {
    const userText = candidate.excerpt
      ? `SOURCE: ${candidate.sourceName}\nHEADLINE: ${candidate.title}\nEXCERPT: ${candidate.excerpt}`
      : `SOURCE: ${candidate.sourceName}\nHEADLINE: ${candidate.title}\n(No excerpt available — headline only.)`;

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-lite-latest:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents: [{ role: 'user', parts: [{ text: userText }] }],
          generationConfig: { responseMimeType: 'application/json', maxOutputTokens: 500 },
        }),
      }
    );
    if (!res.ok) return null;

    const data = (await res.json()) as { candidates?: { content: { parts: { text: string }[] } }[] };
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    if (!text) return null;

    const cleaned = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/i, '').trim();
    const parsed = JSON.parse(cleaned);
    if (parsed.skip) return null;
    if (!parsed.headline || !parsed.summary) return null;

    return { headline: String(parsed.headline).slice(0, 110), summary: String(parsed.summary).slice(0, 220) };
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// 5. Pipeline
// ---------------------------------------------------------------------------

async function runPipeline(env: Env): Promise<{ written: number; sourcesTried: number; candidatesSeen: number }> {
  const runDate = new Date().toISOString().slice(0, 10); // YYYY-MM-DD (UTC)

  const perSourceCandidates = await Promise.all(
    SOURCES.map((s) => (s.kind === 'rss' ? fetchRssCandidates(s) : fetchScopedCandidates(s)))
  );
  const allCandidates = perSourceCandidates.flat();

  // Gate 1: topic scope, rule-based, on raw title/excerpt.
  const gated = allCandidates.filter((c) => passesTopicGate(c.title, c.excerpt)).slice(0, MAX_STORIES_PER_RUN);

  let written = 0;
  for (const candidate of gated) {
    const result = await summarizeWithGemini(candidate, env.GEMINI_API_KEY);
    if (!result) continue;

    // Gate 2: secondary safety pass, rule-based, on Gemini's OUTPUT text —
    // an independent check point from Gate 1, scanning what will actually
    // be published rather than the raw input.
    const outputText = `${result.headline} ${result.summary}`;
    if (matchesAny(outputText, HARD_EXCLUDE_KEYWORDS)) continue;

    await env.BULLETIN_DB.prepare(
      'INSERT INTO bulletin_items (headline, summary, source_name, source_url, run_date) VALUES (?, ?, ?, ?, ?)'
    )
      .bind(result.headline, result.summary, candidate.sourceName, candidate.url, runDate)
      .run();
    written += 1;
  }

  return { written, sourcesTried: SOURCES.length, candidatesSeen: allCandidates.length };
}

// ---------------------------------------------------------------------------
// 6. Handlers
// ---------------------------------------------------------------------------

export default {
  async scheduled(_event: ScheduledEvent, env: Env, ctx: ExecutionContext): Promise<void> {
    ctx.waitUntil(runPipeline(env).then(() => undefined));
  },

  // Manual trigger for verification, gated by a secret query param so this
  // isn't a public "regenerate the bulletin" button.
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === '/trigger' && url.searchParams.get('secret') === env.TRIGGER_SECRET) {
      const result = await runPipeline(env);
      return new Response(JSON.stringify(result), { headers: { 'Content-Type': 'application/json' } });
    }
    return new Response('Not found', { status: 404 });
  },
};
