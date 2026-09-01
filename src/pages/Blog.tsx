import { ArrowLeft, ExternalLink, Calendar, Clock, Tag, Download } from 'lucide-react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { blogPosts, type BlogPost } from '../data/blog'
import { renderMarkdown } from '../utils/markdown'
import Carousel from '../components/Carousel'
import Comments from '../components/Comments'

function PostCard({ post, onClick }: { post: BlogPost; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="bg-white border border-stone-200 hover:border-amber-300 rounded-2xl p-6 cursor-pointer transition-all group shadow-sm hover:shadow-md"
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-semibold text-amber-800 bg-amber-100 border border-amber-200 px-2.5 py-1 rounded-full">
          {post.frameworkTag}
        </span>
      </div>
      <p className="text-stone-400 text-[11px] uppercase tracking-wider mb-1.5">{post.series}</p>
      <h3 className="font-reading text-stone-900 font-semibold text-xl leading-snug group-hover:text-amber-800 transition-colors mb-2">
        {post.title}
      </h3>
      <p className="text-stone-500 text-sm leading-relaxed line-clamp-3 mb-4">{post.summary}</p>
      <div className="flex items-center justify-between text-xs text-stone-400">
        <span className="flex items-center gap-1.5">
          <Calendar size={11} />
          {new Date(post.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
        </span>
        <span className="flex items-center gap-3">
          <span className="flex items-center gap-1"><Clock size={11} />{post.readTime}</span>
          <span className="flex items-center gap-1 text-amber-700/70 group-hover:text-amber-800 transition-colors">
            Read article →
          </span>
        </span>
      </div>
    </div>
  )
}

function PostDetail({ post }: { post: BlogPost }) {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <p className="text-amber-700/80 text-xs uppercase tracking-widest mb-3 font-sans">{post.series}</p>
      <div className="flex items-center gap-2 mb-5 flex-wrap">
        <span className="text-xs font-semibold text-amber-800 bg-amber-100 border border-amber-200 px-2.5 py-1 rounded-full">
          {post.frameworkTag}
        </span>
        <span className="text-stone-400 text-xs flex items-center gap-1">
          <Calendar size={11} />
          {new Date(post.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
        </span>
        <span className="text-stone-400 text-xs flex items-center gap-1">
          <Clock size={11} />
          {post.readTime}
        </span>
      </div>
      <h1 className="font-reading text-stone-900 text-4xl font-bold leading-tight mb-4">{post.title}</h1>
      {post.subtitle && (
        <p className="font-reading text-stone-600 text-xl leading-relaxed mb-8 italic">{post.subtitle}</p>
      )}
      {post.carouselSlides && post.carouselPdfUrl && (
        <Carousel slides={post.carouselSlides} downloadUrl={post.carouselPdfUrl} alt={post.title} />
      )}
      {!post.carouselSlides && post.carouselUrl && (
        <a
          href={post.carouselUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 bg-amber-50 border border-amber-200 hover:border-amber-300 rounded-xl px-5 py-4 mb-10 transition-colors group"
        >
          <div className="w-9 h-9 rounded-lg bg-amber-100 border border-amber-200 flex items-center justify-center shrink-0">
            <Download size={16} className="text-amber-700" />
          </div>
          <div>
            <p className="text-stone-900 font-semibold text-sm">Download this as a swipeable carousel</p>
            <p className="text-stone-500 text-xs">Bonus content — a visual companion to this article, not a duplicate</p>
          </div>
        </a>
      )}
      <div className="font-reading text-stone-800 text-lg">
        {renderMarkdown(post.content)}
      </div>
      <div className="mt-12 pt-8 border-t border-stone-200 flex items-center justify-between flex-wrap gap-4">
        <div className="flex flex-wrap gap-2">
          {post.tags.map(tag => (
            <span key={tag} className="flex items-center gap-1 text-xs text-stone-500 bg-stone-100 px-2.5 py-1 rounded-full">
              <Tag size={10} /> {tag}
            </span>
          ))}
        </div>
        {post.linkedInUrl && post.linkedInUrl !== '#' && (
          <a
            href={post.linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-amber-700 hover:text-amber-800 transition-colors shrink-0 ml-4"
          >
            <ExternalLink size={13} /> View on LinkedIn
          </a>
        )}
      </div>
      <Comments postId={post.id} />
    </div>
  )
}

export default function Blog() {
  const navigate = useNavigate()
  const { slug } = useParams()
  const [searchParams] = useSearchParams()
  const previewMode = searchParams.get('preview') === 'true'
  const now = new Date()
  // Gate direct-link access the same way the listing is gated below -- a
  // future-dated post's id still exists in blogPosts, so without this check
  // /blog/:slug would render the full article even while it's meant to be
  // hidden pending its publish date. ?preview=true bypasses the date gate
  // for a single direct link (e.g. https://.../blog/some-slug?preview=true)
  // so Selva can proofread a scheduled post before it's publicly visible --
  // it never affects the listing grid, which stays date-gated regardless.
  const selected = slug ? blogPosts.find(p => p.id === slug && (previewMode || new Date(p.date) <= now)) ?? null : null
  const visiblePosts = [...blogPosts]
    .filter(p => new Date(p.date) <= now)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="min-h-screen bg-[#faf6ec]">
      {/* Navbar-like header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => navigate('/')} className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gold-500 flex items-center justify-center font-bold text-slate-900 text-xs">SJ</div>
            <span className="text-slate-300 text-sm font-medium hidden sm:block">Selvakumar Jayakrishnan</span>
          </button>
          {selected ? (
            <button onClick={() => navigate('/blog')} className="flex items-center gap-1.5 text-slate-400 hover:text-gold-400 transition-colors text-sm">
              <ArrowLeft size={14} /> Back to Blog
            </button>
          ) : (
            <button onClick={() => navigate('/')} className="flex items-center gap-1.5 text-slate-400 hover:text-gold-400 transition-colors text-sm">
              <ArrowLeft size={14} /> Back to Portfolio
            </button>
          )}
        </div>
      </div>

      <div className="pt-20">
        {selected ? (
          <PostDetail post={selected} />
        ) : (
          <div className="max-w-6xl mx-auto px-6 py-16">
            <div className="mb-12">
              <h1 className="font-reading text-4xl font-bold text-stone-900 mb-3">Thought Leadership</h1>
              <div className="w-12 h-0.5 bg-amber-600 mb-5" />
              <p className="text-stone-500 text-lg max-w-2xl">
                Making sense of AI and enterprise transformation before the rest of the market catches up. Real-world application of 8 practitioner frameworks, connecting complex trends to the business decisions leaders are facing right now.
              </p>
            </div>

            {visiblePosts.length === 0 ? (
              <div className="text-center py-24 border border-dashed border-stone-300 rounded-2xl">
                <div className="w-14 h-14 rounded-2xl bg-amber-100 border border-amber-200 flex items-center justify-center mx-auto mb-4">
                  <Tag size={22} className="text-amber-700" />
                </div>
                <h3 className="text-stone-700 font-semibold text-lg mb-2">New articles coming soon</h3>
                <p className="text-stone-400 text-sm max-w-sm mx-auto">
                  Real-world framework applications, published as each case study is ready.
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {visiblePosts.map(post => (
                  <PostCard key={post.id} post={post} onClick={() => navigate(`/blog/${post.id}`)} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
