// Advanced gamification and community engagement system

interface UserProfile {
  id: string
  username: string
  email: string
  avatar: string
  joinDate: string
  location: string
  bio: string
  socialLinks: {
    instagram?: string
    facebook?: string
    tiktok?: string
  }
  verification: {
    email: boolean
    phone: boolean
    identity: boolean
    influencer: boolean
  }
  preferences: {
    travelStyle: string[]
    interests: string[]
    budget: string
    notifications: boolean
  }
}

interface GamificationProfile {
  userId: string
  level: number
  totalPoints: number
  currentStreak: number
  longestStreak: number
  badges: Badge[]
  achievements: Achievement[]
  stats: {
    reviewsWritten: number
    photosUploaded: number
    placesVisited: number
    tripsShared: number
    helpfulVotes: number
    followersCount: number
    followingCount: number
  }
  leaderboard: {
    globalRank: number
    monthlyRank: number
    categoryRanks: { [category: string]: number }
  }
  rewards: {
    availablePoints: number
    redeemedRewards: Reward[]
    voucherBalance: number
  }
}

interface Badge {
  id: string
  name: string
  description: string
  icon: string
  category: 'explorer' | 'reviewer' | 'photographer' | 'socialite' | 'expert' | 'special'
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  requirement: {
    type: string
    target: number
    timeframe?: string
  }
  earnedAt?: string
  progress?: number
}

interface Achievement {
  id: string
  title: string
  description: string
  points: number
  category: string
  unlockedAt: string
  isSecret: boolean
}

interface Reward {
  id: string
  name: string
  description: string
  type: 'voucher' | 'discount' | 'upgrade' | 'experience'
  value: number
  pointsCost: number
  partner: string
  expiryDate: string
  terms: string[]
}

interface CommunityChallenge {
  id: string
  title: string
  description: string
  type: 'individual' | 'team' | 'global'
  category: string
  startDate: string
  endDate: string
  requirements: any[]
  rewards: {
    winner: Reward[]
    participant: Reward[]
  }
  participants: number
  status: 'upcoming' | 'active' | 'completed'
}

// Badge definitions
export const BADGES: Badge[] = [
  // Explorer Badges
  {
    id: 'first_trip',
    name: 'นักเดินทางมือใหม่',
    description: 'แชร์ทริปแรกของคุณ',
    icon: '🗺️',
    category: 'explorer',
    rarity: 'common',
    requirement: { type: 'trips_shared', target: 1 }
  },
  {
    id: 'province_collector',
    name: 'นักสะสมจังหวัด',
    description: 'เยี่ยมชม 10 จังหวัดในประเทศไทย',
    icon: '🏛️',
    category: 'explorer',
    rarity: 'rare',
    requirement: { type: 'provinces_visited', target: 10 }
  },
  {
    id: 'temple_master',
    name: 'เซียนวัด',
    description: 'เยี่ยมชมวัดมากกว่า 20 แห่ง',
    icon: '⛩️',
    category: 'explorer',
    rarity: 'epic',
    requirement: { type: 'temples_visited', target: 20 }
  },
  
  // Reviewer Badges
  {
    id: 'helpful_reviewer',
    name: 'นักรีวิวช่วยเหลือ',
    description: 'รีวิวของคุณได้รับ "ช่วยได้" มากกว่า 50 ครั้ง',
    icon: '👍',
    category: 'reviewer',
    rarity: 'rare',
    requirement: { type: 'helpful_votes', target: 50 }
  },
  {
    id: 'detailed_reviewer',
    name: 'นักรีวิวรายละเอียด',
    description: 'เขียนรีวิวยาวมากกว่า 500 คำ 10 ครั้ง',
    icon: '📝',
    category: 'reviewer',
    rarity: 'epic',
    requirement: { type: 'detailed_reviews', target: 10 }
  },
  
  // Photographer Badges
  {
    id: 'photo_enthusiast',
    name: 'นักถ่ายรูปเที่ยว',
    description: 'อัปโหลดรูปภาพมากกว่า 100 รูป',
    icon: '📸',
    category: 'photographer',
    rarity: 'rare',
    requirement: { type: 'photos_uploaded', target: 100 }
  },
  {
    id: 'viral_photographer',
    name: 'ช่างภาพไวรัล',
    description: 'รูปภาพของคุณได้รับไลค์มากกว่า 1000 ครั้ง',
    icon: '🔥',
    category: 'photographer',
    rarity: 'legendary',
    requirement: { type: 'photo_likes', target: 1000 }
  },
  
  // Social Badges
  {
    id: 'influencer',
    name: 'อินฟลูเอนเซอร์ท่องเที่ยว',
    description: 'มีผู้ติดตามมากกว่า 1000 คน',
    icon: '⭐',
    category: 'socialite',
    rarity: 'epic',
    requirement: { type: 'followers', target: 1000 }
  },
  
  // Special Badges
  {
    id: 'early_adopter',
    name: 'ผู้ใช้รุ่นแรก',
    description: 'เป็นสมาชิกในช่วง Beta',
    icon: '🚀',
    category: 'special',
    rarity: 'legendary',
    requirement: { type: 'join_date', target: 1 }
  }
]

// Point system
export const POINT_SYSTEM = {
  review_written: 25,
  photo_uploaded: 10,
  trip_shared: 50,
  place_visited: 20,
  helpful_vote_received: 5,
  comment_posted: 3,
  profile_completed: 100,
  daily_login: 5,
  streak_bonus: 10, // per day of streak
  referral_signup: 200,
  social_share: 15
}

// Level calculation
export const calculateLevel = (totalPoints: number): number => {
  if (totalPoints < 100) return 1
  if (totalPoints < 500) return 2
  if (totalPoints < 1500) return 3
  if (totalPoints < 3500) return 4
  if (totalPoints < 7500) return 5
  if (totalPoints < 15000) return 6
  if (totalPoints < 30000) return 7
  if (totalPoints < 60000) return 8
  if (totalPoints < 100000) return 9
  return 10
}

// Award points for actions
export const awardPoints = async (userId: string, action: string, metadata?: any): Promise<number> => {
  try {
    const points = POINT_SYSTEM[action as keyof typeof POINT_SYSTEM] || 0
    
    // Bonus calculations
    let bonusPoints = 0
    
    // Streak bonus
    if (action === 'daily_login') {
      const userProfile = await getUserGamificationProfile(userId)
      bonusPoints = userProfile.currentStreak * POINT_SYSTEM.streak_bonus
    }
    
    // Quality bonus for reviews
    if (action === 'review_written' && metadata?.quality === 'high') {
      bonusPoints = 15
    }
    
    // Photo quality bonus
    if (action === 'photo_uploaded' && metadata?.likes > 10) {
      bonusPoints = Math.min(metadata.likes, 50) // Max 50 bonus points
    }
    
    const totalPoints = points + bonusPoints
    
    // Update user points
    await updateUserPoints(userId, totalPoints)
    
    // Check for new badges
    await checkBadgeEligibility(userId)
    
    // Check for achievements
    await checkAchievements(userId, action, metadata)
    
    return totalPoints
  } catch (error) {
    console.error('Award points error:', error)
    return 0
  }
}

// Check badge eligibility
export const checkBadgeEligibility = async (userId: string): Promise<Badge[]> => {
  try {
    const userProfile = await getUserGamificationProfile(userId)
    const userStats = userProfile.stats
    const earnedBadgeIds = userProfile.badges.map(b => b.id)
    
    const newBadges: Badge[] = []
    
    for (const badge of BADGES) {
      if (earnedBadgeIds.includes(badge.id)) continue
      
      let eligible = false
      
      switch (badge.requirement.type) {
        case 'trips_shared':
          eligible = userStats.tripsShared >= badge.requirement.target
          break
        case 'provinces_visited':
          // This would need additional tracking
          eligible = userStats.placesVisited >= badge.requirement.target * 3 // Approximation
          break
        case 'temples_visited':
          // This would need category-specific tracking
          eligible = userStats.placesVisited >= badge.requirement.target
          break
        case 'helpful_votes':
          eligible = userStats.helpfulVotes >= badge.requirement.target
          break
        case 'photos_uploaded':
          eligible = userStats.photosUploaded >= badge.requirement.target
          break
        case 'followers':
          eligible = userStats.followersCount >= badge.requirement.target
          break
        // Add more cases as needed
      }
      
      if (eligible) {
        const earnedBadge = {
          ...badge,
          earnedAt: new Date().toISOString()
        }
        newBadges.push(earnedBadge)
        
        // Award badge points
        await awardPoints(userId, 'badge_earned', { badge: earnedBadge })
      }
    }
    
    if (newBadges.length > 0) {
      await updateUserBadges(userId, newBadges)
    }
    
    return newBadges
  } catch (error) {
    console.error('Badge eligibility check error:', error)
    return []
  }
}

// Community challenges
export const getCommunityChallenge = (): CommunityChallenge[] => [
  {
    id: 'photo_contest_nov',
    title: '📸 ประกวดภาพ "ไทยในสายตาฉัน"',
    description: 'แชร์ภาพถ่ายสถานที่ท่องเที่ยวในไทยที่สวยที่สุด',
    type: 'individual',
    category: 'photography',
    startDate: '2024-11-01',
    endDate: '2024-11-30',
    requirements: [
      'อัปโหลดรูปภาพอย่างน้อย 3 รูป',
      'เขียนแคปชั่นบรรยายสถานที่',
      'ใช้แฮชแท็ก #ไทยในสายตาฉัน'
    ],
    rewards: {
      winner: [
        {
          id: 'camera_voucher',
          name: 'บัตรกำนัลร้านกล้อง',
          description: 'บัตรกำนัลมูลค่า 5,000 บาท',
          type: 'voucher',
          value: 5000,
          pointsCost: 0,
          partner: 'Camera Shop',
          expiryDate: '2024-12-31',
          terms: ['ใช้ได้ที่ร้านในเครือเท่านั้น']
        }
      ],
      participant: [
        {
          id: 'participation_badge',
          name: 'เหรียญนักถ่ายภาพ',
          description: 'เหรียญพิเศษสำหรับผู้เข้าร่วม',
          type: 'experience',
          value: 0,
          pointsCost: 0,
          partner: 'TripScope.AI',
          expiryDate: '2025-12-31',
          terms: []
        }
      ]
    },
    participants: 1247,
    status: 'active'
  },
  {
    id: 'review_marathon',
    title: '✍️ มาราธอนรีวิว 30 วัน',
    description: 'เขียนรีวิวสถานที่ท่องเที่ยวทุกวันเป็นเวลา 30 วัน',
    type: 'individual',
    category: 'review',
    startDate: '2024-11-01',
    endDate: '2024-11-30',
    requirements: [
      'เขียนรีวิวอย่างน้อยวันละ 1 รีวิว',
      'รีวิวต้องมีความยาวอย่างน้อย 100 คำ',
      'แนบรูปภาพประกอบ'
    ],
    rewards: {
      winner: [
        {
          id: 'travel_voucher',
          name: 'บัตรกำนัลท่องเที่ยว',
          description: 'บัตรกำนัลมูลค่า 10,000 บาท',
          type: 'voucher',
          value: 10000,
          pointsCost: 0,
          partner: 'Travel Agency',
          expiryDate: '2025-06-30',
          terms: ['ใช้จองแพ็คเกจทัวร์ได้']
        }
      ],
      participant: [
        {
          id: 'reviewer_badge',
          name: 'เหรียญนักรีวิว',
          description: 'เหรียญพิเศษสำหรับนักรีวิว',
          type: 'experience',
          value: 0,
          pointsCost: 0,
          partner: 'TripScope.AI',
          expiryDate: '2025-12-31',
          terms: []
        }
      ]
    },
    participants: 892,
    status: 'active'
  }
]

// Leaderboard system
export const getLeaderboard = async (category: string = 'overall', timeframe: string = 'monthly') => {
  try {
    // Mock leaderboard data
    return {
      category,
      timeframe,
      lastUpdated: new Date().toISOString(),
      leaders: [
        {
          rank: 1,
          userId: 'user_1',
          username: 'TravelExplorer',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
          points: 15420,
          level: 8,
          badges: 12,
          streak: 45
        },
        {
          rank: 2,
          userId: 'user_2',
          username: 'WanderlustThai',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
          points: 14890,
          level: 7,
          badges: 10,
          streak: 32
        },
        {
          rank: 3,
          userId: 'user_3',
          username: 'PhotoTraveler',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
          points: 13567,
          level: 7,
          badges: 15,
          streak: 28
        }
      ]
    }
  } catch (error) {
    console.error('Leaderboard error:', error)
    return null
  }
}

// Reward redemption
export const redeemReward = async (userId: string, rewardId: string): Promise<boolean> => {
  try {
    const userProfile = await getUserGamificationProfile(userId)
    const reward = await getRewardById(rewardId)
    
    if (!reward) {
      throw new Error('Reward not found')
    }
    
    if (userProfile.rewards.availablePoints < reward.pointsCost) {
      throw new Error('Insufficient points')
    }
    
    // Deduct points
    await updateUserPoints(userId, -reward.pointsCost)
    
    // Add to redeemed rewards
    await addRedeemedReward(userId, reward)
    
    // Send notification/email with reward details
    await sendRewardNotification(userId, reward)
    
    return true
  } catch (error) {
    console.error('Reward redemption error:', error)
    return false
  }
}

// Helper functions (mock implementations)
const getUserGamificationProfile = async (userId: string): Promise<GamificationProfile> => {
  // Mock implementation
  return {
    userId,
    level: 5,
    totalPoints: 7500,
    currentStreak: 15,
    longestStreak: 45,
    badges: [],
    achievements: [],
    stats: {
      reviewsWritten: 25,
      photosUploaded: 150,
      placesVisited: 45,
      tripsShared: 8,
      helpfulVotes: 120,
      followersCount: 250,
      followingCount: 180
    },
    leaderboard: {
      globalRank: 1247,
      monthlyRank: 89,
      categoryRanks: { photography: 45, reviews: 123 }
    },
    rewards: {
      availablePoints: 2500,
      redeemedRewards: [],
      voucherBalance: 0
    }
  }
}

const updateUserPoints = async (userId: string, points: number): Promise<void> => {
  // Mock implementation
  console.log(`Updated ${userId} points by ${points}`)
}

const updateUserBadges = async (userId: string, badges: Badge[]): Promise<void> => {
  // Mock implementation
  console.log(`Added ${badges.length} badges to ${userId}`)
}

const checkAchievements = async (userId: string, action: string, metadata?: any): Promise<void> => {
  // Mock implementation
  console.log(`Checked achievements for ${userId} after ${action}`)
}

const getRewardById = async (rewardId: string): Promise<Reward | null> => {
  // Mock implementation
  return {
    id: rewardId,
    name: 'Sample Reward',
    description: 'Sample reward description',
    type: 'voucher',
    value: 1000,
    pointsCost: 500,
    partner: 'Partner',
    expiryDate: '2025-12-31',
    terms: []
  }
}

const addRedeemedReward = async (userId: string, reward: Reward): Promise<void> => {
  // Mock implementation
  console.log(`Added redeemed reward ${reward.id} to ${userId}`)
}

const sendRewardNotification = async (userId: string, reward: Reward): Promise<void> => {
  // Mock implementation
  console.log(`Sent reward notification to ${userId} for ${reward.name}`)
}
