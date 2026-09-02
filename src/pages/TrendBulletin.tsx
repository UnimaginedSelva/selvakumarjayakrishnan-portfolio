import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ExternalLink, RefreshCw, AlertCircle, Tag } from 'lucide-react'

interface BulletinItem {
  id: number
  headline: string
  summary: string
  source_name: string
  source_url: string
  run_date: string
}

interface BulletinResponse {
  runDate: string | null
  items: BulletinItem[]
}

export default function TrendBulletin() {
  const navigate = useNavigate()
  const [data, setData] = useState<BulletinResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/trend-bulletin')
      .then((res) => {
        if (!res.ok) throw new Error('Unable to load the bulletin right now.')
        return res.json()
      })
      .then((json: BulletinResponse) => setData(json))
      .catch((err) => setError(err instanceof Error ? err.message : 'Unable to load the bulletin right now.'))
      .finally(() => setLoading(false))
  }, [])

  const formattedDate = data?.runDate
    ? new Date(`${data.runDate}T00:00:00Z`).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC',
      })
    : null

  return (
    <div className="min-h-screen bg-[#faf6ec]">
      {/* Navbar-like header, matching the Blog page pattern */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => navigate('/')} className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gold-500 flex items-center justify-center font-bold text-slate-900 text-xs">SJ</div>
            <span className="text-slate-300 text-sm font-medium hidden sm:block">Selvakumar Jayakrishnan</span>
          </button>
          <button onClick={() => navigate('/')} className="flex items-center gap-1.5 text-slate-400 hover:text-gold-400 transition-colors text-sm">
            <ArrowLeft size={14} /> Back to Portfolio
          </button>
        </div>
      </div>

      <div className="pt-20">
        <div className="max-w-3xl mx-auto px-6 py-16">
          <div className="mb-12">
            <h1 className="font-reading text-4xl font-bold text-stone-900 mb-3">Industry Trend Bulletin</h1>
            <div className="w-12 h-0.5 bg-amber-600 mb-5" />
            <p className="text-stone-500 text-lg max-w-2xl">
              AI, digital transformation, and enterprise technology stories, pulled daily from a locked set of
              free-access sources and summarized by a governed AI pipeline. No paywalled sources, no editorializing.
            </p>
            {formattedDate && (
              <p className="text-stone-400 text-sm mt-4 flex items-center gap-1.5">
                <RefreshCw size={12} />
                Last refreshed {formattedDate}
              </p>
            )}
          </div>

          {loading && <div className="text-center text-stone-400 py-16">Loading today's bulletin…</div>}

          {!loading && error && (
            <div className="flex items-center gap-3 bg-white border border-stone-200 rounded-2xl px-5 py-4 text-stone-500 text-sm shadow-sm">
              <AlertCircle size={18} className="text-amber-600 shrink-0" />
              {error}
            </div>
          )}

          {!loading && !error && data && data.items.length === 0 && (
            <div className="text-center py-24 border border-dashed border-stone-300 rounded-2xl">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 border border-amber-200 flex items-center justify-center mx-auto mb-4">
                <Tag size={22} className="text-amber-700" />
              </div>
              <h3 className="text-stone-700 font-semibold text-lg mb-2">No bulletin yet</h3>
              <p className="text-stone-400 text-sm max-w-sm mx-auto">
                Check back after the next daily refresh, 8:00 AM IST.
              </p>
            </div>
          )}

          {!loading && !error && data && data.items.length > 0 && (
            <div className="space-y-4">
              {data.items.map((item) => (
                <a
                  key={item.id}
                  href={item.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white border border-stone-200 hover:border-amber-300 rounded-2xl px-6 py-5 transition-all group shadow-sm hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold text-amber-800 bg-amber-100 border border-amber-200 inline-block px-2.5 py-1 rounded-full mb-3">
                        {item.source_name}
                      </p>
                      <h2 className="font-reading text-stone-900 font-semibold text-xl leading-snug group-hover:text-amber-800 transition-colors mb-2">
                        {item.headline}
                      </h2>
                      <p className="text-stone-500 text-sm leading-relaxed">{item.summary}</p>
                    </div>
                    <ExternalLink size={16} className="text-stone-400 group-hover:text-amber-700 transition-colors shrink-0 mt-1" />
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
