// Centralized icon mapping for consistent icons across the application
import {
  FaMoon,
  FaSun,
  FaUser,
  FaSignOutAlt,
  FaHotel,
  FaMapMarkerAlt,
  FaUtensils,
  FaCamera,
  FaRoute,
  FaUsers,
  FaStar,
  FaBars,
  FaTimes,
  FaSearch,
  FaHome,
  FaCompass,
  FaPlane,
  FaClock,
  FaDollarSign,
  FaHeart,
  FaShare,
  FaEye,
  FaEdit,
  FaTrash,
  FaFilter,
  FaMapMarker,
  FaPhone,
  FaEnvelope,
  FaCheck,
  FaX,
  FaArrowRight,
  FaArrowLeft,
  FaPlus,
  FaMinus,
  FaGlobe,
  FaTags,
  FaTag,
  FaCalendar,
  FaCalendarAlt,
  FaWifi,
  FaSwimmingPool,
  FaUtensilsSpoon,
  FaDumbbell,
  FaParking,
  FaTv,
  FaTicketAlt,
  FaCreditCard,
  FaFireAlt,
  FaMedal,
  FaTrophy,
  FaComment,
  FaImage,
  FaArrowUp,
  FaArrowDown,
  FaChevronUp,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaCircle,
  FaLayerGroup,
} from 'react-icons/fa'

// Icon type for type safety
export type IconName = keyof typeof iconMap

// Centralized icon map
export const iconMap = {
  // Theme & Settings
  moon: FaMoon,
  sun: FaSun,
  globe: FaGlobe,
  
  // User & Auth
  user: FaUser,
  logout: FaSignOutAlt,
  
  // Navigation
  home: FaHome,
  menu: FaBars,
  close: FaTimes,
  compass: FaCompass,
  arrowRight: FaArrowRight,
  arrowLeft: FaArrowLeft,
  arrowUp: FaArrowUp,
  arrowDown: FaArrowDown,
  chevronUp: FaChevronUp,
  chevronDown: FaChevronDown,
  chevronLeft: FaChevronLeft,
  chevronRight: FaChevronRight,
  
  // Travel & Destinations
  destination: FaMapMarkerAlt,
  map: FaMapMarker,
  plane: FaPlane,
  route: FaRoute,
  attractions: FaCamera,
  
  // Hotels & Accommodations
  hotel: FaHotel,
  wifi: FaWifi,
  pool: FaSwimmingPool,
  parking: FaParking,
  tv: FaTv,
  
  // Dining & Food
  restaurant: FaUtensils,
  food: FaUtensilsSpoon,
  
  // Community
  community: FaUsers,
  reviews: FaComment,
  photos: FaImage,
  
  // Search & Filter
  search: FaSearch,
  filter: FaFilter,
  
  // Content
  clock: FaClock,
  calendar: FaCalendar,
  calendarAlt: FaCalendarAlt,
  price: FaDollarSign,
  heart: FaHeart,
  share: FaShare,
  eye: FaEye,
  edit: FaEdit,
  delete: FaTrash,
  check: FaCheck,
  close_icon: FaX,
  plus: FaPlus,
  minus: FaMinus,
  tags: FaTags,
  tag: FaTag,
  
  // Activity & Engagement
  star: FaStar,
  ticket: FaTicketAlt,
  payment: FaCreditCard,
  fire: FaFireAlt,
  medal: FaMedal,
  trophy: FaTrophy,
  phone: FaPhone,
  email: FaEnvelope,
  gym: FaDumbbell,
  
  // UI Elements
  circle: FaCircle,
  layers: FaLayerGroup,
}

// Helper function to get icon by name
export const getIcon = (name: IconName) => {
  return iconMap[name]
}

// Helper function to get all icons of a category
export const getIconsByCategory = (category: 'theme' | 'navigation' | 'travel' | 'community' | 'content') => {
  const categories = {
    theme: ['moon', 'sun', 'globe'],
    navigation: ['home', 'menu', 'close', 'compass', 'arrowRight', 'arrowLeft'],
    travel: ['destination', 'map', 'plane', 'route', 'attractions'],
    community: ['community', 'reviews', 'photos'],
    content: ['clock', 'calendar', 'price', 'heart', 'share', 'star'],
  }
  return categories[category] as IconName[]
}
