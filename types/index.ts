export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  preferences: UserPreferences
}

export interface UserPreferences {
  theme: 'light' | 'dark'
  language: string
  currency: string
}

export interface Place {
  id: string
  name: string
  description: string
  images: string[]
  location: {
    lat: number
    lng: number
    address: string
  }
  category: string
  rating: number
  reviews: Review[]
  tags: string[]
}

export interface Review {
  id: string
  userId: string
  userName: string
  rating: number
  comment: string
  createdAt: string
}

export interface Trip {
  id: string
  name: string
  places: Place[]
  startDate: string
  endDate: string
  isPublic: boolean
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

export interface SEOProps {
  title: string
  description: string
  image?: string
  url?: string
  type?: string
}
