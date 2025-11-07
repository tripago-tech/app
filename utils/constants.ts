export const TRAVEL_CATEGORIES = [
  'Beach',
  'Mountain',
  'City',
  'Historical',
  'Adventure',
  'Cultural',
  'Nature',
  'Food',
] as const

export const CURRENCIES = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'THB', symbol: '฿', name: 'Thai Baht' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
] as const

export const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'th', name: 'ไทย' },
  { code: 'ja', name: '日本語' },
] as const

export const MAP_CONFIG = {
  defaultCenter: [13.7563, 100.5018] as [number, number], // Bangkok
  defaultZoom: 10,
  tileLayer: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}

export const ROUTES = {
  HOME: '/',
  TRAVEL: '/travel',
  PLACE: '/travel/[slug]',
  PROFILE: '/profile',
  LOGIN: '/login',
  REGISTER: '/register',
} as const
