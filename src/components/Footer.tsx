import { Linkedin, BookOpen, MessageSquare, Library } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Footer() {
  const navigate = useNavigate()
  return (
    <footer className="bg-slate-950 border-t border-slate-800 pt-10 pb-8 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Coming Soon cards */}
        <div className="grid sm:grid-cols-3 gap-4 mb-10">
          <div
            onClick={() => navigate('/blog')}
            className="group cursor-pointer border border-dashed border-slate-700 hover:border-gold-500/40 rounded-xl p-5 flex items-start gap-4 transition-all"
          >
            <div className="w-10 h-10 rounded-lg bg-gold-500/10 border border-gold-500/20 flex items-center justify-center shrink-0 group-hover:bg-gold-500/20 transition-colors">
              <BookOpen size={16} className="text-gold-400" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-slate-100 font-semibold text-sm">Thought Leadership Blog</span>
              </div>
              <p className="text-slate-500 text-xs leading-relaxed">Real-world application of 7 practitioner frameworks — published from 30 June 2026.</p>
            </div>
          </div>

          <div
            onClick={() => navigate('/journey')}
            className="group cursor-pointer border border-dashed border-slate-700 hover:border-gold-500/40 rounded-xl p-5 flex items-start gap-4 transition-all"
          >
            <div className="w-10 h-10 rounded-lg bg-gold-500/10 border border-gold-500/20 flex items-center justify-center shrink-0 group-hover:bg-gold-500/20 transition-colors">
              <MessageSquare size={16} className="text-gold-400" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-slate-100 font-semibold text-sm">The Journey — Q&A</span>
                <span className="text-xs font-medium text-gold-400 bg-gold-500/10 border border-gold-500/20 px-2 py-0.5 rounded-full">Coming Soon</span>
              </div>
              <p className="text-slate-500 text-xs leading-relaxed">Real scenarios. Honest answers. The road to becoming one of the best AI Consultants by 2030.</p>
            </div>
          </div>

          <div
            onClick={() => navigate('/library')}
            className="group cursor-pointer border border-dashed border-slate-700 hover:border-gold-500/40 rounded-xl p-5 flex items-start gap-4 transition-all"
          >
            <div className="w-10 h-10 rounded-lg bg-gold-500/10 border border-gold-500/20 flex items-center justify-center shrink-0 group-hover:bg-gold-500/20 transition-colors">
              <Library size={16} className="text-gold-400" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-slate-100 font-semibold text-sm">Reading Library</span>
              </div>
              <p className="text-slate-500 text-xs leading-relaxed">Self-help classics, distilled chapter by chapter — the core idea and one thing to do.</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gold-500 flex items-center justify-center font-bold text-slate-900 text-xs">
            SJ
          </div>
          <span className="text-slate-400 text-sm">Selvakumar Jayakrishnan</span>
        </div>

        <p className="text-slate-600 text-xs text-center">
          TRANSFORM™ · OPERATE™ · ASCEND™ · EMBED™ · BRIDGE™ · FORGED™ · TRUST™ · © {new Date().getFullYear()} Selvakumar Jayakrishnan
        </p>

        <a
          href="https://www.linkedin.com/in/passionateselva"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-slate-500 hover:text-gold-400 transition-colors text-sm"
        >
          <Linkedin size={16} />
          LinkedIn
        </a>
        </div>
      </div>
    </footer>
  )
}
