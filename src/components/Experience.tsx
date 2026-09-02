import { Briefcase, Award } from 'lucide-react'
import { experience } from '../data/content'

export default function Experience() {
  return (
    <section id="experience" className="py-16 px-6 bg-[#faf6ec]">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h2 className="section-heading gold-underline pb-2">Professional Journey</h2>
          <p className="section-subheading mt-4">19 years across Dell Technologies & eClerx</p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-terracotta via-stone-300 to-transparent" />

          <div className="space-y-12">
            {experience.map((item, i) => (
              <div key={i} className="relative pl-12 md:pl-20">
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-4 top-1 w-8 h-8 bg-surface shadow-sm shadow-stone-900/5 border-2 border-terracotta rounded-full flex items-center justify-center">
                  <Briefcase size={14} className="text-terracotta" />
                </div>

                <div className="card hover:shadow-md transition-shadow">
                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-stone-900">{item.role}</h3>
                      {item.level && (
                        <span className="text-xs text-stone-500 italic">{item.level}</span>
                      )}
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-terracotta font-semibold text-sm">{item.company}</span>
                        <span className="text-stone-400">·</span>
                        <span className="text-stone-500 text-sm">{item.location}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-start md:items-end gap-1 shrink-0">
                      <span className="text-stone-500 text-sm">{item.period}</span>
                      <span className="text-stone-400 text-xs">{item.duration}</span>
                      {item.award && item.award.split('|').map(a => a.trim()).filter(Boolean).map(a => (
                        <span key={a} className="badge flex items-center gap-1">
                          <Award size={10} />
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Highlights */}
                  <ul className="space-y-2">
                    {item.highlights.map((h, j) => (
                      <li key={j} className="flex gap-3 text-stone-600 text-sm leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-terracotta shrink-0 mt-2" />
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
