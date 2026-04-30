import { useCallback, useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { cn } from '@/lib/utils'

const LANG_LABELS: Record<string, string> = {
  text: '目录结构',
  directory: '目录结构',
  plaintext: '目录结构',
  tree: '目录结构',
  bash: 'Shell',
  sh: 'Shell',
  json: 'JSON',
  xml: 'XML',
  plist: 'plist',
}

function labelForLanguage(lang: string): string {
  const key = lang.toLowerCase()
  return LANG_LABELS[key] ?? (lang ? lang : '代码')
}

type Props = {
  language: string
  code: string
}

export function MarkdownProtocolCodeBlock({ language, code }: Props) {
  const [copied, setCopied] = useState(false)

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      // ignore
    }
  }, [code])

  return (
    <div
      className={cn(
        'not-prose my-6 overflow-hidden rounded-xl border border-border/80 shadow-sm',
        'bg-[#0d1117] text-[#e6edf3] dark:border-white/10 dark:bg-[#0a0d12]',
      )}
    >
      <div className="flex items-center justify-between gap-2 border-b border-white/[0.08] px-3 py-2">
        <span className="text-xs font-semibold tracking-wide text-[#8b949e]">{labelForLanguage(language)}</span>
        <button
          type="button"
          onClick={copy}
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-[#8b949e] transition-colors hover:bg-white/[0.06] hover:text-[#e6edf3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-emerald/50"
          aria-label={copied ? '已复制' : '复制代码'}
        >
          {copied ? <Check className="h-4 w-4 text-accent-emerald" strokeWidth={2.25} /> : <Copy className="h-4 w-4" strokeWidth={2.25} />}
        </button>
      </div>
      <pre className="m-0 max-h-[min(70vh,720px)] overflow-auto p-4 text-[13px] leading-[1.65]">
        <code className="font-mono text-[#c9d1d9] [tab-size:2]">{code}</code>
      </pre>
    </div>
  )
}
