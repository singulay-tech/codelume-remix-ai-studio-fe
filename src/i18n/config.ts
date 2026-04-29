export const defaultNS = 'common'
export const fallbackLng = 'en'
export const supportedLngs = ['en', 'zh', 'zh-TW', 'ja', 'ko'] as const

export type SupportedLanguage = (typeof supportedLngs)[number]

export const languageNames: Record<SupportedLanguage, string> = {
  en: 'English',
  zh: '中文（简体）',
  'zh-TW': '中文（繁体）',
  ja: '日本語',
  ko: '한국어'
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
  'aboutUs',
  'workshop',
  'footer',
  'awards',
  'errors'
] as const

export type Namespace = (typeof namespaces)[number]
