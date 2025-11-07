'use client'
import {
  Container,
  Heading,
  SimpleGrid,
  VStack,
  Text,
  Image,
  HStack,
  Box,
  Badge,
} from '@chakra-ui/react'
import { Card } from '@/components/ui/Card'
import { Rating } from '@/components/ui/Rating'
import { Button } from '@/components/ui/Button'
import { FaMapMarkerAlt, FaStar } from 'react-icons/fa'

const featuredHotels = [
  {
    id: 'h1',
    name: 'Paradise Resort Phuket',
    location: 'Patong Beach, Phuket',
    rating: 4.8,
    reviewCount: 1234,
    price: 99,
    originalPrice: 120,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500',
    starRating: 5,
    amenities: ['WiFi', 'Pool', 'Beach Access', 'Spa'],
    discount: 18
  },
  {
    id: 'h2',
    name: 'Bangkok Grand Hotel',
    location: 'Sukhumvit, Bangkok',
    rating: 4.5,
    reviewCount: 892,
    price: 75,
    originalPrice: 85,
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=500',
    starRating: 4,
    amenities: ['WiFi', 'Gym', 'Restaurant', 'Airport Shuttle'],
    discount: 12
  },
  {
    id: 'h3',
    name: 'Chiang Mai Boutique',
    location: 'Old City, Chiang Mai',
    rating: 4.7,
    reviewCount: 567,
    price: 45,
    originalPrice: 55,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500',
    starRating: 3,
    amenities: ['WiFi', 'Breakfast', 'Bicycle Rental'],
    discount: 18
  }
]

export const FeaturedHotels = () => {
  return (
    <Container maxW="7xl" py={20}>
      <VStack spacing={12}>
        <VStack spacing={4} textAlign="center">
          <Heading size="xl" color="blue.600">
            🏨 Featured Hotels
          </Heading>
          <Text fontSize="lg" color="gray.600" maxW="2xl">
            Handpicked hotels with the best value, location, and guest reviews
          </Text>
        </VStack>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} w="full">
          {featuredHotels.map((hotel) => (
            <Card key={hotel.id} p={0} overflow="hidden" cursor="pointer">
              <Box position="relative">
                <Image
                  src={hotel.image}
                  alt={hotel.name}
                  h="200px"
                  w="full"
                  objectFit="cover"
                />
                <Badge
                  position="absolute"
                  top={3}
                  right={3}
                  colorScheme="red"
                  px={2}
                  py={1}
                  borderRadius="full"
                >
                  -{hotel.discount}%
                </Badge>
                <HStack
                  position="absolute"
                  top={3}
                  left={3}
                  spacing={1}
                >
                  {Array.from({length: hotel.starRating}, (_, i) => (
                    <FaStar key={i} color="gold" size={14} />
                  ))}
                </HStack>
              </Box>
              
              <VStack p={6} align="start" spacing={4}>
                <VStack spacing={2} align="start" w="full">
                  <Heading size="md">{hotel.name}</Heading>
                  <HStack>
                    <FaMapMarkerAlt size={12} color="gray" />
                    <Text fontSize="sm" color="gray.600">{hotel.location}</Text>
                  </HStack>
                  <HStack>
                    <Rating rating={hotel.rating} size="sm" showText />
                    <Text fontSize="sm" color="gray.500">
                      ({hotel.reviewCount} reviews)
                    </Text>
                  </HStack>
                </VStack>

                <HStack spacing={2} flexWrap="wrap">
                  {hotel.amenities.slice(0, 3).map((amenity) => (
                    <Badge key={amenity} size="sm" colorScheme="blue" variant="subtle">
                      {amenity}
                    </Badge>
                  ))}
                </HStack>

                <HStack justify="space-between" w="full">
                  <VStack spacing={0} align="start">
                    <Text fontSize="sm" textDecoration="line-through" color="gray.500">
                      ${hotel.originalPrice}
                    </Text>
                    <Text fontSize="2xl" fontWeight="bold" color="green.600">
                      ${hotel.price}
                    </Text>
                    <Text fontSize="xs" color="gray.500">per night</Text>
                  </VStack>
                  <Button 
                    colorScheme="blue" 
                    size="sm"
                    onClick={() => window.location.href = `/hotel/${hotel.id}`}
                  >
                    View Details
                  </Button>
                </HStack>
              </VStack>
            </Card>
          ))}
        </SimpleGrid>

        <Button 
          size="lg" 
          variant="outline" 
          colorScheme="blue"
          onClick={() => window.location.href = '/hotels'}
        >
          View All Hotels
        </Button>
      </VStack>
    </Container>
  )
}
