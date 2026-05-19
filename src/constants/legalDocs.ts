/** 与后端 policy_documents.content_url 路径一致 */
export const LEGAL_DOC_KEYS = ['terms', 'privacy', 'ugc'] as const

export type LegalDocKey = (typeof LEGAL_DOC_KEYS)[number]

/** 法律正文 Markdown 提供的语言（与 docs/legal/{locale}/ 目录对应） */
export const LEGAL_CONTENT_LOCALES = ['zh', 'en'] as const

export type LegalContentLocale = (typeof LEGAL_CONTENT_LOCALES)[number]

export function isLegalDocKey(value: string): value is LegalDocKey {
  return (LEGAL_DOC_KEYS as readonly string[]).includes(value)
}

/** 根据 i18n 语言选择法律正文 locale：zh* → 中文，其余 → 英文 */
export function resolveLegalContentLocale(lng: string): LegalContentLocale {
  return lng.startsWith('zh') ? 'zh' : 'en'
}

export const LEGAL_DOC_VERSION = '2026.05.18'
