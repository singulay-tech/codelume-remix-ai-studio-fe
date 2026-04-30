'use client'

import { motion } from 'framer-motion'
import { Volume2, VolumeX, Menu, X } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LanguageSwitcher } from './LanguageSwitcher'
import { CODELUME_MAC_APP_STORE_URL } from '@/constants/externalLinks'

const HERO_VIDEO_URLS = [
  'https://assets.codelume.cn/codelume-web-preview/preview_0.mp4',
  'https://assets.codelume.cn/codelume-web-preview/preview_1.mp4',
  'https://assets.codelume.cn/codelume-web-preview/preview_2.mp4',
  'https://assets.codelume.cn/codelume-web-preview/preview_1.mp4',
  'https://assets.codelume.cn/codelume-web-preview/preview_0.mp4',
]
const HERO_FALLBACK_IMAGE_URL = 'https://assets.codelume.cn/codelume-web-preview/preview.jpg'

// 可调：固定只播放前 N 个视频
const HERO_ACTIVE_VIDEO_COUNT = 3

export function Hero() {
  const { t } = useTranslation(['hero', 'navigation'])
  const heroVideos = HERO_VIDEO_URLS.slice(0, Math.max(1, Math.min(HERO_ACTIVE_VIDEO_COUNT, HERO_VIDEO_URLS.length)))
  const [isMuted, setIsMuted] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  /** 轨道位移索引：0..heroVideos.length 为「克隆首帧」，用于无缝从最后一张继续向左滑 */
  const [trackIndex, setTrackIndex] = useState(0)
  const [isTrackTransitionEnabled, setIsTrackTransitionEnabled] = useState(true)
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([])
  const [readyVideos, setReadyVideos] = useState<boolean[]>(
    () => Array(heroVideos.length).fill(false)
  )
  const isCarouselReady = readyVideos.length > 0 && readyVideos.every(Boolean)

  useEffect(() => {
    setReadyVideos(Array(heroVideos.length).fill(false))
  }, [heroVideos.length])

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
    videoRefs.current.forEach((video) => {
      if (!video) return
      video.volume = 0
      video.muted = true
      video.defaultMuted = true
    })
  }, [])

  // isMuted 变化时更新视频静音状态
  useEffect(() => {
    videoRefs.current.forEach((video) => {
      if (!video) return
      video.muted = isMuted
      video.volume = isMuted ? 0 : 0.7
    })
  }, [isMuted])

  // 始终只播放当前轨道上的那一格视频；
  // 当显示克隆位时，让真正的 video[0] 影子同步播放，以便瞬时复位到 0 时画面无缝衔接（避免“倒回开头”观感）。
  useEffect(() => {
    if (!isCarouselReady) return

    const cloneIdx = heroVideos.length
    const clone = videoRefs.current[cloneIdx]

    videoRefs.current.forEach((video, index) => {
      if (!video) return
      if (index === trackIndex) {
        const playPromise = video.play()
        if (playPromise !== undefined) playPromise.catch(() => {})
      } else if (trackIndex === cloneIdx && index === 0) {
        try {
          if (clone) video.currentTime = clone.currentTime
        } catch {
          // 部分浏览器在未就绪时 set currentTime 会抛错，忽略即可
        }
        const playPromise = video.play()
        if (playPromise !== undefined) playPromise.catch(() => {})
      } else {
        video.pause()
        video.currentTime = 0
      }
    })
  }, [trackIndex, isCarouselReady, heroVideos.length])

  // 滑到克隆帧后瞬时复位到 0，视觉上永远向左、不会从右弹回
  useEffect(() => {
    if (trackIndex !== heroVideos.length) return
    const timer = window.setTimeout(() => {
      // 复位前把克隆位的进度同步给真正的 video[0]，确保接管时画面连续
      const clone = videoRefs.current[heroVideos.length]
      const first = videoRefs.current[0]
      if (clone && first) {
        try {
          first.currentTime = clone.currentTime
        } catch {
          // 忽略未就绪时的赋值错误
        }
      }
      setIsTrackTransitionEnabled(false)
      setTrackIndex(0)
      setCurrentVideoIndex(0)
      window.requestAnimationFrame(() => {
        setIsTrackTransitionEnabled(true)
      })
    }, 1000)

    return () => window.clearTimeout(timer)
  }, [trackIndex, heroVideos.length])

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
      {/* 视频未就绪时优先展示静态背景图 */}
      <div
        className={`absolute inset-0 bg-cover bg-center gentle-animation ${
          isCarouselReady ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ backgroundImage: `url(${HERO_FALLBACK_IMAGE_URL})` }}
      />

      {/* 背景视频轮播 */}
      <div
        className={`absolute inset-0 flex h-full w-full ${
          isTrackTransitionEnabled ? 'transition-transform duration-1000 ease-in-out' : ''
        } ${isCarouselReady ? 'opacity-100' : 'opacity-0'}`}
        style={{ transform: `translateX(-${trackIndex * 100}%)` }}
      >
        {[...heroVideos, heroVideos[0]].map((url, index) => {
          const logicalIndex = index % heroVideos.length
          return (
          <video
            key={`${url}-${index}`}
            ref={(el) => {
              videoRefs.current[index] = el
            }}
            preload="auto"
            onCanPlayThrough={() => {
              if (index >= heroVideos.length) return
              setReadyVideos((prev) => {
                if (prev[logicalIndex]) return prev
                const next = [...prev]
                next[logicalIndex] = true
                return next
              })
            }}
            onEnded={() => {
              if (!isCarouselReady) return
              if (index !== trackIndex) return
              const last = heroVideos.length - 1
              if (index < last) {
                setCurrentVideoIndex(index + 1)
                setTrackIndex(index + 1)
              } else if (index === last) {
                setCurrentVideoIndex(0)
                setTrackIndex(heroVideos.length)
              } else {
                setIsTrackTransitionEnabled(false)
                setTrackIndex(0)
                setCurrentVideoIndex(0)
                window.requestAnimationFrame(() => setIsTrackTransitionEnabled(true))
              }
            }}
            onError={() => {
              if (index !== trackIndex) return
              const n = heroVideos.length
              if (index < n - 1) {
                setCurrentVideoIndex(index + 1)
                setTrackIndex(index + 1)
              } else if (index === n - 1) {
                setCurrentVideoIndex(0)
                setTrackIndex(n)
              } else {
                setIsTrackTransitionEnabled(false)
                setTrackIndex(0)
                setCurrentVideoIndex(0)
                window.requestAnimationFrame(() => setIsTrackTransitionEnabled(true))
              }
            }}
            className="h-full min-w-full flex-shrink-0 object-cover"
            autoPlay={index === 0}
            muted
            loop={false}
            playsInline
          >
            <source src={url} />
            {t('hero:video.unsupported')}
          </video>
        )})}
      </div>

      {/* 轮播指示器：激活点永远居中，其它点跟随轨道左移 */}
      <div
        className={`absolute bottom-6 left-1/2 z-50 -translate-x-1/2 overflow-hidden rounded-full bg-black/35 backdrop-blur-sm gentle-animation ${
          isCarouselReady ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ width: '6.5rem', height: '1.75rem' }}
      >
        {/* 内部轨道：通过 translate 让 active 圆点对齐到容器水平中心；
            尺寸基于 dot=10px、active=24px、gap=8px，center 偏移 = trackIndex*18 + 12px */}
        <div
          className={`absolute top-1/2 left-1/2 flex items-center gap-2 ${
            isTrackTransitionEnabled ? 'transition-transform duration-500 ease-out' : ''
          }`}
          style={{ transform: `translate(-${trackIndex * 18 + 12}px, -50%)` }}
        >
          {[...heroVideos, heroVideos[0]].map((_, index) => {
            const isActive = trackIndex === index
            return (
              <button
                key={`hero-indicator-${index}`}
                type="button"
                aria-label={`切换到第 ${(index % heroVideos.length) + 1} 张背景`}
                onClick={() => {
                  const i = index % heroVideos.length
                  setCurrentVideoIndex(i)
                  setTrackIndex(i)
                }}
                className={`h-2.5 flex-shrink-0 rounded-full gentle-animation ${
                  isActive ? 'w-6 bg-white' : 'w-2.5 bg-white/50 hover:bg-white/80'
                }`}
              />
            )
          })}
        </div>
      </div>

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
