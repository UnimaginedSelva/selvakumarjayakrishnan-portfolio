export interface BlogPost {
  id: string
  title: string
  framework: string
  frameworkTag: string
  date: string
  summary: string
  content: string
  linkedInUrl: string
  tags: string[]
}

export const blogPosts: BlogPost[] = [
  // Nova publishes entries here. Paste LinkedIn post content into `content`.
  // Example entry (remove when first real post is added):
  // {
  //   id: 'transform-real-world-01',
  //   title: 'How TRANSFORM™ Solved a $5M AI Deployment Stall',
  //   framework: 'TRANSFORM™',
  //   frameworkTag: 'Digital & AI Transformation',
  //   date: '2026-07-07',
  //   summary: 'A real-world application of the TRANSFORM™ framework...',
  //   content: `Full article content here...`,
  //   linkedInUrl: 'https://www.linkedin.com/feed/update/...',
  //   tags: ['AI Transformation', 'Change Management', 'TRANSFORM™'],
  // },
]
