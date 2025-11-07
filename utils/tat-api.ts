// Tourism Authority of Thailand (TAT) API integration
const TAT_API_BASE = 'https://tatapi.tourismthailand.org/tatapi/v5'

export interface TATPlace {
  place_id: string
  place_name: string
  place_information: {
    place_location: {
      province: string
      district: string
    }
    detail: string
    contact: {
      phones: string[]
      urls: string[]
    }
  }
  thumbnail_url: string
  web_picture_urls: string[]
  category_code: string
  category_description: string
}

export const fetchTATPlaces = async (province?: string, category?: string) => {
  try {
    const params = new URLSearchParams()
    if (province) params.append('provinceName', province)
    if (category) params.append('categoryCode', category)
    params.append('numberOfResult', '20')
    
    const response = await fetch(`${TAT_API_BASE}/places/search?${params}`)
    
    if (!response.ok) {
      throw new Error('Failed to fetch TAT data')
    }
    
    const data = await response.json()
    return data.result || []
  } catch (error) {
    console.error('TAT API error:', error)
    // Return mock data as fallback
    return getMockTATData()
  }
}

export const getMockTATData = (): TATPlace[] => [
  {
    place_id: 'P03001',
    place_name: 'Grand Palace',
    place_information: {
      place_location: {
        province: 'Bangkok',
        district: 'Phra Nakhon'
      },
      detail: 'The Grand Palace is a complex of buildings at the heart of Bangkok, Thailand.',
      contact: {
        phones: ['+66 2 623 5500'],
        urls: ['https://www.palaces.thai.net']
      }
    },
    thumbnail_url: 'https://images.unsplash.com/photo-1563492065-1a83e8c2b2e8?w=400',
    web_picture_urls: ['https://images.unsplash.com/photo-1563492065-1a83e8c2b2e8?w=800'],
    category_code: 'A01001',
    category_description: 'Historical Site'
  },
  {
    place_id: 'P05001',
    place_name: 'Doi Suthep Temple',
    place_information: {
      place_location: {
        province: 'Chiang Mai',
        district: 'Mueang Chiang Mai'
      },
      detail: 'Wat Phra That Doi Suthep is a Theravada Buddhist temple in Chiang Mai Province, Thailand.',
      contact: {
        phones: ['+66 53 295 002'],
        urls: ['https://www.doisuthep.com']
      }
    },
    thumbnail_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
    web_picture_urls: ['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'],
    category_code: 'A01002',
    category_description: 'Temple'
  }
]

export const searchTATPlaces = async (query: string) => {
  try {
    const response = await fetch(`${TAT_API_BASE}/places/search?keyword=${encodeURIComponent(query)}&numberOfResult=10`)
    
    if (!response.ok) {
      throw new Error('Failed to search TAT places')
    }
    
    const data = await response.json()
    return data.result || []
  } catch (error) {
    console.error('TAT search error:', error)
    return getMockTATData().filter(place => 
      place.place_name.toLowerCase().includes(query.toLowerCase()) ||
      place.place_information.place_location.province.toLowerCase().includes(query.toLowerCase())
    )
  }
}
