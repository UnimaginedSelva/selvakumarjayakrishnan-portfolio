export interface JourneyEntry {
  id: string
  question: string
  answer: string
  theme: string
  date: string
  tags: string[]
}

export const journeyEntries: JourneyEntry[] = [
  // Nova publishes entries here. Self-authored Q&A only.
  // Example entry (remove when first real entry is added):
  // {
  //   id: 'journey-01',
  //   question: 'How do you approach resistance when senior leaders are the blockers?',
  //   answer: `Full answer here...`,
  //   theme: 'Change Management',
  //   date: '2026-07-01',
  //   tags: ['Resistance Management', 'Senior Stakeholders', 'ADKAR'],
  // },
]
