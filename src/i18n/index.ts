import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { defaultNS, fallbackLng, supportedLngs } from './config'

// English language packs
import enCommon from './locales/en/common.json'
import enNavigation from './locales/en/navigation.json'
import enHero from './locales/en/hero.json'
import enAbout from './locales/en/about.json'
import enServices from './locales/en/services.json'
import enPortfolio from './locales/en/portfolio.json'
import enTeam from './locales/en/team.json'
import enContact from './locales/en/contact.json'
import enFooter from './locales/en/footer.json'
import enAwards from './locales/en/awards.json'
import enDownloads from './locales/en/downloads.json'
import enAboutUs from './locales/en/aboutUs.json'
import enWorkshop from './locales/en/workshop.json'
import enErrors from './locales/en/errors.json'

// Chinese language packs
import zhCommon from './locales/zh/common.json'
import zhNavigation from './locales/zh/navigation.json'
import zhHero from './locales/zh/hero.json'
import zhAbout from './locales/zh/about.json'
import zhServices from './locales/zh/services.json'
import zhPortfolio from './locales/zh/portfolio.json'
import zhTeam from './locales/zh/team.json'
import zhContact from './locales/zh/contact.json'
import zhFooter from './locales/zh/footer.json'
import zhAwards from './locales/zh/awards.json'
import zhDownloads from './locales/zh/downloads.json'
import zhAboutUs from './locales/zh/aboutUs.json'
import zhWorkshop from './locales/zh/workshop.json'
import zhErrors from './locales/zh/errors.json'

const resources = {
  en: {
    common: enCommon,
    navigation: enNavigation,
    hero: enHero,
    about: enAbout,
    services: enServices,
    portfolio: enPortfolio,
    team: enTeam,
    contact: enContact,
    footer: enFooter,
    awards: enAwards,
    downloads: enDownloads,
    aboutUs: enAboutUs,
    workshop: enWorkshop,
    errors: enErrors
  },
  zh: {
    common: zhCommon,
    navigation: zhNavigation,
    hero: zhHero,
    about: zhAbout,
    services: zhServices,
    portfolio: zhPortfolio,
    team: zhTeam,
    contact: zhContact,
    footer: zhFooter,
    awards: zhAwards,
    downloads: zhDownloads,
    aboutUs: zhAboutUs,
    workshop: zhWorkshop,
    errors: zhErrors
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng,
    supportedLngs: [...supportedLngs],
    defaultNS,
    ns: [
      'common',
      'navigation',
      'hero',
      'about',
      'services',
      'portfolio',
      'team',
      'contact',
      'footer',
      'awards',
      'downloads',
      'aboutUs',
      'workshop',
      'errors'
    ],

    interpolation: {
      escapeValue: false // React already handles XSS
    },

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng'
    },

    react: {
      useSuspense: true
    }
  })

export default i18n
