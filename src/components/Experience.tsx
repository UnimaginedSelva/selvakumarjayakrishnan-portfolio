import { Briefcase, Award } from 'lucide-react'
import { experience } from '../data/content'

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6 bg-slate-800/30">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="section-heading gold-underline pb-2">Professional Journey</h2>
          <p className="section-subheading mt-4">19 years across Dell Technologies & eClerx</p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-gold-500 via-slate-700 to-transparent" />

          <div className="space-y-12">
            {experience.map((item, i) => (
              <div key={i} className="relative pl-12 md:pl-20">
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-4 top-1 w-8 h-8 bg-slate-900 border-2 border-gold-500 rounded-full flex items-center justify-center">
                  <Briefcase size={14} className="text-gold-400" />
                </div>

                <div className="card hover:border-slate-600 transition-colors">
                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-slate-100">{item.role}</h3>
                      {item.level && (
                        <span className="text-xs text-slate-500 italic">{item.level}</span>
                      )}
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-gold-400 font-semibold text-sm">{item.company}</span>
                        <span className="text-slate-600">·</span>
                        <span className="text-slate-500 text-sm">{item.location}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-start md:items-end gap-1 shrink-0">
                      <span className="text-slate-400 text-sm">{item.period}</span>
                      <span className="text-slate-600 text-xs">{item.duration}</span>
                      {item.award && (
                        <span className="flex items-center gap-1 text-xs bg-gold-500/10 text-gold-400 border border-gold-500/20 px-2 py-0.5 rounded-full">
                          <Award size={10} />
                          {item.award}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Highlights */}
                  <ul className="space-y-2">
                    {item.highlights.map((h, j) => (
                      <li key={j} className="flex gap-3 text-slate-400 text-sm leading-relaxed">
                        <span className="text-gold-500 mt-1.5 shrink-0">›</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
