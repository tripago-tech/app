'use client'
import {
  Container,
  VStack,
  HStack,
  Box,
  Heading,
  Text,
  SimpleGrid,
  Button,
  Icon,
  Badge,
  Tab,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Avatar,
  Flex,
  Input,
  Select,
} from '@chakra-ui/react'
import {
  FaStar,
  FaMapMarkerAlt,
  FaClock,
  FaDollarSign,
  FaPhone,
  FaEnvelope,
  FaArrowLeft,
  FaHeart,
  FaShare,
  FaCamera,
  FaCalendarAlt,
  FaUsers,
  FaTicketAlt,
} from 'react-icons/fa'
import { Card } from '@/components/ui/Card'
import { useParams } from 'next/navigation'
import Link from 'next/link'

const attractionDetails = {
  1: {
    name: 'Grand Palace Bangkok',
    type: 'Historic Palace',
    location: 'Bangkok, Thailand',
    rating: 4.9,
    reviews: 5234,
    image: '🏛️',
    duration: '2-3 hours',
    price: '$15',
    description: 'The official residence of Thai kings since 1782 with stunning architecture',
    fullDescription: 'The Grand Palace is the official residence of Thai Kings since 1782 and the most sacred Buddhist site in Thailand. The complex features elaborate architecture with intricate details, stunning golden decorations, and the revered Temple of the Emerald Buddha (Wat Phra Kaew). Visitors are mesmerized by the grandeur and spiritual significance of this iconic landmark.',
    bestTime: 'Early morning (7-9 AM) to avoid crowds',
    dressCode: 'Modest clothing required - covered knees and shoulders',
    admission: {
      adult: '$15',
      child: '$8',
      family: '$30 (2 adults + 2 children)',
    },
    hours: '8:30 AM - 3:30 PM (Closed during state events)',
    highlights: [
      'Wat Phra Kaew - Temple of the Emerald Buddha',
      'Chakri Maha Prasat Hall',
      'Dusit Hall',
      'Siwalai Gardens',
      'Architectural details and golden decorations',
    ],
    facilities: [
      { name: 'Guided Tours', available: true },
      { name: 'Audio Guides', available: true },
      { name: 'Restrooms', available: true },
      { name: 'Gift Shop', available: true },
      { name: 'Photography Allowed', available: true },
    ],
    tours: [
      { name: 'Guided Historical Tour', duration: '2 hours', price: '$35', includes: 'Professional guide, headphones' },
      { name: 'Photography Tour', duration: '3 hours', price: '$50', includes: 'Photo specialist guide, best angles' },
      { name: 'Spiritual Experience Tour', duration: '2.5 hours', price: '$40', includes: 'Meditation, cultural insights' },
    ],
    contact: {
      phone: '+66 2-623-5500',
      email: 'info@palaces.thai.net',
      address: 'Na Phra Lan Rd, Bangkok 10200, Thailand',
    },
    reviews: [
      {
        author: 'Sarah M.',
        rating: 5,
        date: '2024-01-15',
        comment: 'Absolutely stunning! The Grand Palace is a must-see. The architecture is breathtaking. Dress modestly and go early!',
        helpful: 45,
      },
      {
        author: 'John D.',
        rating: 5,
        date: '2024-01-10',
        comment: 'Incredible experience. Hire a guide for better insights into the history and significance.',
        helpful: 32,
      },
      {
        author: 'Emma W.',
        rating: 4,
        date: '2024-01-05',
        comment: 'Beautiful but can get very crowded. Early morning is best!',
        helpful: 28,
      },
    ],
    tips: [
      'Arrive early to beat the crowds',
      'Wear modest clothing - covered knees and shoulders',
      'Consider hiring a guide for deeper insights',
      'Bring comfortable walking shoes',
      'Respect the sacred site and dress appropriately',
      'Photography is allowed but be respectful',
    ],
    nearby: [
      'Wat Pho Temple (100m away)',
      'Wat Mahathat (200m away)',
      'Riverside restaurants and shops',
    ],
  },
  2: {
    name: 'Wat Arun (Temple of the Dawn)',
    type: 'Historic Temple',
    location: 'Bangkok, Thailand',
    rating: 4.8,
    reviews: 4567,
    image: '⛩️',
    duration: '1-2 hours',
    price: '$3',
    description: 'Iconic riverside temple known for ornate architecture and stunning views',
    fullDescription: 'Wat Arun, the Temple of the Dawn, is one of Thailand\'s most iconic temples, named after Aruna, the Hindu god of dawn. Located on the western bank of the Chao Phraya River, it features a stunning central prang (tower) decorated with colorful porcelain tiles. The temple is especially beautiful during sunrise and sunset.',
    bestTime: 'Sunrise or sunset for stunning photos',
    dressCode: 'Modest clothing required',
    admission: {
      adult: '$3',
      child: 'Free',
      family: '$8 (2 adults + 2 children)',
    },
    hours: '8:00 AM - 5:00 PM',
    highlights: [
      'Central Prang (tower)',
      'Ornate porcelain decorations',
      'River views',
      'Buddha statues and altars',
      'Sunrise/sunset views',
    ],
    facilities: [
      { name: 'Boat Crossing Service', available: true },
      { name: 'Restrooms', available: true },
      { name: 'Gift Shop', available: true },
      { name: 'Climbing Tower', available: true },
      { name: 'Photography Allowed', available: true },
    ],
    tours: [
      { name: 'Sunrise Photography Tour', duration: '2 hours', price: '$30', includes: 'River transport, breakfast' },
      { name: 'Guided Temple Tour', duration: '1.5 hours', price: '$25', includes: 'Professional guide, insights' },
      { name: 'Evening Sunset Tour', duration: '2 hours', price: '$35', includes: 'River view, refreshments' },
    ],
    contact: {
      phone: '+66 2-465-0926',
      email: 'info@watarun.org',
      address: 'Thanon Wang Doem, Bangkok 10700, Thailand',
    },
    reviews: [
      {
        author: 'Tom B.',
        rating: 5,
        date: '2024-01-12',
        comment: 'Spectacular temple! The porcelain work is incredible. Best views at sunrise.',
        helpful: 38,
      },
      {
        author: 'Lisa K.',
        rating: 5,
        date: '2024-01-08',
        comment: 'One of Bangkok\'s must-see temples. Worth climbing the tower for views!',
        helpful: 25,
      },
    ],
    tips: [
      'Visit during sunrise for best photography',
      'Climb the central tower for panoramic views',
      'Wear comfortable shoes for climbing',
      'Bring water and sun protection',
      'River crossing costs extra (about $0.50)',
    ],
    nearby: [
      'Grand Palace (across the river)',
      'Wat Pho Temple (next to river)',
      'Local restaurants and shops',
    ],
  },
}

export default function AttractionDetailPage() {
  const params = useParams()
  const id = params.id as string
  const attraction = attractionDetails[id as keyof typeof attractionDetails]

  if (!attraction) {
    return (
      <Container maxW="7xl" py={8}>
        <VStack spacing={4}>
          <Heading size="lg">Attraction not found</Heading>
          <Button as={Link} href="/attractions" leftIcon={<FaArrowLeft />}>
            Back to Attractions
          </Button>
        </VStack>
      </Container>
    )
  }

  return (
    <Container maxW="7xl" py={8}>
      <VStack spacing={8} align="stretch">
        {/* Header */}
        <HStack justify="space-between" align="start">
          <VStack align="start" spacing={2} flex={1}>
            <Button
              as={Link}
              href="/attractions"
              variant="ghost"
              leftIcon={<FaArrowLeft />}
              size="sm"
            >
              Back to Attractions
            </Button>
            <Heading size="2xl">{attraction.name}</Heading>
            <HStack color="gray.600" fontSize="sm">
              <Icon as={FaMapMarkerAlt} />
              <Text>{attraction.location}</Text>
            </HStack>
          </VStack>
          <HStack spacing={2}>
            <Button variant="outline" leftIcon={<FaHeart />} />
            <Button variant="outline" leftIcon={<FaShare />} />
          </HStack>
        </HStack>

        {/* Image Section */}
        <Box
          w="full"
          h={{ base: '300px', md: '450px' }}
          bg="gray.100"
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="lg"
        >
          <Text fontSize="6xl">{attraction.image}</Text>
        </Box>

        {/* Rating and Quick Info */}
        <HStack spacing={4} pb={4} borderBottom="1px" borderColor="gray.200" flexWrap="wrap">
          <HStack>
            <Icon as={FaStar} color="accent.500" />
            <Text fontWeight="bold" fontSize="lg">{attraction.rating}</Text>
            <Text color="gray.600">({attraction.reviews.toLocaleString()} reviews)</Text>
          </HStack>
          <Badge colorScheme="secondary">{attraction.type}</Badge>
          <HStack spacing={1} fontSize="sm" color="gray.600">
            <Icon as={FaClock} />
            <Text>{attraction.duration}</Text>
          </HStack>
          <HStack spacing={1} fontSize="sm" color="primary.600">
            <Icon as={FaDollarSign} />
            <Text fontWeight="bold">{attraction.price}</Text>
          </HStack>
        </HStack>

        {/* Main Content Tabs */}
        <Tabs>
          <TabList>
            <Tab>Overview</Tab>
            <Tab>Tours & Tickets</Tab>
            <Tab>Facilities</Tab>
            <Tab>Reviews</Tab>
            <Tab>Location</Tab>
          </TabList>

          <TabPanels>
            {/* Overview Tab */}
            <TabPanel>
              <VStack spacing={6} align="stretch">
                <Box>
                  <Heading size="md" mb={3}>About</Heading>
                  <Text color="gray.700" lineHeight="tall">
                    {attraction.fullDescription}
                  </Text>
                </Box>

                <Box>
                  <Heading size="md" mb={4}>Highlights</Heading>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                    {attraction.highlights.map((highlight) => (
                      <HStack key={highlight} spacing={3} align="start">
                        <Icon as={FaCamera} color="primary.500" mt={1} flexShrink={0} />
                        <Text>{highlight}</Text>
                      </HStack>
                    ))}
                  </SimpleGrid>
                </Box>

                <Card p={6} bg="blue.50" _dark={{ bg: 'blue.900' }}>
                  <VStack align="start" spacing={3}>
                    <Box>
                      <Text fontWeight="semibold" color="gray.700">Best Time to Visit</Text>
                      <Text>{attraction.bestTime}</Text>
                    </Box>
                    <Box>
                      <Text fontWeight="semibold" color="gray.700">Dress Code</Text>
                      <Text>{attraction.dressCode}</Text>
                    </Box>
                    <Box>
                      <Text fontWeight="semibold" color="gray.700">Hours</Text>
                      <Text>{attraction.hours}</Text>
                    </Box>
                  </VStack>
                </Card>

                <Box>
                  <Heading size="md" mb={4}>Admission Prices</Heading>
                  <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
                    <Card p={4}>
                      <VStack align="start" spacing={2}>
                        <Text fontWeight="bold">Adult</Text>
                        <Text fontSize="2xl" color="primary.600">{attraction.admission.adult}</Text>
                      </VStack>
                    </Card>
                    <Card p={4}>
                      <VStack align="start" spacing={2}>
                        <Text fontWeight="bold">Child</Text>
                        <Text fontSize="2xl" color="primary.600">{attraction.admission.child}</Text>
                      </VStack>
                    </Card>
                    <Card p={4}>
                      <VStack align="start" spacing={2}>
                        <Text fontWeight="bold">Family</Text>
                        <Text fontSize="2xl" color="primary.600">{attraction.admission.family}</Text>
                      </VStack>
                    </Card>
                  </SimpleGrid>
                </Box>
              </VStack>
            </TabPanel>

            {/* Tours & Tickets Tab */}
            <TabPanel>
              <VStack spacing={4} align="stretch">
                <Heading size="md">Available Tours & Tickets</Heading>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                  {attraction.tours.map((tour) => (
                    <Card key={tour.name} p={6}>
                      <VStack align="start" spacing={3}>
                        <Heading size="sm">{tour.name}</Heading>
                        <HStack spacing={4} fontSize="sm" color="gray.600">
                          <HStack>
                            <Icon as={FaClock} />
                            <Text>{tour.duration}</Text>
                          </HStack>
                          <HStack>
                            <Icon as={FaDollarSign} />
                            <Text fontWeight="bold" color="primary.600">{tour.price}</Text>
                          </HStack>
                        </HStack>
                        <Box>
                          <Text fontWeight="semibold" fontSize="sm" mb={2}>Includes:</Text>
                          <Text fontSize="sm" color="gray.700">{tour.includes}</Text>
                        </Box>
                        <Link href={`/attractions/${id}/book`}>
                          <Button colorScheme="secondary" w="full" size="sm">
                            Book Now
                          </Button>
                        </Link>
                      </VStack>
                    </Card>
                  ))}
                </SimpleGrid>
              </VStack>
            </TabPanel>

            {/* Facilities Tab */}
            <TabPanel>
              <VStack spacing={4} align="stretch">
                <Heading size="md">Available Facilities</Heading>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  {attraction.facilities.map((facility) => (
                    <Card key={facility.name} p={4}>
                      <HStack justify="space-between">
                        <Text fontWeight="medium">{facility.name}</Text>
                        <Badge colorScheme={facility.available ? 'green' : 'red'}>
                          {facility.available ? 'Available' : 'Not Available'}
                        </Badge>
                      </HStack>
                    </Card>
                  ))}
                </SimpleGrid>
              </VStack>
            </TabPanel>

            {/* Reviews Tab */}
            <TabPanel>
              <VStack spacing={6} align="stretch">
                <HStack justify="space-between" align="start">
                  <Box>
                    <Heading size="md" mb={2}>Visitor Reviews</Heading>
                    <Text color="gray.600">Based on {attraction.reviews.length} verified reviews</Text>
                  </Box>
                  <Button colorScheme="primary">Write a Review</Button>
                </HStack>

                <VStack spacing={4}>
                  {attraction.reviews.map((review, idx) => (
                    <Card key={idx} p={6}>
                      <VStack align="start" spacing={3}>
                        <HStack justify="space-between" w="full">
                          <HStack>
                            <Avatar size="sm" name={review.author} />
                            <Box>
                              <Text fontWeight="bold">{review.author}</Text>
                              <Text fontSize="xs" color="gray.600">{review.date}</Text>
                            </Box>
                          </HStack>
                          <HStack>
                            {[...Array(5)].map((_, i) => (
                              <Icon
                                key={i}
                                as={FaStar}
                                color={i < review.rating ? 'accent.500' : 'gray.300'}
                                w={4}
                                h={4}
                              />
                            ))}
                          </HStack>
                        </HStack>
                        <Text>{review.comment}</Text>
                        <Text fontSize="sm" color="gray.500">{review.helpful} people found this helpful</Text>
                      </VStack>
                    </Card>
                  ))}
                </VStack>
              </VStack>
            </TabPanel>

            {/* Location Tab */}
            <TabPanel>
              <VStack spacing={6} align="stretch">
                <Box
                  w="full"
                  h="400px"
                  bg="gray.100"
                  borderRadius="lg"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text color="gray.600">📍 Map View (Interactive map would load here)</Text>
                </Box>

                <Card p={6}>
                  <VStack align="start" spacing={2}>
                    <Heading size="sm">Contact & Address</Heading>
                    <HStack spacing={2}>
                      <Icon as={FaMapMarkerAlt} color="primary.500" />
                      <Text>{attraction.contact.address}</Text>
                    </HStack>
                    <HStack spacing={2}>
                      <Icon as={FaPhone} color="primary.500" />
                      <Text>{attraction.contact.phone}</Text>
                    </HStack>
                    <HStack spacing={2}>
                      <Icon as={FaEnvelope} color="primary.500" />
                      <Text>{attraction.contact.email}</Text>
                    </HStack>
                  </VStack>
                </Card>

                <Box>
                  <Heading size="sm" mb={3}>Nearby Attractions</Heading>
                  <VStack align="start" spacing={2}>
                    {attraction.nearby.map((place) => (
                      <HStack key={place} spacing={2}>
                        <Icon as={FaMapMarkerAlt} color="primary.500" />
                        <Text>{place}</Text>
                      </HStack>
                    ))}
                  </VStack>
                </Box>
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>

        {/* Traveler Tips */}
        <Box borderTop="1px" borderColor="gray.200" pt={8}>
          <VStack spacing={6} align="stretch">
            <Heading size="md">Traveler Tips</Heading>
            <VStack spacing={3} align="stretch">
              {attraction.tips.map((tip, idx) => (
                <Card key={idx} p={4} display="flex" alignItems="center">
                  <HStack spacing={3}>
                    <Icon as={FaStar} color="accent.500" />
                    <Text>{tip}</Text>
                  </HStack>
                </Card>
              ))}
            </VStack>
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}
