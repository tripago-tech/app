'use client'
import { useLanguageStore, Language } from '@/store/useLanguageStore'
import { useEffect, useState } from 'react'

type TranslationResources = Record<string, any>

const loadTranslations = async (lang: Language): Promise<TranslationResources> => {
  try {
    const module = await import(`@/locales/${lang}.json`)
    return module.default || module
  } catch (error) {
    console.error(`Failed to load translations for language: ${lang}`, error)
    return {}
  }
}

const flattenObject = (obj: any, prefix = ''): Record<string, string> => {
  const result: Record<string, string> = {}
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key]
      const newKey = prefix ? `${prefix}.${key}` : key
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        Object.assign(result, flattenObject(value, newKey))
      } else {
        result[newKey] = String(value)
      }
    }
  }
  return result
}

const fallbackTranslations = {
  'hero.title': 'Plan Your Perfect Thailand Trip in Minutes with AI',
  'hero.subtitle': 'Get personalized AI-generated itineraries, discover hidden gems, and join a community of travelers exploring Thailand.',
  'common.home': 'Home',
  'common.explore': 'Explore',
  'common.login': 'Login',
  'common.signup': 'Sign Up',
  'navigation.destinations': 'Destinations',
  'navigation.hotels': 'Hotels',
  'navigation.restaurants': 'Restaurants',
  'navigation.attractions': 'Attractions',
  'navigation.planTrip': 'Plan Trip',
  'navigation.community': 'Community',
}

export const useTranslation = () => {
  const { language, setLanguage } = useLanguageStore()
  const [translations, setTranslations] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const loadAndSetTranslations = async () => {
      setIsLoading(true)
      const resources = await loadTranslations(language)
      const flatResources = flattenObject(resources)
      setTranslations(flatResources)
      setIsLoading(false)
    }

    loadAndSetTranslations()
  }, [language])

  const t = (key: string, variables?: Record<string, string>): string => {
    let text = translations[key] || fallbackTranslations[key as keyof typeof fallbackTranslations] || key

    // Handle variable replacement
    if (variables) {
      Object.entries(variables).forEach(([varKey, varValue]) => {
        text = text.replace(`{{${varKey}}}`, varValue)
      })
    }

    return text
  }

  const changeLanguage = (lang: Language) => {
    setLanguage(lang)
  }

  return { t, language, changeLanguage, isLoading }
}
