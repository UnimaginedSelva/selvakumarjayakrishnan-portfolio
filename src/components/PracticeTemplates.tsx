import { useState } from 'react'
import { ChevronDown, ChevronUp, FileText, Download } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { templates, type PracticeTemplate } from '../data/templates'

function slugify(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

async function downloadTemplate(template: PracticeTemplate, values: Record<string, string>) {
  const ExcelJS = (await import('exceljs')).default
  const workbook = new ExcelJS.Workbook()
  const sheet = workbook.addWorksheet(template.title.slice(0, 31))

  sheet.mergeCells('A1:B1')
  sheet.getCell('A1').value = template.title
  sheet.getCell('A1').font = { bold: true, size: 14 }

  sheet.mergeCells('A2:B2')
  sheet.getCell('A2').value = `Source: ${template.sourceLabel}`
  sheet.getCell('A2').font = { italic: true, color: { argb: 'FF78716C' } }

  sheet.mergeCells('A3:B3')
  sheet.getCell('A3').value = `Date: ${new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}`
  sheet.getCell('A3').font = { italic: true, color: { argb: 'FF78716C' } }

  const headerRow = sheet.getRow(5)
  headerRow.values = ['Field', 'Your Response']
  headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' } }
  headerRow.eachCell(cell => {
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFB45309' } }
  })

  template.fields.forEach((field, i) => {
    const row = sheet.getRow(6 + i)
    row.values = [field.label, values[field.key]?.trim() || '']
    row.alignment = { wrapText: true, vertical: 'top' }
    row.height = Math.max(24, Math.ceil((values[field.key]?.length ?? 0) / 60) * 16)
  })

  sheet.getColumn(1).width = 42
  sheet.getColumn(2).width = 70

  const buffer = await workbook.xlsx.writeBuffer()
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${slugify(template.title)}-${new Date().toISOString().slice(0, 10)}.xlsx`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

function TemplateCard({ templateId }: { templateId: string }) {
  const navigate = useNavigate()
  const template = templates.find(t => t.id === templateId)!
  const [expanded, setExpanded] = useState(false)
  const [draft, setDraft] = useState<Record<string, string>>({})
  const [isGenerating, setIsGenerating] = useState(false)

  const hasContent = template.fields.some(f => draft[f.key]?.trim())

  async function handleDownload() {
    if (!hasContent || isGenerating) return
    setIsGenerating(true)
    try {
      await downloadTemplate(template, draft)
    } finally {
      setIsGenerating(false)
    }
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
            onClick={handleDownload}
            disabled={!hasContent || isGenerating}
            className="flex items-center gap-2 bg-amber-700 hover:bg-amber-800 disabled:bg-stone-300 disabled:cursor-not-allowed text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors font-sans"
          >
            <Download size={14} /> {isGenerating ? 'Preparing…' : 'Download as Excel'}
          </button>
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
        Recurring techniques from across the library, turned into fillable templates. Fill one in and download it as an Excel file — nothing is stored on the site.
      </p>
      <div className="grid md:grid-cols-2 gap-4">
        {templates.map(t => (
          <TemplateCard key={t.id} templateId={t.id} />
        ))}
      </div>
    </div>
  )
}
