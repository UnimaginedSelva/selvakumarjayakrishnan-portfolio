import { useState, useEffect } from 'react'
import { Menu, X, HelpCircle } from 'lucide-react'
import HireMeModal from './HireMeModal'

const links = [
  { label: 'About', id: 'about' },
  { label: 'Experience', id: 'experience' },
  { label: 'Skills', id: 'skills' },
  { label: 'Frameworks', id: 'frameworks' },
  { label: 'Contact', id: 'contact' },
]

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [hireMeOpen, setHireMeOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#faf6ec]/95 backdrop-blur-sm shadow-lg shadow-black/5 border-b border-stone-200' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-terracotta flex items-center justify-center font-bold text-white text-sm">
            SJ
          </div>
          <span className="font-semibold text-stone-900 hidden sm:block">Selvakumar Jayakrishnan</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <button key={l.label} onClick={() => scrollTo(l.id)} className="text-stone-500 hover:text-terracotta transition-colors text-sm font-medium">
              {l.label}
            </button>
          ))}
          <a
            href="/Selvakumar_Jayakrishnan_Visitor_Handbook.pdf"
            target="_blank"
            rel="noopener noreferrer"
            title="Visitor Handbook — a quick guide to this site"
            aria-label="Open Visitor Handbook"
            className="text-stone-500 hover:text-terracotta transition-colors"
          >
            <HelpCircle size={19} />
          </a>
          <button
            onClick={() => setHireMeOpen(true)}
            className="bg-terracotta hover:bg-terracotta-dark text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            Hire Me
          </button>
        </div>

        <button className="md:hidden text-stone-500 hover:text-stone-900" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {hireMeOpen && <HireMeModal onClose={() => setHireMeOpen(false)} />}

      {menuOpen && (
        <div className="md:hidden bg-[#faf6ec] border-t border-stone-200 px-6 py-4 flex flex-col gap-4">
          {links.map(l => (
            <button key={l.label} onClick={() => { scrollTo(l.id); setMenuOpen(false) }} className="text-stone-700 hover:text-terracotta transition-colors text-sm font-medium text-left">
              {l.label}
            </button>
          ))}
          <a
            href="/Selvakumar_Jayakrishnan_Visitor_Handbook.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-stone-700 hover:text-terracotta transition-colors text-sm font-medium"
          >
            <HelpCircle size={16} /> Visitor Handbook
          </a>
          <button onClick={() => { setMenuOpen(false); setHireMeOpen(true) }} className="bg-terracotta text-white text-sm font-semibold px-4 py-2 rounded-lg text-center">
            Hire Me
          </button>
        </div>
      )}
    </nav>
  )
}
