import { NextRequest, NextResponse } from 'next/server'
import { awardPoints, checkBadgeEligibility } from '@/utils/gamification-engine'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, action, metadata } = body

    if (!userId || !action) {
      return NextResponse.json(
        { error: 'User ID and action are required' },
        { status: 400 }
      )
    }

    // Award points for the action
    const pointsAwarded = await awardPoints(userId, action, metadata)

    // Check for new badges
    const newBadges = await checkBadgeEligibility(userId)

    return NextResponse.json({
      success: true,
      pointsAwarded,
      newBadges,
      message: newBadges.length > 0 
        ? `Congratulations! You earned ${newBadges.length} new badge(s)!`
        : `You earned ${pointsAwarded} points!`
    })

  } catch (error) {
    console.error('Points award error:', error)
    return NextResponse.json(
      { error: 'Failed to award points' },
      { status: 500 }
    )
  }
}
