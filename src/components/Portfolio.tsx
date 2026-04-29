'use client'

import { useTranslation } from 'react-i18next'

export function Portfolio() {
  const { t } = useTranslation('portfolio')

  return (
    <section id="portfolio" className="relative py-24 bg-background">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        {/* 区块标题 */}
        <div className="text-center mb-[30px]">
          <div className="inline-flex items-center gap-3">
            <div className="w-3 h-3 bg-accent-emerald rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-muted-foreground">
              {t('badge')}
            </span>
            <div className="w-3 h-3 bg-accent-blue rounded-full animate-pulse" />
          </div>
        </div>

        {/* 精选展示 */}
        <div className="max-w-6xl mx-auto">
          <div className="relative bg-card clean-border rounded-3xl overflow-hidden elevated-shadow">
            {/* 预览展示 */}
            <div className="relative">
              <div className="aspect-video">
                <video
                  src="https://assets.codelume.cn/codelume-web-preview/Introduce.mov"
                  className="w-full h-full object-cover rounded-t-3xl"
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                />
              </div>

              {/* 浮动状态徽标 */}
              <div className="absolute left-1/2 top-4 w-[calc(100%-2rem)] max-w-xs -translate-x-1/2 sm:top-6">
                <span className="glass-effect block rounded-xl px-3 py-2 text-center text-xs font-medium leading-snug text-white backdrop-blur-md sm:text-sm">
                  {t('latestProject')}
                </span>
              </div>
            </div>

            {/* 项目详情 */}
            <div className="p-8 lg:p-12">
              <div className="flex-1">
                <h3 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                  {t('featured.title')}
                </h3>

                <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 text-sm">
                  <div>
                    <span className="block font-medium text-foreground">{t('featured.details.industry.label')}</span>
                    <span className="text-muted-foreground">{t('featured.details.industry.value')}</span>
                  </div>
                  <div>
                    <span className="block font-medium text-foreground">{t('featured.details.style.label')}</span>
                    <span className="text-muted-foreground">{t('featured.details.style.value')}</span>
                  </div>
                  <div>
                    <span className="block font-medium text-foreground">{t('featured.details.tone.label')}</span>
                    <span className="text-muted-foreground">{t('featured.details.tone.value')}</span>
                  </div>
                  <div>
                    <span className="block font-medium text-foreground">{t('featured.details.format.label')}</span>
                    <span className="text-muted-foreground">{t('featured.details.format.value')}</span>
                  </div>
                  <div>
                    <span className="block font-medium text-foreground">{t('featured.details.settings.label')}</span>
                    <span className="text-muted-foreground">{t('featured.details.settings.value')}</span>
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
