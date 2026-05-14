import { Wrench, Award, GraduationCap, Globe } from 'lucide-react'
import { skills, education } from '../data/content'

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 bg-slate-900">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="section-heading gold-underline pb-2">Skills & Certifications</h2>
          <p className="section-subheading mt-4">Tools, expertise, credentials & recognition</p>
        </div>

        <div className="space-y-12">
          {/* Tools */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <Wrench size={16} className="text-gold-400" />
              <h3 className="text-slate-300 font-semibold text-sm uppercase tracking-widest">Technology & Tools</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.tools.map(tool => (
                <span key={tool} className="gold-badge">
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <GraduationCap size={16} className="text-gold-400" />
              <h3 className="text-slate-300 font-semibold text-sm uppercase tracking-widest">Certifications & Professional Development</h3>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {skills.certifications.map(cert => (
                <div key={cert.name} className="card hover:border-slate-600 transition-colors">
                  <div className="text-slate-100 font-semibold text-sm mb-1">{cert.name}</div>
                  {cert.issuer && <div className="text-gold-500 text-xs mb-1">{cert.issuer}</div>}
                  {cert.date && <div className="text-slate-500 text-xs mb-2">{cert.date}</div>}
                  <div className="text-slate-400 text-xs leading-relaxed">{cert.detail}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Awards & Languages side by side */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Awards */}
            <div>
              <div className="flex items-center gap-2 mb-5">
                <Award size={16} className="text-gold-400" />
                <h3 className="text-slate-300 font-semibold text-sm uppercase tracking-widest">Awards & Recognition</h3>
              </div>
              <div className="space-y-3">
                {skills.awards.map(a => (
                  <div key={a.name} className="flex items-center gap-3 bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-3">
                    <span className="text-gold-400 text-lg">★</span>
                    <div>
                      <div className="text-slate-200 font-medium text-sm">{a.name}</div>
                      <div className="text-slate-500 text-xs">{a.org}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages + Education */}
            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-2 mb-5">
                  <Globe size={16} className="text-gold-400" />
                  <h3 className="text-slate-300 font-semibold text-sm uppercase tracking-widest">Languages</h3>
                </div>
                <div className="space-y-2">
                  {skills.languages.map(l => (
                    <div key={l.lang} className="flex items-center justify-between bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-2.5">
                      <span className="text-slate-200 text-sm font-medium">{l.lang}</span>
                      <span className="text-slate-500 text-xs">{l.level}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-5">
                  <GraduationCap size={16} className="text-gold-400" />
                  <h3 className="text-slate-300 font-semibold text-sm uppercase tracking-widest">Education</h3>
                </div>
                <div className="space-y-3">
                  {education.map(e => (
                    <div key={e.degree} className="bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-3">
                      <div className="text-slate-200 font-medium text-sm">{e.degree}</div>
                      <div className="text-gold-500 text-xs mt-0.5">{e.institution} · {e.period}</div>
                      {e.note && <div className="text-slate-500 text-xs mt-1">{e.note}</div>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
