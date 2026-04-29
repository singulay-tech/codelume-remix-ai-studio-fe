'use client'

import { useTranslation } from 'react-i18next'
import previewGif from '@/assets/codelume-preview.gif'

export function Portfolio() {
  const { t } = useTranslation('portfolio')

  return (
    <section id="portfolio" className="relative py-32 bg-background">
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
                <img
                  src={previewGif}
                  alt={t('featured.title')}
                  className="w-full h-full object-cover rounded-t-3xl"
                />
              </div>

              {/* 浮动状态徽标 */}
              <div className="absolute top-4 right-4 max-w-[min(calc(100%-2rem),14rem)] sm:max-w-xs sm:top-6 sm:right-6">
                <span className="glass-effect block rounded-xl px-3 py-2 text-right text-xs font-medium leading-snug text-white backdrop-blur-md sm:text-sm">
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

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground block">{t('featured.details.industry.label')}</span>
                    <span className="font-medium">{t('featured.details.industry.value')}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block">{t('featured.details.style.label')}</span>
                    <span className="font-medium">{t('featured.details.style.value')}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block">{t('featured.details.tone.label')}</span>
                    <span className="font-medium">{t('featured.details.tone.value')}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block">{t('featured.details.format.label')}</span>
                    <span className="font-medium">{t('featured.details.format.value')}</span>
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
