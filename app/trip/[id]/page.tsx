'use client'
import {
  Container,
  VStack,
  Heading,
  Text,
  HStack,
  Box,
  Image,
  Badge,
  SimpleGrid,
  Divider,
} from '@chakra-ui/react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Rating } from '@/components/ui/Rating'
import { FaCalendar, FaDollarSign, FaMapMarkerAlt, FaClock, FaEdit, FaShare, FaHeart } from 'react-icons/fa'

const mockTrip = {
  id: '1',
  title: '7-Day Bangkok & Chiang Mai Adventure',
  destination: 'Bangkok → Chiang Mai',
  image: 'https://images.unsplash.com/photo-1563492065-1a83e8c2b2e8?w=800',
  duration: 7,
  budget: 1200,
  startDate: '2024-03-15',
  endDate: '2024-03-22',
  description: 'Experience the best of Thailand with this AI-curated journey through Bangkok\'s vibrant streets and Chiang Mai\'s cultural treasures.',
  days: [
    {
      day: 1,
      date: '2024-03-15',
      city: 'Bangkok',
      activities: [
        { time: '09:00', title: 'Arrive at Suvarnabhumi Airport', type: 'transport', cost: 0 },
        { time: '11:00', title: 'Check-in at Hotel', type: 'accommodation', cost: 80 },
        { time: '14:00', title: 'Visit Grand Palace', type: 'attraction', cost: 15 },
        { time: '17:00', title: 'Explore Wat Pho Temple', type: 'attraction', cost: 5 },
        { time: '19:00', title: 'Street Food at Khao San Road', type: 'food', cost: 20 }
      ]
    },
    {
      day: 2,
      date: '2024-03-16',
      city: 'Bangkok',
      activities: [
        { time: '08:00', title: 'Floating Market Tour', type: 'attraction', cost: 35 },
        { time: '12:00', title: 'Lunch at Local Restaurant', type: 'food', cost: 15 },
        { time: '15:00', title: 'Shopping at Chatuchak Market', type: 'shopping', cost: 50 },
        { time: '18:00', title: 'Rooftop Bar Experience', type: 'entertainment', cost: 40 }
      ]
    }
  ]
}

export default function TripDetailPage({ params }: { params: { id: string } }) {
  const totalCost = mockTrip.days.reduce((total, day) => 
    total + day.activities.reduce((dayTotal, activity) => dayTotal + activity.cost, 0), 0
  )

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'attraction': return '🏛️'
      case 'food': return '🍜'
      case 'transport': return '🚗'
      case 'accommodation': return '🏨'
      case 'shopping': return '🛍️'
      case 'entertainment': return '🎉'
      default: return '📍'
    }
  }

  return (
    <Container maxW="6xl" py={8}>
      <VStack spacing={8} align="stretch">
        {/* Trip Header */}
        <Card p={0} overflow="hidden">
          <Image
            src={mockTrip.image}
            alt={mockTrip.title}
            h="300px"
            w="full"
            objectFit="cover"
          />
          <VStack p={8} align="start" spacing={4}>
            <VStack spacing={3} align="start" w="full">
              <Heading size="2xl" color="gray.800" _dark={{ color: 'gray.200' }}>
                {mockTrip.title}
              </Heading>
              <Text fontSize="lg" color="gray.600" _dark={{ color: 'gray.400' }}>
                {mockTrip.description}
              </Text>
            </VStack>

            <HStack spacing={6} fontSize="sm" color="gray.500" _dark={{ color: 'gray.500' }}>
              <HStack>
                <FaCalendar />
                <Text>{mockTrip.duration} days</Text>
              </HStack>
              <HStack>
                <FaDollarSign />
                <Text>${totalCost} / ${mockTrip.budget}</Text>
              </HStack>
              <HStack>
                <FaMapMarkerAlt />
                <Text>{mockTrip.destination}</Text>
              </HStack>
            </HStack>

            <HStack spacing={3}>
              <Button colorScheme="purple" leftIcon={<FaEdit />}>
                Edit Trip
              </Button>
              <Button variant="outline" leftIcon={<FaShare />}>
                Share
              </Button>
              <Button variant="outline" leftIcon={<FaHeart />}>
                Save
              </Button>
            </HStack>
          </VStack>
        </Card>

        {/* Daily Itinerary */}
        <VStack spacing={6} align="stretch">
          <Heading size="lg" color="gray.800" _dark={{ color: 'gray.200' }}>
            📅 Daily Itinerary
          </Heading>
          
          {mockTrip.days.map((day) => (
            <Card key={day.day} p={6}>
              <VStack spacing={4} align="stretch">
                <HStack justify="space-between">
                  <VStack spacing={1} align="start">
                    <Heading size="md" color="purple.600" _dark={{ color: 'purple.300' }}>
                      Day {day.day} - {day.city}
                    </Heading>
                    <Text fontSize="sm" color="gray.500">
                      {day.date}
                    </Text>
                  </VStack>
                  <Badge colorScheme="purple" px={3} py={1}>
                    ${day.activities.reduce((total, activity) => total + activity.cost, 0)}
                  </Badge>
                </HStack>

                <Divider />

                <VStack spacing={3} align="stretch">
                  {day.activities.map((activity, index) => (
                    <HStack key={index} spacing={4} p={3} bg="gray.50" _dark={{ bg: 'gray.700' }} borderRadius="lg">
                      <Text fontSize="2xl">{getActivityIcon(activity.type)}</Text>
                      <VStack spacing={1} align="start" flex={1}>
                        <HStack justify="space-between" w="full">
                          <Text fontWeight="medium">{activity.title}</Text>
                          <Text fontSize="sm" color="green.500" fontWeight="bold">
                            ${activity.cost}
                          </Text>
                        </HStack>
                        <HStack>
                          <FaClock size={12} />
                          <Text fontSize="sm" color="gray.500">
                            {activity.time}
                          </Text>
                          <Badge size="sm" colorScheme="gray" variant="subtle" textTransform="capitalize">
                            {activity.type}
                          </Badge>
                        </HStack>
                      </VStack>
                    </HStack>
                  ))}
                </VStack>
              </VStack>
            </Card>
          ))}
        </VStack>

        {/* Trip Summary */}
        <Card p={6}>
          <VStack spacing={4} align="stretch">
            <Heading size="md" color="gray.800" _dark={{ color: 'gray.200' }}>
              💰 Trip Summary
            </Heading>
            
            <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
              <VStack>
                <Text fontSize="2xl" fontWeight="bold" color="purple.600">
                  ${totalCost}
                </Text>
                <Text fontSize="sm" color="gray.500">Total Cost</Text>
              </VStack>
              <VStack>
                <Text fontSize="2xl" fontWeight="bold" color="green.500">
                  ${mockTrip.budget - totalCost}
                </Text>
                <Text fontSize="sm" color="gray.500">Remaining</Text>
              </VStack>
              <VStack>
                <Text fontSize="2xl" fontWeight="bold" color="blue.500">
                  {mockTrip.duration}
                </Text>
                <Text fontSize="sm" color="gray.500">Days</Text>
              </VStack>
              <VStack>
                <Text fontSize="2xl" fontWeight="bold" color="orange.500">
                  {mockTrip.days.reduce((total, day) => total + day.activities.length, 0)}
                </Text>
                <Text fontSize="sm" color="gray.500">Activities</Text>
              </VStack>
            </SimpleGrid>
          </VStack>
        </Card>
      </VStack>
    </Container>
  )
}
