export interface Pathway {
  id: string
  title: string
  description: string
  bookIds: string[]
}

export const pathways: Pathway[] = [
  {
    id: 'manifestation-practice',
    title: 'Manifestation Practice',
    description:
      'Start simple, go deep. Psycho-Cybernetics grounds the psychology; three Neville Goddard titles build the same technique from short and clean to fully advanced.',
    bookIds: [
      'new-psycho-cybernetics',
      'feeling-is-the-secret',
      'the-power-of-awareness',
      'the-law-and-the-promise',
    ],
  },
  {
    id: 'body-breath-meditation',
    title: 'Body, Breath & Meditation',
    description:
      'Two sequential Dispenza books pairing neuroscience with real guided practice — a four-week meditation program first, then deeper pineal gland and heart-coherence work.',
    bookIds: ['breaking-the-habit-of-being-you', 'becoming-supernatural'],
  },
  {
    id: 'understanding-the-machinery',
    title: 'Understanding the Machinery',
    description:
      "No practice attached — just the clearest map of why the psyche works the way every other pathway here assumes it does.",
    bookIds: ['jungs-map-of-the-soul'],
  },
  {
    id: 'the-complete-journey',
    title: 'The Complete Journey',
    description:
      'All seven books in one recommended order: psychology, then theory, then the manifestation arc simple-to-advanced, then the body-based practice arc grounded-to-mystical.',
    bookIds: [
      'new-psycho-cybernetics',
      'jungs-map-of-the-soul',
      'feeling-is-the-secret',
      'the-power-of-awareness',
      'the-law-and-the-promise',
      'breaking-the-habit-of-being-you',
      'becoming-supernatural',
    ],
  },
]

export function getPathway(pathwayId: string): Pathway | undefined {
  return pathways.find(p => p.id === pathwayId)
}
