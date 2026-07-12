export interface TemplateField {
  key: string
  label: string
  placeholder: string
}

export interface PracticeTemplate {
  id: string
  title: string
  description: string
  sourceLabel: string
  sourceBookId: string
  fields: TemplateField[]
}

export const templates: PracticeTemplate[] = [
  {
    id: 'self-image-rewrite',
    title: 'Self-Image Rewrite',
    description: 'Catch a limiting "I am" statement and replace it with the version you\'d rather be true, stated as present fact.',
    sourceLabel: 'The New Psycho-Cybernetics & Feeling Is the Secret',
    sourceBookId: 'new-psycho-cybernetics',
    fields: [
      { key: 'oldBelief', label: 'The belief I keep repeating about myself', placeholder: '"I am always behind on..."' },
      { key: 'newBelief', label: "What I'd rather be true, stated as fact right now", placeholder: '"I am..."' },
    ],
  },
  {
    id: 'revision-scene',
    title: 'Revision Scene',
    description: 'Replay a moment that disappointed you, exactly as you wish it had gone, in full sensory detail.',
    sourceLabel: 'The Law and the Promise, Ch. 3',
    sourceBookId: 'the-law-and-the-promise',
    fields: [
      { key: 'whatHappened', label: 'What actually happened', placeholder: 'A conversation, a mistake, a disappointment...' },
      { key: 'howIWishedItWent', label: 'How I wish it had gone, in full sensory detail', placeholder: 'What you would have said, how it would have felt...' },
    ],
  },
  {
    id: 'assumption-scene',
    title: 'Assumption Scene Builder',
    description: 'Build a specific, sensory scene that could only exist once your wish is already fulfilled.',
    sourceLabel: 'The Power of Awareness, Ch. 5',
    sourceBookId: 'the-power-of-awareness',
    fields: [
      { key: 'desire', label: 'What I want', placeholder: 'Be specific.' },
      { key: 'scene', label: "A specific scene that could only happen once it's true", placeholder: 'What you would see, hear, or hold...' },
      { key: 'feeling', label: "The feeling I'll hold as I fall asleep tonight", placeholder: 'Relief, gratitude, quiet certainty...' },
    ],
  },
  {
    id: 'shadow-projection',
    title: 'Shadow & Projection Reflection',
    description: "Notice what someone else's effect on you might reveal about your own disowned traits.",
    sourceLabel: "Jung's Map of the Soul, Ch. 5",
    sourceBookId: 'jungs-map-of-the-soul',
    fields: [
      { key: 'person', label: 'Someone who irritates or unsettles me more than the situation warrants', placeholder: 'Who, and what did they do?' },
      { key: 'trait', label: 'What bothers me about them — might it be mine too?', placeholder: 'Be honest, not judgmental.' },
      { key: 'shame', label: "Something I feel ashamed of, rather than merely guilty about", placeholder: 'Shame marks where persona and shadow split.' },
    ],
  },
  {
    id: 'daily-practice-log',
    title: 'Daily Practice Log',
    description: 'A short log for whichever guided meditation or practice you did today.',
    sourceLabel: 'Breaking the Habit of Being Yourself & Becoming Supernatural',
    sourceBookId: 'becoming-supernatural',
    fields: [
      { key: 'practice', label: 'Which practice did you do today', placeholder: 'Blessing of the Energy Centers, Walking Meditation, the breath technique...' },
      { key: 'feltState', label: 'How did it feel', placeholder: 'Easy, resistant, emotional, flat...' },
      { key: 'notice', label: 'Anything to notice or carry into tomorrow', placeholder: 'Optional.' },
    ],
  },
]

export function getTemplate(templateId: string): PracticeTemplate | undefined {
  return templates.find(t => t.id === templateId)
}
