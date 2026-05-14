import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Frameworks', href: '#frameworks' },
  { label: 'Contact', href: '#contact' },
]

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
            <a key={l.label} href={l.href} className="text-slate-400 hover:text-gold-400 transition-colors text-sm font-medium">
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="bg-gold-500 hover:bg-gold-400 text-slate-900 text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            Hire Me
          </a>
        </div>

        <button className="md:hidden text-slate-400 hover:text-slate-100" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800 px-6 py-4 flex flex-col gap-4">
          {links.map(l => (
            <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)} className="text-slate-300 hover:text-gold-400 transition-colors text-sm font-medium">
              {l.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setMenuOpen(false)} className="bg-gold-500 text-slate-900 text-sm font-semibold px-4 py-2 rounded-lg text-center">
            Hire Me
          </a>
        </div>
      )}
    </nav>
  )
}
