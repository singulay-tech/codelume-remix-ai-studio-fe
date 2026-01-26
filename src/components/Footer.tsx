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
                {/* GitHub */}
                <a
                  href={t('links.github')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-110 gentle-animation cursor-pointer"
                  aria-label={t('labels.github')}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#E5E7EB" aria-hidden="true">
                    <path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.1.82-.26.82-.58v-2.1c-3.34.72-4.04-1.4-4.04-1.4-.55-1.4-1.35-1.78-1.35-1.78-1.1-.76.08-.75.08-.75 1.22.09 1.86 1.25 1.86 1.25 1.08 1.86 2.84 1.32 3.54 1.01.11-.79.42-1.32.77-1.62-2.66-.3-5.46-1.33-5.46-5.93 0-1.31.47-2.39 1.24-3.24-.12-.31-.54-1.56.12-3.25 0 0 1.01-.32 3.3 1.24a11.4 11.4 0 0 1 6 0c2.29-1.56 3.3-1.24 3.3-1.24.66 1.69.24 2.94.12 3.25.77.85 1.24 1.93 1.24 3.24 0 4.61-2.8 5.62-5.47 5.92.43.38.81 1.12.81 2.26v3.35c0 .32.22.68.83.58A12 12 0 0 0 12 .5z"/>
                  </svg>
                </a>

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
              <h4 className="font-black text-2xl text-background mb-4">{t('tools.title')}</h4>

              {/* AI 工具说明 */}
              <p className="text-background/70 text-base mb-8 leading-relaxed">
                {t('tools.description')}
              </p>
              
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

        {/* 底部栏 - 简化版 */}
        <div className="border-t border-background/20 pt-8 mt-16">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-background/70 mb-4 md:mb-0">
              {t('copyright', { year: new Date().getFullYear() })}
            </div>
            <div className="text-sm text-background/70">
              {t('address')}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
