import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/95 backdrop-blur-sm shadow-lg shadow-black/20 border-b border-slate-800' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gold-500 flex items-center justify-center font-bold text-slate-900 text-sm">
            SJ
          </div>
          <span className="font-semibold text-slate-100 hidden sm:block">Selvakumar Jayakrishnan</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <button key={l.label} onClick={() => scrollTo(l.id)} className="text-slate-400 hover:text-gold-400 transition-colors text-sm font-medium">
              {l.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo('contact')}
            className="bg-gold-500 hover:bg-gold-400 text-slate-900 text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            Hire Me
          </button>
        </div>

        <button className="md:hidden text-slate-400 hover:text-slate-100" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800 px-6 py-4 flex flex-col gap-4">
          {links.map(l => (
            <button key={l.label} onClick={() => { scrollTo(l.id); setMenuOpen(false) }} className="text-slate-300 hover:text-gold-400 transition-colors text-sm font-medium text-left">
              {l.label}
            </button>
          ))}
          <button onClick={() => { scrollTo('contact'); setMenuOpen(false) }} className="bg-gold-500 text-slate-900 text-sm font-semibold px-4 py-2 rounded-lg text-center">
            Hire Me
          </button>
        </div>
      )}
    </nav>
  )
}
