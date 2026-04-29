'use client'

import { useTranslation } from 'react-i18next'

export function Footer() {
  const { t } = useTranslation('footer')
  const tools = t('tools.items', { returnObjects: true }) as string[]

  return (
    <footer className="relative py-20 bg-foreground text-background">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-12 gap-12">
          {/* 徽标与描述 */}
          <div className="col-span-12 md:col-span-4">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src="/codelume-icon.svg" alt="Codelume" className="h-10 w-10" />
                <div className="font-bagel text-background text-3xl tracking-wider">
                  {t('brand')}
                </div>
              </div>
              <p className="text-background/70 leading-relaxed mb-6">
                {t('description')}
              </p>
              {/* 社交媒体图标 */}
              <div className="flex items-center space-x-6">
                {/* App Store */}
                <a
                  href={t('links.appStore')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-110 gentle-animation cursor-pointer"
                  aria-label={t('labels.appStore')}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M9.2 4.5 5.5 10.9" stroke="#E5E7EB" strokeWidth="1.8" strokeLinecap="round" />
                    <path d="M14.8 4.5 18.5 10.9" stroke="#E5E7EB" strokeWidth="1.8" strokeLinecap="round" />
                    <path d="M7.2 14.2h9.6" stroke="#E5E7EB" strokeWidth="1.8" strokeLinecap="round" />
                    <path d="M10.9 10.9 7.8 16.5" stroke="#E5E7EB" strokeWidth="1.8" strokeLinecap="round" />
                    <path d="M13.1 10.9 16.2 16.5" stroke="#E5E7EB" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </a>

                {/* Douyin */}
                <a
                  href={t('links.douyin')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-110 gentle-animation cursor-pointer"
                  aria-label={t('labels.douyin')}
                  title={t('labels.douyinId')}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M14 3v9.2a3.7 3.7 0 1 1-2.6-3.5" stroke="#E5E7EB" strokeWidth="1.8" strokeLinecap="round" />
                    <path d="M14 6.1c1 .9 2.2 1.4 3.5 1.5" stroke="#E5E7EB" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${t('links.email')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-110 gentle-animation cursor-pointer"
                  aria-label={t('labels.email')}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#E5E7EB" aria-hidden="true">
                    <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 2v.01L12 13l8-6.99V6H4zm0 12h16V8.24l-8 6.99-8-6.99V18z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* 我们使用的工具区 */}
          <div className="col-span-12 md:col-span-8">
            <div>
              <h4 className="font-black text-2xl text-background mb-8">{t('tools.title')}</h4>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {tools.map((tool) => (
                  <div
                    key={tool}
                    className="text-background/80 hover:text-background gentle-animation text-sm font-medium"
                  >
                    {tool}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 底部栏：标语 + 版权 */}
        <div className="border-t border-background/20 pt-8 mt-16">
          <p className="text-center text-sm text-background/70">{t('tagline')}</p>
          <p className="mt-2 text-center text-xs text-background/60">{t('copyright')}</p>
        </div>
      </div>
    </footer>
  )
}
