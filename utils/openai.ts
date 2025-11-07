// OpenAI integration for AI trip generation
interface TripPreferences {
  destination: string
  duration: number
  budget: number
  interests: string[]
  travelStyle: string
}

interface GeneratedTrip {
  title: string
  description: string
  totalBudget: number
  days: Array<{
    day: number
    date: string
    city: string
    activities: Array<{
      time: string
      title: string
      description: string
      type: string
      cost: number
      location?: string
    }>
  }>
  tips: string[]
  budgetBreakdown: {
    accommodation: number
    food: number
    activities: number
    transport: number
  }
}

export const generateTripWithAI = async (preferences: TripPreferences): Promise<GeneratedTrip> => {
  try {
    // In production, this would call OpenAI API
    const prompt = `Generate a ${preferences.duration}-day travel itinerary for ${preferences.destination}, Thailand with a budget of $${preferences.budget}. 
    Travel style: ${preferences.travelStyle}. 
    Interests: ${preferences.interests.join(', ')}.
    
    Return detailed daily activities with times, costs, and descriptions.`

    // Mock AI response for demo
    await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate API delay
    
    return generateMockTrip(preferences)
  } catch (error) {
    console.error('OpenAI API error:', error)
    return generateMockTrip(preferences)
  }
}

const generateMockTrip = (preferences: TripPreferences): GeneratedTrip => {
  const destinationData = {
    'bangkok': {
      name: 'Bangkok',
      activities: [
        { title: 'Visit Grand Palace', type: 'attraction', cost: 15 },
        { title: 'Street Food Tour', type: 'food', cost: 25 },
        { title: 'Wat Pho Temple', type: 'attraction', cost: 5 },
        { title: 'Chatuchak Market', type: 'shopping', cost: 30 },
        { title: 'Rooftop Bar', type: 'entertainment', cost: 40 }
      ]
    },
    'chiang-mai': {
      name: 'Chiang Mai',
      activities: [
        { title: 'Doi Suthep Temple', type: 'attraction', cost: 10 },
        { title: 'Night Bazaar', type: 'shopping', cost: 20 },
        { title: 'Cooking Class', type: 'activity', cost: 35 },
        { title: 'Elephant Sanctuary', type: 'attraction', cost: 50 },
        { title: 'Traditional Massage', type: 'wellness', cost: 15 }
      ]
    },
    'phuket': {
      name: 'Phuket',
      activities: [
        { title: 'Patong Beach', type: 'beach', cost: 0 },
        { title: 'Island Hopping Tour', type: 'activity', cost: 60 },
        { title: 'Big Buddha', type: 'attraction', cost: 0 },
        { title: 'Seafood Dinner', type: 'food', cost: 35 },
        { title: 'Sunset Cruise', type: 'activity', cost: 45 }
      ]
    }
  }

  const destination = destinationData[preferences.destination as keyof typeof destinationData] || destinationData.bangkok
  const dailyBudget = preferences.budget / preferences.duration
  
  const days = Array.from({ length: preferences.duration }, (_, index) => {
    const dayActivities = destination.activities.slice(0, 4).map((activity, i) => ({
      time: ['09:00', '12:00', '15:00', '18:00'][i],
      title: activity.title,
      description: `Experience ${activity.title.toLowerCase()} in ${destination.name}`,
      type: activity.type,
      cost: activity.cost,
      location: destination.name
    }))

    return {
      day: index + 1,
      date: new Date(Date.now() + index * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      city: destination.name,
      activities: dayActivities
    }
  })

  const totalCost = days.reduce((total, day) => 
    total + day.activities.reduce((dayTotal, activity) => dayTotal + activity.cost, 0), 0
  )

  return {
    title: `${preferences.duration}-Day ${destination.name} ${preferences.travelStyle} Adventure`,
    description: `A carefully curated ${preferences.duration}-day journey through ${destination.name}, tailored to your ${preferences.travelStyle} travel style and interests in ${preferences.interests.join(', ')}.`,
    totalBudget: totalCost,
    days,
    tips: [
      `Best time to visit ${destination.name} is during cool season (Nov-Feb)`,
      'Always carry cash as many places don\'t accept cards',
      'Learn basic Thai phrases for better local interaction',
      'Try street food but choose busy stalls for freshness'
    ],
    budgetBreakdown: {
      accommodation: Math.round(totalCost * 0.4),
      food: Math.round(totalCost * 0.3),
      activities: Math.round(totalCost * 0.2),
      transport: Math.round(totalCost * 0.1)
    }
  }
}
