import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { HELP_DOC_KEYS } from '@/constants/helpDocs'

export function HelpPage() {
  const { t } = useTranslation(['help', 'navigation'])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 py-4 flex flex-wrap items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3 gentle-animation hover:opacity-90">
            <img src="/codelume-icon.svg" alt="Codelume" className="h-8 w-8" />
            <span className="font-bagel text-xl tracking-wider">{t('navigation:brand')}</span>
          </Link>
          <div className="flex items-center gap-4">
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

      <main className="container mx-auto px-6 sm:px-8 lg:px-12 py-12 max-w-5xl">
        <h1 className="text-3xl sm:text-4xl font-black mb-10">{t('help:title')}</h1>

        <div className="grid gap-6 md:grid-cols-3">
          {HELP_DOC_KEYS.map((key) => (
            <Link
              key={key}
              to={`/help/${key}`}
              className="block rounded-2xl border border-border/60 bg-card p-6 shadow-sm gentle-animation hover:border-accent-emerald/50 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-emerald/40"
              aria-labelledby={`help-cat-${key}`}
            >
              <h2 id={`help-cat-${key}`} className="text-lg font-black text-foreground">
                {t(`help:categories.${key}.title`)}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {t(`help:categories.${key}.description`)}
              </p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
