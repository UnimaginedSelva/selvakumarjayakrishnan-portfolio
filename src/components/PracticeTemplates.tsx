import { useState } from 'react'
import { ChevronDown, ChevronUp, Trash2, FileText } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { templates } from '../data/templates'
import { getTemplateEntries, saveTemplateEntry, deleteTemplateEntry, type TemplateEntry } from '../utils/templateEntries'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
}

function TemplateCard({ templateId }: { templateId: string }) {
  const navigate = useNavigate()
  const template = templates.find(t => t.id === templateId)!
  const [expanded, setExpanded] = useState(false)
  const [draft, setDraft] = useState<Record<string, string>>({})
  const [entries, setEntries] = useState<TemplateEntry[]>(() => getTemplateEntries(templateId))

  function handleSave() {
    const hasContent = template.fields.some(f => draft[f.key]?.trim())
    if (!hasContent) return
    saveTemplateEntry(templateId, draft)
    setEntries(getTemplateEntries(templateId))
    setDraft({})
  }

  function handleDelete(entryId: string) {
    deleteTemplateEntry(templateId, entryId)
    setEntries(getTemplateEntries(templateId))
  }

  return (
    <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden">
      <div
        role="button"
        tabIndex={0}
        onClick={() => setExpanded(e => !e)}
        onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setExpanded(x => !x)}
        className="w-full flex items-start justify-between gap-4 p-5 text-left cursor-pointer"
      >
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <FileText size={14} className="text-amber-700 shrink-0" />
            <h3 className="font-reading text-stone-900 font-semibold text-base">{template.title}</h3>
            {entries.length > 0 && (
              <span className="text-[11px] text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full font-sans shrink-0">
                {entries.length} saved
              </span>
            )}
          </div>
          <p className="text-stone-500 text-sm leading-relaxed mb-1">{template.description}</p>
          <button
            onClick={e => {
              e.stopPropagation()
              navigate(`/library/${template.sourceBookId}`)
            }}
            className="text-amber-700/70 hover:text-amber-800 text-xs font-sans transition-colors"
          >
            {template.sourceLabel}
          </button>
        </div>
        {expanded ? <ChevronUp size={18} className="text-stone-400 shrink-0 mt-1" /> : <ChevronDown size={18} className="text-stone-400 shrink-0 mt-1" />}
      </div>

      {expanded && (
        <div className="px-5 pb-5 border-t border-stone-100 pt-5">
          <div className="flex flex-col gap-4 mb-4">
            {template.fields.map(field => (
              <div key={field.key}>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-400 mb-1.5 font-sans">
                  {field.label}
                </label>
                <textarea
                  value={draft[field.key] ?? ''}
                  onChange={e => setDraft(d => ({ ...d, [field.key]: e.target.value }))}
                  placeholder={field.placeholder}
                  rows={2}
                  className="w-full border border-stone-200 focus:border-amber-500 outline-none rounded-lg px-3 py-2 text-sm font-sans text-stone-800 resize-y"
                />
              </div>
            ))}
          </div>
          <button
            onClick={handleSave}
            className="bg-amber-700 hover:bg-amber-800 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors font-sans"
          >
            Save Entry
          </button>

          {entries.length > 0 && (
            <div className="mt-6 pt-5 border-t border-stone-100">
              <p className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3 font-sans">Saved Entries</p>
              <div className="flex flex-col gap-3">
                {entries.map(entry => (
                  <div key={entry.id} className="bg-stone-50 border border-stone-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-stone-400 text-xs font-sans">{formatDate(entry.savedAt)}</span>
                      <button onClick={() => handleDelete(entry.id)} className="text-stone-300 hover:text-rose-600 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <div className="flex flex-col gap-2">
                      {template.fields.map(field =>
                        entry.values[field.key] ? (
                          <div key={field.key}>
                            <p className="text-stone-400 text-[11px] font-sans uppercase tracking-wide">{field.label}</p>
                            <p className="text-stone-800 text-sm font-sans whitespace-pre-wrap">{entry.values[field.key]}</p>
                          </div>
                        ) : null
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function PracticeTemplates() {
  return (
    <div className="mt-14">
      <div className="flex items-center gap-2 mb-2">
        <h2 className="font-reading text-stone-900 font-bold text-2xl">Practice Templates</h2>
      </div>
      <p className="text-stone-500 text-sm mb-6 max-w-2xl">
        Recurring techniques from across the library, turned into fillable templates. Entries are saved in your browser.
      </p>
      <div className="grid md:grid-cols-2 gap-4">
        {templates.map(t => (
          <TemplateCard key={t.id} templateId={t.id} />
        ))}
      </div>
    </div>
  )
}
