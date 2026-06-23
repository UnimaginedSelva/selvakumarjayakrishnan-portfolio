import { useState } from 'react'
import { ArrowLeft, Send, ChevronDown, ChevronUp, Tag } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { journeyEntries, type JourneyEntry } from '../data/journey'

const THEMES = ['All', 'Change Management', 'AI & Technology', 'Leadership', 'Transformation', 'Career']

function QuestionCard({ entry }: { entry: JourneyEntry }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="card hover:border-gold-500/40 transition-all">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left flex items-start justify-between gap-4"
      >
        <div className="flex-1">
          <span className="text-xs font-semibold text-gold-400 bg-gold-500/10 border border-gold-500/20 px-2 py-0.5 rounded-full mb-2 inline-block">
            {entry.theme}
          </span>
          <h3 className="text-slate-100 font-semibold leading-snug">{entry.question}</h3>
        </div>
        <div className="shrink-0 mt-1 text-slate-500">
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </button>
      {open && (
        <div className="mt-4 pt-4 border-t border-slate-800">
          <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">{entry.answer}</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {entry.tags.map(tag => (
              <span key={tag} className="flex items-center gap-1 text-xs text-slate-500 bg-slate-800 px-2.5 py-1 rounded-full">
                <Tag size={10} /> {tag}
              </span>
            ))}
          </div>
          <p className="text-slate-700 text-xs mt-3">
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
    <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 mt-12">
      <h3 className="text-slate-100 font-semibold text-lg mb-1">Ask a Question</h3>
      <p className="text-slate-500 text-sm mb-5">
        Submit a real-world scenario or challenge — Selva answers the best ones in this journal.
      </p>
      {sent ? (
        <div className="text-center py-6">
          <div className="w-12 h-12 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center mx-auto mb-3">
            <Send size={18} className="text-gold-400" />
          </div>
          <p className="text-slate-300 font-medium">Question submitted — thank you.</p>
          <p className="text-slate-600 text-sm mt-1">Selva will answer the best questions in future entries.</p>
        </div>
      ) : (
        <div className="space-y-3">
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Your name (optional)"
            className="w-full bg-slate-800 border border-slate-700 text-slate-100 text-sm rounded-lg px-3 py-2.5 placeholder-slate-600 focus:outline-none focus:border-gold-500 transition-colors"
          />
          <textarea
            value={question}
            onChange={e => setQuestion(e.target.value)}
            placeholder="What would you like to ask? E.g. How would you handle AI resistance in a conservative FSI organisation?"
            rows={4}
            className="w-full bg-slate-800 border border-slate-700 text-slate-100 text-sm rounded-lg px-3 py-2.5 placeholder-slate-600 focus:outline-none focus:border-gold-500 transition-colors resize-none"
          />
          <button
            onClick={handleSubmit}
            disabled={!question.trim()}
            className="flex items-center gap-2 bg-gold-500 hover:bg-gold-400 disabled:bg-slate-700 disabled:text-slate-500 text-slate-900 text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
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
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => navigate('/')} className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gold-500 flex items-center justify-center font-bold text-slate-900 text-xs">SJ</div>
            <span className="text-slate-300 text-sm font-medium hidden sm:block">Selvakumar Jayakrishnan</span>
          </button>
          <button onClick={() => navigate('/')} className="flex items-center gap-1.5 text-slate-500 hover:text-gold-400 transition-colors text-sm">
            <ArrowLeft size={14} /> Back to Portfolio
          </button>
        </div>
      </div>

      <div className="pt-20 max-w-3xl mx-auto px-6 py-16">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-slate-100 mb-3">The Journey</h1>
          <div className="w-12 h-0.5 bg-gold-500 mb-5" />
          <p className="text-slate-400 text-lg">
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
                  ? 'bg-gold-500 border-gold-500 text-slate-900'
                  : 'border-slate-700 text-slate-400 hover:border-gold-500/50 hover:text-gold-400'
              }`}
            >
              {theme}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-slate-800 rounded-2xl">
            <div className="w-14 h-14 rounded-2xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center mx-auto mb-4">
              <Tag size={22} className="text-gold-400" />
            </div>
            <h3 className="text-slate-300 font-semibold text-lg mb-2">First entry coming soon</h3>
            <p className="text-slate-600 text-sm max-w-sm mx-auto">
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
