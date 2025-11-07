// Unsplash API integration for travel photos
const UNSPLASH_ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY || 'demo'

export const fetchTravelImages = async (query: string, count: number = 6) => {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query + ' thailand travel')}&per_page=${count}&client_id=${UNSPLASH_ACCESS_KEY}`
    )
    
    if (!response.ok) {
      throw new Error('Failed to fetch images')
    }
    
    const data = await response.json()
    return data.results.map((photo: any) => ({
      id: photo.id,
      url: photo.urls.regular,
      thumb: photo.urls.thumb,
      alt: photo.alt_description || query,
      photographer: photo.user.name,
      downloadUrl: photo.links.download_location
    }))
  } catch (error) {
    console.error('Unsplash API error:', error)
    // Fallback to static images
    return [
      {
        id: '1',
        url: `https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800`,
        thumb: `https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400`,
        alt: query,
        photographer: 'Unsplash',
        downloadUrl: '#'
      }
    ]
  }
}

export const getDestinationImage = (destination: string) => {
  const imageMap: Record<string, string> = {
    'bangkok': 'https://images.unsplash.com/photo-1563492065-1a83e8c2b2e8?w=800',
    'chiang-mai': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    'phuket': 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=800',
    'krabi': 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800',
    'koh-samui': 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800',
    'ayutthaya': 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=800'
  }
  
  return imageMap[destination] || imageMap['bangkok']
}
