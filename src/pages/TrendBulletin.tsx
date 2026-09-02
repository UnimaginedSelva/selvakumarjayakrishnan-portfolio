import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ExternalLink, RefreshCw, AlertCircle } from 'lucide-react'

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
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <div className="border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link to="/" className="text-slate-400 hover:text-gold-400 transition-colors flex items-center gap-1 text-sm">
            <ArrowLeft size={15} />
            Back
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-100 mb-3">
            Industry Trend Bulletin — Updated Daily
          </h1>
          <p className="text-slate-400 text-base max-w-xl mx-auto">
            AI, digital transformation, and enterprise technology stories, pulled daily from a locked set of
            free-access sources and summarized by a governed AI pipeline. No paywalled sources, no editorializing.
          </p>
          {formattedDate && (
            <p className="text-slate-500 text-sm mt-3 flex items-center justify-center gap-1.5">
              <RefreshCw size={12} />
              Last refreshed {formattedDate}
            </p>
          )}
        </div>

        {loading && <div className="text-center text-slate-500 py-16">Loading today's bulletin…</div>}

        {!loading && error && (
          <div className="flex items-center gap-3 bg-slate-800/60 border border-slate-700 rounded-xl px-5 py-4 text-slate-400 text-sm">
            <AlertCircle size={18} className="text-gold-400 shrink-0" />
            {error}
          </div>
        )}

        {!loading && !error && data && data.items.length === 0 && (
          <div className="text-center bg-slate-800/60 border border-slate-700 rounded-xl px-5 py-10 text-slate-400 text-sm">
            No bulletin has been generated yet — check back after the next daily refresh.
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
                className="block bg-slate-800/60 border border-slate-700 hover:border-gold-500/50 rounded-xl px-6 py-5 transition-colors group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold text-gold-400 uppercase tracking-wider mb-2">
                      {item.source_name}
                    </p>
                    <h2 className="text-lg font-semibold text-slate-100 group-hover:text-gold-300 transition-colors mb-1.5">
                      {item.headline}
                    </h2>
                    <p className="text-slate-400 text-sm leading-relaxed">{item.summary}</p>
                  </div>
                  <ExternalLink size={16} className="text-slate-500 group-hover:text-gold-400 transition-colors shrink-0 mt-1" />
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
