'use client'

import { useTranslation } from 'react-i18next'
import { codelumeTimeline } from '@/data/codelumeTimeline'

export function AboutUs() {
  const { t } = useTranslation('aboutUs')

  return (
    <section id="about-us" className="relative py-24 bg-background">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-3 h-3 bg-accent-emerald rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-muted-foreground">{t('badge')}</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black mb-4">{t('title')}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">{t('subtitle')}</p>

            <div className="grid gap-4 sm:grid-cols-2">
              {['sandbox', 'offline', 'multiscreen', 'openSource'].map((key) => (
                <div key={key} className="rounded-2xl border border-border/60 bg-card p-5">
                  <div className="text-sm font-semibold">{t(`highlights.${key}.title`)}</div>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {t(`highlights.${key}.description`)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-border/60 bg-card/80 p-6 shadow-xl">
            <div className="text-sm font-semibold text-muted-foreground mb-4">{t('timeline.title')}</div>
            <div className="space-y-6">
              {codelumeTimeline.map((item) => {
                const data = t(`timeline.items.${item}`, { returnObjects: true }) as {
                  date: string
                  title: string
                  description: string
                }

                return (
                  <div key={item} className="relative pl-6">
                    <div className="absolute left-1 top-1.5 h-full w-px bg-border/70" />
                    <div className="absolute left-0 top-1.5 h-2 w-2 rounded-full bg-accent-purple" />
                    <div className="text-xs uppercase tracking-widest text-muted-foreground">{data.date}</div>
                    <div className="mt-1 text-sm font-semibold text-foreground">{data.title}</div>
                    <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{data.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
