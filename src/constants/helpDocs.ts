export const HELP_DOC_KEYS = ['app', 'studio', 'wallpaperProtocol'] as const

export type HelpDocKey = (typeof HELP_DOC_KEYS)[number]

export function isHelpDocKey(value: string): value is HelpDocKey {
  return (HELP_DOC_KEYS as readonly string[]).includes(value)
}

export type HelpDocBundle = {
  pageTitle: string
  sections: { id: string; title: string; content: string }[]
}
