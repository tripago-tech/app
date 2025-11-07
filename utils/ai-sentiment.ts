// AI-powered review sentiment analysis for TripScope.AI

interface ReviewSentiment {
  score: number // -1 to 1 (negative to positive)
  confidence: number // 0 to 1
  emotions: {
    joy: number
    anger: number
    fear: number
    sadness: number
    surprise: number
  }
  keywords: {
    positive: string[]
    negative: string[]
  }
  aspects: {
    location: number
    cleanliness: number
    service: number
    value: number
    amenities: number
  }
}

interface ReviewInsight {
  category: string
  sentiment: 'positive' | 'negative' | 'neutral'
  mentions: number
  examples: string[]
}

// Mock AI sentiment analysis (in production, use OpenAI or similar)
export const analyzeSentiment = async (reviewText: string): Promise<ReviewSentiment> => {
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Simple keyword-based sentiment analysis for demo
    const positiveWords = ['excellent', 'amazing', 'great', 'wonderful', 'perfect', 'love', 'best', 'fantastic', 'outstanding', 'beautiful']
    const negativeWords = ['terrible', 'awful', 'bad', 'worst', 'horrible', 'dirty', 'noisy', 'expensive', 'poor', 'disappointing']
    
    const text = reviewText.toLowerCase()
    const positiveCount = positiveWords.filter(word => text.includes(word)).length
    const negativeCount = negativeWords.filter(word => text.includes(word)).length
    
    const score = (positiveCount - negativeCount) / Math.max(positiveCount + negativeCount, 1)
    
    return {
      score: Math.max(-1, Math.min(1, score)),
      confidence: 0.85,
      emotions: {
        joy: positiveCount > negativeCount ? 0.8 : 0.2,
        anger: negativeCount > positiveCount ? 0.6 : 0.1,
        fear: 0.1,
        sadness: negativeCount > 0 ? 0.3 : 0.1,
        surprise: 0.2
      },
      keywords: {
        positive: positiveWords.filter(word => text.includes(word)),
        negative: negativeWords.filter(word => text.includes(word))
      },
      aspects: {
        location: text.includes('location') ? (positiveCount > negativeCount ? 0.8 : 0.3) : 0.5,
        cleanliness: text.includes('clean') ? (positiveCount > negativeCount ? 0.9 : 0.2) : 0.5,
        service: text.includes('service') || text.includes('staff') ? (positiveCount > negativeCount ? 0.8 : 0.3) : 0.5,
        value: text.includes('price') || text.includes('value') ? (positiveCount > negativeCount ? 0.7 : 0.4) : 0.5,
        amenities: text.includes('pool') || text.includes('wifi') ? (positiveCount > negativeCount ? 0.8 : 0.4) : 0.5
      }
    }
  } catch (error) {
    console.error('Sentiment analysis error:', error)
    return {
      score: 0,
      confidence: 0,
      emotions: { joy: 0, anger: 0, fear: 0, sadness: 0, surprise: 0 },
      keywords: { positive: [], negative: [] },
      aspects: { location: 0.5, cleanliness: 0.5, service: 0.5, value: 0.5, amenities: 0.5 }
    }
  }
}

// Analyze multiple reviews and generate insights
export const generateReviewInsights = async (reviews: Array<{content: string, rating: number}>): Promise<ReviewInsight[]> => {
  try {
    const sentiments = await Promise.all(
      reviews.map(review => analyzeSentiment(review.content))
    )
    
    // Aggregate insights by category
    const insights: ReviewInsight[] = []
    
    // Location insights
    const locationMentions = sentiments.filter(s => s.aspects.location !== 0.5)
    if (locationMentions.length > 0) {
      const avgLocationScore = locationMentions.reduce((sum, s) => sum + s.aspects.location, 0) / locationMentions.length
      insights.push({
        category: 'Location',
        sentiment: avgLocationScore > 0.6 ? 'positive' : avgLocationScore < 0.4 ? 'negative' : 'neutral',
        mentions: locationMentions.length,
        examples: avgLocationScore > 0.6 ? ['Great location near beach', 'Perfect central location'] : ['Location is not convenient', 'Too far from attractions']
      })
    }
    
    // Service insights
    const serviceMentions = sentiments.filter(s => s.aspects.service !== 0.5)
    if (serviceMentions.length > 0) {
      const avgServiceScore = serviceMentions.reduce((sum, s) => sum + s.aspects.service, 0) / serviceMentions.length
      insights.push({
        category: 'Service',
        sentiment: avgServiceScore > 0.6 ? 'positive' : avgServiceScore < 0.4 ? 'negative' : 'neutral',
        mentions: serviceMentions.length,
        examples: avgServiceScore > 0.6 ? ['Friendly and helpful staff', 'Excellent customer service'] : ['Poor service quality', 'Unhelpful staff']
      })
    }
    
    // Cleanliness insights
    const cleanlinessMentions = sentiments.filter(s => s.aspects.cleanliness !== 0.5)
    if (cleanlinessMentions.length > 0) {
      const avgCleanlinessScore = cleanlinessMentions.reduce((sum, s) => sum + s.aspects.cleanliness, 0) / cleanlinessMentions.length
      insights.push({
        category: 'Cleanliness',
        sentiment: avgCleanlinessScore > 0.6 ? 'positive' : avgCleanlinessScore < 0.4 ? 'negative' : 'neutral',
        mentions: cleanlinessMentions.length,
        examples: avgCleanlinessScore > 0.6 ? ['Very clean and well-maintained', 'Spotless rooms'] : ['Room was not clean', 'Bathroom needs cleaning']
      })
    }
    
    return insights
  } catch (error) {
    console.error('Review insights error:', error)
    return []
  }
}

// Generate AI summary of reviews
export const generateReviewSummary = async (reviews: Array<{content: string, rating: number}>): Promise<string> => {
  try {
    const insights = await generateReviewInsights(reviews)
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    
    let summary = `Based on ${reviews.length} reviews (avg ${avgRating.toFixed(1)}/5), `
    
    const positiveInsights = insights.filter(i => i.sentiment === 'positive')
    const negativeInsights = insights.filter(i => i.sentiment === 'negative')
    
    if (positiveInsights.length > 0) {
      summary += `guests particularly praise the ${positiveInsights.map(i => i.category.toLowerCase()).join(', ')}. `
    }
    
    if (negativeInsights.length > 0) {
      summary += `Some concerns were raised about ${negativeInsights.map(i => i.category.toLowerCase()).join(', ')}. `
    }
    
    if (avgRating >= 4.5) {
      summary += 'Overall, this hotel receives excellent reviews from guests.'
    } else if (avgRating >= 4.0) {
      summary += 'Overall, guests have a positive experience at this hotel.'
    } else if (avgRating >= 3.5) {
      summary += 'Guest experiences are mixed with room for improvement.'
    } else {
      summary += 'This hotel has received below-average reviews from guests.'
    }
    
    return summary
  } catch (error) {
    console.error('Review summary error:', error)
    return 'Unable to generate review summary at this time.'
  }
}

// Real-time sentiment monitoring
export const monitorReviewSentiment = async (hotelId: string) => {
  try {
    // Mock real-time sentiment monitoring
    return {
      hotelId,
      currentSentiment: 0.75, // Positive
      trend: 'improving', // 'improving' | 'declining' | 'stable'
      alertLevel: 'green', // 'green' | 'yellow' | 'red'
      recentChanges: [
        { date: '2024-02-15', sentiment: 0.8, change: '+0.05' },
        { date: '2024-02-14', sentiment: 0.75, change: '+0.02' },
        { date: '2024-02-13', sentiment: 0.73, change: '-0.01' }
      ],
      recommendations: [
        'Continue excellent service standards',
        'Address minor WiFi connectivity issues mentioned in recent reviews'
      ]
    }
  } catch (error) {
    console.error('Sentiment monitoring error:', error)
    return null
  }
}

// Competitive sentiment analysis
export const compareHotelSentiments = async (hotelIds: string[]) => {
  try {
    const comparisons = await Promise.all(
      hotelIds.map(async (id) => {
        const sentiment = await monitorReviewSentiment(id)
        return {
          hotelId: id,
          sentiment: sentiment?.currentSentiment || 0,
          trend: sentiment?.trend || 'stable'
        }
      })
    )
    
    return {
      comparisons,
      leader: comparisons.reduce((best, current) => 
        current.sentiment > best.sentiment ? current : best
      ),
      average: comparisons.reduce((sum, c) => sum + c.sentiment, 0) / comparisons.length
    }
  } catch (error) {
    console.error('Competitive sentiment analysis error:', error)
    return null
  }
}
