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
  Textarea,
  Image as ChakraImage,
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
  FaUsers,
  FaFire,
} from 'react-icons/fa'
import { Card } from '@/components/ui/Card'
import { useParams } from 'next/navigation'
import Link from 'next/link'

const restaurantDetails = {
  1: {
    name: 'Jay Fai',
    cuisine: 'Thai Street Food',
    location: 'Bangkok, Thailand',
    price: '$$',
    rating: 4.9,
    reviews: 2847,
    image: '🍜',
    description: 'Famous street food restaurant with innovative Thai dishes',
    fullDescription: 'Jay Fai is a legendary street food restaurant in Bangkok, known for its innovative Thai dishes and exceptional cooking techniques. The chef, "Aunty Jay," has become an icon of Thai street food culture, combining traditional recipes with modern culinary creativity. The intimate 10-seat counter provides an authentic and personal dining experience.',
    hours: '11:00 AM - 10:00 PM',
    daysOpen: 'Closed Mondays',
    specialties: [
      'Crab Omelette',
      'Pad Thai',
      'Tom Yum Soup',
      'Green Curry',
      'Mango Sticky Rice',
    ],
    menu: [
      { item: 'Crab Omelette', price: '$8', description: 'Fresh crab with fluffy egg' },
      { item: 'Pad Thai', price: '$6', description: 'Traditional stir-fried noodles' },
      { item: 'Green Curry', price: '$7', description: 'Creamy curry with vegetables' },
      { item: 'Tom Yum Soup', price: '$5', description: 'Spicy shrimp soup with lime' },
      { item: 'Mango Sticky Rice', price: '$4', description: 'Sweet mango with sticky rice' },
    ],
    amenities: ['Street Food', 'Counter Seating', 'Limited Capacity', 'Cash Only'],
    contact: {
      phone: '+66 2-226-1387',
      email: 'contact@jayfai.com',
      address: '386 Maha Chai Rd, Bangkok 10200, Thailand',
    },
    reviews: [
      {
        author: 'Sarah M.',
        rating: 5,
        date: '2024-01-15',
        comment: 'Absolutely incredible! The crab omelette is a masterpiece. Worth every penny and the wait.',
        helpful: 45,
      },
      {
        author: 'John D.',
        rating: 5,
        date: '2024-01-10',
        comment: 'One of the best street food experiences I\'ve had. The chef is amazing!',
        helpful: 32,
      },
      {
        author: 'Emma W.',
        rating: 4,
        date: '2024-01-05',
        comment: 'Great food but limited seating. Expect to wait. Still worth it!',
        helpful: 28,
      },
    ],
    tips: [
      'Arrive early or make a reservation',
      'Cash only - no credit cards',
      'Limited seating of about 10 seats',
      'Try the signature crab omelette',
      'Expect a wait during peak hours',
    ],
  },
  2: {
    name: 'Chote Chitr',
    cuisine: 'Homestyle Thai',
    location: 'Bangkok, Thailand',
    price: '$',
    rating: 4.6,
    reviews: 1923,
    image: '🍲',
    description: 'Authentic homestyle Thai cooking with family recipes',
    fullDescription: 'Chote Chitr is a beloved local favorite serving authentic homestyle Thai cuisine. Operating since 1958, this restaurant is famous for its traditional recipes passed down through generations. The casual atmosphere and reasonable prices make it a perfect place to experience genuine Thai flavors.',
    hours: '9:00 AM - 8:00 PM',
    daysOpen: 'Open Daily',
    specialties: [
      'Gaeng Hanglay',
      'Pad Krapow Moo',
      'Larb',
      'Pad Thai',
      'Khao Soi',
    ],
    menu: [
      { item: 'Gaeng Hanglay', price: '$3', description: 'Pork belly curry with tamarind' },
      { item: 'Pad Krapow Moo', price: '$3', description: 'Stir-fried pork with holy basil' },
      { item: 'Larb', price: '$4', description: 'Spicy minced meat salad' },
      { item: 'Pad Thai', price: '$3', description: 'Classic stir-fried noodles' },
      { item: 'Khao Soi', price: '$4', description: 'Northern curry noodles' },
    ],
    amenities: ['Family Friendly', 'Casual Dining', 'Cash & Cards', 'Air Conditioned'],
    contact: {
      phone: '+66 2-221-4082',
      email: 'contact@chotechitr.com',
      address: '114 Maha Chai Rd, Bangkok 10200, Thailand',
    },
    reviews: [
      {
        author: 'Tom B.',
        rating: 5,
        date: '2024-01-12',
        comment: 'The most authentic homestyle Thai food I\'ve ever had. A must-visit!',
        helpful: 38,
      },
      {
        author: 'Lisa K.',
        rating: 4,
        date: '2024-01-08',
        comment: 'Great value for money. The gaeng hanglay is incredible.',
        helpful: 25,
      },
    ],
    tips: [
      'Try the Gaeng Hanglay - it\'s their specialty',
      'Very affordable prices',
      'Casual, no-frills atmosphere',
      'Perfect for authentic Thai experience',
      'Popular with locals',
    ],
  },
}

export default function RestaurantDetailPage() {
  const params = useParams()
  const id = params.id as string
  const restaurant = restaurantDetails[id as keyof typeof restaurantDetails]

  if (!restaurant) {
    return (
      <Container maxW="7xl" py={8}>
        <VStack spacing={4}>
          <Heading size="lg">Restaurant not found</Heading>
          <Button as={Link} href="/restaurants" leftIcon={<FaArrowLeft />}>
            Back to Restaurants
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
              href="/restaurants"
              variant="ghost"
              leftIcon={<FaArrowLeft />}
              size="sm"
            >
              Back to Restaurants
            </Button>
            <Heading size="2xl">{restaurant.name}</Heading>
            <HStack color="gray.600" fontSize="sm">
              <Icon as={FaMapMarkerAlt} />
              <Text>{restaurant.location}</Text>
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
          <Text fontSize="6xl">{restaurant.image}</Text>
        </Box>

        {/* Rating and Quick Info */}
        <HStack spacing={4} pb={4} borderBottom="1px" borderColor="gray.200" flexWrap="wrap">
          <HStack>
            <Icon as={FaStar} color="accent.500" />
            <Text fontWeight="bold" fontSize="lg">{restaurant.rating}</Text>
            <Text color="gray.600">({restaurant.reviews.toLocaleString()} reviews)</Text>
          </HStack>
          <Badge colorScheme="secondary">{restaurant.cuisine}</Badge>
          <Badge colorScheme="primary">{restaurant.price}</Badge>
          <HStack spacing={1} fontSize="sm" color="gray.600">
            <Icon as={FaClock} />
            <Text>{restaurant.hours}</Text>
          </HStack>
        </HStack>

        {/* Main Content Tabs */}
        <Tabs>
          <TabList>
            <Tab>Overview</Tab>
            <Tab>Menu</Tab>
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
                    {restaurant.fullDescription}
                  </Text>
                </Box>

                <Box>
                  <Heading size="md" mb={4}>Specialties</Heading>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                    {restaurant.specialties.map((specialty) => (
                      <HStack key={specialty} spacing={3} align="start">
                        <Icon as={FaFire} color="accent.500" mt={1} flexShrink={0} />
                        <Text>{specialty}</Text>
                      </HStack>
                    ))}
                  </SimpleGrid>
                </Box>

                <Card p={6} bg="blue.50" _dark={{ bg: 'blue.900' }}>
                  <Heading size="sm" mb={3}>Hours & Days</Heading>
                  <VStack align="start" spacing={2} fontSize="sm">
                    <HStack>
                      <Text fontWeight="semibold">Hours:</Text>
                      <Text>{restaurant.hours}</Text>
                    </HStack>
                    <HStack>
                      <Text fontWeight="semibold">Status:</Text>
                      <Text>{restaurant.daysOpen}</Text>
                    </HStack>
                  </VStack>
                </Card>

                <Box>
                  <Heading size="md" mb={4}>Amenities</Heading>
                  <SimpleGrid columns={{ base: 2, md: 3 }} spacing={3}>
                    {restaurant.amenities.map((amenity) => (
                      <Badge key={amenity} variant="outline" p={2} textAlign="center">
                        {amenity}
                      </Badge>
                    ))}
                  </SimpleGrid>
                </Box>
              </VStack>
            </TabPanel>

            {/* Menu Tab */}
            <TabPanel>
              <VStack spacing={4} align="stretch">
                <Heading size="md">Menu</Heading>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  {restaurant.menu.map((dish) => (
                    <Card key={dish.item} p={6}>
                      <VStack align="start" spacing={3}>
                        <HStack justify="space-between" w="full">
                          <Heading size="sm">{dish.item}</Heading>
                          <Text fontWeight="bold" color="primary.600">{dish.price}</Text>
                        </HStack>
                        <Text fontSize="sm" color="gray.700">{dish.description}</Text>
                        <Button colorScheme="secondary" size="sm" w="full">
                          Order Now
                        </Button>
                      </VStack>
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
                    <Heading size="md" mb={2}>Guest Reviews</Heading>
                    <Text color="gray.600">Based on {restaurant.reviews.length} verified reviews</Text>
                  </Box>
                  <Button colorScheme="primary">Write a Review</Button>
                </HStack>

                <VStack spacing={4}>
                  {restaurant.reviews.map((review, idx) => (
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
                      <Text>{restaurant.contact.address}</Text>
                    </HStack>
                    <HStack spacing={2}>
                      <Icon as={FaPhone} color="primary.500" />
                      <Text>{restaurant.contact.phone}</Text>
                    </HStack>
                    <HStack spacing={2}>
                      <Icon as={FaEnvelope} color="primary.500" />
                      <Text>{restaurant.contact.email}</Text>
                    </HStack>
                  </VStack>
                </Card>
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>

        {/* Travel Tips */}
        <Box borderTop="1px" borderColor="gray.200" pt={8}>
          <VStack spacing={6} align="stretch">
            <Heading size="md">Traveler Tips</Heading>
            <VStack spacing={3} align="stretch">
              {restaurant.tips.map((tip, idx) => (
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
