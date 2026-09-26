import { useState } from 'react'
import { Briefcase, Award, ChevronDown } from 'lucide-react'
import { experience } from '../data/content'

type Media = { image: string; caption: string }

type Role = {
  role: string
  level?: string
  period: string
  location: string
  duration: string
  award?: string
  highlights: string[]
  media?: Media | Media[]
}

function AwardBadges({ award }: { award?: string }) {
  if (!award) return null
  return (
    <>
      {award.split('|').map(a => a.trim()).filter(Boolean).map(a => (
        <span key={a} className="badge flex items-center gap-1">
          <Award size={10} />
          {a}
        </span>
      ))}
    </>
  )
}

function MediaBlock({ media }: { media?: Media | Media[] }) {
  if (!media) return null
  const mediaList = Array.isArray(media) ? media : [media]
  return (
    <div className={`mt-4 pt-4 border-t border-stone-100 grid gap-3 ${mediaList.length > 1 ? 'sm:grid-cols-2 lg:grid-cols-3' : ''}`}>
      {mediaList.map((m, k) => (
        <a
          key={k}
          href={m.image}
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-lg overflow-hidden border border-stone-200 hover:border-terracotta transition-colors"
        >
          <img src={m.image} alt={m.caption} className="w-full h-auto" loading="lazy" />
          <div className="px-3 py-2 bg-white">
            <span className="text-xs text-stone-500">{m.caption}</span>
          </div>
        </a>
      ))}
    </div>
  )
}

function RoleHeader({ item }: { item: Role & { company?: string } }) {
  return (
    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
      <div>
        <h3 className="text-lg font-bold text-stone-900">{item.role}</h3>
        {item.level && (
          <span className="text-xs text-stone-500 italic">{item.level}</span>
        )}
        <div className="flex items-center gap-2 mt-1">
          {item.company && (
            <>
              <span className="text-terracotta font-semibold text-sm">{item.company}</span>
              <span className="text-stone-400">·</span>
            </>
          )}
          <span className="text-stone-500 text-sm">{item.location}</span>
        </div>
      </div>
      <div className="flex flex-col items-start md:items-end gap-1 shrink-0">
        <span className="text-stone-500 text-sm">{item.period}</span>
        <span className="text-stone-400 text-xs">{item.duration}</span>
        <AwardBadges award={item.award} />
      </div>
    </div>
  )
}

function ExpandToggle({ isOpen, onClick, openLabel, closedLabel }: { isOpen: boolean; onClick: () => void; openLabel: string; closedLabel: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-1.5 text-xs font-semibold text-terracotta hover:text-terracotta-dark transition-colors mt-3"
    >
      <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      {isOpen ? openLabel : closedLabel}
    </button>
  )
}

export default function Experience() {
  const [expanded, setExpanded] = useState<Set<string>>(new Set())

  const toggle = (key: string) => {
    setExpanded(prev => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  return (
    <section id="experience" className="py-10 px-6 bg-[#faf6ec]">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h2 className="section-heading gold-underline pb-2">Professional Journey</h2>
          <p className="section-subheading mt-4">19 years across Dell Technologies & eClerx</p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-terracotta via-stone-300 to-transparent" />

          <div className="space-y-8">
            {experience.map((item, i) => {
              const groupKey = `group-${i}`

              if ('roles' in item && item.roles) {
                const isOpen = expanded.has(groupKey)
                const roleCount = item.roles.length
                return (
                  <div key={groupKey} className="relative pl-12 md:pl-20">
                    <div className="absolute left-0 md:left-4 top-1 w-8 h-8 bg-surface shadow-sm shadow-stone-900/5 border-2 border-terracotta rounded-full flex items-center justify-center">
                      <Briefcase size={14} className="text-terracotta" />
                    </div>

                    <div className="card hover:shadow-md transition-shadow">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                        <div>
                          <h3 className="text-lg font-bold text-stone-900">{item.company}</h3>
                          <span className="text-xs text-stone-500 italic">{roleCount} roles</span>
                        </div>
                        <div className="flex flex-col items-start md:items-end gap-1 shrink-0">
                          <span className="text-stone-500 text-sm">{item.period}</span>
                          <span className="text-stone-400 text-xs">{item.duration}</span>
                        </div>
                      </div>

                      <ExpandToggle
                        isOpen={isOpen}
                        onClick={() => toggle(groupKey)}
                        openLabel="Collapse"
                        closedLabel={`Expand to see all ${roleCount} roles`}
                      />

                      {isOpen && (
                        <div className="mt-4 pt-4 border-t border-stone-100 space-y-8">
                          {item.roles.map((role, j) => (
                            <div key={j} className={j > 0 ? 'pt-8 border-t border-stone-100' : ''}>
                              <RoleHeader item={role} />
                              <ul className="space-y-2 mt-4">
                                {role.highlights.map((h, k) => (
                                  <li key={k} className="flex gap-3 text-stone-600 text-sm leading-relaxed">
                                    <span className="w-1.5 h-1.5 rounded-full bg-terracotta shrink-0 mt-2" />
                                    <span>{h}</span>
                                  </li>
                                ))}
                              </ul>
                              <MediaBlock media={role.media} />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )
              }

              const itemKey = `single-${i}`
              const isOpen = expanded.has(itemKey)
              return (
                <div key={itemKey} className="relative pl-12 md:pl-20">
                  <div className="absolute left-0 md:left-4 top-1 w-8 h-8 bg-surface shadow-sm shadow-stone-900/5 border-2 border-terracotta rounded-full flex items-center justify-center">
                    <Briefcase size={14} className="text-terracotta" />
                  </div>

                  <div className="card hover:shadow-md transition-shadow">
                    <RoleHeader item={item} />

                    <ExpandToggle
                      isOpen={isOpen}
                      onClick={() => toggle(itemKey)}
                      openLabel="Collapse"
                      closedLabel="Expand to know more"
                    />

                    {isOpen && (
                      <div className="mt-4 pt-4 border-t border-stone-100">
                        <ul className="space-y-2">
                          {item.highlights.map((h, j) => (
                            <li key={j} className="flex gap-3 text-stone-600 text-sm leading-relaxed">
                              <span className="w-1.5 h-1.5 rounded-full bg-terracotta shrink-0 mt-2" />
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                        <MediaBlock media={item.media} />
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
