export const defaultNS = 'common'
export const fallbackLng = 'en'
export const supportedLngs = ['en', 'zh'] as const

export type SupportedLanguage = (typeof supportedLngs)[number]

export const languageNames: Record<SupportedLanguage, string> = {
  en: 'English',
  zh: '中文'
}

export const namespaces = [
  'common',
  'navigation',
  'hero',
  'about',
  'services',
  'portfolio',
  'team',
  'contact',
  'footer',
  'awards',
  'errors'
] as const

export type Namespace = (typeof namespaces)[number]
