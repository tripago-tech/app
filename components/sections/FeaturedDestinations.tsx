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
import { FaMapMarkerAlt, FaDollarSign, FaClock } from 'react-icons/fa'

const featuredDestinations = [
  {
    id: 'bangkok',
    name: 'Bangkok',
    subtitle: 'Capital City Adventure',
    image: 'https://images.unsplash.com/photo-1563492065-1a83e8c2b2e8?w=500&h=300&fit=crop',
    rating: 4.8,
    duration: '3-5 days',
    budget: '$50-100/day',
    highlights: ['Temples', 'Street Food', 'Shopping', 'Nightlife'],
    description: 'Vibrant capital with golden temples, bustling markets, and incredible street food.',
    aiTrips: 1250,
  },
  {
    id: 'chiang-mai',
    name: 'Chiang Mai',
    subtitle: 'Cultural Heart of Thailand',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop',
    rating: 4.9,
    duration: '4-7 days',
    budget: '$30-70/day',
    highlights: ['Ancient Temples', 'Night Markets', 'Mountains', 'Culture'],
    description: 'Ancient city surrounded by mountains, rich in culture and tradition.',
    aiTrips: 890,
  },
  {
    id: 'phuket',
    name: 'Phuket',
    subtitle: 'Tropical Beach Paradise',
    image: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=500&h=300&fit=crop',
    rating: 4.7,
    duration: '5-10 days',
    budget: '$60-150/day',
    highlights: ['Beaches', 'Island Hopping', 'Water Sports', 'Sunset Views'],
    description: 'Thailand\'s largest island with stunning beaches and crystal-clear waters.',
    aiTrips: 2100,
  },
  {
    id: 'krabi',
    name: 'Krabi',
    subtitle: 'Limestone Cliffs & Islands',
    image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=500&h=300&fit=crop',
    rating: 4.8,
    duration: '4-8 days',
    budget: '$40-90/day',
    highlights: ['Rock Climbing', 'Island Tours', 'Beaches', 'Adventure'],
    description: 'Dramatic limestone cliffs, pristine beaches, and world-class rock climbing.',
    aiTrips: 670,
  },
  {
    id: 'koh-samui',
    name: 'Koh Samui',
    subtitle: 'Coconut Island Getaway',
    image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=500&h=300&fit=crop',
    rating: 4.6,
    duration: '5-9 days',
    budget: '$70-120/day',
    highlights: ['Luxury Resorts', 'Spa', 'Beaches', 'Nightlife'],
    description: 'Tropical island paradise with luxury resorts and pristine beaches.',
    aiTrips: 540,
  },
  {
    id: 'ayutthaya',
    name: 'Ayutthaya',
    subtitle: 'Ancient Kingdom Ruins',
    image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=500&h=300&fit=crop',
    rating: 4.5,
    duration: '1-2 days',
    budget: '$25-50/day',
    highlights: ['Historical Sites', 'UNESCO Heritage', 'Temples', 'Culture'],
    description: 'Ancient capital with magnificent temple ruins and rich history.',
    aiTrips: 320,
  },
]

export const FeaturedDestinations = () => {
  return (
    <Container maxW="7xl" py={20}>
      <VStack spacing={12}>
        <VStack spacing={4} textAlign="center">
          <Heading size="xl" color="gray.800" _dark={{ color: 'gray.200' }}>
            🏝️ Featured Destinations
          </Heading>
          <Text fontSize="lg" color="gray.600" _dark={{ color: 'gray.400' }} maxW="2xl">
            Discover Thailand's most popular destinations with AI-generated itineraries
          </Text>
        </VStack>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} w="full">
          {featuredDestinations.map((destination, index) => (
            <Card key={destination.id} cursor="pointer">
              <Box position="relative">
                <Image
                  src={destination.image}
                  alt={destination.name}
                  h="200px"
                  w="full"
                  objectFit="cover"
                />
                <Badge
                  position="absolute"
                  top={3}
                  right={3}
                  colorScheme="purple"
                  px={2}
                  py={1}
                  borderRadius="full"
                  fontSize="xs"
                >
                  {destination.aiTrips} AI trips
                </Badge>
              </Box>
              
              <VStack p={6} align="start" spacing={4}>
                <VStack spacing={2} align="start" w="full">
                  <Heading size="md" color="gray.800" _dark={{ color: 'gray.200' }}>
                    {destination.name}
                  </Heading>
                  <Text fontSize="sm" color="purple.600" _dark={{ color: 'purple.300' }}>
                    {destination.subtitle}
                  </Text>
                  <HStack>
                    <Rating rating={destination.rating} size="sm" showText />
                  </HStack>
                </VStack>

                <Text color="gray.600" _dark={{ color: 'gray.400' }} fontSize="sm" lineHeight="tall">
                  {destination.description}
                </Text>

                <HStack spacing={4} fontSize="sm" color="gray.500" _dark={{ color: 'gray.500' }}>
                  <HStack>
                    <FaClock />
                    <Text>{destination.duration}</Text>
                  </HStack>
                  <HStack>
                    <FaDollarSign />
                    <Text>{destination.budget}</Text>
                  </HStack>
                </HStack>

                <HStack spacing={1} flexWrap="wrap">
                  {destination.highlights.slice(0, 3).map((highlight, i) => (
                    <Badge key={i} size="sm" colorScheme="gray" variant="subtle">
                      {highlight}
                    </Badge>
                  ))}
                  {destination.highlights.length > 3 && (
                    <Badge size="sm" colorScheme="gray" variant="outline">
                      +{destination.highlights.length - 3}
                    </Badge>
                  )}
                </HStack>

                <HStack spacing={2} w="full" pt={2}>
                  <Button
                    size="sm"
                    colorScheme="purple"
                    flex={1}
                    leftIcon={<FaMapMarkerAlt />}
                    onClick={() => window.location.href = `/generate?destination=${destination.id}`}
                  >
                    Generate Trip
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    flex={1}
                    onClick={() => window.location.href = `/explore?destination=${destination.id}`}
                  >
                    Explore
                  </Button>
                </HStack>
              </VStack>
            </Card>
          ))}
        </SimpleGrid>

        <Button size="lg" variant="outline" colorScheme="purple">
          View All Destinations
        </Button>
      </VStack>
    </Container>
  )
}
