import { about } from '../data/content'

export default function About() {
  return (
    <section id="about" className="py-16 px-6 bg-[#faf6ec]">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h2 className="section-heading gold-underline pb-2">About Me</h2>
          <p className="section-subheading mt-4">{about.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-5">
            <p className="text-stone-600 leading-relaxed text-base">{about.intro}</p>
            <p className="text-stone-600 leading-relaxed text-base">{about.background}</p>

            <div>
              <p className="text-stone-700 font-medium text-sm mb-2">Key outcomes delivered at Dell Technologies:</p>
              <ul className="space-y-1.5">
                {about.keyOutcomes.map(item => (
                  <li key={item} className="text-stone-600 text-sm leading-relaxed flex gap-2">
                    <span className="text-terracotta shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-stone-600 leading-relaxed text-base">{about.frameworksParagraph}</p>
          </div>

          <div>
            <h3 className="text-stone-500 uppercase text-xs tracking-widest mb-5 font-medium">My Core Focus Areas</h3>
            <div className="flex flex-wrap gap-2 mb-8">
              {about.focusAreas.map(area => (
                <span key={area} className="badge transition-colors cursor-default">
                  {area}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Location', value: 'Bengaluru, India' },
                { label: 'Availability', value: 'Immediate Joiner' },
                { label: 'Target Roles', value: 'Senior Manager / Director' },
                { label: 'Open To', value: 'India & Overseas' },
              ].map(item => (
                <div key={item.label} className="bg-surface border border-terracotta-light shadow-sm shadow-stone-900/5 rounded-lg p-4">
                  <div className="text-xs text-stone-500 uppercase tracking-wider mb-1">{item.label}</div>
                  <div className="text-stone-800 font-medium text-sm">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-stone-200 space-y-4 max-w-3xl">
          <p className="text-stone-600 leading-relaxed text-base">{about.readiness}</p>
          <p className="text-stone-600 leading-relaxed text-base">{about.closingCta}</p>
        </div>
      </div>
    </section>
  )
}
