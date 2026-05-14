import { Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gold-500 flex items-center justify-center font-bold text-slate-900 text-xs">
            SJ
          </div>
          <span className="text-slate-400 text-sm">Selvakumar Jayakrishnan</span>
        </div>

        <p className="text-slate-600 text-xs text-center">
          TRANSFORM Framework™ · OPERATE Framework™ · © {new Date().getFullYear()} Selvakumar Jayakrishnan
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
    </footer>
  )
}
