import { ExternalLink, Layers } from 'lucide-react'
import { frameworks } from '../data/content'

export default function Frameworks() {
  return (
    <section id="frameworks" className="py-24 px-6 bg-[#faf6ec]">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="section-heading gold-underline pb-2">Original Frameworks™</h2>
          <p className="section-subheading mt-4">Practitioner playbooks published from 19 years of enterprise delivery</p>
        </div>

        {/* Framework Cards — one uniform treatment, no per-card color branching */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {frameworks.map(fw => (
            <div
              key={fw.name}
              className="card flex flex-col hover:shadow-md transition-shadow"
            >
              {/* Stage badge */}
              <span className="badge inline-flex items-center gap-1.5 w-fit mb-6">
                <Layers size={12} />
                {fw.stages}
              </span>

              <h3 className="text-2xl font-extrabold text-terracotta mb-1">{fw.name}</h3>
              <p className="text-stone-700 font-medium mb-4">{fw.description}</p>
              <p className="text-stone-500 text-sm leading-relaxed mb-6 flex-1">{fw.detail}</p>

              <div className="text-stone-400 text-xs mb-6">{fw.published}</div>

              <a
                href={fw.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-terracotta hover:bg-terracotta-dark text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors w-full"
              >
                <ExternalLink size={15} />
                Read on LinkedIn
              </a>
            </div>
          ))}
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
                className="card group hover:shadow-md transition-shadow flex items-center gap-5"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-terracotta-light">
                  <Layers size={22} className="text-terracotta" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-stone-800 font-semibold text-sm group-hover:text-terracotta transition-colors">{fw.name}</div>
                  <div className="text-stone-500 text-xs mt-0.5 truncate">{fw.stages} · {fw.description}</div>
                  <div className="text-stone-400 text-xs mt-1">{fw.published}</div>
                </div>
                <ExternalLink size={14} className="text-stone-400 group-hover:text-terracotta transition-colors shrink-0" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
