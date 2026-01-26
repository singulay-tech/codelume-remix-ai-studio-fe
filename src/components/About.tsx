'use client'

import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import storyboardImage from '@/assets/storyboard-image.avif'

export function About() {
  const { t } = useTranslation('about')
  const [activeFrame, setActiveFrame] = useState(-1)
  const [animationStarted, setAnimationStarted] = useState(false)

  const processSteps = [
    {
      number: t('steps.step1.number'),
      title: t('steps.step1.title'),
      description: t('steps.step1.description'),
      color: 'accent-blue'
    },
    {
      number: t('steps.step2.number'),
      title: t('steps.step2.title'),
      description: t('steps.step2.description'),
      color: 'accent-emerald'
    },
    {
      number: t('steps.step3.number'),
      title: t('steps.step3.title'),
      description: t('steps.step3.description'),
      color: 'accent-purple'
    },
    {
      number: t('steps.step4.number'),
      title: t('steps.step4.title'),
      description: t('steps.step4.description'),
      color: 'accent-blue'
    },
    {
      number: t('steps.step5.number'),
      title: t('steps.step5.title'),
      description: t('steps.step5.description'),
      color: 'accent-purple'
    }
  ]

  useEffect(() => {
    // 区块加载后暂停 3 秒再开始胶片动画
    setTimeout(() => {
      setAnimationStarted(true)
      processSteps.forEach((_, index) => {
        setTimeout(() => {
          setActiveFrame(index)
         
        }, index * 2000 + 1000) // 超慢：24 秒后开始，然后每 72 秒一次
      })
    }, 3000) // 区块加载后暂停 3 秒
  }, [])

  return (
    <section id="process" className="relative py-20 bg-background overflow-hidden">
      
      {/* 电影感背景 */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />
      
      {/* 胶片颗粒效果 */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.8) 1px, transparent 0)`,
          backgroundSize: '3px 3px',
          animation: 'filmGrain 8s infinite'
        }} />
      </div>

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* 标题 */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-3 h-3 bg-accent-emerald rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-muted-foreground">
              {t('badge')}
            </span>
            <div className="w-3 h-3 bg-accent-blue rounded-full animate-pulse" />
          </div>

          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-6 text-foreground">
            {t('title')}
          </h2>

          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* 胶片带容器 */}
        <div className="relative max-w-7xl mx-auto">
          
          {/* 胶片带背景 */}
          <div className="relative bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950 rounded-xl overflow-hidden"
               style={{ boxShadow: '0 25px 50px rgba(0,0,0,0.5), inset 0 2px 0 rgba(255,255,255,0.05)' }}>
            
            {/* 胶片齿孔 - 顶部 - 现在带动画 */}
            <div className="absolute top-0 left-0 right-0 h-6 bg-black z-20 overflow-hidden">
              <div className={`flex items-center justify-between px-12 h-full ${
                animationStarted ? 'perforations-scroll-animation' : ''
              }`} style={{ width: '200%' }}>
                {/* 第一组齿孔 */}
                {[...Array(20)].map((_, i) => (
                  <div key={`top-${i}`} className="w-4 h-3 bg-gray-800 rounded-sm border border-gray-700 flex-shrink-0" 
                       style={{ boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.8)' }} />
                ))}
                {/* 复制一组用于无缝循环 */}
                {[...Array(20)].map((_, i) => (
                  <div key={`top-dup-${i}`} className="w-4 h-3 bg-gray-800 rounded-sm border border-gray-700 flex-shrink-0" 
                       style={{ boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.8)' }} />
                ))}
              </div>
            </div>
            
            {/* 胶片齿孔 - 底部 - 现在带动画 */}
            <div className="absolute bottom-0 left-0 right-0 h-6 bg-black z-20 overflow-hidden">
              <div className={`flex items-center justify-between px-12 h-full ${
                animationStarted ? 'perforations-scroll-animation' : ''
              }`} style={{ width: '200%' }}>
                {/* 第一组齿孔 */}
                {[...Array(20)].map((_, i) => (
                  <div key={`bottom-${i}`} className="w-4 h-3 bg-gray-800 rounded-sm border border-gray-700 flex-shrink-0"
                       style={{ boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.8)' }} />
                ))}
                {/* 复制一组用于无缝循环 */}
                {[...Array(20)].map((_, i) => (
                  <div key={`bottom-dup-${i}`} className="w-4 h-3 bg-gray-800 rounded-sm border border-gray-700 flex-shrink-0"
                       style={{ boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.8)' }} />
                ))}
              </div>
            </div>

            {/* 胶片画格容器 - 滚动动画 */}
            <div className="relative py-6 px-8 overflow-hidden h-64 max-w-full">
              <div className={`flex transition-transform duration-1000 ease-in-out ${
                animationStarted ? 'film-scroll-animation' : ''
              }`} style={{ width: 'max-content', gap: '32px' }}>
                
                {/* 原始序列用于无缝循环 */}
                {/* 起始画格 */}
                <div className="flex-shrink-0 w-80 h-52 bg-gray-800 rounded-lg border-2 border-gray-700 opacity-60 flex items-center justify-center"
                     style={{ boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.4)' }}>
                  <div className="text-gray-400 font-mono tracking-wider">● {t('steps.start')}</div>
                </div>
                
                {/* 流程步骤画格 */}
                {processSteps.map((step, index) => (
                  <div
                    key={step.number}
                    className={`flex-shrink-0 w-80 h-52 bg-background rounded-lg border-4 ${
                      activeFrame >= index 
                        ? `border-${step.color}` 
                        : 'border-gray-600'
                    }`}
                    style={{
                      boxShadow: '0 8px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)'
                    }}
                  >
                    
                    {/* 画格内容 */}
                    <div className="relative h-full p-6 flex flex-col justify-between">
                      
                      {/* 画格编号徽标 */}
                      <div className="absolute -top-4 -left-4 w-12 h-12 bg-foreground text-background rounded-full flex items-center justify-center font-black z-10 border-3 border-white text-lg"
                           style={{ boxShadow: '0 6px 12px rgba(0,0,0,0.4)' }}>
                        {step.number}
                      </div>
                      
                      {/* 内容 */}
                      <div className="opacity-100">
                        
                        {/* 步骤标题 */}
                        <h3 className="font-black text-xl leading-tight mb-4 text-foreground">
                          {step.title}
                        </h3>
                        
                        {/* 步骤描述 */}
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                      
                      {/* 胶片边缘线 */}
                      <div className="absolute left-1 top-1 bottom-1 w-px bg-gray-300/20" />
                      <div className="absolute right-1 top-1 bottom-1 w-px bg-gray-300/20" />
                      <div className="absolute top-1 left-1 right-1 h-px bg-gray-300/20" />
                      <div className="absolute bottom-1 left-1 right-1 h-px bg-gray-300/20" />
                    </div>
                  </div>
                ))}
                
                {/* 结束画格 */}
                <div className="flex-shrink-0 w-80 h-52 bg-gray-800 rounded-lg border-2 border-gray-700 opacity-60 flex items-center justify-center"
                     style={{ boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.4)' }}>
                  <div className="text-gray-400 font-mono tracking-wider">● {t('steps.end')}</div>
                </div>
                
                {/* 复制一组用于无缝循环 */}
                {/* 起始画格副本 */}
                <div className="flex-shrink-0 w-80 h-52 bg-gray-800 rounded-lg border-2 border-gray-700 opacity-60 flex items-center justify-center"
                     style={{ boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.4)' }}>
                  <div className="text-gray-400 font-mono tracking-wider">● {t('steps.start')}</div>
                </div>
                
                {/* 流程步骤画格副本 */}
                {processSteps.map((step, index) => (
                  <div
                    key={`duplicate-${step.number}`}
                    className={`flex-shrink-0 w-80 h-52 bg-background rounded-lg border-4 ${
                      activeFrame >= index 
                        ? `border-${step.color}` 
                        : 'border-gray-600'
                    }`}
                    style={{
                      boxShadow: '0 8px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)'
                    }}
                  >
                    
                    {/* 画格内容 */}
                    <div className="relative h-full p-6 flex flex-col justify-between">
                      
                      {/* 画格编号徽标 */}
                      <div className="absolute -top-4 -left-4 w-12 h-12 bg-foreground text-background rounded-full flex items-center justify-center font-black z-10 border-3 border-white text-lg"
                           style={{ boxShadow: '0 6px 12px rgba(0,0,0,0.4)' }}>
                        {step.number}
                      </div>
                      
                      {/* 内容 */}
                      <div className="opacity-100">
                        
                        {/* 步骤标题 */}
                        <h3 className="font-black text-xl leading-tight mb-4 text-foreground">
                          {step.title}
                        </h3>
                        
                        {/* 步骤描述 */}
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                      
                      {/* 胶片边缘线 */}
                      <div className="absolute left-1 top-1 bottom-1 w-px bg-gray-300/20" />
                      <div className="absolute right-1 top-1 bottom-1 w-px bg-gray-300/20" />
                      <div className="absolute top-1 left-1 right-1 h-px bg-gray-300/20" />
                      <div className="absolute bottom-1 left-1 right-1 h-px bg-gray-300/20" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* 加强的投影光效 */}
          {activeFrame >= 0 && (
            <div className="absolute inset-0 pointer-events-none">
              <div 
                className="absolute top-1/2 left-1/2 w-48 h-48 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-10"
                style={{
                  background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.4) 20%, rgba(255,255,0,0.2) 40%, transparent 60%)',
                  animation: 'projectorLight 12s ease-in-out infinite'
                }}
              />
            </div>
          )}
        </div>

        {/* 胶片控制 */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-6 bg-card/80 backdrop-blur-sm clean-border rounded-2xl px-8 py-4 subtle-shadow">

            {/* 胶片速度指示 */}
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-accent-emerald rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-foreground">{t('stats.fps')}</span>
            </div>

            <div className="w-px h-6 bg-border" />

            {/* 时长 */}
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-accent-blue rounded-full animate-pulse" style={{animationDelay: '0.5s'}} />
              <span className="text-sm font-semibold text-foreground">{t('stats.duration')}</span>
            </div>

            <div className="w-px h-6 bg-border" />

            {/* 质量 */}
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-accent-purple rounded-full animate-pulse" style={{animationDelay: '1s'}} />
              <span className="text-sm font-semibold text-foreground">{t('stats.quality')}</span>
            </div>
          </div>
        </div>

        {/* AI 生成内容画廊 */}
        <div className="mt-20">
          <div className="text-center mb-8">
            <p className="text-muted-foreground">
              {t('gallery.title')}
            </p>
          </div>

          {/* 画廊图片 */}
          <div className="relative max-w-6xl mx-auto">
            <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-4 overflow-hidden">

              {/* 为真实感添加胶片颗粒叠加 */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                   style={{
                     backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)`,
                     backgroundSize: '4px 4px'
                   }} />

              {/* 主要画廊图片 */}
              <img
                src={storyboardImage}
                alt={t('gallery.imageAlt')}
                className="w-full h-auto rounded-xl"
                style={{
                  filter: 'contrast(1.05) saturate(1.1) brightness(0.95)'
                }}
              />

              {/* 细腻叠加渐变以增强纵深 */}
              <div className="absolute inset-4 rounded-xl pointer-events-none"
                   style={{
                     background: 'linear-gradient(135deg, rgba(37,99,235,0.03) 0%, transparent 20%, transparent 80%, rgba(124,58,237,0.03) 100%)'
                   }} />
            </div>

            {/* 说明文字 */}
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground italic">
                "{t('gallery.caption')}"
              </p>
            </div>
          </div>
        </div>
      </div>
      
    </section>
  )
}
