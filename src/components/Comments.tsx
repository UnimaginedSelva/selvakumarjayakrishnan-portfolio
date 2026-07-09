import { useEffect, useState, type FormEvent } from 'react'
import { MessageCircle, Loader2 } from 'lucide-react'

interface Comment {
  id: number
  post_id: string
  author_name: string
  comment_text: string
  created_at: string
}

function timeAgo(isoDate: string): string {
  const then = new Date(isoDate.includes('T') ? isoDate : `${isoDate}Z`).getTime()
  const diffMs = Date.now() - then
  const mins = Math.floor(diffMs / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days}d ago`
  return new Date(then).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function Comments({ postId }: { postId: string }) {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState('')
  const [text, setText] = useState('')
  const [website, setWebsite] = useState('') // honeypot
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadComments = () => {
    setLoading(true)
    fetch(`/api/comments?post_id=${encodeURIComponent(postId)}`)
      .then(res => res.json())
      .then(data => setComments(data.comments ?? []))
      .catch(() => setError('Could not load comments right now.'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadComments()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)

    if (name.trim().length < 1) {
      setError('Please enter your name.')
      return
    }
    if (text.trim().length < 3) {
      setError('Comment is too short.')
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ post_id: postId, author_name: name, comment_text: text, website }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Something went wrong. Please try again.')
      }
      const data = await res.json()
      if (data.comment) {
        setComments(prev => [...prev, data.comment])
      }
      setName('')
      setText('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="mt-16 pt-10 border-t border-stone-200">
      <div className="flex items-center gap-2 mb-8">
        <MessageCircle size={18} className="text-amber-700" />
        <h2 className="font-reading text-stone-900 text-xl font-bold">
          {comments.length > 0 ? `${comments.length} Comment${comments.length === 1 ? '' : 's'}` : 'Comments'}
        </h2>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-stone-400 text-sm py-4">
          <Loader2 size={14} className="animate-spin" /> Loading comments...
        </div>
      ) : comments.length === 0 ? (
        <p className="text-stone-400 text-sm mb-8">Be the first to share your thoughts.</p>
      ) : (
        <div className="space-y-6 mb-10">
          {comments.map(c => (
            <div key={c.id} className="flex gap-3">
              <div className="w-9 h-9 rounded-full bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-800 font-semibold text-sm shrink-0">
                {c.author_name.trim().charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="text-stone-900 font-semibold text-sm">{c.author_name}</span>
                  <span className="text-stone-400 text-xs">{timeAgo(c.created_at)}</span>
                </div>
                <p className="text-stone-700 text-sm leading-relaxed mt-1 whitespace-pre-wrap break-words">{c.comment_text}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-stone-50 border border-stone-200 rounded-xl p-5">
        <p className="text-stone-900 font-semibold text-sm mb-3">Leave a comment</p>

        {/* Honeypot field — hidden from real users, catches simple bots */}
        <input
          type="text"
          name="website"
          value={website}
          onChange={e => setWebsite(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          className="absolute -left-[9999px] w-px h-px opacity-0"
          aria-hidden="true"
        />

        <div className="grid sm:grid-cols-2 gap-3 mb-3">
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={e => setName(e.target.value)}
            maxLength={60}
            className="border border-stone-300 rounded-lg px-3 py-2 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-amber-400"
          />
        </div>
        <textarea
          placeholder="Share your thoughts..."
          value={text}
          onChange={e => setText(e.target.value)}
          maxLength={2000}
          rows={3}
          className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm text-stone-800 leading-relaxed resize-y focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-amber-400 mb-3"
        />

        {error && <p className="text-red-600 text-xs mb-3">{error}</p>}

        <div className="flex items-center justify-between">
          <p className="text-stone-400 text-xs">Comments are public and shown immediately.</p>
          <button
            type="submit"
            disabled={submitting}
            className="bg-amber-700 hover:bg-amber-800 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors"
          >
            {submitting ? 'Posting...' : 'Post Comment'}
          </button>
        </div>
      </form>
    </section>
  )
}
