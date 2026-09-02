// Real-path preview for the Industry Trend Bulletin — serves static OG/Twitter
// meta tags, then redirects into the HashRouter SPA. Same pattern as
// functions/blog/[slug].ts: LinkedIn (and other scrapers) need a real path to
// get a correct preview card, since a bare #/ fragment isn't scraped.

const TITLE = 'Industry Trend Bulletin — Updated Daily';
const DESCRIPTION =
  'AI, digital transformation, and enterprise technology stories, refreshed daily from a locked set of free-access sources through a governed AI pipeline.';

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export const onRequestGet: PagesFunction = async ({ request }) => {
  const origin = new URL(request.url).origin;
  const canonicalUrl = `${origin}/trend-bulletin`;
  // Placeholder image — swap for a purpose-built navy/gold bulletin graphic
  // once one exists; hero-bg.jpg is a reasonable stand-in for now.
  const imageUrl = `${origin}/hero-bg.jpg`;
  const redirectTarget = '/#/trend-bulletin';

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>${escapeHtml(TITLE)}</title>
<meta name="description" content="${escapeHtml(DESCRIPTION)}" />
<link rel="canonical" href="${canonicalUrl}" />

<meta property="og:type" content="website" />
<meta property="og:title" content="${escapeHtml(TITLE)}" />
<meta property="og:description" content="${escapeHtml(DESCRIPTION)}" />
<meta property="og:image" content="${imageUrl}" />
<meta property="og:url" content="${canonicalUrl}" />
<meta property="og:site_name" content="Selvakumar Jayakrishnan" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${escapeHtml(TITLE)}" />
<meta name="twitter:description" content="${escapeHtml(DESCRIPTION)}" />
<meta name="twitter:image" content="${imageUrl}" />

<meta http-equiv="refresh" content="0; url=${redirectTarget}" />
<script>window.location.replace(${JSON.stringify(redirectTarget)});</script>
</head>
<body>
<p>Redirecting to <a href="${redirectTarget}">${escapeHtml(TITLE)}</a>…</p>
</body>
</html>`;

  return new Response(html, {
    headers: { 'content-type': 'text/html; charset=UTF-8' },
  });
};
