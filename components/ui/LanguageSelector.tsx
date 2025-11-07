'use client'
import { Select } from '@chakra-ui/react'
import { useTranslation } from '@/hooks/useTranslation'
import { Language } from '@/store/useLanguageStore'

const languages = [
  { code: 'en' as Language, name: 'English' },
  { code: 'th' as Language, name: 'ไทย' },
]

export const LanguageSelector = () => {
  const { language, changeLanguage } = useTranslation()

  return (
    <Select
      value={language}
      onChange={(e) => changeLanguage(e.target.value as Language)}
      size="sm"
      w="auto"
      variant="ghost"
    >
      {languages.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.name}
        </option>
      ))}
    </Select>
  )
}
