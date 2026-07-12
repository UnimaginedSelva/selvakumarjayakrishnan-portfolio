export function progressKey(bookId: string) {
  return `library-progress-${bookId}`
}

export function getReadChapters(bookId: string): number[] {
  try {
    const raw = localStorage.getItem(progressKey(bookId))
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function markChapterRead(bookId: string, chapterNumber: number) {
  const current = getReadChapters(bookId)
  if (!current.includes(chapterNumber)) {
    localStorage.setItem(progressKey(bookId), JSON.stringify([...current, chapterNumber]))
  }
}
