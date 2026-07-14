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
      'Start simple, go deep, then bring it up to date. Psycho-Cybernetics grounds the psychology; three Neville Goddard titles build the law-of-assumption technique from short and clean to fully advanced; Louise Hay extends it into health and the body; Mind Magic grounds the whole practice in modern neuroscience.',
    bookIds: [
      'new-psycho-cybernetics',
      'feeling-is-the-secret',
      'the-power-of-awareness',
      'the-law-and-the-promise',
      'you-can-heal-your-life',
      'mind-magic',
    ],
  },
  {
    id: 'presence-and-the-untethered-self',
    title: 'Presence & the Untethered Self',
    description:
      'The same core insight — you are not your thoughts — taught three different ways. Tolle\'s two books approach it through presence and the ego; Singer\'s covers the same ground through a more structured, step-by-step journey.',
    bookIds: ['power-of-now', 'a-new-earth', 'the-untethered-soul'],
  },
  {
    id: 'breaking-your-own-patterns',
    title: 'Breaking Your Own Patterns',
    description:
      'Two direct, modern treatments of the inner judge and the self-sabotage that quietly caps growth — one framed as ancient Toltec wisdom, the other as contemporary psychology.',
    bookIds: ['the-four-agreements', 'the-mountain-is-you'],
  },
  {
    id: 'success-classic-to-modern',
    title: 'Success, Classic to Modern',
    description:
      "Hill's 1937 desire-to-riches method paired with Hendricks' modern psychological reframe of what actually caps success — the Upper Limit Problem picks up almost exactly where Think and Grow Rich leaves off.",
    bookIds: ['think-and-grow-rich', 'the-big-leap'],
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
      'All sixteen books in one recommended order: psychology and theory first, then the manifestation arc simple-to-advanced, then presence and ego, then breaking self-sabotage patterns, then success, then the body-based meditation arc grounded-to-mystical.',
    bookIds: [
      'new-psycho-cybernetics',
      'jungs-map-of-the-soul',
      'feeling-is-the-secret',
      'the-power-of-awareness',
      'the-law-and-the-promise',
      'you-can-heal-your-life',
      'mind-magic',
      'power-of-now',
      'a-new-earth',
      'the-untethered-soul',
      'the-four-agreements',
      'the-mountain-is-you',
      'think-and-grow-rich',
      'the-big-leap',
      'breaking-the-habit-of-being-you',
      'becoming-supernatural',
    ],
  },
]

export function getPathway(pathwayId: string): Pathway | undefined {
  return pathways.find(p => p.id === pathwayId)
}
