'use client'

import { useTranslation } from 'react-i18next'
import { CODELUME_MAC_APP_STORE_URL } from '@/constants/externalLinks'

export function WorkshopTeaser() {
  const { t } = useTranslation('workshop')

  return (
    <section id="workshop" className="relative py-24 bg-gradient-to-b from-background via-card/30 to-background">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-[30px]">
          <div className="inline-flex items-center gap-3">
            <div className="w-3 h-3 bg-accent-emerald rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-muted-foreground">{t('badge')}</span>
            <div className="w-3 h-3 bg-accent-blue rounded-full animate-pulse" />
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="relative bg-card clean-border rounded-3xl overflow-hidden elevated-shadow">
            <div className="relative">
              <div className="aspect-video">
                <video
                  src="https://assets.codelume.cn/codelume-web-preview/codelume_studio.mov"
                  className="w-full h-full object-cover rounded-t-3xl"
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                />
              </div>
              <div className="absolute left-1/2 top-4 w-[calc(100%-2rem)] max-w-xs -translate-x-1/2 sm:top-6">
                <span className="glass-effect block rounded-xl px-3 py-2 text-center text-xs font-medium leading-snug text-white backdrop-blur-md sm:text-sm">
                  {t('teaser.versionNote')}
                </span>
              </div>
            </div>

            <div className="p-8 lg:p-12">
              <div className="flex-1">
                <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <h2 className="text-3xl lg:text-4xl font-bold text-foreground">{t('teaser.title')}</h2>
                  <div className="lg:max-w-md lg:text-right">
                    <a
                      href={CODELUME_MAC_APP_STORE_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-full bg-accent-emerald px-6 py-3 text-sm font-semibold text-white hover:bg-accent-emerald/80 gentle-animation"
                    >
                      {t('teaser.cta')}
                    </a>
                  </div>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 text-sm">
                  <div>
                    <span className="block font-medium text-foreground">{t('teaser.details.visual.label')}</span>
                    <span className="text-muted-foreground">{t('teaser.details.visual.value')}</span>
                  </div>
                  <div>
                    <span className="block font-medium text-foreground">{t('teaser.details.nodes.label')}</span>
                    <span className="text-muted-foreground">{t('teaser.details.nodes.value')}</span>
                  </div>
                  <div>
                    <span className="block font-medium text-foreground">{t('teaser.details.animation.label')}</span>
                    <span className="text-muted-foreground">{t('teaser.details.animation.value')}</span>
                  </div>
                  <div>
                    <span className="block font-medium text-foreground">{t('teaser.details.particles.label')}</span>
                    <span className="text-muted-foreground">{t('teaser.details.particles.value')}</span>
                  </div>
                  <div>
                    <span className="block font-medium text-foreground">{t('teaser.details.shader.label')}</span>
                    <span className="text-muted-foreground">{t('teaser.details.shader.value')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
