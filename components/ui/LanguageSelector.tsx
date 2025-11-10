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
      w="100px"
      variant="filled"
      bg="#F7F7F7"
      color="#1C1C1C"
      fontSize="14px"
      fontWeight="500"
      borderRadius="6px"
      border="1px solid #E0E0E0"
      _hover={{ bg: '#EFEFEF' }}
      _focus={{ boxShadow: '0 0 0 1px #34E0A1' }}
    >
      {languages.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.name}
        </option>
      ))}
    </Select>
  )
}
