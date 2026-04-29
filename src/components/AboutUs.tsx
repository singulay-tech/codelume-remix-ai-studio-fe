'use client'

import { useTranslation } from 'react-i18next'

const HIGHLIGHT_KEYS = ['hub', 'formats', 'community', 'rights'] as const

export function AboutUs() {
  const { t } = useTranslation('aboutUs')

  return (
    <section id="about-us" className="relative py-24 bg-background">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <h2 className="mb-3 text-4xl font-black sm:text-5xl">{t('title')}</h2>
        <div className="inline-flex items-center gap-3 mb-8">
          <div className="h-3 w-3 rounded-full bg-accent-emerald animate-pulse" />
          <span className="text-sm font-semibold text-muted-foreground">{t('badge')}</span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {HIGHLIGHT_KEYS.map((key) => (
            <div key={key} className="rounded-2xl border border-border/60 bg-card p-5">
              <div className="text-sm font-semibold text-foreground">{t(`highlights.${key}.title`)}</div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {t(`highlights.${key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
