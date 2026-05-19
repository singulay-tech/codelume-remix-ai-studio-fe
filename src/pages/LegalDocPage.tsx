import { Link, Navigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { HelpBundleProtocolDoc } from '@/components/HelpBundleProtocolDoc'
import { getBundleProtocolNavItems, getMarkdownH1Title } from '@/lib/bundleProtocolMarkdown'
import { getLegalMarkdown } from '@/lib/legalMarkdown'
import {
  isLegalDocKey,
  LEGAL_DOC_VERSION,
  resolveLegalContentLocale,
  type LegalDocKey,
} from '@/constants/legalDocs'

const RELATED_KEYS: LegalDocKey[] = ['terms', 'privacy', 'ugc']

export function LegalDocPage() {
  const { docKey = '' } = useParams<{ docKey: string }>()
  const { t, i18n } = useTranslation(['legal', 'navigation'])

  if (!isLegalDocKey(docKey)) {
    return <Navigate to="/" replace />
  }

  const contentLocale = resolveLegalContentLocale(i18n.language)
  const markdown = getLegalMarkdown(docKey, contentLocale)
  const navItems = getBundleProtocolNavItems(markdown)
  const pageTitle = getMarkdownH1Title(markdown) ?? docKey
  const localeBanner =
    contentLocale === 'en' ? i18n.getFixedT('en')('legal:localeNote') : null

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 py-4 flex flex-wrap items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3 gentle-animation hover:opacity-90">
            <img src="/codelume-icon.svg" alt={t('legal:logoAlt')} className="h-8 w-8" />
            <span className="font-bagel text-xl tracking-wider">{t('navigation:brand')}</span>
          </Link>
          <div className="flex flex-wrap items-center justify-end gap-3 sm:gap-4">
            <span className="text-xs text-muted-foreground">
              {t('legal:versionLabel')} {LEGAL_DOC_VERSION}
            </span>
            <LanguageSwitcher variant="onSurface" />
            <Link
              to="/"
              className="text-sm font-semibold text-accent-purple hover:text-accent-purple/80 gentle-animation"
            >
              {t('legal:back')}
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 py-10 lg:py-12">
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-14">
          <aside className="lg:w-56 shrink-0 lg:border-r lg:border-border/60 lg:pr-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              {t('legal:docNavToc')}
            </p>
            <nav className="flex flex-row gap-2 overflow-x-auto pb-1 lg:flex-col lg:gap-1 lg:overflow-visible lg:sticky lg:top-28">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="whitespace-nowrap rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground gentle-animation lg:whitespace-normal"
                >
                  {item.title}
                </a>
              ))}
            </nav>
            <div className="mt-8 space-y-2 text-sm">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {t('legal:relatedTitle')}
              </p>
              {RELATED_KEYS.map((key) => (
                <Link
                  key={key}
                  to={`/legal/${key}`}
                  className={
                    key === docKey
                      ? 'block font-semibold text-foreground'
                      : 'block text-muted-foreground hover:text-foreground gentle-animation'
                  }
                >
                  {t(`legal:docTitles.${key}`)}
                </Link>
              ))}
            </div>
          </aside>

          <article className="min-w-0 flex-1 max-w-4xl">
            <h1 className="text-3xl sm:text-4xl font-black mb-10">{pageTitle}</h1>
            <HelpBundleProtocolDoc markdown={markdown} localeBanner={localeBanner} />
          </article>
        </div>
      </div>
    </div>
  )
}