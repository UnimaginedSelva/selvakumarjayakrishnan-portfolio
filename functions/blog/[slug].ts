interface PostMeta {
  title: string;
  description: string;
  image: string;
}

const POSTS: Record<string, PostMeta> = {
  'ai-trust-gap-travel-tech': {
    title: "The AI Trust Gap: Why Travel Tech's Transformation Isn't a Technology Problem",
    description:
      "One OTA cut support costs 40-60% with autonomous AI agents. Fewer than 1 in 10 travelers trust AI to book on their behalf. The gap between the two is a change architecture problem, not a technology one.",
    image: '/P15_Image.jpg',
  },
  'healthcare-gcs-adkar-transform': {
    title: "The 40-Field Screen: Why Healthcare Change Management Can't Just Bolt AI On",
    description:
      "A Clinical Application Specialist juggles diagnostic physics, a panicked technician, and a CAPA trigger in the same call. ADKAR diagnoses the gap. TRANSFORM™ builds the boundary that keeps it from forming.",
    image: '/P16_Image.jpg',
  },
  'stop-installing-ai-start-onboarding': {
    title: 'Stop Installing AI. Start Onboarding It.',
    description:
      "Why 'botsitting' is a symptom of misclassification, not a governance gap — and what OPERATE™ says to do instead.",
    image: '/P17_Image.jpg',
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
  const slug = String(params.slug ?? '');
  const post = POSTS[slug];
  const origin = new URL(request.url).origin;

  if (!post) {
    return Response.redirect(`${origin}/#/blog`, 302);
  }

  const canonicalUrl = `${origin}/blog/${slug}`;
  const imageUrl = `${origin}${post.image}`;
  const redirectTarget = `/#/blog/${slug}`;

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>${escapeHtml(post.title)}</title>
<meta name="description" content="${escapeHtml(post.description)}" />
<link rel="canonical" href="${canonicalUrl}" />

<meta property="og:type" content="article" />
<meta property="og:title" content="${escapeHtml(post.title)}" />
<meta property="og:description" content="${escapeHtml(post.description)}" />
<meta property="og:image" content="${imageUrl}" />
<meta property="og:url" content="${canonicalUrl}" />
<meta property="og:site_name" content="Selvakumar Jayakrishnan" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${escapeHtml(post.title)}" />
<meta name="twitter:description" content="${escapeHtml(post.description)}" />
<meta name="twitter:image" content="${imageUrl}" />

<meta http-equiv="refresh" content="0; url=${redirectTarget}" />
<script>window.location.replace(${JSON.stringify(redirectTarget)});</script>
</head>
<body>
<p>Redirecting to <a href="${redirectTarget}">${escapeHtml(post.title)}</a>…</p>
</body>
</html>`;

  return new Response(html, {
    headers: { 'content-type': 'text/html; charset=UTF-8' },
  });
};
