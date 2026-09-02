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
    <section id="contact" className="py-24 px-6 bg-[#faf6ec]">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="section-heading gold-underline pb-2">Let's Connect</h2>
          <p className="section-subheading mt-4">Open to Senior Manager / Director roles across India & Overseas</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <p className="text-stone-600 leading-relaxed">
              If your organization is driving enterprise-scale digital or AI transformation, I would be glad to connect. I bring 19 years of enterprise experience, including 11 years of core Change Management practice, 8 published practitioner frameworks, and an immediate joiner status.
            </p>
            <div className="flex items-center gap-2 text-stone-500 text-sm">
              <MapPin size={14} className="text-terracotta" />
              {contact.location} · {contact.availability}
            </div>
            <a
              href={hero.resumeFile}
              download
              className="inline-flex items-center gap-2 bg-terracotta hover:bg-terracotta-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors mt-4"
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
                className="card group flex items-center gap-5 hover:shadow-md transition-shadow"
              >
                <div className="w-11 h-11 bg-terracotta-light rounded-xl flex items-center justify-center shrink-0">
                  <m.icon size={18} className="text-terracotta" />
                </div>
                <div>
                  <div className="text-stone-500 text-xs uppercase tracking-wider">{m.label}</div>
                  <div className="text-stone-800 font-medium text-sm mt-0.5 group-hover:text-terracotta transition-colors">{m.display}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
