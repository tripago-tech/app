import { NextRequest, NextResponse } from 'next/server'
import { analyzeReviewSentiment, generateHotelReviewSummary } from '@/utils/ai-review-analyzer'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { reviewText, language, hotelId } = body

    if (!reviewText) {
      return NextResponse.json(
        { error: 'Review text is required' },
        { status: 400 }
      )
    }

    // Analyze individual review
    const analysis = await analyzeReviewSentiment(reviewText, language)

    return NextResponse.json({
      success: true,
      analysis
    })

  } catch (error) {
    console.error('Review analysis error:', error)
    return NextResponse.json(
      { error: 'Failed to analyze review' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const hotelId = searchParams.get('hotelId')

    if (!hotelId) {
      return NextResponse.json(
        { error: 'Hotel ID is required' },
        { status: 400 }
      )
    }

    // Mock reviews data - in production, fetch from database
    const reviews = [
      { content: 'Great hotel with excellent service', language: 'en' },
      { content: 'โรงแรมดีมาก พนักงานใจดี', language: 'th' },
      { content: 'Clean rooms but WiFi was slow', language: 'en' }
    ]

    // Generate comprehensive hotel review summary
    const summary = await generateHotelReviewSummary(hotelId, reviews)

    return NextResponse.json({
      success: true,
      summary
    })

  } catch (error) {
    console.error('Hotel review summary error:', error)
    return NextResponse.json(
      { error: 'Failed to generate review summary' },
      { status: 500 }
    )
  }
}
