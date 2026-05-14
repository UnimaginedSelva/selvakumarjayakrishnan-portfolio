import { Mail, Linkedin, Phone, MapPin } from 'lucide-react'
import { contact, hero } from '../data/content'

const methods = [
  {
    icon: Mail,
    label: 'Email',
    value: contact.email,
    href: `mailto:${contact.email}`,
    display: contact.email,
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/passionateselva',
    href: contact.linkedin,
    display: '/in/passionateselva',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: contact.phone,
    href: `tel:${contact.phone}`,
    display: contact.phone,
  },
]

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 bg-slate-900">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="section-heading gold-underline pb-2">Let's Connect</h2>
          <p className="section-subheading mt-4">Open to Senior Manager / Director roles across India & Overseas</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <p className="text-slate-300 leading-relaxed">
              If your organization is driving enterprise-scale digital or AI transformation, I would be glad to connect. I bring 19 years of proven delivery, two published practitioner frameworks, and an immediate joiner status.
            </p>
            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <MapPin size={14} className="text-gold-400" />
              {contact.location} · {contact.availability}
            </div>
            <a
              href={hero.resumeFile}
              download
              className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-slate-900 font-semibold px-6 py-3 rounded-lg transition-colors mt-4"
            >
              Download Resume
            </a>
          </div>

          <div className="space-y-4">
            {methods.map(m => (
              <a
                key={m.label}
                href={m.href}
                target={m.label === 'LinkedIn' ? '_blank' : undefined}
                rel={m.label === 'LinkedIn' ? 'noopener noreferrer' : undefined}
                className="card group flex items-center gap-5 hover:border-gold-500/40 transition-all"
              >
                <div className="w-11 h-11 bg-gold-500/10 border border-gold-500/20 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-gold-500/20 transition-colors">
                  <m.icon size={18} className="text-gold-400" />
                </div>
                <div>
                  <div className="text-slate-500 text-xs uppercase tracking-wider">{m.label}</div>
                  <div className="text-slate-200 font-medium text-sm mt-0.5 group-hover:text-gold-400 transition-colors">{m.display}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
