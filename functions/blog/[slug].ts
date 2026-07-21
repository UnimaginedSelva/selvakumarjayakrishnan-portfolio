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
  'gcc-permission-problem': {
    title: "Your GCC Doesn't Have a Talent Problem. It Has a Permission Problem.",
    description:
      "Why 92% of Global Capability Centers stay stuck below Innovation Hub tier, and what ASCEND™ says about closing the gap, from Bangalore to Kuala Lumpur to Manila.",
    image: '/carousels/gcc-permission-problem/slide-1.png',
  },
  'orchestration-isnt-new': {
    title: "Orchestration Isn't New. It's the One OPERATE Already Solves.",
    description:
      "What the shift to multi-model AI orchestration means for governance and trust, and why OPERATE's Responsible AI Governance and Trust Engineering stages already cover it.",
    image: '/carousels/orchestration-isnt-new/slide-1.png',
  },
  'ai-boom-bubble-playbook': {
    title: "You Don't Need to Win the AI Boom or Bubble Argument. You Need to Be Ready for Either One.",
    description:
      "Enterprise AI abandonment hit 42% in 2025, yet agentic adoption is accelerating just as fast. Here is the operational playbook that works regardless of which way the market goes.",
    image: '/P20_Image.png',
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
