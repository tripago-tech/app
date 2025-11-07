// Advanced AI review analysis and sentiment detection

interface ReviewAnalysis {
  reviewId: string
  originalText: string
  language: 'th' | 'en' | 'auto'
  sentiment: {
    overall: 'positive' | 'negative' | 'neutral'
    score: number // -1 to 1
    confidence: number // 0 to 1
    emotions: {
      joy: number
      anger: number
      fear: number
      sadness: number
      surprise: number
      trust: number
    }
  }
  aspects: {
    location: { score: number, mentions: string[] }
    cleanliness: { score: number, mentions: string[] }
    service: { score: number, mentions: string[] }
    value: { score: number, mentions: string[] }
    amenities: { score: number, mentions: string[] }
    food: { score: number, mentions: string[] }
  }
  keywords: {
    positive: string[]
    negative: string[]
    neutral: string[]
  }
  summary: string
  aiTags: string[]
  credibilityScore: number
  helpfulnessScore: number
}

interface HotelReviewSummary {
  hotelId: string
  totalReviews: number
  overallRating: number
  sentimentDistribution: {
    positive: number
    negative: number
    neutral: number
  }
  aspectRatings: {
    location: number
    cleanliness: number
    service: number
    value: number
    amenities: number
    food: number
  }
  aiSummary: {
    strengths: string[]
    weaknesses: string[]
    recommendations: string[]
    guestProfile: string
  }
  trendAnalysis: {
    recentTrend: 'improving' | 'declining' | 'stable'
    seasonalPatterns: any[]
    competitorComparison: any
  }
  reviewHighlights: {
    mostHelpful: ReviewAnalysis[]
    mostRecent: ReviewAnalysis[]
    mostCritical: ReviewAnalysis[]
  }
}

// Advanced sentiment analysis using multiple techniques
export const analyzeReviewSentiment = async (reviewText: string, language: string = 'auto'): Promise<ReviewAnalysis> => {
  try {
    // Detect language if auto
    const detectedLanguage = language === 'auto' ? await detectLanguage(reviewText) : language
    
    // Clean and preprocess text
    const cleanedText = preprocessText(reviewText, detectedLanguage)
    
    // Multi-model sentiment analysis
    const [
      basicSentiment,
      aspectSentiment,
      emotionAnalysis,
      keywordExtraction
    ] = await Promise.all([
      analyzeBasicSentiment(cleanedText, detectedLanguage),
      analyzeAspectSentiment(cleanedText, detectedLanguage),
      analyzeEmotions(cleanedText, detectedLanguage),
      extractKeywords(cleanedText, detectedLanguage)
    ])
    
    // Generate AI summary
    const summary = await generateReviewSummary(cleanedText, basicSentiment, detectedLanguage)
    
    // Calculate credibility and helpfulness scores
    const credibilityScore = calculateCredibilityScore(reviewText, basicSentiment)
    const helpfulnessScore = calculateHelpfulnessScore(reviewText, aspectSentiment)
    
    return {
      reviewId: `review_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      originalText: reviewText,
      language: detectedLanguage as 'th' | 'en' | 'auto',
      sentiment: {
        overall: basicSentiment.label,
        score: basicSentiment.score,
        confidence: basicSentiment.confidence,
        emotions: emotionAnalysis
      },
      aspects: aspectSentiment,
      keywords: keywordExtraction,
      summary,
      aiTags: generateAITags(basicSentiment, aspectSentiment, keywordExtraction),
      credibilityScore,
      helpfulnessScore
    }
  } catch (error) {
    console.error('Review analysis error:', error)
    return getMockReviewAnalysis(reviewText)
  }
}

// Language detection
const detectLanguage = async (text: string): Promise<string> => {
  // Simple heuristic - in production use proper language detection API
  const thaiPattern = /[\u0E00-\u0E7F]/
  return thaiPattern.test(text) ? 'th' : 'en'
}

// Text preprocessing
const preprocessText = (text: string, language: string): string => {
  // Remove special characters, normalize whitespace
  let cleaned = text.replace(/[^\w\s\u0E00-\u0E7F]/g, ' ')
  cleaned = cleaned.replace(/\s+/g, ' ').trim()
  
  // Language-specific preprocessing
  if (language === 'th') {
    // Thai-specific text cleaning
    cleaned = cleaned.replace(/ๆ+/g, 'ๆ') // Normalize repetition marks
  }
  
  return cleaned
}

// Basic sentiment analysis
const analyzeBasicSentiment = async (text: string, language: string) => {
  // Mock implementation - in production use OpenAI, Google Cloud AI, or local models
  const positiveWords = language === 'th' 
    ? ['ดี', 'เยี่ยม', 'สวย', 'สะอาด', 'ประทับใจ', 'แนะนำ', 'คุ้มค่า', 'สบาย']
    : ['good', 'excellent', 'amazing', 'clean', 'beautiful', 'recommend', 'worth', 'comfortable']
  
  const negativeWords = language === 'th'
    ? ['แย่', 'สกปรก', 'เก่า', 'แพง', 'ไม่ดี', 'ผิดหวัง', 'เสีย', 'ช้า']
    : ['bad', 'dirty', 'old', 'expensive', 'poor', 'disappointing', 'broken', 'slow']
  
  const lowerText = text.toLowerCase()
  const positiveCount = positiveWords.filter(word => lowerText.includes(word)).length
  const negativeCount = negativeWords.filter(word => lowerText.includes(word)).length
  
  const score = (positiveCount - negativeCount) / Math.max(positiveCount + negativeCount, 1)
  const confidence = Math.min((positiveCount + negativeCount) / 10, 1)
  
  let label: 'positive' | 'negative' | 'neutral'
  if (score > 0.2) label = 'positive'
  else if (score < -0.2) label = 'negative'
  else label = 'neutral'
  
  return { label, score, confidence }
}

// Aspect-based sentiment analysis
const analyzeAspectSentiment = async (text: string, language: string) => {
  const aspects = {
    location: { keywords: language === 'th' ? ['ที่ตั้ง', 'สถานที่', 'ใกล้', 'ไกล', 'เดิน'] : ['location', 'place', 'near', 'far', 'walk'] },
    cleanliness: { keywords: language === 'th' ? ['สะอาด', 'สกปรก', 'เก็บ', 'ทำความสะอาด'] : ['clean', 'dirty', 'tidy', 'mess'] },
    service: { keywords: language === 'th' ? ['พนักงาน', 'บริการ', 'ยิ้ม', 'ช่วยเหลือ', 'ใจดี'] : ['staff', 'service', 'help', 'friendly', 'rude'] },
    value: { keywords: language === 'th' ? ['ราคา', 'คุ้ม', 'แพง', 'ถูก', 'เงิน'] : ['price', 'value', 'expensive', 'cheap', 'money'] },
    amenities: { keywords: language === 'th' ? ['สระ', 'ฟิตเนส', 'ไวไฟ', 'อาหารเช้า'] : ['pool', 'gym', 'wifi', 'breakfast'] },
    food: { keywords: language === 'th' ? ['อาหาร', 'อร่อย', 'เลว', 'หวาน', 'เค็ม'] : ['food', 'delicious', 'terrible', 'sweet', 'salty'] }
  }
  
  const result: any = {}
  
  for (const [aspect, data] of Object.entries(aspects)) {
    const mentions = data.keywords.filter(keyword => text.toLowerCase().includes(keyword))
    const score = mentions.length > 0 ? Math.random() * 2 - 1 : 0 // Mock scoring
    
    result[aspect] = {
      score,
      mentions: mentions.slice(0, 3) // Limit mentions
    }
  }
  
  return result
}

// Emotion analysis
const analyzeEmotions = async (text: string, language: string) => {
  // Mock emotion detection - in production use emotion detection APIs
  return {
    joy: Math.random() * 0.8,
    anger: Math.random() * 0.3,
    fear: Math.random() * 0.2,
    sadness: Math.random() * 0.3,
    surprise: Math.random() * 0.4,
    trust: Math.random() * 0.7
  }
}

// Keyword extraction
const extractKeywords = async (text: string, language: string) => {
  // Simple keyword extraction - in production use NLP libraries
  const words = text.toLowerCase().split(/\s+/)
  
  const positiveWords = words.filter(word => 
    (language === 'th' ? ['ดี', 'เยี่ยม', 'สวย'] : ['good', 'excellent', 'beautiful']).includes(word)
  )
  
  const negativeWords = words.filter(word => 
    (language === 'th' ? ['แย่', 'สกปรก', 'เก่า'] : ['bad', 'dirty', 'old']).includes(word)
  )
  
  const neutralWords = words.filter(word => 
    !positiveWords.includes(word) && !negativeWords.includes(word) && word.length > 3
  ).slice(0, 5)
  
  return {
    positive: positiveWords.slice(0, 5),
    negative: negativeWords.slice(0, 5),
    neutral: neutralWords
  }
}

// Generate AI summary
const generateReviewSummary = async (text: string, sentiment: any, language: string): Promise<string> => {
  // Mock AI summary generation
  if (language === 'th') {
    if (sentiment.label === 'positive') {
      return 'ผู้เข้าพักมีความประทับใจในโรงแรมนี้ โดยเฉพาะด้านการบริการและความสะอาด'
    } else if (sentiment.label === 'negative') {
      return 'ผู้เข้าพักพบปัญหาบางประการ ควรปรับปรุงด้านการบริการและสิ่งอำนวยความสะดวก'
    } else {
      return 'ผู้เข้าพักมีความเห็นแบบผสมผสาน มีทั้งจุดดีและจุดที่ควรปรับปรุง'
    }
  } else {
    if (sentiment.label === 'positive') {
      return 'Guest had a positive experience, particularly praising service and cleanliness'
    } else if (sentiment.label === 'negative') {
      return 'Guest encountered some issues, suggesting improvements in service and facilities'
    } else {
      return 'Guest had mixed feelings with both positive and negative aspects mentioned'
    }
  }
}

// Generate AI tags
const generateAITags = (sentiment: any, aspects: any, keywords: any): string[] => {
  const tags: string[] = []
  
  // Sentiment-based tags
  if (sentiment.confidence > 0.7) {
    tags.push(sentiment.label === 'positive' ? '👍 Highly Positive' : '👎 Highly Critical')
  }
  
  // Aspect-based tags
  Object.entries(aspects).forEach(([aspect, data]: [string, any]) => {
    if (data.score > 0.5) {
      tags.push(`✅ Great ${aspect}`)
    } else if (data.score < -0.5) {
      tags.push(`⚠️ Poor ${aspect}`)
    }
  })
  
  // Keyword-based tags
  if (keywords.positive.length > 3) tags.push('🌟 Very Satisfied')
  if (keywords.negative.length > 3) tags.push('😞 Multiple Issues')
  
  return tags.slice(0, 4) // Limit to 4 tags
}

// Calculate credibility score
const calculateCredibilityScore = (text: string, sentiment: any): number => {
  let score = 0.5 // Base score
  
  // Length factor
  if (text.length > 100) score += 0.2
  if (text.length > 300) score += 0.1
  
  // Detail factor
  const detailWords = ['because', 'specifically', 'particularly', 'เพราะ', 'โดยเฉพาะ']
  if (detailWords.some(word => text.toLowerCase().includes(word))) score += 0.2
  
  // Balanced review factor
  if (sentiment.label === 'neutral' || (sentiment.score > -0.8 && sentiment.score < 0.8)) {
    score += 0.1
  }
  
  return Math.min(score, 1)
}

// Calculate helpfulness score
const calculateHelpfulnessScore = (text: string, aspects: any): number => {
  let score = 0.3 // Base score
  
  // Aspect coverage
  const mentionedAspects = Object.values(aspects).filter((aspect: any) => aspect.mentions.length > 0)
  score += (mentionedAspects.length / 6) * 0.4
  
  // Specific details
  if (text.includes('recommend') || text.includes('แนะนำ')) score += 0.2
  if (text.includes('tip') || text.includes('คำแนะนำ')) score += 0.1
  
  return Math.min(score, 1)
}

// Aggregate hotel reviews
export const generateHotelReviewSummary = async (hotelId: string, reviews: any[]): Promise<HotelReviewSummary> => {
  try {
    // Analyze all reviews
    const analyses = await Promise.all(
      reviews.map(review => analyzeReviewSentiment(review.content, review.language))
    )
    
    // Calculate aggregated metrics
    const totalReviews = analyses.length
    const overallRating = analyses.reduce((sum, analysis) => sum + ((analysis.sentiment.score + 1) * 2.5), 0) / totalReviews
    
    // Sentiment distribution
    const sentimentCounts = analyses.reduce((counts, analysis) => {
      counts[analysis.sentiment.overall]++
      return counts
    }, { positive: 0, negative: 0, neutral: 0 })
    
    const sentimentDistribution = {
      positive: (sentimentCounts.positive / totalReviews) * 100,
      negative: (sentimentCounts.negative / totalReviews) * 100,
      neutral: (sentimentCounts.neutral / totalReviews) * 100
    }
    
    // Aspect ratings
    const aspectRatings = calculateAspectRatings(analyses)
    
    // AI summary
    const aiSummary = generateAISummary(analyses, aspectRatings)
    
    // Trend analysis
    const trendAnalysis = analyzeTrends(analyses)
    
    // Review highlights
    const reviewHighlights = selectReviewHighlights(analyses)
    
    return {
      hotelId,
      totalReviews,
      overallRating,
      sentimentDistribution,
      aspectRatings,
      aiSummary,
      trendAnalysis,
      reviewHighlights
    }
  } catch (error) {
    console.error('Hotel review summary error:', error)
    return getMockHotelSummary(hotelId)
  }
}

// Helper functions
const calculateAspectRatings = (analyses: ReviewAnalysis[]) => {
  const aspects = ['location', 'cleanliness', 'service', 'value', 'amenities', 'food']
  const ratings: any = {}
  
  aspects.forEach(aspect => {
    const scores = analyses
      .map(analysis => analysis.aspects[aspect as keyof typeof analysis.aspects]?.score || 0)
      .filter(score => score !== 0)
    
    ratings[aspect] = scores.length > 0 
      ? ((scores.reduce((sum, score) => sum + score, 0) / scores.length) + 1) * 2.5
      : 3.0
  })
  
  return ratings
}

const generateAISummary = (analyses: ReviewAnalysis[], aspectRatings: any) => {
  const strengths: string[] = []
  const weaknesses: string[] = []
  
  Object.entries(aspectRatings).forEach(([aspect, rating]: [string, any]) => {
    if (rating > 4.0) {
      strengths.push(`Excellent ${aspect} (${rating.toFixed(1)}/5)`)
    } else if (rating < 3.0) {
      weaknesses.push(`Needs improvement in ${aspect} (${rating.toFixed(1)}/5)`)
    }
  })
  
  return {
    strengths: strengths.slice(0, 3),
    weaknesses: weaknesses.slice(0, 3),
    recommendations: [
      'Book in advance for better rates',
      'Check recent reviews for current conditions',
      'Contact hotel directly for special requests'
    ],
    guestProfile: 'Popular with couples and business travelers'
  }
}

const analyzeTrends = (analyses: ReviewAnalysis[]) => {
  // Mock trend analysis
  return {
    recentTrend: 'improving' as const,
    seasonalPatterns: [],
    competitorComparison: {}
  }
}

const selectReviewHighlights = (analyses: ReviewAnalysis[]) => {
  const sortedByHelpfulness = [...analyses].sort((a, b) => b.helpfulnessScore - a.helpfulnessScore)
  const sortedByCredibility = [...analyses].sort((a, b) => b.credibilityScore - a.credibilityScore)
  
  return {
    mostHelpful: sortedByHelpfulness.slice(0, 3),
    mostRecent: analyses.slice(-3),
    mostCritical: analyses.filter(a => a.sentiment.overall === 'negative').slice(0, 2)
  }
}

// Mock data
const getMockReviewAnalysis = (text: string): ReviewAnalysis => ({
  reviewId: 'mock_review',
  originalText: text,
  language: 'en',
  sentiment: {
    overall: 'positive',
    score: 0.7,
    confidence: 0.8,
    emotions: { joy: 0.6, anger: 0.1, fear: 0.1, sadness: 0.1, surprise: 0.2, trust: 0.7 }
  },
  aspects: {
    location: { score: 0.8, mentions: ['great location'] },
    cleanliness: { score: 0.7, mentions: ['clean rooms'] },
    service: { score: 0.6, mentions: ['friendly staff'] },
    value: { score: 0.5, mentions: ['good value'] },
    amenities: { score: 0.4, mentions: ['nice pool'] },
    food: { score: 0.3, mentions: ['decent breakfast'] }
  },
  keywords: {
    positive: ['excellent', 'clean', 'friendly'],
    negative: ['slow', 'noisy'],
    neutral: ['hotel', 'room', 'stay']
  },
  summary: 'Guest had a positive experience with good location and service',
  aiTags: ['👍 Highly Positive', '✅ Great location', '✅ Great cleanliness'],
  credibilityScore: 0.8,
  helpfulnessScore: 0.7
})

const getMockHotelSummary = (hotelId: string): HotelReviewSummary => ({
  hotelId,
  totalReviews: 150,
  overallRating: 4.2,
  sentimentDistribution: { positive: 65, negative: 15, neutral: 20 },
  aspectRatings: {
    location: 4.5,
    cleanliness: 4.2,
    service: 4.0,
    value: 3.8,
    amenities: 4.1,
    food: 3.9
  },
  aiSummary: {
    strengths: ['Excellent location', 'Great cleanliness'],
    weaknesses: ['Value for money could be better'],
    recommendations: ['Book early for better rates', 'Try the breakfast buffet'],
    guestProfile: 'Popular with business travelers and couples'
  },
  trendAnalysis: {
    recentTrend: 'improving',
    seasonalPatterns: [],
    competitorComparison: {}
  },
  reviewHighlights: {
    mostHelpful: [],
    mostRecent: [],
    mostCritical: []
  }
})
