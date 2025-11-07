import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export type Language = 'en' | 'th'

interface LanguageStore {
  language: Language
  setLanguage: (lang: Language) => void
  resources: Record<string, any>
  setResources: (resources: Record<string, any>) => void
}

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set) => ({
      language: 'en',
      resources: {},
      
      setLanguage: (lang: Language) => set({ language: lang }),
      
      setResources: (resources: Record<string, any>) => 
        set({ resources }),
    }),
    {
      name: 'language-storage',
      storage: createJSONStorage(() => 
        typeof window !== 'undefined' ? localStorage : {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        }
      ),
      partialize: (state) => ({ language: state.language }),
    }
  )
)
