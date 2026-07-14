interface BookMeta {
  title: string;
  author: string;
  description: string;
}

const BOOKS: Record<string, BookMeta> = {
  'new-psycho-cybernetics': {
    title: 'The New Psycho-Cybernetics',
    author: 'Maxwell Maltz, M.D.',
    description:
      "16 chapters distilled to their core idea and one thing to actually go do — the substance of the self-help classic that inspired modern self-image psychology, without the density of the original.",
  },
  'breaking-the-habit-of-being-you': {
    title: 'Breaking the Habit of Being Yourself',
    author: 'Dr. Joe Dispenza',
    description:
      "19 sections distilled to their core idea and one thing to do — quantum physics, neuroscience, and a full four-week guided meditation program, condensed without losing the actual practice.",
  },
  'becoming-supernatural': {
    title: 'Becoming Supernatural',
    author: 'Dr. Joe Dispenza',
    description:
      "16 sections distilled to their core idea and one thing to do — the pineal gland, heart coherence, and several named meditation practices, condensed without losing the actual practice scripts.",
  },
  'jungs-map-of-the-soul': {
    title: "Jung's Map of the Soul: An Introduction",
    author: 'Murray Stein',
    description:
      "10 sections distilled to their core concept and a reflective prompt — the standard entry point into Jung's analytical psychology, condensed without losing the theory.",
  },
  'the-power-of-awareness': {
    title: 'The Power of Awareness',
    author: 'Neville Goddard',
    description:
      "27 chapters distilled to their core teaching and practice — the classic New Thought technique of assuming the feeling of the wish fulfilled, condensed without losing the method.",
  },
  'feeling-is-the-secret': {
    title: 'Feeling Is the Secret',
    author: 'Neville Goddard',
    description:
      "4 chapters distilled to their core teaching and practice — Neville's shortest, most concentrated statement of the law of assumption, condensed without losing the method.",
  },
  'the-law-and-the-promise': {
    title: 'The Law and the Promise',
    author: 'Neville Goddard',
    description:
      "15 chapters distilled to their specific teaching and practice — real accounts illustrating revision, dwelling in the end, and sustained moods, condensed without losing the range of techniques.",
  },
  'power-of-now': {
    title: 'The Power of Now',
    author: 'Eckhart Tolle',
    description:
      "10 chapters distilled to their core teaching and one concrete practice — watching the thinker, feeling the inner body, surrender — condensed without the book's dense, repetitive dialogue format.",
  },
  'think-and-grow-rich': {
    title: 'Think and Grow Rich!',
    author: 'Napoleon Hill',
    description:
      "14 chapters distilled to their core method and one real practice — the six-step desire method, autosuggestion, the master mind group, and the fear-pattern diagnostic — condensed without the period-piece prose.",
  },
  'the-four-agreements': {
    title: 'The Four Agreements',
    author: 'Don Miguel Ruiz',
    description:
      "7 chapters distilled to their core teaching and one concrete practice — impeccable word, not taking things personally, not assuming, always doing your best — condensed without losing the book's direct, plain voice.",
  },
  'the-mountain-is-you': {
    title: 'The Mountain Is You',
    author: 'Brianna Wiest',
    description:
      "7 chapters distilled to their core teaching and one real practice — self-sabotage as coping mechanism, triggers, emotional intelligence, releasing the past — condensed without losing the book's direct, urgent voice.",
  },
  'the-big-leap': {
    title: 'The Big Leap',
    author: 'Gay Hendricks',
    description:
      "8 chapters distilled to their core teaching and one real practice — the Upper Limit Problem, the Zone of Genius, and applying the framework to time and relationships — condensed without losing the book's practical voice.",
  },
  'you-can-heal-your-life': {
    title: 'You Can Heal Your Life',
    author: 'Louise Hay',
    description:
      "16 chapters distilled to their core teaching and one real practice — thought as the root cause, forgiveness, applying the method to relationships, work, and the body — condensed without losing the book's foundational New Thought voice.",
  },
  'a-new-earth': {
    title: 'A New Earth',
    author: 'Eckhart Tolle',
    description:
      "10 chapters distilled to their core teaching and one real practice — the ego, the pain-body, inner space, and awakened doing — condensed from the book's dense, comparative-religion-heavy prose into direct, usable technique.",
  },
};

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export const onRequestGet: PagesFunction = async ({ params, request }) => {
  const bookId = String(params.bookId ?? '');
  const book = BOOKS[bookId];
  const origin = new URL(request.url).origin;

  if (!book) {
    return Response.redirect(`${origin}/#/library`, 302);
  }

  const title = `${book.title} — Reading Library`;
  const imageUrl = `${origin}/hero-bg.jpg`;
  const canonicalUrl = `${origin}/library/${bookId}`;
  const redirectTarget = `/#/library/${bookId}`;

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>${escapeHtml(title)}</title>
<meta name="description" content="${escapeHtml(book.description)}" />
<link rel="canonical" href="${canonicalUrl}" />

<meta property="og:type" content="book" />
<meta property="og:title" content="${escapeHtml(title)}" />
<meta property="og:description" content="${escapeHtml(book.description)}" />
<meta property="og:image" content="${imageUrl}" />
<meta property="og:url" content="${canonicalUrl}" />
<meta property="og:site_name" content="Selvakumar Jayakrishnan" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${escapeHtml(title)}" />
<meta name="twitter:description" content="${escapeHtml(book.description)}" />
<meta name="twitter:image" content="${imageUrl}" />

<meta http-equiv="refresh" content="0; url=${redirectTarget}" />
<script>window.location.replace(${JSON.stringify(redirectTarget)});</script>
</head>
<body>
<p>Redirecting to <a href="${redirectTarget}">${escapeHtml(title)}</a>…</p>
</body>
</html>`;

  return new Response(html, {
    headers: { 'content-type': 'text/html; charset=UTF-8' },
  });
};
