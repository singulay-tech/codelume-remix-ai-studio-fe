'use client'

import { motion } from 'framer-motion'
import { Volume2, VolumeX, Menu, X } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LanguageSwitcher } from './LanguageSwitcher'
import { CODELUME_MAC_APP_STORE_URL } from '@/constants/externalLinks'

export function Hero() {
  const { t } = useTranslation(['hero', 'navigation'])
  const [isMuted, setIsMuted] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  // 滚动检测
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 50) // 滚动超过 50px 后显示背景
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 确保加载时立即静音，避免任何声音
  useEffect(() => {
    if (videoRef.current) {
      console.log('Video element found, setting up...')
      videoRef.current.volume = 0
      videoRef.current.muted = true
      videoRef.current.defaultMuted = true
      
      // 添加调试用事件监听
      videoRef.current.addEventListener('loadstart', () => console.log('Video: loadstart'))
      videoRef.current.addEventListener('loadedmetadata', () => console.log('Video: loadedmetadata'))
      videoRef.current.addEventListener('canplay', () => console.log('Video: canplay'))
      videoRef.current.addEventListener('playing', () => console.log('Video: playing'))
      videoRef.current.addEventListener('error', (e) => console.error('Video error:', e))
      
      // 播放时强制静音
      videoRef.current.addEventListener('play', () => {
        if (videoRef.current) {
          console.log('Video play event fired')
          videoRef.current.muted = isMuted
          videoRef.current.volume = isMuted ? 0 : 0.7
        }
      })
      
      // 尝试播放视频
      const playPromise = videoRef.current.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => console.log('Video autoplay successful'))
          .catch(error => console.error('Video autoplay failed:', error))
      }
    }
  }, [])

  // isMuted 变化时更新视频静音状态
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted
      videoRef.current.volume = isMuted ? 0 : 0.7
    }
  }, [isMuted])

  // 移动端菜单打开时锁定页面滚动
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    // 卸载时清理
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  // 滚动时关闭移动端菜单
  useEffect(() => {
    const handleScroll = () => {
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }

    if (isMobileMenuOpen) {
      window.addEventListener('scroll', handleScroll)
    }

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isMobileMenuOpen])



  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* 超大视频 - 占据 95% 空间 */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover scale-110"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="https://assets.codelume.cn/codelume-web-preview/preview.mov" type="video/quicktime" />
        {t('hero:video.unsupported')}
      </video>

      {/* 全宽导航栏 */}
      <motion.nav
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="fixed top-0 left-0 right-0 w-full z-[110]"
      >
        <div 
          className={`w-full px-6 sm:px-8 lg:px-12 py-4 transition-all duration-300 ease-out ${
            isScrolled 
              ? 'bg-black/80 backdrop-blur-xl border-b border-white/10' 
              : 'bg-transparent'
          }`}
        >
          <div className="flex items-center justify-between">
            {/* 徽标 */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center cursor-pointer"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
            >
              <div className="flex items-center gap-3">
                <img src="/codelume-icon.svg" alt={t('navigation:brand')} className="h-7 w-7" />
                <span className="font-bagel text-white text-xl tracking-wider">{t('navigation:brand')}</span>
              </div>
            </motion.div>

            {/* 导航菜单 */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#portfolio"
                className="text-white hover:text-white/80 font-medium gentle-animation hover:scale-105"
              >
                {t('navigation:work')}
              </a>
              <a
                href="#workshop"
                className="text-white hover:text-white/80 font-medium gentle-animation hover:scale-105"
              >
                {t('navigation:workshop')}
              </a>
              <a
                href="#about-us"
                className="text-white hover:text-white/80 font-medium gentle-animation hover:scale-105"
              >
                {t('navigation:about')}
              </a>
              <Link
                to="/help"
                className="text-white hover:text-white/80 font-medium gentle-animation hover:scale-105"
              >
                {t('navigation:help')}
              </Link>
            </div>

            {/* 右侧 - 语言切换 + 视频控制 + 行动按钮 + 移动菜单 */}
            <div className="flex items-center space-x-3 relative">
              {/* 语言切换 */}
              <LanguageSwitcher />

              {/* 带提示的音量控制 */}
              <div className="relative">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="glass-effect p-3 rounded-full text-white hover:bg-white/20 gentle-animation cursor-pointer"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>

                {/* 提示开启声音 - 仅在静音时显示 */}
                {isMuted && (
                  <div className="absolute -bottom-10 right-0 flex items-center text-white/80">
                    <span className="whitespace-nowrap font-medium text-sm mr-2">{t('hero:cta.soundOn')}</span>
                    <span className="text-lg">↗</span>
                  </div>
                )}
              </div>

              <motion.a
                href={CODELUME_MAC_APP_STORE_URL}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex shrink-0 items-center justify-center bg-red-600 backdrop-blur-sm text-white font-semibold px-3 py-2 text-xs sm:px-6 sm:py-3 sm:text-sm rounded-md hover:bg-red-700 gentle-animation ml-2 sm:ml-4"
              >
                {t('hero:cta.download')}
              </motion.a>

              {/* 移动端汉堡菜单按钮 */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden glass-effect p-3 rounded-full text-white hover:bg-white/20 active:bg-white/30 gentle-animation cursor-pointer z-[120] relative"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* 移动端菜单遮罩 */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-md z-[80] cursor-pointer"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* 移动端菜单面板 */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: isMobileMenuOpen ? '0%' : '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="md:hidden fixed top-0 right-0 h-full w-72 max-w-[85vw] bg-black/90 backdrop-blur-xl border-l border-white/10 z-[90] mobile-menu-panel pointer-events-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col h-full">
          {/* 顶部关闭按钮 */}
          <div className="flex justify-end p-4">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="glass-effect p-3 rounded-full text-white hover:bg-white/20 active:bg-white/30 gentle-animation cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex flex-col px-6 pb-6 h-full">
            {/* 移动端导航链接 */}
            <div className="flex flex-col space-y-4 text-white">
              <a
                href="#portfolio"
                className="mobile-menu-link px-4 py-3 hover:text-white/80 hover:bg-white/10 rounded-lg gentle-animation font-medium text-lg active:bg-white/20"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('navigation:work')}
              </a>
              <a
                href="#workshop"
                className="mobile-menu-link px-4 py-3 hover:text-white/80 hover:bg-white/10 rounded-lg gentle-animation font-medium text-lg active:bg-white/20"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('navigation:workshop')}
              </a>
              <a
                href="#about-us"
                className="mobile-menu-link px-4 py-3 hover:text-white/80 hover:bg-white/10 rounded-lg gentle-animation font-medium text-lg active:bg-white/20"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('navigation:about')}
              </a>
              <Link
                to="/help"
                className="mobile-menu-link px-4 py-3 hover:text-white/80 hover:bg-white/10 rounded-lg gentle-animation font-medium text-lg active:bg-white/20"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('navigation:help')}
              </Link>
            </div>
          </div>
        </div>
      </motion.div>



      {/* 大标题 - 左下角 */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-12 left-6 sm:left-8 lg:left-12 z-40"
      >
        <div className="max-w-2xl">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black leading-tight text-white">
            <span className="block">{t('hero:title.line1')}</span>
            <span className="block">{t('hero:title.line2')}</span>
            <span className="block">{t('hero:title.line3')}</span>
          </h1>
        </div>
      </motion.div>


    </div>
  )
}
