import type { LegalContentLocale, LegalDocKey } from '@/constants/legalDocs'
import termsZh from '../../docs/legal/zh/terms.md?raw'
import privacyZh from '../../docs/legal/zh/privacy.md?raw'
import ugcZh from '../../docs/legal/zh/ugc.md?raw'
import termsEn from '../../docs/legal/en/terms.md?raw'
import privacyEn from '../../docs/legal/en/privacy.md?raw'
import ugcEn from '../../docs/legal/en/ugc.md?raw'

const MARKDOWN_BY_KEY_LOCALE: Record<LegalDocKey, Record<LegalContentLocale, string>> = {
  terms: { zh: termsZh, en: termsEn },
  privacy: { zh: privacyZh, en: privacyEn },
  ugc: { zh: ugcZh, en: ugcEn },
}

export function getLegalMarkdown(docKey: LegalDocKey, locale: LegalContentLocale): string {
  return MARKDOWN_BY_KEY_LOCALE[docKey][locale]
}
