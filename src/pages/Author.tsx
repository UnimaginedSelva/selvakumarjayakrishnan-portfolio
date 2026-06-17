import { Link } from 'react-router-dom'
import { ArrowLeft, BookOpen, Star } from 'lucide-react'

function getAmazonUrl(): { kindle: string; paperback: string } {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone ?? ''
  const lang = navigator.language ?? ''

  const isIndia = tz.startsWith('Asia/Kolkata') || tz.startsWith('Asia/Calcutta') || lang.startsWith('en-IN')
  const isUK =
    tz.startsWith('Europe/London') ||
    tz.startsWith('Europe/Belfast') ||
    lang.startsWith('en-GB')

  const KINDLE_ASIN = 'B0H4VM3DKK'
  const PAPERBACK_ASIN = 'B0H567LT1X'

  if (isIndia) {
    return {
      kindle: `https://www.amazon.in/dp/${KINDLE_ASIN}`,
      paperback: `https://www.amazon.in/dp/${PAPERBACK_ASIN}`,
    }
  }
  if (isUK) {
    return {
      kindle: `https://www.amazon.co.uk/dp/${KINDLE_ASIN}`,
      paperback: `https://www.amazon.co.uk/dp/${PAPERBACK_ASIN}`,
    }
  }
  return {
    kindle: `https://www.amazon.com/dp/${KINDLE_ASIN}`,
    paperback: `https://www.amazon.com/dp/${PAPERBACK_ASIN}`,
  }
}

export default function Author() {
  const amazon = getAmazonUrl()

  return (
    <div className="min-h-screen bg-[#080c12] text-slate-100">

      {/* Nav */}
      <div className="border-b border-slate-800/60 bg-[#080c12]/90 backdrop-blur sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link to="/" className="text-slate-400 hover:text-[#7eb8d4] transition-colors flex items-center gap-1 text-sm">
            <ArrowLeft size={15} />
            Back to Portfolio
          </Link>
          <span className="text-slate-700">|</span>
          <span className="text-slate-400 text-sm">Selva JN — Author</span>
        </div>
      </div>

      {/* Hero — book cover + title */}
      <section className="relative overflow-hidden">
        {/* Deep space ambient glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/80 via-[#080c12] to-[#080c12] pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#1a3a5c]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-6 pt-20 pb-16">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12">

            {/* Book cover */}
            <div className="shrink-0 relative group">
              <div className="absolute -inset-1 bg-gradient-to-b from-[#7eb8d4]/20 to-transparent rounded-lg blur-sm group-hover:from-[#7eb8d4]/30 transition-all duration-500" />
              <img
                src="/book-cover.jpg"
                alt="Murders on Mars Express — Book Cover"
                className="relative w-56 lg:w-64 rounded-lg shadow-2xl shadow-black/80 ring-1 ring-slate-700/50"
              />
            </div>

            {/* Title block */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-[#7eb8d4]/10 border border-[#7eb8d4]/25 text-[#7eb8d4] text-xs px-4 py-1.5 rounded-full mb-6 font-medium tracking-widest uppercase">
                Debut Novel · Now on Amazon
              </div>

              <h1
                className="text-5xl lg:text-6xl font-black text-white mb-3 leading-tight tracking-tight"
                style={{ fontFamily: "'Bebas Neue', 'Impact', 'Arial Black', sans-serif", letterSpacing: '0.03em' }}
              >
                MURDERS ON<br />MARS EXPRESS
              </h1>

              <p className="text-[#7eb8d4] text-lg font-light tracking-[0.2em] uppercase mb-6">
                A Sci-Fi Mystery Thriller
              </p>

              <p className="text-slate-300 text-base lg:text-lg leading-relaxed max-w-xl mb-2 italic">
                "A detective named Quinn. A sealed ship. Sixty days. And a killer who has already decided who comes home."
              </p>

              <p className="text-slate-600 text-sm mb-8">by Selva JN</p>

              {/* Buy buttons */}
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                <a
                  href={amazon.kindle}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#7eb8d4] hover:bg-[#9dcae0] text-[#080c12] font-bold px-6 py-3 rounded-lg text-sm transition-colors shadow-lg shadow-[#7eb8d4]/20"
                >
                  <BookOpen size={15} />
                  Kindle Edition
                </a>
                <a
                  href={amazon.paperback}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-slate-600 hover:border-[#7eb8d4]/60 hover:text-[#7eb8d4] text-slate-300 font-medium px-6 py-3 rounded-lg text-sm transition-colors"
                >
                  Paperback
                </a>
                <a
                  href="https://www.goodreads.com/author/show/70724498.Selva_JN"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-slate-700 hover:border-[#7eb8d4]/40 text-slate-500 hover:text-[#7eb8d4] px-6 py-3 rounded-lg text-sm transition-colors"
                >
                  <Star size={13} />
                  Goodreads
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />
      </div>

      {/* About the book */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-6">About the Book</p>
        <div className="max-w-3xl space-y-4 text-slate-300 text-base leading-relaxed">
          <p>
            The year is 2100. Interplanetary travel is routine — the Mars Express Corporation moves thousands of passengers between worlds on sealed, self-contained vessels. When passengers begin dying across multiple voyages, each death ruled natural causes, nobody is looking for a pattern.
          </p>
          <p>
            Nobody except Quinn. He has no badge. No jurisdiction. What he has is eleven years of reading financial records that don't tell the truth — and a list of ten names that changes everything.
          </p>
          <p>
            A locked-room mystery at interplanetary scale. <em>Murders on Mars Express</em> fuses classic mystery mechanics with the isolation and paranoia of science fiction.
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />
      </div>

      {/* About the author */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-8">About the Author</p>
        <div className="flex flex-col sm:flex-row gap-8 items-start">
          <img
            src="/author-photo.jpg"
            alt="Selva JN"
            className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover object-top ring-2 ring-slate-700 shrink-0"
          />
          <div className="space-y-4 text-slate-300 text-base leading-relaxed">
            <p>
              <strong className="text-slate-100">Selva JN</strong> is an author of science fiction and mystery, drawn to stories set at the intersection of human nature and the future.
            </p>
            <p>
              His debut novel, <em>Murders on Mars Express</em>, is set in 2100 aboard a sealed interplanetary transit system, where a detective named Quinn investigates a string of deaths that nobody else believes are connected. Quinn has no jurisdiction, no authority, and no reason to care — except that he has spent a lifetime reading the gap between what people perform and what they actually feel.
            </p>
            <p>
              Selva lives in India and is currently building the Quinn universe across multiple novels.
            </p>
            <div className="flex gap-4 pt-2">
              <a
                href="https://www.goodreads.com/author/show/70724498.Selva_JN"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#7eb8d4] hover:underline"
              >
                Goodreads Profile →
              </a>
              <a
                href="https://www.linkedin.com/in/passionateselva"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-slate-500 hover:text-[#7eb8d4] transition-colors"
              >
                LinkedIn →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />
      </div>

      {/* More Quinn stories teaser */}
      <section className="max-w-5xl mx-auto px-6 py-16 text-center">
        <div className="inline-block">
          <p
            className="text-2xl text-slate-500 font-light tracking-[0.15em] uppercase mb-3"
            style={{ fontFamily: "'Bebas Neue', 'Impact', 'Arial Black', sans-serif" }}
          >
            More Quinn Stories Coming
          </p>
          <div className="h-px bg-gradient-to-r from-transparent via-[#7eb8d4]/30 to-transparent" />
          <p className="text-slate-600 text-sm mt-3 tracking-wide">The universe does not end at Mars.</p>
        </div>
      </section>

      {/* Footer */}
      <div className="border-t border-slate-800/60 mt-4">
        <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <p>© 2026 Selvakumar Jayakrishnan. All rights reserved.</p>
          <Link to="/" className="hover:text-[#7eb8d4] transition-colors">
            selvakumarjayakrishnan.com
          </Link>
        </div>
      </div>

    </div>
  )
}
