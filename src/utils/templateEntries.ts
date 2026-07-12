export interface TemplateEntry {
  id: string
  values: Record<string, string>
  savedAt: string
}

function storageKey(templateId: string) {
  return `library-template-${templateId}`
}

export function getTemplateEntries(templateId: string): TemplateEntry[] {
  try {
    const raw = localStorage.getItem(storageKey(templateId))
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveTemplateEntry(templateId: string, values: Record<string, string>) {
  const entries = getTemplateEntries(templateId)
  const entry: TemplateEntry = {
    id: `${Date.now()}`,
    values,
    savedAt: new Date().toISOString(),
  }
  entries.unshift(entry)
  localStorage.setItem(storageKey(templateId), JSON.stringify(entries))
  return entry
}

export function deleteTemplateEntry(templateId: string, entryId: string) {
  const entries = getTemplateEntries(templateId).filter(e => e.id !== entryId)
  localStorage.setItem(storageKey(templateId), JSON.stringify(entries))
}
