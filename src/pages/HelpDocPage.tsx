import { Link, Navigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { HelpBundleProtocolDoc } from '@/components/HelpBundleProtocolDoc'
import { getBundleProtocolNavItems, getMarkdownH1Title } from '@/lib/bundleProtocolMarkdown'
import { isHelpDocKey, type HelpDocBundle } from '@/constants/helpDocs'
import { mergeHelpDocBundle } from '@/data/codelumeHelpContent'
import bundleProtocolMarkdown from '../../docs/codelume-bundle-protocol.md?raw'
import codelumeMarkdown from '../../docs/codelume.md?raw'

const BUNDLE_PROTOCOL_DOC_KEY = 'wallpaperProtocol' as const
const CODELUME_DOC_KEY = 'app' as const

export function HelpDocPage() {
  const { docKey = '' } = useParams<{ docKey: string }>()
  const { t, i18n } = useTranslation(['help', 'navigation'])

  if (!isHelpDocKey(docKey)) {
    return <Navigate to="/help" replace />
  }

  const docI18n = t(`help:docs.${docKey}`, { returnObjects: true }) as HelpDocBundle
  const doc = mergeHelpDocBundle(docKey, docI18n)
  const sections = Array.isArray(doc?.sections) ? doc.sections : []

  const isBundleProtocol = docKey === BUNDLE_PROTOCOL_DOC_KEY
  const isCodelumeDoc = docKey === CODELUME_DOC_KEY
  const protocolNav = isBundleProtocol ? getBundleProtocolNavItems(bundleProtocolMarkdown) : []
  const codelumeNav = isCodelumeDoc ? getBundleProtocolNavItems(codelumeMarkdown) : []
  const navItems = isBundleProtocol
    ? protocolNav
    : isCodelumeDoc
      ? codelumeNav
      : sections.map((s) => ({ id: s.id, title: s.title }))

  const localeBanner =
    isBundleProtocol && !i18n.language.startsWith('zh') ? t('help:protocolLocaleNote') : null
  const codelumeTitle = isCodelumeDoc ? getMarkdownH1Title(codelumeMarkdown) : null
  const pageTitle = codelumeTitle || doc.pageTitle

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 py-4 flex flex-wrap items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3 gentle-animation hover:opacity-90">
            <img src="/codelume-icon.svg" alt={t('help:logoAlt')} className="h-8 w-8" />
            <span className="font-bagel text-xl tracking-wider">{t('navigation:brand')}</span>
          </Link>
          <div className="flex flex-wrap items-center justify-end gap-3 sm:gap-4">
            <Link
              to="/help"
              className="text-sm font-semibold text-foreground/80 hover:text-foreground gentle-animation"
            >
              {t('help:docBack')}
            </Link>
            <LanguageSwitcher variant="onSurface" />
            <Link
              to="/"
              className="text-sm font-semibold text-accent-purple hover:text-accent-purple/80 gentle-animation"
            >
              {t('help:back')}
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 py-10 lg:py-12">
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-14">
          <aside className="lg:w-56 shrink-0 lg:border-r lg:border-border/60 lg:pr-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              {t('help:docNavToc')}
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
          </aside>

          <article className="min-w-0 flex-1 max-w-4xl">
            <h1 className="text-3xl sm:text-4xl font-black mb-10">{pageTitle}</h1>
            {isBundleProtocol ? (
              <HelpBundleProtocolDoc markdown={bundleProtocolMarkdown} localeBanner={localeBanner} />
            ) : isCodelumeDoc ? (
              <HelpBundleProtocolDoc markdown={codelumeMarkdown} />
            ) : (
              <div className="space-y-14">
                {sections.map((section) => (
                  <section key={section.id} id={section.id} className="scroll-mt-28">
                    <h2 className="text-xl font-black text-foreground border-b border-border/60 pb-2 mb-4">
                      {section.title}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">{section.content}</p>
                  </section>
                ))}
              </div>
            )}
          </article>
        </div>
      </div>
    </div>
  )
}
