import { useState } from 'react'
import { frameworks, type Framework } from './data/frameworks'

type Q1 = 'digital-ai' | 'ai-production' | 'gcc' | 'erp' | 'cybersecurity'
type Q2 = 'fsi' | 'asean' | 'europe' | 'global'

const Q1_OPTIONS: { id: Q1; label: string; needsQ2?: boolean }[] = [
  { id: 'digital-ai', label: 'Rolling out digital tools or AI across the organization', needsQ2: true },
  { id: 'ai-production', label: 'Moving an AI pilot into full production' },
  { id: 'gcc', label: 'Standing up or scaling a Global Capability Center (GCC)' },
  { id: 'erp', label: 'Implementing or upgrading an ERP system' },
  { id: 'cybersecurity', label: 'Building a cybersecurity workforce for the agentic AI era' },
]

const Q2_OPTIONS: { id: Q2; label: string }[] = [
  { id: 'fsi', label: 'Financial services — banking, insurance, or FSI' },
  { id: 'asean', label: 'Primarily across ASEAN' },
  { id: 'europe', label: 'Primarily across Europe' },
  { id: 'global', label: 'None of these — other region or global' },
]

function resolveFramework(q1: Q1, q2: Q2 | null): Framework {
  const kindMap: Record<Q1, string> = {
    'digital-ai': 'digital-ai',
    'ai-production': 'ai-production',
    gcc: 'gcc',
    erp: 'erp',
    cybersecurity: 'cybersecurity',
  }
  const kind = kindMap[q1]
  if (kind === 'digital-ai') {
    const region = q2 === 'global' || !q2 ? null : q2
    return frameworks.find(f => f.kind === 'digital-ai' && f.region === region)!
  }
  return frameworks.find(f => f.kind === kind)!
}

type Step = 'intro' | 'q1' | 'q2' | 'checklist' | 'result'

export default function App() {
  const [step, setStep] = useState<Step>('intro')
  const [q1, setQ1] = useState<Q1 | null>(null)
  const [q2, setQ2] = useState<Q2 | null>(null)
  const [checked, setChecked] = useState<Set<string>>(new Set())
  const [framework, setFramework] = useState<Framework | null>(null)

  function pickQ1(id: Q1) {
    setQ1(id)
    const opt = Q1_OPTIONS.find(o => o.id === id)!
    setStep(opt.needsQ2 ? 'q2' : 'checklist')
  }

  function pickQ2(id: Q2) {
    setQ2(id)
    setStep('checklist')
  }

  function startOver() {
    setStep('intro')
    setQ1(null)
    setQ2(null)
    setChecked(new Set())
    setFramework(null)
  }

  function toggleStage(letter: string) {
    setChecked(prev => {
      const next = new Set(prev)
      if (next.has(letter)) next.delete(letter)
      else next.add(letter)
      return next
    })
  }

  function runResult() {
    const fw = resolveFramework(q1!, q2)
    setFramework(fw)
    setStep('result')
  }

  const activeFramework = step === 'checklist' ? resolveFramework(q1!, q2) : framework

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <div className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
          <a href="/" className="text-slate-400 hover:text-gold-400 transition-colors flex items-center gap-1 text-sm">
            &larr; Back to Portfolio
          </a>
          <span className="text-slate-700">|</span>
          <span className="text-slate-300 font-medium text-sm">Change Framework Navigator</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-14">
        {step === 'intro' && (
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs px-4 py-1.5 rounded-full mb-6 font-medium tracking-wide">
              OFFLINE &middot; NO AI, NO ACCOUNT
            </div>
            <h1 className="text-4xl font-bold text-slate-100 mb-3">Change Framework Navigator</h1>
            <p className="text-slate-400 text-lg max-w-xl mx-auto mb-8">
              Two questions and a checklist find which of 8 published frameworks, and which stage inside it, actually applies to your initiative.
            </p>
            <button
              onClick={() => setStep('q1')}
              className="bg-gold-500 hover:bg-gold-400 text-slate-900 font-semibold px-7 py-3 rounded-lg text-sm transition-colors"
            >
              Start &rarr;
            </button>
          </div>
        )}

        {step === 'q1' && (
          <QuestionStep
            title="What kind of change are you leading?"
            options={Q1_OPTIONS}
            onPick={id => pickQ1(id as Q1)}
          />
        )}

        {step === 'q2' && (
          <QuestionStep
            title="What's the primary context for this rollout?"
            options={Q2_OPTIONS}
            onPick={id => pickQ2(id as Q2)}
          />
        )}

        {step === 'checklist' && activeFramework && (
          <ChecklistStep
            framework={activeFramework}
            checked={checked}
            onToggle={toggleStage}
            onSubmit={runResult}
          />
        )}

        {step === 'result' && framework && (
          <ResultStep framework={framework} checked={checked} onRestart={startOver} />
        )}
      </div>
    </div>
  )
}

function QuestionStep({
  title,
  options,
  onPick,
}: {
  title: string
  options: { id: string; label: string }[]
  onPick: (id: string) => void
}) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-100 mb-8 text-center">{title}</h2>
      <div className="flex flex-col gap-3 max-w-xl mx-auto">
        {options.map(opt => (
          <button
            key={opt.id}
            onClick={() => onPick(opt.id)}
            className="text-left bg-slate-800/60 hover:bg-slate-800 border border-slate-700 hover:border-gold-500/50 rounded-xl px-5 py-4 transition-colors text-slate-200 text-sm"
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}

function ChecklistStep({
  framework,
  checked,
  onToggle,
  onSubmit,
}: {
  framework: Framework
  checked: Set<string>
  onToggle: (letter: string) => void
  onSubmit: () => void
}) {
  return (
    <div>
      <div className="text-center mb-8">
        <p className="text-gold-400 text-xs uppercase tracking-widest font-semibold mb-2">{framework.id}&trade;</p>
        <h2 className="text-2xl font-bold text-slate-100 mb-2">Which of these have you already done?</h2>
        <p className="text-slate-500 text-sm max-w-lg mx-auto">
          Check off every stage you've genuinely completed. The first one you haven't is where the Navigator will focus.
        </p>
      </div>
      <div className="flex flex-col gap-2.5 max-w-2xl mx-auto mb-8">
        {framework.stages.map(s => (
          <label
            key={s.letter}
            className="flex items-start gap-3 bg-slate-800/40 border border-slate-700 rounded-lg px-4 py-3 cursor-pointer hover:border-slate-600 transition-colors"
          >
            <input
              type="checkbox"
              checked={checked.has(s.letter)}
              onChange={() => onToggle(s.letter)}
              className="mt-1 accent-gold-500"
            />
            <span>
              <span className="block text-slate-200 text-sm font-semibold">{s.name}</span>
              <span className="block text-slate-500 text-xs mt-0.5">{s.principle}</span>
            </span>
          </label>
        ))}
      </div>
      <div className="text-center">
        <button
          onClick={onSubmit}
          className="bg-gold-500 hover:bg-gold-400 text-slate-900 font-semibold px-7 py-3 rounded-lg text-sm transition-colors"
        >
          Show My Stage &rarr;
        </button>
      </div>
    </div>
  )
}

function ResultStep({
  framework,
  checked,
  onRestart,
}: {
  framework: Framework
  checked: Set<string>
  onRestart: () => void
}) {
  const idx = framework.stages.findIndex(s => !checked.has(s.letter))
  const complete = idx === -1
  const currentIdx = complete ? framework.stages.length - 1 : idx

  const [viewIndex, setViewIndex] = useState(currentIdx)
  const view = framework.stages[viewIndex]
  const isCurrent = !complete && viewIndex === idx
  const isDone = complete || viewIndex < idx
  const status = isCurrent ? 'Where You Are' : isDone ? 'Completed' : 'Upcoming'

  return (
    <div>
      <div className="text-center mb-8">
        <p className="text-gold-400 text-xs uppercase tracking-widest font-semibold mb-2">
          {framework.id}&trade; &middot; {framework.layer}
        </p>
        <h1 className="text-2xl font-bold text-slate-100 mb-1">{framework.fullName}</h1>
        <p className="text-slate-500 text-sm italic">"{framework.tagline}"</p>
      </div>

      {/* Stage progress bar — click any stage to view its detail */}
      <div className="flex gap-1 mb-2 max-w-2xl mx-auto">
        {framework.stages.map((s, i) => (
          <button
            key={s.letter}
            title={s.name}
            onClick={() => setViewIndex(i)}
            className={`flex-1 h-2.5 rounded-full transition-opacity hover:opacity-80 ${
              i === viewIndex
                ? 'ring-2 ring-offset-2 ring-offset-slate-900 ring-gold-300'
                : ''
            } ${i < idx || complete ? 'bg-gold-500' : i === idx ? 'bg-gold-300' : 'bg-slate-700'}`}
          />
        ))}
      </div>
      <p className="text-center text-slate-600 text-xs mb-10">Click any stage above to jump to it</p>

      {complete && viewIndex === framework.stages.length - 1 && (
        <div className="max-w-2xl mx-auto bg-gold-500/10 border border-gold-500/30 rounded-xl p-6 text-center mb-8">
          <p className="text-slate-100 font-semibold mb-1">You've completed every stage in {framework.id}&trade;.</p>
          <p className="text-slate-400 text-sm">Time to reassess against a fresh initiative, or double check nothing regressed.</p>
        </div>
      )}

      <div className="max-w-2xl mx-auto mb-6">
        <p
          className={`text-xs uppercase tracking-widest font-semibold mb-2 ${
            isCurrent ? 'text-gold-400' : isDone ? 'text-slate-500' : 'text-slate-600'
          }`}
        >
          Stage {view.letter} &middot; {status}
        </p>
        <h2 className="text-xl font-bold text-slate-100 mb-2">{view.name}</h2>
        <p className="text-slate-300 text-base italic mb-6">"{view.principle}"</p>

        <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-4 mb-6">
          <p className="text-red-400 text-xs font-semibold uppercase tracking-wide mb-1">Watch For</p>
          <p className="text-slate-300 text-sm">{view.failureMode}</p>
        </div>

        <div className="mb-6">
          <p className="text-slate-500 text-xs font-semibold uppercase tracking-wide mb-2">Do This Now</p>
          <ul className="flex flex-col gap-2">
            {view.howToApply.map((a, i) => (
              <li key={i} className="flex items-start gap-2 text-slate-300 text-sm">
                <span className="text-gold-500 mt-0.5">&bull;</span>
                {a}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-8">
          <p className="text-slate-500 text-xs font-semibold uppercase tracking-wide mb-2">You'll Know It's Working When</p>
          <ul className="flex flex-col gap-2">
            {view.successIndicators.map((a, i) => (
              <li key={i} className="flex items-start gap-2 text-slate-300 text-sm">
                <span className="text-gold-500 mt-0.5">&#10003;</span>
                {a}
              </li>
            ))}
          </ul>
        </div>

        {/* Prev / Next stage navigation */}
        <div className="flex items-center justify-between gap-4 border-t border-slate-800 pt-5">
          {viewIndex > 0 ? (
            <button
              onClick={() => setViewIndex(viewIndex - 1)}
              className="flex-1 text-left border border-slate-700 hover:border-gold-500/50 rounded-lg px-4 py-3 transition-colors"
            >
              <span className="block text-[11px] uppercase tracking-wide text-slate-600 mb-0.5">&larr; Previous</span>
              <span className="text-sm font-semibold text-slate-300">{framework.stages[viewIndex - 1].name}</span>
            </button>
          ) : (
            <div className="flex-1" />
          )}
          {viewIndex < framework.stages.length - 1 ? (
            <button
              onClick={() => setViewIndex(viewIndex + 1)}
              className="flex-1 text-right border border-slate-700 hover:border-gold-500/50 rounded-lg px-4 py-3 transition-colors"
            >
              <span className="block text-[11px] uppercase tracking-wide text-slate-600 mb-0.5">Next &rarr;</span>
              <span className="text-sm font-semibold text-slate-300">{framework.stages[viewIndex + 1].name}</span>
            </button>
          ) : (
            <div className="flex-1" />
          )}
        </div>
      </div>

      <div className="text-center">
        <button onClick={onRestart} className="text-slate-500 hover:text-gold-400 text-sm underline transition-colors">
          Start over with a different initiative
        </button>
      </div>
    </div>
  )
}
