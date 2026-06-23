import { useState, useRef } from 'react'
import { X, Paperclip, ExternalLink, Send } from 'lucide-react'

interface Props {
  onClose: () => void
}

export default function HireMeModal({ onClose }: Props) {
  const [role, setRole] = useState('')
  const [company, setCompany] = useState('')
  const [jd, setJd] = useState('')
  const [url, setUrl] = useState('')
  const [fileName, setFileName] = useState('')
  const [drafted, setDrafted] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    setFileName(e.target.files?.[0]?.name ?? '')
  }

  function handleDraft() {
    const subject = `${role}${company ? ` — ${company}` : ''} | Opportunity for Selvakumar Jayakrishnan`

    const body = [
      'Hi Selva,',
      '',
      `I am reaching out regarding the ${role} position${company ? ` at ${company}` : ''}.`,
      '',
      '--- Role Details ---',
      jd ? `Job Description:\n${jd}` : '',
      url ? `Reference URL: ${url}` : '',
      fileName ? `(I will attach the job description document: ${fileName})` : '',
      '',
      'Please let me know if you are open to a conversation.',
      '',
      'Best regards,',
    ].filter(line => line !== null && !(line === '' && false)).join('\n').replace(/\n{3,}/g, '\n\n')

    const mailtoUrl =
      `mailto:selvakumar.jayakrishnan@hotmail.com` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`

    window.location.href = mailtoUrl
    setDrafted(true)
  }

  const canDraft = role.trim().length > 0

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800">
          <div>
            <h2 className="text-lg font-semibold text-slate-100">Send an Opportunity</h2>
            <p className="text-slate-500 text-xs mt-0.5">Fill in the details — we'll draft the email for you</p>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-300 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <div className="px-6 py-5 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-xs font-medium text-slate-400 mb-1.5">
                Role / Position <span className="text-gold-400">*</span>
              </label>
              <input
                type="text"
                value={role}
                onChange={e => setRole(e.target.value)}
                placeholder="e.g. Senior Change Manager"
                className="w-full bg-slate-800 border border-slate-700 text-slate-100 text-sm rounded-lg px-3 py-2.5 placeholder-slate-600 focus:outline-none focus:border-gold-500 transition-colors"
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Company</label>
              <input
                type="text"
                value={company}
                onChange={e => setCompany(e.target.value)}
                placeholder="e.g. Roche Diagnostics"
                className="w-full bg-slate-800 border border-slate-700 text-slate-100 text-sm rounded-lg px-3 py-2.5 placeholder-slate-600 focus:outline-none focus:border-gold-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Job Description</label>
            <textarea
              value={jd}
              onChange={e => setJd(e.target.value)}
              placeholder="Paste the job description or key requirements here..."
              rows={5}
              className="w-full bg-slate-800 border border-slate-700 text-slate-100 text-sm rounded-lg px-3 py-2.5 placeholder-slate-600 focus:outline-none focus:border-gold-500 transition-colors resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">
              <ExternalLink size={11} className="inline mr-1 text-slate-500" />
              Reference URL
            </label>
            <input
              type="url"
              value={url}
              onChange={e => setUrl(e.target.value)}
              placeholder="https://careers.company.com/role/..."
              className="w-full bg-slate-800 border border-slate-700 text-slate-100 text-sm rounded-lg px-3 py-2.5 placeholder-slate-600 focus:outline-none focus:border-gold-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">
              <Paperclip size={11} className="inline mr-1 text-slate-500" />
              Attach Document <span className="text-slate-600">(optional)</span>
            </label>
            <div
              onClick={() => fileRef.current?.click()}
              className="w-full bg-slate-800 border border-dashed border-slate-700 hover:border-gold-500/50 text-sm rounded-lg px-3 py-3 cursor-pointer transition-colors flex items-center gap-2"
            >
              <Paperclip size={14} className="text-slate-500 shrink-0" />
              <span className={fileName ? 'text-slate-200' : 'text-slate-600'}>
                {fileName || 'Click to select a file (PDF, DOCX)'}
              </span>
            </div>
            <input ref={fileRef} type="file" accept=".pdf,.doc,.docx" onChange={handleFile} className="hidden" />
          </div>

          {/* Reminder after draft */}
          {drafted && fileName && (
            <div className="bg-gold-500/10 border border-gold-500/30 rounded-lg px-4 py-3 text-sm text-gold-300">
              Reminder: Please attach <strong>{fileName}</strong> to your email before sending.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-800 flex items-center justify-between gap-3">
          <p className="text-slate-600 text-xs">Your email client will open with a drafted message.</p>
          <button
            onClick={handleDraft}
            disabled={!canDraft}
            className="flex items-center gap-2 bg-gold-500 hover:bg-gold-400 disabled:bg-slate-700 disabled:text-slate-500 text-slate-900 text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
          >
            <Send size={14} />
            Draft My Email
          </button>
        </div>
      </div>
    </div>
  )
}
