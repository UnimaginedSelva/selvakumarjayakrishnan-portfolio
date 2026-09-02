import { Linkedin, BookOpen, MessageSquare, Newspaper } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Footer() {
  const navigate = useNavigate()
  return (
    <footer className="bg-[#faf6ec] border-t border-stone-200 pt-10 pb-8 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Site section cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          <div
            onClick={() => navigate('/blog')}
            className="card group cursor-pointer hover:shadow-md transition-shadow flex items-start gap-4"
          >
            <div className="w-10 h-10 rounded-lg bg-terracotta-light flex items-center justify-center shrink-0">
              <BookOpen size={16} className="text-terracotta" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-stone-900 font-semibold text-sm">Thought Leadership Blog</span>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-terracotta bg-terracotta-light px-1.5 py-0.5 rounded-full">Live</span>
              </div>
              <p className="text-stone-500 text-xs leading-relaxed">Real-world application of 8 practitioner frameworks — published from 30 June 2026.</p>
            </div>
          </div>

          <div
            onClick={() => navigate('/journey')}
            className="card group cursor-pointer hover:shadow-md transition-shadow flex items-start gap-4"
          >
            <div className="w-10 h-10 rounded-lg bg-terracotta-light flex items-center justify-center shrink-0">
              <MessageSquare size={16} className="text-terracotta" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-stone-900 font-semibold text-sm">The Journey — Q&A</span>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-terracotta bg-terracotta-light px-1.5 py-0.5 rounded-full">Live</span>
              </div>
              <p className="text-stone-500 text-xs leading-relaxed">Real scenarios. Honest answers. The road to becoming one of the best AI Consultants by 2030.</p>
            </div>
          </div>

          <div
            onClick={() => navigate('/trend-bulletin')}
            className="card group cursor-pointer hover:shadow-md transition-shadow flex items-start gap-4"
          >
            <div className="w-10 h-10 rounded-lg bg-terracotta-light flex items-center justify-center shrink-0">
              <Newspaper size={16} className="text-terracotta" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-stone-900 font-semibold text-sm">Industry Trend Bulletin</span>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-terracotta bg-terracotta-light px-1.5 py-0.5 rounded-full">Live</span>
              </div>
              <p className="text-stone-500 text-xs leading-relaxed">AI, digital transformation, and enterprise tech stories — refreshed daily.</p>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-stone-200 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-terracotta flex items-center justify-center font-bold text-white text-xs">
            SJ
          </div>
          <span className="text-stone-600 text-sm">Selvakumar Jayakrishnan</span>
        </div>

        <p className="text-stone-400 text-xs text-center">
          TRANSFORM™ · OPERATE™ · ASCEND™ · EMBED™ · BRIDGE™ · FORGED™ · TRUST™ · STEWARD™ · © {new Date().getFullYear()} Selvakumar Jayakrishnan
        </p>

        <a
          href="https://www.linkedin.com/in/passionateselva"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-stone-500 hover:text-terracotta transition-colors text-sm"
        >
          <Linkedin size={16} />
          LinkedIn
        </a>
        </div>
      </div>
    </footer>
  )
}
