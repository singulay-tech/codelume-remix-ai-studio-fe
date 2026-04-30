import { markdownHeadingSlug } from '@/lib/markdownHeadingSlug'

export function stripBundleProtocolLeadingH1(md: string): string {
  return md.replace(/^#[^\n]*\n+/, '').trim()
}

/** TOC entries for the help sidebar (same ids as rendered `h2`). */
export function getBundleProtocolNavItems(markdown: string): { id: string; title: string }[] {
  const body = stripBundleProtocolLeadingH1(markdown)
  const lines = [...body.matchAll(/^## (.+)$/gm)]
  return lines.map((m) => {
    const title = m[1].trim()
    return { id: markdownHeadingSlug(title), title }
  })
}
