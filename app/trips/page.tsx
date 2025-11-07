'use client'
import {
  Container,
  VStack,
  Heading,
  Text,
  SimpleGrid,
  HStack,
  Box,
  Image,
  Badge,
  Progress,
} from '@chakra-ui/react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { FaCalendar, FaDollarSign, FaMapMarkerAlt, FaEdit, FaShare } from 'react-icons/fa'

const savedTrips = [
  {
    id: '1',
    title: '7-Day Bangkok & Chiang Mai Adventure',
    destination: 'Bangkok → Chiang Mai',
    image: 'https://images.unsplash.com/photo-1563492065-1a83e8c2b2e8?w=400',
    duration: 7,
    budget: 1200,
    spent: 850,
    startDate: '2024-03-15',
    status: 'upcoming',
    progress: 0,
    highlights: ['Temples', 'Street Food', 'Culture', 'Markets']
  },
  {
    id: '2',
    title: '5-Day Phuket Beach Getaway',
    destination: 'Phuket',
    image: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=400',
    duration: 5,
    budget: 800,
    spent: 750,
    startDate: '2024-02-10',
    status: 'completed',
    progress: 100,
    highlights: ['Beaches', 'Island Hopping', 'Sunset', 'Snorkeling']
  },
  {
    id: '3',
    title: '3-Day Krabi Rock Climbing',
    destination: 'Krabi',
    image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=400',
    duration: 3,
    budget: 600,
    spent: 320,
    startDate: '2024-04-20',
    status: 'planning',
    progress: 45,
    highlights: ['Adventure', 'Rock Climbing', 'Beaches', 'Nature']
  }
]

export default function TripsPage() {
  return (
    <Container maxW="7xl" py={8}>
      <VStack spacing={8} align="stretch">
        <HStack justify="space-between" align="center">
          <VStack spacing={2} align="start">
            <Heading size="2xl" color="gray.800" _dark={{ color: 'gray.200' }}>
              ✈️ My Trips
            </Heading>
            <Text color="gray.600" _dark={{ color: 'gray.400' }}>
              Manage your saved trips and track your travel progress
            </Text>
          </VStack>
          <Button colorScheme="purple" leftIcon={<FaMapMarkerAlt />}>
            🤖 Generate New Trip
          </Button>
        </HStack>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {savedTrips.map((trip) => (
            <Card key={trip.id} overflow="hidden">
              <Box position="relative">
                <Image
                  src={trip.image}
                  alt={trip.title}
                  h="180px"
                  w="full"
                  objectFit="cover"
                />
                <Badge
                  position="absolute"
                  top={3}
                  left={3}
                  colorScheme={
                    trip.status === 'completed' ? 'green' : 
                    trip.status === 'upcoming' ? 'blue' : 'orange'
                  }
                  px={2}
                  py={1}
                  borderRadius="full"
                  fontSize="xs"
                  textTransform="capitalize"
                >
                  {trip.status}
                </Badge>
              </Box>
              
              <VStack p={6} align="start" spacing={4}>
                <VStack spacing={2} align="start" w="full">
                  <Heading size="md" color="gray.800" _dark={{ color: 'gray.200' }}>
                    {trip.title}
                  </Heading>
                  <Text fontSize="sm" color="gray.600" _dark={{ color: 'gray.400' }}>
                    {trip.destination}
                  </Text>
                </VStack>

                <HStack spacing={4} fontSize="sm" color="gray.500" _dark={{ color: 'gray.500' }}>
                  <HStack>
                    <FaCalendar />
                    <Text>{trip.duration} days</Text>
                  </HStack>
                  <HStack>
                    <FaDollarSign />
                    <Text>${trip.spent}/${trip.budget}</Text>
                  </HStack>
                </HStack>

                {trip.status === 'planning' && (
                  <Box w="full">
                    <HStack justify="space-between" mb={1}>
                      <Text fontSize="sm" color="gray.600">Planning Progress</Text>
                      <Text fontSize="sm" color="gray.600">{trip.progress}%</Text>
                    </HStack>
                    <Progress value={trip.progress} colorScheme="purple" size="sm" />
                  </Box>
                )}

                <HStack spacing={1} flexWrap="wrap">
                  {trip.highlights.slice(0, 3).map((highlight, i) => (
                    <Badge key={i} size="sm" colorScheme="gray" variant="subtle">
                      {highlight}
                    </Badge>
                  ))}
                </HStack>

                <HStack spacing={2} w="full" pt={2}>
                  <Button size="sm" colorScheme="purple" flex={1} leftIcon={<FaEdit />}>
                    {trip.status === 'completed' ? 'View' : 'Edit'}
                  </Button>
                  <Button size="sm" variant="outline" leftIcon={<FaShare />}>
                    Share
                  </Button>
                </HStack>
              </VStack>
            </Card>
          ))}
        </SimpleGrid>

        <Box textAlign="center" py={8}>
          <VStack spacing={4}>
            <Text color="gray.500" _dark={{ color: 'gray.500' }}>
              Ready to plan your next adventure?
            </Text>
            <Button colorScheme="purple" size="lg" leftIcon={<FaMapMarkerAlt />}>
              🤖 Create New Trip with AI
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}
