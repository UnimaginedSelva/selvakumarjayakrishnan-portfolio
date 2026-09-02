import { Download, Linkedin, MapPin, ArrowDown } from 'lucide-react'
import { hero } from '../data/content'

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 60% 0%, #fffdf8 0%, #faf6ec 60%)',
      }}
    >
      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'linear-gradient(rgba(180,83,9,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(180,83,9,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Availability badge */}
        <div className="inline-flex items-center gap-2 bg-amber-100 border border-amber-200 text-amber-800 text-sm px-4 py-1.5 rounded-full mb-8 mt-16">
          <span className="w-2 h-2 bg-amber-600 rounded-full animate-pulse" />
          Open to Opportunities · India &amp; Overseas
        </div>

        {/* Name */}
        <h1 className="text-5xl md:text-7xl font-extrabold text-stone-900 mb-4 leading-tight tracking-tight">
          {hero.name}
        </h1>

        {/* Title */}
        <p className="text-xl md:text-2xl font-semibold text-amber-700 mb-3">
          {hero.title}
        </p>
        <p className="font-reading italic text-base md:text-lg text-stone-500 mb-10">
          {hero.subtitle}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 max-w-2xl mx-auto">
          {hero.stats.map(s => (
            <div key={s.label} className="bg-white border border-stone-200 rounded-xl py-4 px-3">
              <div className="text-2xl md:text-3xl font-extrabold text-amber-700">{s.value}</div>
              <div className="text-xs text-stone-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <a
            href={hero.resumeFile}
            download
            className="flex items-center justify-center gap-2 bg-amber-700 hover:bg-amber-800 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            <Download size={18} />
            Download Resume
          </a>
          <a
            href={hero.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 border border-amber-700/50 hover:border-amber-700 text-amber-700 hover:text-amber-800 font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            <Linkedin size={18} />
            View LinkedIn
          </a>
        </div>

        {/* Location */}
        <div className="flex items-center justify-center gap-2 text-stone-500 text-sm">
          <MapPin size={14} />
          <span>{hero.location}</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <a href="#about" className="absolute bottom-8 text-stone-400 hover:text-amber-700 transition-colors animate-bounce">
        <ArrowDown size={22} />
      </a>
    </section>
  )
}
