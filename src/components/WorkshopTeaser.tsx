'use client'

import { useTranslation } from 'react-i18next'

export function WorkshopTeaser() {
  const { t } = useTranslation('workshop')

  return (
    <section id="workshop" className="relative py-24 bg-gradient-to-b from-background via-card/30 to-background">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="rounded-3xl border border-border/60 bg-card/80 p-10 shadow-xl">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="w-3 h-3 bg-accent-blue rounded-full animate-pulse" />
                <span className="text-sm font-semibold text-muted-foreground">{t('badge')}</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-black mb-4">{t('teaser.title')}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">{t('teaser.subtitle')}</p>
            </div>

            <div className="flex flex-col gap-4">
              <a
                href="/workshop"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-accent-emerald px-6 py-3 text-sm font-semibold text-white hover:bg-accent-emerald/80 gentle-animation"
              >
                {t('teaser.cta')}
              </a>
              <div className="text-xs text-muted-foreground">{t('teaser.note')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
