import type { ReactNode } from 'react'

const PLAYBOOK_PDFS: Record<string, string> = {
  'TRANSFORM™': 'https://drive.google.com/file/d/1pdYt-XQDsp-rDTiyyQhx3Hn7ptU3EM0H/view?usp=sharing',
  'OPERATE™': 'https://drive.google.com/file/d/1rwh90EfNPQVbOVHws2xw6SAi1H5_OGD6/view?usp=sharing',
  'TRUST™': 'https://drive.google.com/file/d/1dxfkQcHU61GnZaO5AEyyseijK0kXx5Ga/view?usp=sharing',
  'ASCEND™': 'https://drive.google.com/file/d/15YSnoX9jUqrSCgQitT00o9hm0PUTHTx3/view?usp=sharing',
}

function resolveBracketLink(label: string): { href: string; external: boolean } | null {
  if (label === 'Framework Library') return { href: '#/?scroll=frameworks', external: false }

  const match = Object.keys(PLAYBOOK_PDFS).find(name => label.includes(name))
  if (match) return { href: PLAYBOOK_PDFS[match], external: true }

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
      nodes.push(<strong key={`${keyPrefix}-b-${i}`} className="text-stone-900 font-semibold">{parseInline(match[1], `${keyPrefix}-b-${i}`)}</strong>)
    } else if (match[2] !== undefined) {
      nodes.push(<em key={`${keyPrefix}-i-${i}`}>{parseInline(match[2], `${keyPrefix}-i-${i}`)}</em>)
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
            className="text-amber-700 hover:text-amber-800 underline underline-offset-2"
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
        blocks.push(<p key={`p-${key}`} className="mb-6 leading-loose">{parseInline(text, `p-${key}`)}</p>)
        key++
      }
      paragraphBuffer = []
    }
  }

  const flushList = () => {
    if (listBuffer.length) {
      blocks.push(
        <ul key={`ul-${key}`} className="mb-6 pl-5 space-y-2.5 list-disc marker:text-amber-600">
          {listBuffer.map((item, idx) => (
            <li key={`li-${key}-${idx}`} className="leading-relaxed">{parseInline(item, `li-${key}-${idx}`)}</li>
          ))}
        </ul>
      )
      key++
      listBuffer = []
    }
  }

  const imageRegex = /^!\[([^\]]*)\]\(([^)]+)\)$/

  for (const rawLine of lines) {
    const line = rawLine.trim()

    if (line === '') {
      flushParagraph()
      flushList()
      continue
    }

    const imgMatch = line.match(imageRegex)
    if (imgMatch) {
      flushParagraph()
      flushList()
      const [, alt, src] = imgMatch
      blocks.push(
        <figure key={`img-${key}`} className="my-8 -mx-2 sm:mx-0">
          <img
            src={src}
            alt={alt}
            loading="lazy"
            className="w-full rounded-xl border border-stone-300 shadow-md shadow-stone-400/20"
          />
          {alt && <figcaption className="text-center text-stone-500 text-sm mt-2.5 italic">{alt}</figcaption>}
        </figure>
      )
      key++
      continue
    }

    if (line.startsWith('### ')) {
      flushParagraph()
      flushList()
      blocks.push(<h3 key={`h3-${key}`} className="text-xl font-semibold text-stone-900 mt-9 mb-3.5">{parseInline(line.slice(4), `h3-${key}`)}</h3>)
      key++
    } else if (line.startsWith('## ')) {
      flushParagraph()
      flushList()
      blocks.push(<h2 key={`h2-${key}`} className="text-2xl font-bold text-amber-800 mt-11 mb-4.5">{parseInline(line.slice(3), `h2-${key}`)}</h2>)
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
