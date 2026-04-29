import { Link, Navigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { isHelpDocKey, type HelpDocBundle } from '@/constants/helpDocs'

export function HelpDocPage() {
  const { docKey = '' } = useParams<{ docKey: string }>()
  const { t } = useTranslation(['help', 'navigation'])

  if (!isHelpDocKey(docKey)) {
    return <Navigate to="/help" replace />
  }

  const doc = t(`help:docs.${docKey}`, { returnObjects: true }) as HelpDocBundle
  const sections = Array.isArray(doc?.sections) ? doc.sections : []

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 py-4 flex flex-wrap items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3 gentle-animation hover:opacity-90">
            <img src="/codelume-icon.svg" alt="Codelume" className="h-8 w-8" />
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
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="whitespace-nowrap rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground gentle-animation lg:whitespace-normal"
                >
                  {section.title}
                </a>
              ))}
            </nav>
          </aside>

          <article className="min-w-0 flex-1 max-w-3xl">
            <h1 className="text-3xl sm:text-4xl font-black mb-10">{doc.pageTitle}</h1>
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
          </article>
        </div>
      </div>
    </div>
  )
}
