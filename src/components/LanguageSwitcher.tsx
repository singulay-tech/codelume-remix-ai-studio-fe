'use client'

import { useTranslation } from 'react-i18next'
import { Globe } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { supportedLngs, languageNames, type SupportedLanguage } from '@/i18n/config'

export function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const currentLang = (i18n.language?.split('-')[0] || 'en') as SupportedLanguage

  const handleLanguageChange = (lng: SupportedLanguage) => {
    i18n.changeLanguage(lng)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="glass-effect p-3 rounded-full text-white hover:bg-white/20 gentle-animation cursor-pointer">
          <Globe className="w-4 h-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-black/90 backdrop-blur-xl border-white/10">
        {supportedLngs.map((lng) => (
          <DropdownMenuItem
            key={lng}
            onClick={() => handleLanguageChange(lng)}
            className={`cursor-pointer text-white hover:bg-white/10 ${
              currentLang === lng ? 'bg-white/20' : ''
            }`}
          >
            {languageNames[lng]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
