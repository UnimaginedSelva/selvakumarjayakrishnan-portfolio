import type { ReactNode } from 'react'
import { frameworks } from '../data/content'

function resolveBracketLink(label: string): { href: string; external: boolean } | null {
  if (label === 'Framework Library') return { href: '#/?scroll=frameworks', external: false }

  const match = frameworks.find(fw => label.includes(fw.name.replace(' Framework™', '™')))
  if (match) return { href: match.url, external: true }

  return null
}

function parseInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = []
  const regex = /\*\*(.+?)\*\*|\*(.+?)\*|\[([^\]]+)\]/g
  let lastIndex = 0
  let match: RegExpExecArray | null
  let i = 0

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index))

    if (match[1] !== undefined) {
      nodes.push(<strong key={`${keyPrefix}-b-${i}`} className="text-slate-100 font-semibold">{match[1]}</strong>)
    } else if (match[2] !== undefined) {
      nodes.push(<em key={`${keyPrefix}-i-${i}`}>{match[2]}</em>)
    } else if (match[3] !== undefined) {
      const label = match[3]
      const link = resolveBracketLink(label)
      if (link) {
        nodes.push(
          <a
            key={`${keyPrefix}-l-${i}`}
            href={link.href}
            target={link.external ? '_blank' : undefined}
            rel={link.external ? 'noopener noreferrer' : undefined}
            className="text-gold-400 hover:text-gold-300 underline underline-offset-2"
          >
            {label}
          </a>
        )
      } else {
        nodes.push(`[${label}]`)
      }
    }
    lastIndex = regex.lastIndex
    i++
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex))
  return nodes
}

export function renderMarkdown(content: string): ReactNode {
  const lines = content.split('\n')
  const blocks: ReactNode[] = []
  let paragraphBuffer: string[] = []
  let listBuffer: string[] = []
  let key = 0

  const flushParagraph = () => {
    if (paragraphBuffer.length) {
      const text = paragraphBuffer.join(' ').trim()
      if (text) {
        blocks.push(<p key={`p-${key}`} className="mb-5 leading-relaxed">{parseInline(text, `p-${key}`)}</p>)
        key++
      }
      paragraphBuffer = []
    }
  }

  const flushList = () => {
    if (listBuffer.length) {
      blocks.push(
        <ul key={`ul-${key}`} className="mb-5 pl-5 space-y-2 list-disc marker:text-gold-500">
          {listBuffer.map((item, idx) => (
            <li key={`li-${key}-${idx}`}>{parseInline(item, `li-${key}-${idx}`)}</li>
          ))}
        </ul>
      )
      key++
      listBuffer = []
    }
  }

  for (const rawLine of lines) {
    const line = rawLine.trim()

    if (line === '') {
      flushParagraph()
      flushList()
      continue
    }
    if (line.startsWith('### ')) {
      flushParagraph()
      flushList()
      blocks.push(<h3 key={`h3-${key}`} className="text-lg font-semibold text-slate-100 mt-8 mb-3">{parseInline(line.slice(4), `h3-${key}`)}</h3>)
      key++
    } else if (line.startsWith('## ')) {
      flushParagraph()
      flushList()
      blocks.push(<h2 key={`h2-${key}`} className="text-xl font-bold text-gold-400 mt-10 mb-4">{parseInline(line.slice(3), `h2-${key}`)}</h2>)
      key++
    } else if (line.startsWith('# ')) {
      continue
    } else if (line.startsWith('- ')) {
      flushParagraph()
      listBuffer.push(line.slice(2))
    } else {
      flushList()
      paragraphBuffer.push(line)
    }
  }
  flushParagraph()
  flushList()

  return <>{blocks}</>
}
