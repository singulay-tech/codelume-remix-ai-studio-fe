'use client'

import { useTranslation } from 'react-i18next'
import { Globe } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { fallbackLng, supportedLngs, languageNames, type SupportedLanguage } from '@/i18n/config'
import { cn } from '@/lib/utils'

export type LanguageSwitcherVariant = 'onDarkVideo' | 'onSurface'

type LanguageSwitcherProps = {
  /** Hero 全屏视频上用 onDarkVideo；浅色页面（如 /help）用 onSurface */
  variant?: LanguageSwitcherVariant
}

export function LanguageSwitcher({ variant = 'onDarkVideo' }: LanguageSwitcherProps) {
  const { i18n } = useTranslation()
  const resolved = (i18n.resolvedLanguage || i18n.language || fallbackLng) as string
  const base = resolved.split('-')[0] as SupportedLanguage
  const currentLang = (
    supportedLngs.includes(resolved as SupportedLanguage)
      ? resolved
      : supportedLngs.includes(base)
        ? base
        : fallbackLng
  ) as SupportedLanguage

  const handleLanguageChange = (lng: SupportedLanguage) => {
    // Persist explicit user choice so it wins over auto-detection on reload.
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('i18nextLng', lng)
    }
    i18n.changeLanguage(lng)
  }

  const isSurface = variant === 'onSurface'

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="Language"
          className={cn(
            'p-3 rounded-full gentle-animation cursor-pointer',
            isSurface
              ? 'border border-border bg-card text-foreground shadow-sm hover:bg-muted'
              : 'glass-effect text-white hover:bg-white/20'
          )}
        >
          <Globe className="w-4 h-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className={
          isSurface
            ? 'bg-popover text-popover-foreground border-border'
            : 'bg-black/90 backdrop-blur-xl border-white/10'
        }
      >
        {supportedLngs.map((lng) => (
          <DropdownMenuItem
            key={lng}
            onClick={() => handleLanguageChange(lng)}
            className={cn(
              'cursor-pointer',
              isSurface
                ? 'hover:bg-muted focus:bg-muted text-popover-foreground'
                : 'text-white hover:bg-white/10',
              !isSurface && currentLang === lng ? 'bg-white/20' : '',
              isSurface && currentLang === lng ? 'bg-muted font-medium' : ''
            )}
          >
            {languageNames[lng]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
