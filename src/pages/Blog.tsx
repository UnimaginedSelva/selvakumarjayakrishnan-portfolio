import { ArrowLeft, ExternalLink, Calendar, Clock, Tag } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { blogPosts, type BlogPost } from '../data/blog'
import { renderMarkdown } from '../utils/markdown'

function PostCard({ post, onClick }: { post: BlogPost; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="card hover:border-gold-500/40 cursor-pointer transition-all group"
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-semibold text-gold-400 bg-gold-500/10 border border-gold-500/20 px-2.5 py-1 rounded-full">
          {post.frameworkTag}
        </span>
      </div>
      <p className="text-slate-600 text-[11px] uppercase tracking-wider mb-1.5">{post.series}</p>
      <h3 className="text-slate-100 font-semibold text-lg leading-snug group-hover:text-gold-400 transition-colors mb-2">
        {post.title}
      </h3>
      <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 mb-4">{post.summary}</p>
      <div className="flex items-center justify-between text-xs text-slate-600">
        <span className="flex items-center gap-1.5">
          <Calendar size={11} />
          {new Date(post.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
        </span>
        <span className="flex items-center gap-3">
          <span className="flex items-center gap-1"><Clock size={11} />{post.readTime}</span>
          <span className="flex items-center gap-1 text-gold-500/60 group-hover:text-gold-400 transition-colors">
            Read article →
          </span>
        </span>
      </div>
    </div>
  )
}

function PostDetail({ post, onBack }: { post: BlogPost; onBack: () => void }) {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-slate-500 hover:text-gold-400 transition-colors text-sm mb-10"
      >
        <ArrowLeft size={14} /> Back to Blog
      </button>
      <p className="text-gold-500/70 text-xs uppercase tracking-widest mb-3">{post.series}</p>
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <span className="text-xs font-semibold text-gold-400 bg-gold-500/10 border border-gold-500/20 px-2.5 py-1 rounded-full">
          {post.frameworkTag}
        </span>
        <span className="text-slate-600 text-xs flex items-center gap-1">
          <Calendar size={11} />
          {new Date(post.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
        </span>
        <span className="text-slate-600 text-xs flex items-center gap-1">
          <Clock size={11} />
          {post.readTime}
        </span>
      </div>
      <h1 className="text-3xl font-bold text-slate-100 leading-tight mb-3">{post.title}</h1>
      <p className="text-slate-400 text-base leading-relaxed mb-10">{post.subtitle}</p>
      <div className="prose prose-invert prose-gold max-w-none text-slate-300 text-base">
        {renderMarkdown(post.content)}
      </div>
      <div className="mt-10 pt-8 border-t border-slate-800 flex items-center justify-between flex-wrap gap-4">
        <div className="flex flex-wrap gap-2">
          {post.tags.map(tag => (
            <span key={tag} className="flex items-center gap-1 text-xs text-slate-500 bg-slate-800 px-2.5 py-1 rounded-full">
              <Tag size={10} /> {tag}
            </span>
          ))}
        </div>
        {post.linkedInUrl && post.linkedInUrl !== '#' && (
          <a
            href={post.linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-gold-400 hover:text-gold-300 transition-colors shrink-0 ml-4"
          >
            <ExternalLink size={13} /> View on LinkedIn
          </a>
        )}
      </div>
    </div>
  )
}

export default function Blog() {
  const navigate = useNavigate()
  const { slug } = useParams()
  const selected = slug ? blogPosts.find(p => p.id === slug) ?? null : null
  const now = new Date()
  const visiblePosts = [...blogPosts]
    .filter(p => new Date(p.date) <= now)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* Navbar-like header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => navigate('/')} className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gold-500 flex items-center justify-center font-bold text-slate-900 text-xs">SJ</div>
            <span className="text-slate-300 text-sm font-medium hidden sm:block">Selvakumar Jayakrishnan</span>
          </button>
          <button onClick={() => navigate('/')} className="flex items-center gap-1.5 text-slate-500 hover:text-gold-400 transition-colors text-sm">
            <ArrowLeft size={14} /> Back to Portfolio
          </button>
        </div>
      </div>

      <div className="pt-20">
        {selected ? (
          <PostDetail post={selected} onBack={() => navigate('/blog')} />
        ) : (
          <div className="max-w-6xl mx-auto px-6 py-16">
            <div className="mb-12">
              <h1 className="text-4xl font-bold text-slate-100 mb-3">Thought Leadership</h1>
              <div className="w-12 h-0.5 bg-gold-500 mb-5" />
              <p className="text-slate-400 text-lg max-w-2xl">
                Real-world application of the 7 practitioner frameworks — how enterprise transformation actually works in practice.
              </p>
            </div>

            {visiblePosts.length === 0 ? (
              <div className="text-center py-24 border border-dashed border-slate-800 rounded-2xl">
                <div className="w-14 h-14 rounded-2xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center mx-auto mb-4">
                  <Tag size={22} className="text-gold-400" />
                </div>
                <h3 className="text-slate-300 font-semibold text-lg mb-2">New articles coming soon</h3>
                <p className="text-slate-600 text-sm max-w-sm mx-auto">
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
