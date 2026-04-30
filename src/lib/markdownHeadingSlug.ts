/** Stable id for TOC anchors from markdown heading text (matches h2 renderer). */
export function markdownHeadingSlug(text: string): string {
  return (
    text
      .trim()
      .toLowerCase()
      .replace(/[^\w\u4e00-\u9fff]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'section'
  )
}
