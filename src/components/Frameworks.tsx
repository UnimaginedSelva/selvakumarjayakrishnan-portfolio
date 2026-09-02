import { ExternalLink, Layers } from 'lucide-react'
import { frameworks } from '../data/content'

export default function Frameworks() {
  return (
    <section id="frameworks" className="py-16 px-6 bg-[#faf6ec]">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h2 className="section-heading gold-underline pb-2">Original Frameworks™</h2>
          <p className="section-subheading mt-4">Practitioner playbooks published from 19 years of enterprise delivery</p>
        </div>

        {/* Framework Cards — one uniform treatment, no per-card color branching */}
        <div className="grid md:grid-cols-2 gap-8">
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
      </div>
    </section>
  )
}
