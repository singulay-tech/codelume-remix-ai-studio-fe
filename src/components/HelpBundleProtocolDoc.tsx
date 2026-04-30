import { Children, isValidElement, type ReactNode } from 'react'
import type { Components } from 'react-markdown'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { MarkdownProtocolCodeBlock } from '@/components/MarkdownProtocolCodeBlock'
import { stripBundleProtocolLeadingH1 } from '@/lib/bundleProtocolMarkdown'
import { markdownHeadingSlug } from '@/lib/markdownHeadingSlug'
import { cn } from '@/lib/utils'

/** Fenced ``` blocks: `pre` wraps a single `code.language-*` child. */
function parseFencedCodeBlock(children: ReactNode): { language: string; code: string } | null {
  const first = Children.toArray(children)[0]
  if (!isValidElement(first) || first.type !== 'code') return null
  const props = first.props as { className?: string; children?: ReactNode }
  const match = /language-([\w-]*)/.exec(props.className ?? '')
  const language = match?.[1] ?? ''
  const code = String(props.children ?? '').replace(/\n$/, '')
  return { language, code }
}

type Props = {
  /** Full markdown including leading # title (stripped before render). */
  markdown: string
  /** Shown above the body when non-empty (e.g. non-zh UI still shows Chinese spec). */
  localeBanner?: string | null
}

const markdownComponents: Components = {
  h2: ({ children, ...props }) => {
    const text = String(children)
    const id = markdownHeadingSlug(text)
    return (
      <h2 id={id} className="scroll-mt-28" {...props}>
        {children}
      </h2>
    )
  },
  a: ({ href, children, ...rest }) => {
    if (href?.startsWith('../') || href?.startsWith('./')) {
      return (
        <span className="text-muted-foreground underline decoration-border" title={href}>
          {children}
        </span>
      )
    }
    return (
      <a href={href} className="text-accent-purple hover:underline" target="_blank" rel="noreferrer" {...rest}>
        {children}
      </a>
    )
  },
  pre: ({ children }) => {
    const parsed = parseFencedCodeBlock(children)
    if (parsed) {
      return <MarkdownProtocolCodeBlock language={parsed.language} code={parsed.code} />
    }
    return (
      <pre className="not-prose my-6 overflow-x-auto rounded-xl border border-border/60 bg-muted/50 p-4 font-mono text-sm text-foreground">
        {children}
      </pre>
    )
  },
  code: ({ className, children, ...rest }) => {
    if (/language-/.test(className ?? '')) {
      return (
        <code className={className} {...rest}>
          {children}
        </code>
      )
    }
    return (
      <code
        className={cn(
          'rounded-md bg-muted/90 px-1.5 py-0.5 font-mono text-[0.875em] font-medium text-foreground',
          'before:content-none after:content-none',
        )}
        {...rest}
      >
        {children}
      </code>
    )
  },
}

export function HelpBundleProtocolDoc({ markdown, localeBanner }: Props) {
  const body = stripBundleProtocolLeadingH1(markdown)

  return (
    <div className="space-y-8">
      {localeBanner ? (
        <p className="rounded-xl border border-border/60 bg-muted/40 px-4 py-3 text-sm text-muted-foreground leading-relaxed">
          {localeBanner}
        </p>
      ) : null}
      <div
        className={[
          'prose prose-neutral max-w-none dark:prose-invert',
          'prose-headings:font-black prose-h2:text-xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:border-b prose-h2:border-border/60 prose-h2:pb-2',
          'prose-p:text-muted-foreground prose-p:leading-relaxed',
          'prose-a:no-underline',
          'prose-code:rounded-md prose-code:bg-muted/90 prose-code:px-1.5 prose-code:py-0.5 prose-code:font-mono prose-code:text-[0.875em] prose-code:font-medium prose-code:text-foreground prose-code:before:content-none prose-code:after:content-none',
          'prose-pre:my-0 prose-pre:bg-transparent prose-pre:p-0 prose-pre:font-mono',
          'prose-table:text-sm prose-th:border prose-th:border-border/60 prose-td:border prose-td:border-border/60',
          'prose-li:text-muted-foreground',
          'prose-img:mx-auto prose-img:my-8 prose-img:block prose-img:max-h-52 prose-img:w-auto prose-img:max-w-full prose-img:rounded-2xl prose-img:border prose-img:border-border/50 prose-img:object-contain prose-img:shadow-sm',
        ].join(' ')}
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
          {body}
        </ReactMarkdown>
      </div>
    </div>
  )
}
