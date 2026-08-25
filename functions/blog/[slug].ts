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
  'one-spine-eight-frameworks': {
    title: 'One Spine, Eight Frameworks: Mapping ADKAR to Enterprise Transformation',
    description:
      "Why Desire and Reinforcement are a loop, not two separate boxes, and what that means when you're running the program for real.",
    image: '/P21_Image.jpg',
  },
  'industry-5-0-x-shaped-professional': {
    title: "Everyone Draws the Skill Curve Wrong. It's Not I, Not T, It's X.",
    description:
      "As enterprise AI adoption accelerates, Industry 5.0 shifts the objective from pure automation to human augmentation, and the T-shaped professional gets a quiet upgrade nobody named until now.",
    image: '/P22_Image.jpg',
  },
  'gcc-transition-playbook-receiving-end': {
    title: 'The GCC Transition Playbook Nobody Writes: Lessons From the Receiving End',
    description:
      "Twice, a decade apart, I inherited a GCC transition I didn't design — and learned things the setup-side playbooks never mention. Six lessons from the receiving end, and a starting checklist for whoever inherits next.",
    image: '/carousels/gcc-transition-playbook-receiving-end/slide-1.png',
  },
  'ai-validation-five-steps': {
    title: 'The Illusion of Confidence: How to Validate AI-Generated Research Before You Publish It',
    description:
      "Twice in two weeks I caught AI-generated research asserting false claims with total confidence — including one I nearly published myself. Five steps to verify AI research before it goes out under your name.",
    image: '/P23_Image.jpg',
  },
  'ai-team-personalities': {
    title: '"Everyone\'s Building AI Agents." I Built an AI Team With Personalities.',
    description:
      "Everyone's talking about what AI can do. Very few are talking about who it is to you — and why that changes everything downstream of it. A practitioner's guide to building AI as a team, not a tool.",
    image: '/P24_Image.jpg',
  },
  'self-image-thermostat': {
    title: 'Your Self-Image Is a Thermostat, Not a Ceiling',
    description:
      "Your sense of what you're capable of works like a thermostat, not a ceiling. Here's why that distinction matters more in a fast-moving world.",
    image: '/P25_Image.png',
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
  // Forward query params (e.g. ?preview=true for a scheduled/hidden post)
  // through to the hash-routed SPA -- dropping them here silently defeats
  // any query-param-driven behavior in Blog.tsx, since the redirect target
  // is what the browser actually lands on.
  const search = new URL(request.url).search;
  const redirectTarget = `/#/blog/${slug}${search}`;

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
