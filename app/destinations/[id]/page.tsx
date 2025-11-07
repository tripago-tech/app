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
  Input,
  Textarea,
  Select,
  Flex,
} from '@chakra-ui/react'
import {
  FaStar,
  FaMapMarkerAlt,
  FaCamera,
  FaUtensils,
  FaArrowLeft,
  FaHeart,
  FaShare,
  FaClock,
  FaThermometerHalf,
  FaCalendarAlt,
  FaTag,
  FaUsers,
} from 'react-icons/fa'
import { Card } from '@/components/ui/Card'
import { useParams } from 'next/navigation'
import Link from 'next/link'

const destinationDetails = {
  1: {
    name: 'Bangkok',
    country: 'Thailand',
    region: 'Southeast Asia',
    rating: 4.8,
    reviews: 3245,
    image: '🏙️',
    description: 'The vibrant capital of Thailand with ornate temples, bustling street markets, and world-class cuisine.',
    fullDescription: 'Bangkok, the dynamic capital of Thailand, is a mesmerizing blend of ancient traditions and modern innovation. The city is home to over 400 temples, iconic palaces, and some of the best street food in Southeast Asia. From the serene Chao Phraya River to the bustling energy of its night markets, Bangkok offers an unforgettable experience for every traveler.',
    highlights: ['Grand Palace', 'Temple of the Dawn', 'Floating Markets', 'Erawan Museum', 'Lumphini Park'],
    bestMonths: 'November to February',
    avgTemp: '28°C (82°F)',
    language: 'Thai',
    currency: 'Thai Baht (THB)',
    timeZone: 'ICT (GMT+7)',
    transport: 'BTS Skytrain, MRT Subway, Boats, Taxis',
    activities: [
      { name: 'Temple Tours', description: 'Visit the sacred Grand Palace and Wat Phra Kaew', duration: '3 hours', price: '$15' },
      { name: 'Floating Markets', description: 'Experience traditional commerce on the water', duration: '4 hours', price: '$20' },
      { name: 'Muay Thai Lessons', description: 'Learn traditional Thai boxing from expert trainers', duration: '2 hours', price: '$25' },
      { name: 'Thai Cooking Class', description: 'Master authentic Thai cuisine', duration: '3 hours', price: '$35' },
      { name: 'River Cruise', description: 'Evening cruise along the Chao Phraya River', duration: '2 hours', price: '$30' },
    ],
    highlights_detail: [
      { name: 'Grand Palace', description: 'Official residence of Thai Kings since 1782. Stunning Khmer and Thai architecture.' },
      { name: 'Wat Arun (Temple of the Dawn)', description: 'Iconic riverside temple with intricate porcelain details.' },
      { name: 'Chatuchak Weekend Market', description: 'Massive market with over 15,000 vendors selling everything.' },
      { name: 'Lumphini Park', description: 'Green oasis with monitor lizards, landscaped gardens, and peaceful paths.' },
    ],
    restaurants: [
      { name: 'Jay Fai', type: 'Thai Street Food', rating: 4.9 },
      { name: 'Nahm', type: 'Fine Thai Dining', rating: 4.8 },
      { name: 'Somtam Der', type: 'Isaan Cuisine', rating: 4.6 },
      { name: 'Chote Chitr', type: 'Homestyle Thai', rating: 4.5 },
    ],
    tips: [
      'Visit temples early in the morning to beat crowds',
      'Try street food - it\'s delicious and cheap',
      'Use BTS Skytrain to avoid traffic',
      'Stay hydrated in the tropical heat',
      'Learn basic Thai phrases',
    ],
  },
}

export default function DestinationDetailPage() {
  const params = useParams()
  const id = params.id as string
  const destination = destinationDetails[id as keyof typeof destinationDetails]

  if (!destination) {
    return (
      <Container maxW="7xl" py={8}>
        <VStack spacing={4}>
          <Heading size="lg">Destination not found</Heading>
          <Button as={Link} href="/destinations" leftIcon={<FaArrowLeft />}>
            Back to Destinations
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
              href="/destinations"
              variant="ghost"
              leftIcon={<FaArrowLeft />}
              size="sm"
            >
              Back to Destinations
            </Button>
            <Heading size="2xl">{destination.name}</Heading>
            <HStack color="gray.600" fontSize="sm">
              <Icon as={FaMapMarkerAlt} />
              <Text>{destination.country}</Text>
            </HStack>
          </VStack>
          <HStack spacing={2}>
            <Button variant="outline" leftIcon={<FaHeart />} />
            <Button variant="outline" leftIcon={<FaShare />} />
          </HStack>
        </HStack>

        {/* Hero Image */}
        <Box
          w="full"
          h={{ base: '300px', md: '450px' }}
          bg="gray.100"
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="lg"
        >
          <Text fontSize="6xl">{destination.image}</Text>
        </Box>

        {/* Quick Info */}
        <HStack spacing={4} pb={4} borderBottom="1px" borderColor="gray.200" flexWrap="wrap">
          <HStack>
            <Icon as={FaStar} color="accent.500" />
            <Text fontWeight="bold" fontSize="lg">{destination.rating}</Text>
            <Text color="gray.600">({destination.reviews.toLocaleString()} reviews)</Text>
          </HStack>
          <HStack spacing={2} fontSize="sm" color="gray.600">
            <Icon as={FaThermometerHalf} />
            <Text>{destination.avgTemp}</Text>
          </HStack>
          <HStack spacing={2} fontSize="sm" color="gray.600">
            <Icon as={FaCalendarAlt} />
            <Text>Best: {destination.bestMonths}</Text>
          </HStack>
        </HStack>

        {/* Main Tabs */}
        <Tabs>
          <TabList>
            <Tab>Overview</Tab>
            <Tab>Highlights</Tab>
            <Tab>Activities</Tab>
            <Tab>Restaurants</Tab>
            <Tab>Travel Tips</Tab>
          </TabList>

          <TabPanels>
            {/* Overview Tab */}
            <TabPanel>
              <VStack spacing={6} align="stretch">
                <Box>
                  <Heading size="md" mb={3}>About {destination.name}</Heading>
                  <Text color="gray.700" lineHeight="tall" fontSize="md">
                    {destination.fullDescription}
                  </Text>
                </Box>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                  {[
                    { icon: FaThermometerHalf, label: 'Average Temperature', value: destination.avgTemp },
                    { icon: FaCalendarAlt, label: 'Best Time to Visit', value: destination.bestMonths },
                    { icon: FaTag, label: 'Language', value: destination.language },
                    { icon: FaTag, label: 'Currency', value: destination.currency },
                  ].map((item, idx) => (
                    <Card key={idx} p={4}>
                      <HStack spacing={3}>
                        <Icon as={item.icon} color="primary.500" w={6} h={6} />
                        <Box>
                          <Text fontSize="sm" color="gray.600">{item.label}</Text>
                          <Text fontWeight="semibold">{item.value}</Text>
                        </Box>
                      </HStack>
                    </Card>
                  ))}
                </SimpleGrid>

                <Card p={6} bg="blue.50" _dark={{ bg: 'blue.900' }}>
                  <Heading size="sm" mb={3}>Getting Around</Heading>
                  <Text color="gray.700">{destination.transport}</Text>
                </Card>

                <HStack spacing={4}>
                  <Button colorScheme="primary" flex={1}>
                    Search Hotels
                  </Button>
                  <Button colorScheme="secondary" flex={1}>
                    Create My Trip
                  </Button>
                </HStack>
              </VStack>
            </TabPanel>

            {/* Highlights Tab */}
            <TabPanel>
              <VStack spacing={6} align="stretch">
                <Heading size="md">Must-See Highlights</Heading>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                  {destination.highlights_detail.map((highlight, idx) => (
                    <Card key={idx} p={6}>
                      <VStack align="start" spacing={3}>
                        <HStack spacing={3}>
                          <Icon as={FaCamera} color="primary.500" w={5} h={5} flexShrink={0} />
                          <Heading size="sm">{highlight.name}</Heading>
                        </HStack>
                        <Text color="gray.700">{highlight.description}</Text>
                        <Button colorScheme="primary" size="sm" w="full">
                          View on Map
                        </Button>
                      </VStack>
                    </Card>
                  ))}
                </SimpleGrid>
              </VStack>
            </TabPanel>

            {/* Activities Tab */}
            <TabPanel>
              <VStack spacing={4} align="stretch">
                <Heading size="md">Popular Activities & Tours</Heading>
                {destination.activities.map((activity, idx) => (
                  <Card key={idx} p={6}>
                    <Flex justify="space-between" align="start">
                      <VStack align="start" spacing={2} flex={1}>
                        <Heading size="sm">{activity.name}</Heading>
                        <Text color="gray.700">{activity.description}</Text>
                        <HStack spacing={4} fontSize="sm" color="gray.600">
                          <HStack>
                            <Icon as={FaClock} />
                            <Text>{activity.duration}</Text>
                          </HStack>
                          <HStack>
                            <Icon as={FaTag} />
                            <Text fontWeight="bold" color="primary.600">{activity.price}</Text>
                          </HStack>
                        </HStack>
                      </VStack>
                      <Button colorScheme="secondary" size="sm">
                        Book Now
                      </Button>
                    </Flex>
                  </Card>
                ))}
              </VStack>
            </TabPanel>

            {/* Restaurants Tab */}
            <TabPanel>
              <VStack spacing={4} align="stretch">
                <Heading size="md">Popular Restaurants</Heading>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                  {destination.restaurants.map((restaurant, idx) => (
                    <Card key={idx} p={6}>
                      <VStack align="start" spacing={3}>
                        <HStack justify="space-between" w="full">
                          <VStack align="start" spacing={1}>
                            <Heading size="sm">{restaurant.name}</Heading>
                            <Text fontSize="sm" color="gray.600">{restaurant.type}</Text>
                          </VStack>
                          <HStack>
                            <Icon as={FaStar} color="accent.500" />
                            <Text fontWeight="bold">{restaurant.rating}</Text>
                          </HStack>
                        </HStack>
                        <Button colorScheme="secondary" w="full" size="sm">
                          View Details
                        </Button>
                      </VStack>
                    </Card>
                  ))}
                </SimpleGrid>
              </VStack>
            </TabPanel>

            {/* Travel Tips Tab */}
            <TabPanel>
              <VStack spacing={4} align="stretch">
                <Heading size="md">Travel Tips for {destination.name}</Heading>
                <VStack spacing={3} align="stretch">
                  {destination.tips.map((tip, idx) => (
                    <Card key={idx} p={4} display="flex" alignItems="center">
                      <HStack spacing={3}>
                        <Icon as={FaStar} color="accent.500" />
                        <Text>{tip}</Text>
                      </HStack>
                    </Card>
                  ))}
                </VStack>

                <Card p={6} bg="green.50" _dark={{ bg: 'green.900' }}>
                  <Heading size="sm" mb={3}>More Information</Heading>
                  <Text color="gray.700" mb={4}>Need more details? Use AI to get personalized recommendations for {destination.name}.</Text>
                  <Button colorScheme="secondary" leftIcon={<FaUsers />}>
                    Plan Trip with AI
                  </Button>
                </Card>
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>

        {/* Community Reviews Section */}
        <Box borderTop="1px" borderColor="gray.200" pt={8}>
          <VStack spacing={6} align="stretch">
            <HStack justify="space-between" align="start">
              <Box>
                <Heading size="md" mb={2}>Traveler Reviews</Heading>
                <Text color="gray.600">See what fellow travelers say about {destination.name}</Text>
              </Box>
              <Button colorScheme="primary">Write a Review</Button>
            </HStack>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              {[
                {
                  author: 'Sarah M.',
                  rating: 5,
                  date: '2024-01-15',
                  comment: 'Absolutely incredible! Bangkok exceeded all my expectations. The temples are stunning and the street food is amazing.',
                  helpful: 45,
                },
                {
                  author: 'John D.',
                  rating: 4,
                  date: '2024-01-10',
                  comment: 'Great city with lots to explore. Can get very hot and humid, but totally worth visiting.',
                  helpful: 32,
                },
              ].map((review, idx) => (
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
            </SimpleGrid>
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}
