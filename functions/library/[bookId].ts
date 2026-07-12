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
