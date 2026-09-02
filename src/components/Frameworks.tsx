import { ExternalLink, Layers } from 'lucide-react'
import { frameworks } from '../data/content'

export default function Frameworks() {
  return (
    <section id="frameworks" className="py-24 px-6 bg-stone-50">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="section-heading gold-underline pb-2">Original Frameworks™</h2>
          <p className="section-subheading mt-4">Practitioner playbooks published from 19 years of enterprise delivery</p>
        </div>

        {/* Framework Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {frameworks.map(fw => {
            const isGold = fw.color === 'gold'
            const accentColor = isGold ? 'text-amber-700' : 'text-teal-700'
            const borderColor = isGold ? 'border-amber-300 hover:border-amber-500' : 'border-teal-300 hover:border-teal-500'
            const bgColor = isGold ? 'bg-amber-50' : 'bg-teal-50'
            const badgeBg = isGold ? 'bg-amber-100 text-amber-800 border-amber-200' : 'bg-teal-100 text-teal-800 border-teal-200'
            const btnColor = isGold
              ? 'bg-amber-700 hover:bg-amber-800 text-white'
              : 'bg-teal-700 hover:bg-teal-800 text-white'

            return (
              <div
                key={fw.name}
                className={`relative rounded-2xl border ${borderColor} ${bgColor} p-8 transition-all duration-300 flex flex-col`}
              >
                {/* Stage badge */}
                <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border ${badgeBg} w-fit mb-6`}>
                  <Layers size={12} />
                  {fw.stages}
                </span>

                <h3 className={`text-2xl font-extrabold ${accentColor} mb-1`}>{fw.name}</h3>
                <p className="text-stone-700 font-medium mb-4">{fw.description}</p>
                <p className="text-stone-500 text-sm leading-relaxed mb-6 flex-1">{fw.detail}</p>

                <div className="text-stone-400 text-xs mb-6">{fw.published}</div>

                <a
                  href={fw.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center gap-2 ${btnColor} font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors w-full`}
                >
                  <ExternalLink size={15} />
                  Read on LinkedIn
                </a>
              </div>
            )
          })}
        </div>

        {/* Featured LinkedIn Posts */}
        <div>
          <h3 className="text-stone-500 uppercase text-xs tracking-widest mb-6 font-medium flex items-center gap-2">
            <span className="w-8 h-px bg-stone-300" />
            Featured Thought Leadership
            <span className="w-8 h-px bg-stone-300" />
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {frameworks.map(fw => (
              <a
                key={fw.name}
                href={fw.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card group hover:border-stone-300 transition-all flex items-center gap-5"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${fw.color === 'gold' ? 'bg-amber-100' : 'bg-teal-100'}`}>
                  <Layers size={22} className={fw.color === 'gold' ? 'text-amber-700' : 'text-teal-700'} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-stone-800 font-semibold text-sm group-hover:text-amber-700 transition-colors">{fw.name}</div>
                  <div className="text-stone-500 text-xs mt-0.5 truncate">{fw.stages} · {fw.description}</div>
                  <div className="text-stone-400 text-xs mt-1">{fw.published}</div>
                </div>
                <ExternalLink size={14} className="text-stone-400 group-hover:text-amber-700 transition-colors shrink-0" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
