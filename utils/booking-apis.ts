// Booking platform integrations for TripScope.AI

interface BookingRequest {
  hotelId: string
  checkIn: string
  checkOut: string
  guests: number
  rooms: number
}

interface BookingResponse {
  bookingId: string
  confirmationCode: string
  totalPrice: number
  currency: string
  status: 'confirmed' | 'pending' | 'failed'
}

interface PriceComparison {
  platform: string
  price: number
  currency: string
  availability: boolean
  bookingUrl: string
  cancellationPolicy: string
}

// Agoda API Integration
export const agodaAPI = {
  async searchHotels(destination: string, checkIn: string, checkOut: string, guests: number = 2) {
    try {
      const response = await fetch('/api/agoda/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ destination, checkIn, checkOut, guests })
      })
      
      if (!response.ok) throw new Error('Agoda API error')
      return await response.json()
    } catch (error) {
      console.error('Agoda search error:', error)
      return { hotels: [], error: 'Failed to fetch from Agoda' }
    }
  },

  async getHotelDetails(hotelId: string) {
    try {
      const response = await fetch(`/api/agoda/hotel/${hotelId}`)
      if (!response.ok) throw new Error('Hotel not found')
      return await response.json()
    } catch (error) {
      console.error('Agoda hotel details error:', error)
      return null
    }
  },

  async checkAvailability(hotelId: string, checkIn: string, checkOut: string) {
    try {
      const response = await fetch('/api/agoda/availability', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hotelId, checkIn, checkOut })
      })
      
      return await response.json()
    } catch (error) {
      console.error('Agoda availability error:', error)
      return { available: false, price: null }
    }
  }
}

// Booking.com API Integration
export const bookingAPI = {
  async searchHotels(destination: string, checkIn: string, checkOut: string, guests: number = 2) {
    try {
      const response = await fetch('/api/booking/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ destination, checkIn, checkOut, guests })
      })
      
      if (!response.ok) throw new Error('Booking.com API error')
      return await response.json()
    } catch (error) {
      console.error('Booking.com search error:', error)
      return { hotels: [], error: 'Failed to fetch from Booking.com' }
    }
  },

  async getHotelDetails(hotelId: string) {
    try {
      const response = await fetch(`/api/booking/hotel/${hotelId}`)
      if (!response.ok) throw new Error('Hotel not found')
      return await response.json()
    } catch (error) {
      console.error('Booking.com hotel details error:', error)
      return null
    }
  }
}

// Price Comparison Engine
export const comparePrices = async (
  hotelId: string, 
  checkIn: string, 
  checkOut: string, 
  guests: number = 2
): Promise<PriceComparison[]> => {
  try {
    const [agodaResult, bookingResult] = await Promise.allSettled([
      agodaAPI.checkAvailability(hotelId, checkIn, checkOut),
      bookingAPI.searchHotels('', checkIn, checkOut, guests) // Simplified for demo
    ])

    const comparisons: PriceComparison[] = []

    // Process Agoda results
    if (agodaResult.status === 'fulfilled' && agodaResult.value.available) {
      comparisons.push({
        platform: 'Agoda',
        price: agodaResult.value.price,
        currency: 'USD',
        availability: true,
        bookingUrl: `https://agoda.com/hotel/${hotelId}`,
        cancellationPolicy: 'Free cancellation until 24h before check-in'
      })
    }

    // Process Booking.com results
    if (bookingResult.status === 'fulfilled' && bookingResult.value.hotels?.length > 0) {
      const hotel = bookingResult.value.hotels[0]
      comparisons.push({
        platform: 'Booking.com',
        price: hotel.price || 0,
        currency: 'USD',
        availability: true,
        bookingUrl: `https://booking.com/hotel/${hotelId}`,
        cancellationPolicy: 'Free cancellation until 18:00 on day of arrival'
      })
    }

    // Add direct booking option
    comparisons.push({
      platform: 'Direct Booking',
      price: comparisons.length > 0 ? Math.min(...comparisons.map(c => c.price)) - 5 : 99,
      currency: 'USD',
      availability: true,
      bookingUrl: `/book/${hotelId}`,
      cancellationPolicy: 'Free cancellation until 24h before check-in'
    })

    return comparisons.sort((a, b) => a.price - b.price)
  } catch (error) {
    console.error('Price comparison error:', error)
    return []
  }
}

// Mock booking function for demo
export const createBooking = async (request: BookingRequest): Promise<BookingResponse> => {
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Mock successful booking
    return {
      bookingId: `BK${Date.now()}`,
      confirmationCode: `CONF${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
      totalPrice: 99 * ((new Date(request.checkOut).getTime() - new Date(request.checkIn).getTime()) / (1000 * 60 * 60 * 24)),
      currency: 'USD',
      status: 'confirmed'
    }
  } catch (error) {
    console.error('Booking creation error:', error)
    return {
      bookingId: '',
      confirmationCode: '',
      totalPrice: 0,
      currency: 'USD',
      status: 'failed'
    }
  }
}

// Hotel availability checker
export const checkRealTimeAvailability = async (
  hotelId: string,
  checkIn: string,
  checkOut: string
) => {
  try {
    const [agoda, booking] = await Promise.allSettled([
      agodaAPI.checkAvailability(hotelId, checkIn, checkOut),
      bookingAPI.searchHotels('', checkIn, checkOut, 2)
    ])

    return {
      agoda: agoda.status === 'fulfilled' ? agoda.value : null,
      booking: booking.status === 'fulfilled' ? booking.value : null,
      lastUpdated: new Date().toISOString()
    }
  } catch (error) {
    console.error('Availability check error:', error)
    return null
  }
}

// Review aggregation from multiple sources
export const aggregateReviews = async (hotelId: string) => {
  try {
    // Mock aggregated reviews from multiple platforms
    return {
      totalReviews: 1234,
      averageRating: 4.6,
      sources: {
        agoda: { count: 456, rating: 4.7 },
        booking: { count: 678, rating: 4.5 },
        tripadvisor: { count: 100, rating: 4.8 }
      },
      recentReviews: [
        {
          platform: 'Agoda',
          rating: 5,
          comment: 'Excellent stay with great service',
          date: '2024-02-15',
          verified: true
        },
        {
          platform: 'Booking.com',
          rating: 4,
          comment: 'Good location but room was small',
          date: '2024-02-10',
          verified: true
        }
      ]
    }
  } catch (error) {
    console.error('Review aggregation error:', error)
    return null
  }
}
