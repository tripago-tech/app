'use client'
import { useLanguageStore, Language } from '@/store/useLanguageStore'

const fallbackTranslations = {
  'hero.title': 'Plan Your Perfect Thailand Trip in Minutes with AI',
  'hero.subtitle': 'Get personalized AI-generated itineraries, discover hidden gems, and join a community of travelers exploring Thailand.',
  'places.popular': 'Popular Destinations',
  'places.popularDesc': 'Explore the most loved destinations by travelers around the world',
  'common.home': 'Home',
  'common.explore': 'Explore'
}

export const useTranslation = () => {
  const { language, setLanguage } = useLanguageStore()

  const t = (key: string): string => {
    return fallbackTranslations[key as keyof typeof fallbackTranslations] || key
  }

  const changeLanguage = (lang: Language) => {
    setLanguage(lang)
  }

  return { t, language, changeLanguage }
}
