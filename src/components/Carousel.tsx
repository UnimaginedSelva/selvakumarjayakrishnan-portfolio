import { useState, useRef } from 'react'
import { ChevronLeft, ChevronRight, Download } from 'lucide-react'

interface CarouselProps {
  slides: string[]
  downloadUrl: string
  alt: string
}

export default function Carousel({ slides, downloadUrl, alt }: CarouselProps) {
  const [index, setIndex] = useState(0)
  const touchStartX = useRef<number | null>(null)

  const go = (delta: number) => {
    setIndex(i => Math.max(0, Math.min(slides.length - 1, i + delta)))
  }

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const delta = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(delta) > 40) go(delta < 0 ? 1 : -1)
    touchStartX.current = null
  }

  return (
    <figure className="my-8 -mx-2 sm:mx-0">
      <div className="mb-3">
        <p className="text-stone-900 font-semibold text-sm">Swipe through the carousel</p>
        <p className="text-stone-500 text-xs">Bonus content — a visual companion to this article, not a duplicate</p>
      </div>

      <div
        className="relative rounded-xl overflow-hidden border border-stone-300 shadow-md shadow-stone-400/20 bg-stone-100 select-none"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <img
          src={slides[index]}
          alt={`${alt} — slide ${index + 1} of ${slides.length}`}
          loading="lazy"
          className="w-full block"
        />

        {index > 0 && (
          <button
            onClick={() => go(-1)}
            aria-label="Previous slide"
            className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white shadow-md flex items-center justify-center text-stone-700 transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
        )}
        {index < slides.length - 1 && (
          <button
            onClick={() => go(1)}
            aria-label="Next slide"
            className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white shadow-md flex items-center justify-center text-stone-700 transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        )}

        <div className="absolute bottom-2 right-3 text-white/90 text-xs bg-black/30 rounded-full px-2 py-0.5 backdrop-blur-sm">
          {index + 1} / {slides.length}
        </div>
      </div>

      <div className="flex items-center justify-between mt-3">
        <div className="flex gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${i === index ? 'w-5 bg-amber-600' : 'w-1.5 bg-stone-300 hover:bg-stone-400'}`}
            />
          ))}
        </div>
        <a
          href={downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs text-amber-700 hover:text-amber-800 transition-colors shrink-0"
        >
          <Download size={12} /> Download as PDF
        </a>
      </div>
    </figure>
  )
}
