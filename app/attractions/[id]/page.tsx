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
} from '@chakra-ui/react'
import {
  FaStar,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaDollarSign,
  FaUsers,
  FaArrowLeft,
  FaHeart,
  FaShare,
  FaTicketAlt,
  FaCamera,
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
    bestTime: '8:00 AM - 3:30 PM',
    phone: '+66 2 623 5500',
    email: 'contact@royalpalace.com',
    address: 'Na Phra Lan Road, Khwaeng Phra Borom Maha Ratchawang, Bangkok',
    description: 'The Grand Palace is the official residence of Thai kings since 1782. It\'s a stunning complex of ornate buildings with golden stupas and intricate Thai architecture.',
    fullDescription: 'The Grand Palace is one of Thailand\'s most sacred places and a must-visit destination. Constructed in 1782, it served as the residence of Thai kings and contains the revered Temple of the Emerald Buddha. The complex showcases exquisite examples of traditional Thai architecture with its golden spires, ornate decorations, and ceremonial halls.',
    highlights: [
      'Temple of the Emerald Buddha (Wat Phra Kaew)',
      'Royal Residences',
      'Intricately decorated walls and spires',
      'Museum exhibits',
      'Sacred ceremonial spaces',
      'Stunning garden areas',
    ],
    things_to_know: [
      'Photography is allowed in most areas',
      'Dress code: Shoulders and knees must be covered',
      'Guided tours available in multiple languages',
      'Allow 2-3 hours for full visit',
      'Avoid midday heat (very crowded and hot)',
      'Respectful behavior is required',
    ],
    tour_options: [
      { name: 'Self-Guided Tour', duration: '2-3 hours', price: '$15', description: 'Explore at your own pace with map' },
      { name: 'Guided Group Tour', duration: '3 hours', price: '$25', description: 'English-speaking guide included' },
      { name: 'Sunrise Private Tour', duration: '4 hours', price: '$80', description: 'Small group, minimal crowds, guide included' },
      { name: 'Sunset Photography Tour', duration: '3 hours', price: '$50', description: 'Perfect lighting for photography' },
    ],
    nearby_attractions: [
      'Wat Pho (Temple of the Reclining Buddha) - 500m away',
      'Sanam Luang Park - Adjacent',
      'National Museum - 1km away',
      'Wat Arun (Temple of the Dawn) - 1.5km away',
    ],
    reviews: [
      {
        author: 'Sarah M.',
        rating: 5,
        date: '2024-01-20',
        comment: 'Absolutely breathtaking! The architecture is stunning. Go early to beat the crowds!',
        helpful: 234,
      },
      {
        author: 'John D.',
        rating: 5,
        date: '2024-01-15',
        comment: 'A must-see in Bangkok. Respect the dress code and cultural significance.',
        helpful: 156,
      },
      {
        author: 'Emma W.',
        rating: 4,
        date: '2024-01-10',
        comment: 'Amazing place but very crowded. Worth visiting early morning.',
        helpful: 89,
      },
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
    bestTime: '5:00 AM - 6:00 PM',
    phone: '+66 2 891 1752',
    email: 'contact@watarun.com',
    address: '34 Arun Amarin Road, Bangkok',
    description: 'One of Thailand\'s most iconic temples, known for its stunning riverside location and ornate Khmer-style architecture.',
    fullDescription: 'Wat Arun, also known as the Temple of the Dawn, is one of Bangkok\'s most recognizable landmarks. The temple features a distinctive central prang (tower) with intricate porcelain details. Its riverside location along the Chao Phraya River makes it especially magical at sunrise and sunset.',
    highlights: [
      'Iconic riverside tower',
      'Intricate porcelain decorations',
      'Panoramic river views',
      'Peaceful atmosphere',
      'Traditional Thai temple architecture',
      'Excellent photography spots',
    ],
    things_to_know: [
      'Entrance fee: 100 baht ($3)',
      'Open daily 5:00 AM - 6:00 PM',
      'Dress modestly (shoulders and knees covered)',
      'Climb the tower for panoramic views',
      'Best visited during sunrise/sunset',
      'Peaceful in early morning hours',
    ],
    tour_options: [
      { name: 'Self-Guided Tour', duration: '1-2 hours', price: '$3', description: 'Explore independently' },
      { name: 'Guided Temple Tour', duration: '2 hours', price: '$20', description: 'Learn about history and culture' },
      { name: 'Sunrise Tour', duration: '2 hours', price: '$35', description: 'Early morning visit with guide' },
      { name: 'River Boat Tour', duration: '3 hours', price: '$40', description: 'View from Chao Phraya River' },
    ],
    nearby_attractions: [
      'Grand Palace - 1.5km away (across river)',
      'Wat Pho - 1km away',
      'River markets - Walking distance',
      'Local restaurants and cafes',
    ],
    reviews: [
      {
        author: 'Mike C.',
        rating: 5,
        date: '2024-01-18',
        comment: 'Incredible temple! The sunrise views are unforgettable!',
        helpful: 187,
      },
      {
        author: 'Lisa P.',
        rating: 5,
        date: '2024-01-12',
        comment: 'Beautiful and serene. Worth the boat ride across the river!',
        helpful: 142,
      },
      {
        author: 'Tom H.',
        rating: 4,
        date: '2024-01-08',
        comment: 'Great temple with amazing views. Can get crowded at peak times.',
        helpful: 71,
      },
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

        {/* Image */}
        <Box
          w="full"
          h={{ base: '300px', md: '450px' }}
          bg="gray.100"
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="lg"
          fontSize="6xl"
        >
          {attraction.image}
        </Box>

        {/* Quick Info */}
        <HStack spacing={4} pb={4} borderBottom="1px" borderColor="gray.200" flexWrap="wrap">
          <HStack>
            <Icon as={FaStar} color="accent.500" />
            <Text fontWeight="bold" fontSize="lg">{attraction.rating}</Text>
            <Text color="gray.600">({attraction.reviews.toLocaleString()} reviews)</Text>
          </HStack>
          <Badge colorScheme="secondary">{attraction.type}</Badge>
          <HStack spacing={1}>
            <Icon as={FaClock} />
            <Text fontSize="sm">{attraction.duration}</Text>
          </HStack>
          <HStack spacing={1}>
            <Icon as={FaDollarSign} />
            <Text fontSize="sm" fontWeight="bold">{attraction.price}</Text>
          </HStack>
        </HStack>

        {/* Tabs */}
        <Tabs>
          <TabList>
            <Tab>Overview</Tab>
            <Tab>Tours & Tickets</Tab>
            <Tab>Practical Info</Tab>
            <Tab>Reviews</Tab>
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
                        <Icon as={FaCamera} color="accent.500" mt={1} flexShrink={0} />
                        <Text>{highlight}</Text>
                      </HStack>
                    ))}
                  </SimpleGrid>
                </Box>

                <Card p={6} bg="blue.50" _dark={{ bg: 'blue.900' }}>
                  <Heading size="sm" mb={3}>Things to Know</Heading>
                  <VStack align="start" spacing={2} fontSize="sm">
                    {attraction.things_to_know.map((item) => (
                      <HStack key={item} spacing={2}>
                        <Icon as={FaTicketAlt} color="primary.500" w={4} h={4} />
                        <Text>{item}</Text>
                      </HStack>
                    ))}
                  </VStack>
                </Card>

                {attraction.nearby_attractions.length > 0 && (
                  <Card p={6}>
                    <Heading size="sm" mb={3}>Nearby Attractions</Heading>
                    <VStack align="start" spacing={2} fontSize="sm">
                      {attraction.nearby_attractions.map((nearby) => (
                        <HStack key={nearby} spacing={2}>
                          <Icon as={FaMapMarkerAlt} color="secondary.500" w={4} h={4} />
                          <Text>{nearby}</Text>
                        </HStack>
                      ))}
                    </VStack>
                  </Card>
                )}
              </VStack>
            </TabPanel>

            {/* Tours & Tickets Tab */}
            <TabPanel>
              <VStack spacing={4} align="stretch">
                <Heading size="md">Available Tours & Tickets</Heading>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                  {attraction.tour_options.map((option, idx) => (
                    <Card key={idx} p={6}>
                      <VStack align="start" spacing={3}>
                        <Heading size="sm">{option.name}</Heading>
                        <Text fontSize="sm" color="gray.600">
                          {option.description}
                        </Text>
                        <HStack fontSize="sm" color="gray.600" spacing={4}>
                          <HStack>
                            <Icon as={FaClock} />
                            <Text>{option.duration}</Text>
                          </HStack>
                          <HStack>
                            <Icon as={FaDollarSign} />
                            <Text fontWeight="bold">{option.price}</Text>
                          </HStack>
                        </HStack>
                        <Button colorScheme="primary" w="full" size="sm">
                          Book Now
                        </Button>
                      </VStack>
                    </Card>
                  ))}
                </SimpleGrid>
              </VStack>
            </TabPanel>

            {/* Practical Info Tab */}
            <TabPanel>
              <VStack spacing={6} align="stretch">
                <Card p={6}>
                  <Heading size="sm" mb={4}>Hours & Contact</Heading>
                  <VStack align="start" spacing={3}>
                    <HStack spacing={2}>
                      <Icon as={FaClock} color="primary.500" />
                      <Box>
                        <Text fontWeight="semibold">Hours</Text>
                        <Text fontSize="sm">{attraction.bestTime}</Text>
                      </Box>
                    </HStack>
                    <HStack spacing={2}>
                      <Icon as={FaPhone} color="primary.500" />
                      <Text>{attraction.phone}</Text>
                    </HStack>
                    <HStack spacing={2}>
                      <Icon as={FaEnvelope} color="primary.500" />
                      <Text>{attraction.email}</Text>
                    </HStack>
                    <HStack spacing={2}>
                      <Icon as={FaMapMarkerAlt} color="primary.500" />
                      <Text>{attraction.address}</Text>
                    </HStack>
                  </VStack>
                </Card>

                <Card p={6} bg="green.50" _dark={{ bg: 'green.900' }}>
                  <Heading size="sm" mb={3}>Quick Facts</Heading>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={3} fontSize="sm">
                    <Box>
                      <Text fontWeight="semibold" color="gray.700">Duration</Text>
                      <Text>{attraction.duration}</Text>
                    </Box>
                    <Box>
                      <Text fontWeight="semibold" color="gray.700">Entrance Fee</Text>
                      <Text>{attraction.price}</Text>
                    </Box>
                    <Box>
                      <Text fontWeight="semibold" color="gray.700">Best Time to Visit</Text>
                      <Text>Early morning (less crowded)</Text>
                    </Box>
                    <Box>
                      <Text fontWeight="semibold" color="gray.700">Type</Text>
                      <Text>{attraction.type}</Text>
                    </Box>
                  </SimpleGrid>
                </Card>
              </VStack>
            </TabPanel>

            {/* Reviews Tab */}
            <TabPanel>
              <VStack spacing={6} align="stretch">
                <HStack justify="space-between" align="start">
                  <Box>
                    <Heading size="md" mb={2}>Visitor Reviews</Heading>
                    <Text color="gray.600">Based on {attraction.reviews.length} reviews</Text>
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
          </TabPanels>
        </Tabs>
      </VStack>
    </Container>
  )
}
