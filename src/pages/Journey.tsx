import { useState } from 'react'
import { ArrowLeft, Send, ChevronDown, ChevronUp, Tag } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { journeyEntries, type JourneyEntry } from '../data/journey'

const THEMES = ['All', 'Change Management', 'AI & Technology', 'Leadership', 'Transformation', 'Career']

function QuestionCard({ entry }: { entry: JourneyEntry }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="card hover:shadow-md transition-shadow">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left flex items-start justify-between gap-4"
      >
        <div className="flex-1">
          <span className="badge mb-2">
            {entry.theme}
          </span>
          <h3 className="text-stone-900 font-semibold leading-snug">{entry.question}</h3>
        </div>
        <div className="shrink-0 mt-1 text-stone-400">
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </button>
      {open && (
        <div className="mt-4 pt-4 border-t border-stone-200">
          <p className="text-stone-600 text-sm leading-relaxed whitespace-pre-wrap">{entry.answer}</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {entry.tags.map(tag => (
              <span key={tag} className="flex items-center gap-1 text-xs text-stone-500 bg-stone-100 px-2.5 py-1 rounded-full">
                <Tag size={10} /> {tag}
              </span>
            ))}
          </div>
          <p className="text-stone-400 text-xs mt-3">
            {new Date(entry.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
      )}
    </div>
  )
}

function AskForm() {
  const [question, setQuestion] = useState('')
  const [name, setName] = useState('')
  const [sent, setSent] = useState(false)

  function handleSubmit() {
    if (!question.trim()) return
    const subject = encodeURIComponent('Question for Selva — AI Consultant Journey')
    const body = encodeURIComponent(
      `Hi Selva,\n\nI have a question for your Journey series:\n\n"${question}"\n\n— ${name || 'Anonymous'}`
    )
    window.location.href = `mailto:selvakumar.jayakrishnan@hotmail.com?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <div className="card mt-12">
      <h3 className="text-stone-900 font-semibold text-lg mb-1">Ask a Question</h3>
      <p className="text-stone-500 text-sm mb-5">
        Submit a real-world scenario or challenge — Selva answers the best ones in this journal.
      </p>
      {sent ? (
        <div className="text-center py-6">
          <div className="w-12 h-12 rounded-full bg-terracotta-light flex items-center justify-center mx-auto mb-3">
            <Send size={18} className="text-terracotta" />
          </div>
          <p className="text-stone-700 font-medium">Question submitted — thank you.</p>
          <p className="text-stone-400 text-sm mt-1">Selva will answer the best questions in future entries.</p>
        </div>
      ) : (
        <div className="space-y-3">
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Your name (optional)"
            className="w-full bg-white border border-stone-300 text-stone-900 text-sm rounded-lg px-3 py-2.5 placeholder-stone-400 focus:outline-none focus:border-terracotta transition-colors"
          />
          <textarea
            value={question}
            onChange={e => setQuestion(e.target.value)}
            placeholder="What would you like to ask? E.g. How would you handle AI resistance in a conservative FSI organisation?"
            rows={4}
            className="w-full bg-white border border-stone-300 text-stone-900 text-sm rounded-lg px-3 py-2.5 placeholder-stone-400 focus:outline-none focus:border-terracotta transition-colors resize-none"
          />
          <button
            onClick={handleSubmit}
            disabled={!question.trim()}
            className="flex items-center gap-2 bg-terracotta hover:bg-terracotta-dark disabled:bg-stone-200 disabled:text-stone-400 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
          >
            <Send size={14} /> Submit Question
          </button>
        </div>
      )}
    </div>
  )
}

export default function Journey() {
  const navigate = useNavigate()
  const [activeTheme, setActiveTheme] = useState('All')

  const filtered = activeTheme === 'All'
    ? journeyEntries
    : journeyEntries.filter(e => e.theme === activeTheme)

  return (
    <div className="min-h-screen bg-[#faf6ec] text-stone-900">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#faf6ec]/95 backdrop-blur-sm border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => navigate('/')} className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-terracotta flex items-center justify-center font-bold text-white text-xs">SJ</div>
            <span className="text-stone-700 text-sm font-medium hidden sm:block">Selvakumar Jayakrishnan</span>
          </button>
          <button onClick={() => navigate('/')} className="flex items-center gap-1.5 text-stone-500 hover:text-terracotta transition-colors text-sm">
            <ArrowLeft size={14} /> Back to Portfolio
          </button>
        </div>
      </div>

      <div className="pt-20 max-w-3xl mx-auto px-6 py-16">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-stone-900 mb-3">The Journey</h1>
          <div className="w-12 h-0.5 bg-terracotta mb-5" />
          <p className="text-stone-500 text-lg">
            Real scenarios. Honest answers. How a Senior Change & Transformation Leader thinks, works, and evolves — on the road to becoming one of the best AI Consultants by 2030.
          </p>
        </div>

        {/* Theme filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {THEMES.map(theme => (
            <button
              key={theme}
              onClick={() => setActiveTheme(theme)}
              className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
                activeTheme === theme
                  ? 'bg-terracotta border-terracotta text-white'
                  : 'border-stone-300 text-stone-500 hover:border-terracotta/60 hover:text-terracotta'
              }`}
            >
              {theme}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-stone-300 rounded-2xl">
            <div className="w-14 h-14 rounded-2xl bg-terracotta-light flex items-center justify-center mx-auto mb-4">
              <Tag size={22} className="text-terracotta" />
            </div>
            <h3 className="text-stone-700 font-semibold text-lg mb-2">First entry coming soon</h3>
            <p className="text-stone-400 text-sm max-w-sm mx-auto">
              Real-world Q&A from 19 years of enterprise transformation — published as the journey unfolds.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map(entry => (
              <QuestionCard key={entry.id} entry={entry} />
            ))}
          </div>
        )}

        <AskForm />
      </div>
    </div>
  )
}
