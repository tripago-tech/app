// Gamification system for TripMate.AI
export interface UserBadge {
  id: string
  name: string
  description: string
  icon: string
  category: 'explorer' | 'reviewer' | 'photographer' | 'socialite' | 'local'
  requirement: number
  earned: boolean
  earnedAt?: string
}

export interface UserStats {
  points: number
  level: number
  placesVisited: number
  reviewsWritten: number
  photosUploaded: number
  tripsShared: number
  badges: UserBadge[]
}

export const BADGES: UserBadge[] = [
  // Explorer Badges
  {
    id: 'first_trip',
    name: 'First Adventure',
    description: 'Generated your first AI trip',
    icon: '🗺️',
    category: 'explorer',
    requirement: 1,
    earned: false
  },
  {
    id: 'temple_hopper',
    name: 'Temple Hopper',
    description: 'Visited 5 temples in Thailand',
    icon: '⛩️',
    category: 'explorer',
    requirement: 5,
    earned: false
  },
  {
    id: 'island_explorer',
    name: 'Island Explorer',
    description: 'Visited 3 different islands',
    icon: '🏝️',
    category: 'explorer',
    requirement: 3,
    earned: false
  },
  
  // Reviewer Badges
  {
    id: 'first_review',
    name: 'First Reviewer',
    description: 'Wrote your first place review',
    icon: '⭐',
    category: 'reviewer',
    requirement: 1,
    earned: false
  },
  {
    id: 'helpful_reviewer',
    name: 'Helpful Reviewer',
    description: 'Received 50 helpful votes on reviews',
    icon: '👍',
    category: 'reviewer',
    requirement: 50,
    earned: false
  },
  
  // Photographer Badges
  {
    id: 'first_photo',
    name: 'Snapshot',
    description: 'Uploaded your first travel photo',
    icon: '📸',
    category: 'photographer',
    requirement: 1,
    earned: false
  },
  {
    id: 'photo_master',
    name: 'Photo Master',
    description: 'Uploaded 100 travel photos',
    icon: '📷',
    category: 'photographer',
    requirement: 100,
    earned: false
  },
  
  // Social Badges
  {
    id: 'social_butterfly',
    name: 'Social Butterfly',
    description: 'Shared 10 trips on social media',
    icon: '🦋',
    category: 'socialite',
    requirement: 10,
    earned: false
  },
  
  // Local Expert Badges
  {
    id: 'local_expert',
    name: 'Local Expert',
    description: 'Provided 20 local recommendations',
    icon: '🎯',
    category: 'local',
    requirement: 20,
    earned: false
  },
  {
    id: 'hidden_gem_finder',
    name: 'Hidden Gem Finder',
    description: 'Discovered 5 off-the-beaten-path places',
    icon: '💎',
    category: 'local',
    requirement: 5,
    earned: false
  }
]

export const calculateUserLevel = (points: number): number => {
  if (points < 100) return 1
  if (points < 500) return 2
  if (points < 1000) return 3
  if (points < 2500) return 4
  if (points < 5000) return 5
  return Math.floor(points / 1000) + 1
}

export const getPointsForNextLevel = (currentPoints: number): number => {
  const level = calculateUserLevel(currentPoints)
  const levelThresholds = [0, 100, 500, 1000, 2500, 5000]
  
  if (level <= 5) {
    return levelThresholds[level] - currentPoints
  }
  
  const nextThreshold = level * 1000
  return nextThreshold - currentPoints
}

export const checkBadgeEarned = (badge: UserBadge, userStats: UserStats): boolean => {
  switch (badge.category) {
    case 'explorer':
      return userStats.placesVisited >= badge.requirement
    case 'reviewer':
      return userStats.reviewsWritten >= badge.requirement
    case 'photographer':
      return userStats.photosUploaded >= badge.requirement
    case 'socialite':
      return userStats.tripsShared >= badge.requirement
    case 'local':
      return userStats.reviewsWritten >= badge.requirement // Simplified for demo
    default:
      return false
  }
}

export const updateUserStats = (
  currentStats: UserStats,
  action: 'trip_generated' | 'review_written' | 'photo_uploaded' | 'trip_shared' | 'place_visited'
): UserStats => {
  const newStats = { ...currentStats }
  
  switch (action) {
    case 'trip_generated':
      newStats.points += 50
      break
    case 'review_written':
      newStats.points += 25
      newStats.reviewsWritten += 1
      break
    case 'photo_uploaded':
      newStats.points += 10
      newStats.photosUploaded += 1
      break
    case 'trip_shared':
      newStats.points += 15
      newStats.tripsShared += 1
      break
    case 'place_visited':
      newStats.points += 20
      newStats.placesVisited += 1
      break
  }
  
  // Update level
  newStats.level = calculateUserLevel(newStats.points)
  
  // Check for new badges
  newStats.badges = BADGES.map(badge => ({
    ...badge,
    earned: checkBadgeEarned(badge, newStats),
    earnedAt: checkBadgeEarned(badge, newStats) && !badge.earned ? new Date().toISOString() : badge.earnedAt
  }))
  
  return newStats
}

export const getMockUserStats = (): UserStats => ({
  points: 350,
  level: 2,
  placesVisited: 8,
  reviewsWritten: 5,
  photosUploaded: 12,
  tripsShared: 3,
  badges: BADGES.map(badge => ({
    ...badge,
    earned: Math.random() > 0.7, // Random for demo
    earnedAt: Math.random() > 0.7 ? new Date().toISOString() : undefined
  }))
})
