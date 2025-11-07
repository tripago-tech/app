import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface ThemeStore {
  colorMode: 'light' | 'dark'
  toggleColorMode: () => void
  setColorMode: (mode: 'light' | 'dark') => void
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      colorMode: 'light',
      
      toggleColorMode: () =>
        set((state) => ({
          colorMode: state.colorMode === 'light' ? 'dark' : 'light',
        })),
      
      setColorMode: (mode: 'light' | 'dark') =>
        set({ colorMode: mode }),
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => 
        typeof window !== 'undefined' ? localStorage : {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        }
      ),
    }
  )
)
