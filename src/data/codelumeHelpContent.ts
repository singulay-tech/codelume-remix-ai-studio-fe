import raw from '../../docs/codelume-help-content.json'
import type { HelpDocBundle, HelpDocKey } from '@/constants/helpDocs'

export type CodelumeHelpContentHelpCategory = {
  title: string
  description: string
}

export type CodelumeHelpContent = {
  readme?: string
  version?: number
  helpHub?: {
    listPageTitle?: string
    categories?: Partial<Record<HelpDocKey, CodelumeHelpContentHelpCategory>>
    docs?: Partial<Record<HelpDocKey, Partial<HelpDocBundle>>>
  }
}

export const codelumeHelpContent = raw as CodelumeHelpContent

export function getHelpHubListTitle(fallback: string): string {
  return codelumeHelpContent.helpHub?.listPageTitle?.trim() || fallback
}

export function getHelpCategoryCard(key: HelpDocKey, fallbackTitle: string, fallbackDescription: string) {
  const c = codelumeHelpContent.helpHub?.categories?.[key]
  return {
    title: c?.title?.trim() || fallbackTitle,
    description: c?.description?.trim() || fallbackDescription,
  }
}

/** 帮助文档 JSON 中 `docs.*` 的字段覆盖 i18n；未提供时沿用翻译。 */
export function mergeHelpDocBundle(key: HelpDocKey, i18nDoc: HelpDocBundle): HelpDocBundle {
  const patch = codelumeHelpContent.helpHub?.docs?.[key]
  if (!patch) return i18nDoc
  return {
    pageTitle: patch.pageTitle?.trim() || i18nDoc.pageTitle,
    sections: patch.sections !== undefined ? patch.sections : i18nDoc.sections,
  }
}
