import { useEffect, useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Section {
  id: string
  title: string
  startPage: number
}

interface BookData {
  title: string
  author: string
  edition: string
  totalPages: number
  sections: Section[]
  pages: { number: number; text: string }[]
}

const BOOKMARK_KEY = 'private-reader-german-for-dummies-page'

export default function PrivateReader() {
  const [book, setBook] = useState<BookData | null>(null)
  const [pageIndex, setPageIndex] = useState(0)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch('/private-reading/german-for-dummies.json')
      .then(res => {
        if (!res.ok) throw new Error('not found')
        return res.json()
      })
      .then((data: BookData) => {
        setBook(data)
        const saved = localStorage.getItem(BOOKMARK_KEY)
        const savedIndex = saved ? Number(saved) : 0
        setPageIndex(Number.isFinite(savedIndex) && savedIndex >= 0 && savedIndex < data.pages.length ? savedIndex : 0)
      })
      .catch(() => setError(true))
  }, [])

  useEffect(() => {
    if (book) {
      localStorage.setItem(BOOKMARK_KEY, String(pageIndex))
      window.scrollTo({ top: 0 })
    }
  }, [pageIndex, book])

  const currentSection = useMemo(() => {
    if (!book) return null
    const pageNum = pageIndex + 1
    let section = book.sections[0]
    for (const s of book.sections) {
      if (s.startPage + 1 <= pageNum) section = s
      else break
    }
    return section
  }, [book, pageIndex])

  if (error) {
    return (
      <div className="min-h-screen bg-[#faf6ec] flex items-center justify-center px-6">
        <p className="text-stone-500 font-reading">Could not load this book.</p>
      </div>
    )
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-[#faf6ec] flex items-center justify-center px-6">
        <p className="text-stone-400 font-sans text-sm">Loading…</p>
      </div>
    )
  }

  const page = book.pages[pageIndex]
  const canPrev = pageIndex > 0
  const canNext = pageIndex < book.pages.length - 1

  return (
    <div className="min-h-screen bg-[#faf6ec]">
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-stone-200">
        <div className="max-w-2xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="text-stone-900 font-reading font-semibold text-sm truncate">{book.title}</p>
            <p className="text-stone-400 text-xs truncate">{currentSection?.title}</p>
          </div>
          <select
            value={currentSection?.id}
            onChange={e => {
              const s = book.sections.find(s => s.id === e.target.value)
              if (s) setPageIndex(s.startPage)
            }}
            className="text-xs border border-stone-200 rounded-lg px-2 py-1.5 text-stone-600 bg-white shrink-0 max-w-[40%]"
          >
            {book.sections.map(s => (
              <option key={s.id} value={s.id}>{s.title}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 pt-24 pb-12">
        <div className="font-reading text-stone-800 text-[17px] leading-relaxed whitespace-pre-wrap min-h-[50vh]">
          {page.text || <span className="text-stone-300 italic">(blank page)</span>}
        </div>

        <div className="flex items-center justify-between mt-10 pt-6 border-t border-stone-200">
          <button
            onClick={() => canPrev && setPageIndex(i => i - 1)}
            disabled={!canPrev}
            className="flex items-center gap-1 text-sm text-stone-600 disabled:text-stone-300 disabled:cursor-not-allowed hover:text-amber-800 transition-colors font-sans"
          >
            <ChevronLeft size={16} /> Previous
          </button>
          <span className="text-stone-400 text-xs font-sans tabular-nums">
            Page {page.number} of {book.totalPages}
          </span>
          <button
            onClick={() => canNext && setPageIndex(i => i + 1)}
            disabled={!canNext}
            className="flex items-center gap-1 text-sm text-stone-600 disabled:text-stone-300 disabled:cursor-not-allowed hover:text-amber-800 transition-colors font-sans"
          >
            Next <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
