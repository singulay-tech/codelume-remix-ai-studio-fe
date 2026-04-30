import rawMarkdown from '../../docs/codelume-help-content.md?raw'
import { HELP_DOC_KEYS, type HelpDocBundle, type HelpDocKey } from '@/constants/helpDocs'

export type CodelumeHelpContentHelpCategory = {
  title: string
  description: string
}

export type CodelumeHelpContent = {
  helpHub?: {
    listPageTitle?: string
    categories?: Partial<Record<HelpDocKey, CodelumeHelpContentHelpCategory>>
  }
}

function getFirstLineValue(block: string, keys: string[]): string | undefined {
  const escaped = keys.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')
  const match = new RegExp(`(?:^|\\n)(?:${escaped})[：:]\\s*(.+)`, 'm').exec(block)
  return match?.[1]?.trim() || undefined
}

function getHeadingBlock(markdown: string, level: number, title: string): string {
  const hashes = '#'.repeat(level)
  const next = '#'.repeat(Math.max(1, level - 1))
  const pattern = new RegExp(
    `${hashes}\\s+${title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\n([\\s\\S]*?)(?=\\n${next}\\s+|$)`,
    'm',
  )
  return pattern.exec(markdown)?.[1] ?? ''
}

function parseHelpContentMarkdown(markdown: string): CodelumeHelpContent {
  const listTitleBlock = getHeadingBlock(markdown, 2, '帮助中心标题')
  const categoriesBlock = getHeadingBlock(markdown, 2, '分类卡片')

  const categories: Partial<Record<HelpDocKey, CodelumeHelpContentHelpCategory>> = {}

  for (const key of HELP_DOC_KEYS) {
    const categoryBlock = getHeadingBlock(`### ${key}\n${categoriesBlock}`, 3, key)
    const categoryTitle = getFirstLineValue(categoryBlock, ['标题'])
    const categoryDescription = getFirstLineValue(categoryBlock, ['描述'])
    if (categoryTitle || categoryDescription) {
      categories[key] = {
        title: categoryTitle || '',
        description: categoryDescription || '',
      }
    }
  }

  return {
    helpHub: {
      listPageTitle: listTitleBlock.trim().split('\n').find((line) => line.trim())?.trim(),
      categories,
    },
  }
}

export const codelumeHelpContent = parseHelpContentMarkdown(rawMarkdown)

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

/** 帮助中心卡片之外的正文统一走各自文档或 i18n。 */
export function mergeHelpDocBundle(key: HelpDocKey, i18nDoc: HelpDocBundle): HelpDocBundle {
  void key
  return i18nDoc
}
