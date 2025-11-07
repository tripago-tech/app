'use client'
import { useLanguageStore, Language } from '@/store/useLanguageStore'
import { useEffect } from 'react'

const fallbackTranslations = {
  'hero.title': 'Plan Your Perfect Thailand Trip in Minutes with AI',
  'hero.subtitle': 'Get personalized AI-generated itineraries, discover hidden gems, and join a community of travelers exploring Thailand.',
  'places.popular': 'Popular Destinations',
  'places.popularDesc': 'Explore the most loved destinations by travelers around the world',
  'common.home': 'Home',
  'common.explore': 'Explore'
}

export const useTranslation = () => {
  const { language, resources, setLanguage, setResources } = useLanguageStore()

  useEffect(() => {
    const loadResources = async () => {
      try {
        const res = await import(`@/locales/${language}.json`)
        setResources(res.default || res)
      } catch (error) {
        console.error('Failed to load language resources:', error)
        setResources(fallbackTranslations)
      }
    }
    loadResources()
  }, [language, setResources])

  const t = (key: string): string => {
    if (!resources || typeof resources !== 'object') {
      return fallbackTranslations[key as keyof typeof fallbackTranslations] || key
    }
    
    const keys = key.split('.')
    let value: any = resources
    
    for (const k of keys) {
      value = value?.[k]
      if (value === undefined || value === null) break
    }
    
    return typeof value === 'string' ? value : fallbackTranslations[key as keyof typeof fallbackTranslations] || key
  }

  const changeLanguage = (lang: Language) => {
    setLanguage(lang)
  }

  return { t, language, changeLanguage }
}
