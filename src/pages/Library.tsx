import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, BookOpen } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { books, getBook, type Book, type BookChapter } from '../data/books'

function progressKey(bookId: string) {
  return `library-progress-${bookId}`
}

function getReadChapters(bookId: string): number[] {
  try {
    const raw = localStorage.getItem(progressKey(bookId))
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function markChapterRead(bookId: string, chapterNumber: number) {
  const current = getReadChapters(bookId)
  if (!current.includes(chapterNumber)) {
    localStorage.setItem(progressKey(bookId), JSON.stringify([...current, chapterNumber]))
  }
}

function LibraryHeader({ inBook }: { inBook: boolean }) {
  const navigate = useNavigate()
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <button onClick={() => navigate('/')} className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gold-500 flex items-center justify-center font-bold text-slate-900 text-xs">SJ</div>
          <span className="text-slate-300 text-sm font-medium hidden sm:block">Selvakumar Jayakrishnan</span>
        </button>
        {inBook ? (
          <button onClick={() => navigate('/library')} className="flex items-center gap-1.5 text-slate-400 hover:text-gold-400 transition-colors text-sm">
            <ArrowLeft size={14} /> Back to Library
          </button>
        ) : (
          <button onClick={() => navigate('/')} className="flex items-center gap-1.5 text-slate-400 hover:text-gold-400 transition-colors text-sm">
            <ArrowLeft size={14} /> Back to Portfolio
          </button>
        )}
      </div>
    </div>
  )
}

function BookCard({ book, onClick }: { book: Book; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="bg-white border border-stone-200 hover:border-amber-300 rounded-2xl p-6 cursor-pointer transition-all group shadow-sm hover:shadow-md flex gap-5"
    >
      <div className="w-20 h-[120px] shrink-0 rounded bg-gradient-to-br from-stone-800 to-stone-900 relative overflow-hidden flex flex-col justify-between p-3">
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-amber-600/80" />
        <span className="text-[8px] uppercase tracking-widest text-stone-400">Reading Library</span>
        <span className="font-reading text-[11px] leading-snug text-stone-100 font-semibold">{book.title}</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-stone-400 text-[11px] uppercase tracking-wider mb-1.5">{book.category}</p>
        <h3 className="font-reading text-stone-900 font-semibold text-lg leading-snug group-hover:text-amber-800 transition-colors mb-1.5">
          {book.title}
        </h3>
        <p className="text-stone-500 text-sm mb-3">{book.author}</p>
        <span className="flex items-center gap-1 text-xs text-amber-700/70 group-hover:text-amber-800 transition-colors">
          {book.chapters.length} chapters, distilled <ArrowRight size={11} />
        </span>
      </div>
    </div>
  )
}

function BookLanding({ book, onOpenChapter }: { book: Book; onOpenChapter: (n: number) => void }) {
  const [read, setRead] = useState<number[]>([])

  useEffect(() => {
    setRead(getReadChapters(book.id))
  }, [book.id])

  const nextChapter = book.chapters.find(c => !read.includes(c.number)) ?? book.chapters[0]

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <p className="text-amber-700/80 text-xs uppercase tracking-widest mb-6 font-sans">Reading Library</p>

      <div className="flex gap-8 mb-10">
        <div className="w-32 h-48 shrink-0 rounded bg-gradient-to-br from-stone-800 to-stone-900 relative overflow-hidden flex flex-col justify-between p-4 shadow-lg">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-amber-600/80" />
          <span className="text-[9px] uppercase tracking-widest text-stone-400">Reading Library</span>
          <span className="font-reading text-base leading-snug text-stone-100 font-semibold">{book.title}</span>
          <span className="text-[10px] text-stone-400">{book.author}</span>
        </div>
        <div className="flex-1 min-w-0 pt-1">
          <p className="text-amber-700/80 text-xs uppercase tracking-widest mb-2 font-sans">{book.category}</p>
          <h1 className="font-reading text-stone-900 text-3xl font-bold leading-tight mb-2">{book.title}</h1>
          <p className="text-stone-500 text-sm mb-5">
            {book.author}{book.editedBy && <> &middot; edited &amp; updated by {book.editedBy}</>}
          </p>
          <div className="flex gap-6 mb-6 flex-wrap">
            <div>
              <span className="block font-reading text-stone-900 font-bold text-lg">{book.chapters.length}</span>
              <span className="text-stone-400 text-[11px] uppercase tracking-wide">Chapters</span>
            </div>
            <div>
              <span className="block font-reading text-stone-900 font-bold text-lg">{read.length} of {book.chapters.length}</span>
              <span className="text-stone-400 text-[11px] uppercase tracking-wide">Read</span>
            </div>
            <div>
              <span className="block font-reading text-stone-900 font-bold text-lg">{book.originalYear}</span>
              <span className="text-stone-400 text-[11px] uppercase tracking-wide">First Published</span>
            </div>
          </div>
          <button
            onClick={() => onOpenChapter(nextChapter.number)}
            className="bg-amber-700 hover:bg-amber-800 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
          >
            {read.length === 0 ? 'Start Reading' : 'Continue Reading'} &rarr;
          </button>
        </div>
      </div>

      <div className="mb-10">
        <p className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3 font-sans">Why This Book, Distilled</p>
        <p className="font-reading text-stone-800 text-[17px] leading-relaxed">{book.whyDistilled}</p>
      </div>

      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2 font-sans">Chapters</p>
        <div>
          {book.chapters.map(ch => {
            const isRead = read.includes(ch.number)
            return (
              <button
                key={ch.number}
                onClick={() => onOpenChapter(ch.number)}
                className="w-full flex items-center gap-4 py-3.5 border-b border-stone-200 last:border-0 text-left group"
              >
                <span className={`text-sm font-sans w-6 shrink-0 ${isRead ? 'text-amber-700' : 'text-stone-400'}`}>
                  {String(ch.number).padStart(2, '0')}
                </span>
                <span className={`flex-1 font-reading text-[15px] group-hover:text-amber-800 transition-colors ${isRead ? 'text-stone-500' : 'text-stone-900'}`}>
                  {ch.title}
                </span>
                <span className={`w-3.5 h-3.5 rounded-full border shrink-0 ${isRead ? 'bg-amber-700 border-amber-700' : 'border-stone-300'}`} />
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function ChapterReader({
  book,
  chapter,
  onBack,
  onNavigate,
}: {
  book: Book
  chapter: BookChapter
  onBack: () => void
  onNavigate: (n: number) => void
}) {
  useEffect(() => {
    markChapterRead(book.id, chapter.number)
    window.scrollTo({ top: 0 })
  }, [book.id, chapter.number])

  const idx = book.chapters.findIndex(c => c.number === chapter.number)
  const prev = idx > 0 ? book.chapters[idx - 1] : null
  const next = idx < book.chapters.length - 1 ? book.chapters[idx + 1] : null

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <button onClick={onBack} className="flex items-center gap-2 text-stone-500 hover:text-amber-800 transition-colors text-sm mb-8">
        <ArrowLeft size={14} /> {book.title}
      </button>

      <div className="flex items-center gap-3 mb-9">
        <div className="flex-1 flex gap-[3px] h-1">
          {book.chapters.map(c => (
            <div
              key={c.number}
              className={`flex-1 rounded-full ${
                c.number < chapter.number ? 'bg-amber-600' : c.number === chapter.number ? 'bg-amber-700' : 'bg-stone-200'
              }`}
            />
          ))}
        </div>
        <span className="text-stone-400 text-xs font-sans whitespace-nowrap">
          Chapter {chapter.number} of {book.chapters.length}
        </span>
      </div>

      <p className="text-amber-700/80 text-xs uppercase tracking-widest mb-3 font-sans font-semibold">
        Chapter {chapter.number}
      </p>
      <h1 className="font-reading text-stone-900 text-[32px] font-bold leading-tight mb-8">{chapter.title}</h1>

      <div className="mb-8">
        <p className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-3 font-sans">Summary</p>
        <div className="font-reading text-stone-800 text-[17px] leading-relaxed space-y-4">
          {chapter.summary.split('\n\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </div>

      <div className="mb-8 bg-amber-50 border-l-[3px] border-amber-700 rounded p-6">
        <p className="text-[11px] font-bold uppercase tracking-wider text-amber-800 mb-2 font-sans">Key Idea</p>
        <p className="font-reading text-stone-900 text-xl leading-snug font-medium">{chapter.keyIdea}</p>
      </div>

      <div className="mb-10 bg-white border border-stone-200 rounded-xl p-6 flex gap-4">
        <div className="w-[22px] h-[22px] rounded-md border-[1.5px] border-amber-700 shrink-0 mt-0.5" />
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-amber-800 mb-1.5 font-sans">Try This This Week</p>
          <p className="text-stone-800 text-[15px] leading-relaxed font-sans">{chapter.actionStep}</p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 pt-6 border-t border-stone-200">
        {prev ? (
          <button onClick={() => onNavigate(prev.number)} className="flex-1 max-w-[48%] text-left border border-stone-200 hover:border-amber-300 rounded-lg px-4 py-3 transition-colors">
            <span className="block text-[11px] uppercase tracking-wide text-stone-400 font-sans mb-0.5">&larr; Previous</span>
            <span className="text-sm font-semibold text-stone-800 font-sans line-clamp-1">{prev.title}</span>
          </button>
        ) : <div className="flex-1 max-w-[48%]" />}
        {next ? (
          <button onClick={() => onNavigate(next.number)} className="flex-1 max-w-[48%] text-right border border-stone-200 hover:border-amber-300 rounded-lg px-4 py-3 transition-colors ml-auto">
            <span className="block text-[11px] uppercase tracking-wide text-stone-400 font-sans mb-0.5">Next &rarr;</span>
            <span className="text-sm font-semibold text-stone-800 font-sans line-clamp-1">{next.title}</span>
          </button>
        ) : (
          <button onClick={onBack} className="flex-1 max-w-[48%] text-right border border-amber-300 bg-amber-50 rounded-lg px-4 py-3 transition-colors ml-auto">
            <span className="block text-[11px] uppercase tracking-wide text-amber-700 font-sans mb-0.5">Finished &rarr;</span>
            <span className="text-sm font-semibold text-stone-800 font-sans">Back to book overview</span>
          </button>
        )}
      </div>
    </div>
  )
}

export default function Library() {
  const navigate = useNavigate()
  const { bookId, chapterNumber } = useParams()

  const book = bookId ? getBook(bookId) : undefined
  const chapter = book && chapterNumber ? book.chapters.find(c => c.number === Number(chapterNumber)) : undefined

  return (
    <div className="min-h-screen bg-[#faf6ec]">
      <LibraryHeader inBook={!!book} />
      <div className="pt-20">
        {book && chapter ? (
          <ChapterReader
            book={book}
            chapter={chapter}
            onBack={() => navigate(`/library/${book.id}`)}
            onNavigate={n => navigate(`/library/${book.id}/${n}`)}
          />
        ) : book ? (
          <BookLanding book={book} onOpenChapter={n => navigate(`/library/${book.id}/${n}`)} />
        ) : (
          <div className="max-w-6xl mx-auto px-6 py-16">
            <div className="mb-12">
              <h1 className="font-reading text-4xl font-bold text-stone-900 mb-3">Reading Library</h1>
              <div className="w-12 h-0.5 bg-amber-600 mb-5" />
              <p className="text-stone-500 text-lg max-w-2xl">
                Self-help and non-fiction classics, distilled chapter by chapter — the core idea and one thing to do, without the density of the original.
              </p>
            </div>
            {books.length === 0 ? (
              <div className="text-center py-24 border border-dashed border-stone-300 rounded-2xl">
                <div className="w-14 h-14 rounded-2xl bg-amber-100 border border-amber-200 flex items-center justify-center mx-auto mb-4">
                  <BookOpen size={22} className="text-amber-700" />
                </div>
                <h3 className="text-stone-700 font-semibold text-lg mb-2">First book coming soon</h3>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {books.map(b => (
                  <BookCard key={b.id} book={b} onClick={() => navigate(`/library/${b.id}`)} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
