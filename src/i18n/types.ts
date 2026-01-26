import 'i18next'

// Import English language packs as type source (for reference only)
import type common from './locales/en/common.json'
import type navigation from './locales/en/navigation.json'
import type hero from './locales/en/hero.json'
import type about from './locales/en/about.json'
import type services from './locales/en/services.json'
import type portfolio from './locales/en/portfolio.json'
import type team from './locales/en/team.json'
import type contact from './locales/en/contact.json'
import type footer from './locales/en/footer.json'
import type awards from './locales/en/awards.json'
import type errors from './locales/en/errors.json'

// Type definitions for language resources (for documentation purposes)
export interface I18nResources {
  common: typeof common
  navigation: typeof navigation
  hero: typeof hero
  about: typeof about
  services: typeof services
  portfolio: typeof portfolio
  team: typeof team
  contact: typeof contact
  footer: typeof footer
  awards: typeof awards
  errors: typeof errors
}

// Namespace keys for useTranslation hook
export type I18nNamespace = keyof I18nResources

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common'
    returnNull: false
    returnEmptyString: false
  }
}
