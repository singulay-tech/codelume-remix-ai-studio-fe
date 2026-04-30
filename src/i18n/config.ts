export const defaultNS = 'common'
export const fallbackLng = 'en'
export const supportedLngs = ['en', 'zh', 'zh-TW', 'ja', 'ko'] as const

/** 临时关闭多语言切换并锁定为简体中文；改回 `true` 可恢复语言按钮与自动检测。 */
export const ENABLE_LANGUAGE_SWITCHER = false

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
  'portfolio',
  'team',
  'contact',
  'aboutUs',
  'workshop',
  'help',
  'footer',
  'awards',
  'errors'
] as const

export type Namespace = (typeof namespaces)[number]
