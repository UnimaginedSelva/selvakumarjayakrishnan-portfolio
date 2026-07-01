function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export const onRequestGet: PagesFunction = async ({ request }) => {
  const origin = new URL(request.url).origin;

  const title = 'Murders on Mars Express — by Selva JN';
  const description =
    "Quinn. A sealed ship. Sixty days. And a killer who has already decided who comes home. A locked-room sci-fi mystery thriller by Selva JN.";
  const imageUrl = `${origin}/book-cover.jpg`;
  const canonicalUrl = `${origin}/author`;
  const redirectTarget = '/#/author';

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>${escapeHtml(title)}</title>
<meta name="description" content="${escapeHtml(description)}" />
<link rel="canonical" href="${canonicalUrl}" />

<meta property="og:type" content="book" />
<meta property="og:title" content="${escapeHtml(title)}" />
<meta property="og:description" content="${escapeHtml(description)}" />
<meta property="og:image" content="${imageUrl}" />
<meta property="og:url" content="${canonicalUrl}" />
<meta property="og:site_name" content="Selvakumar Jayakrishnan" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${escapeHtml(title)}" />
<meta name="twitter:description" content="${escapeHtml(description)}" />
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
