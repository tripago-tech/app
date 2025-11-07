'use client'
import { Box } from '@chakra-ui/react'
import { MapEmbed } from '@/components/content/MapEmbed'
import { MAP_CONFIG } from '@/utils/constants'

const mockMarkers = [
  {
    position: [13.7563, 100.5018] as [number, number],
    popup: 'Bangkok, Thailand - Amazing street food and temples',
  },
  {
    position: [35.6762, 139.6503] as [number, number],
    popup: 'Tokyo, Japan - Modern city with rich culture',
  },
  {
    position: [40.7128, -74.0060] as [number, number],
    popup: 'New York, USA - The city that never sleeps',
  },
]

export const TravelMap = () => {
  return (
    <Box>
      <MapEmbed
        center={MAP_CONFIG.defaultCenter}
        zoom={2}
        height="500px"
        markers={mockMarkers}
      />
    </Box>
  )
}
