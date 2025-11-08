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
  Flex,
} from '@chakra-ui/react'
import {
  FaStar,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaUtensilsSpoon,
  FaDollarSign,
  FaUsers,
  FaArrowLeft,
  FaHeart,
  FaShare,
} from 'react-icons/fa'
import { Card } from '@/components/ui/Card'
import { useParams } from 'next/navigation'
import Link from 'next/link'

const restaurantDetails = {
  1: {
    name: 'Jay Fai',
    cuisine: 'Thai Street Food',
    location: 'Bangkok, Thailand',
    rating: 4.9,
    reviews: 2847,
    image: '🍜',
    priceRange: '$$',
    hours: '11:00 AM - 10:00 PM',
    phone: '+66 2 643 7156',
    email: 'info@jayfai.com',
    address: '27 Mahatun Alley, Petchburi Subdistrict, Bangkok',
    description: 'Jay Fai is a legendary street food restaurant famous for its authentic Thai cuisine and innovative dishes. Located in the heart of Bangkok, it offers an unforgettable culinary experience.',
    fullDescription: 'Jay Fai has been serving authentic Thai street food since 1995. The restaurant is renowned for its masterful preparation of traditional dishes and creative fusion plates. Chef Supinya "Jay" Junsuta has earned international recognition for her cooking skills and dedication to quality ingredients. Every dish is prepared with precision and passion.',
    cuisine_specialties: [
      'Crab Omelette',
      'Green Curry',
      'Pad Thai',
      'Tom Yum Soup',
      'Mango Sticky Rice',
    ],
    highlights: [
      'Famous for crab omelette',
      'Traditional Thai recipes',
      'Fresh local ingredients',
      'Chef-curated menu',
      'Casual dining atmosphere',
    ],
    menu_items: [
      { name: 'Crab Omelette', price: '$8', description: 'Famous crispy omelette with fresh crab' },
      { name: 'Green Curry Chicken', price: '$7', description: 'Authentic green curry with local herbs' },
      { name: 'Pad Thai', price: '$5', description: 'Classic stir-fried rice noodles' },
      { name: 'Tom Yum Soup', price: '$6', description: 'Spicy and sour soup with shrimp' },
      { name: 'Mango Sticky Rice', price: '$4', description: 'Sweet dessert with fresh mango' },
    ],
    policies: {
      reservations: 'Walk-ins only, expect 1-2 hour wait',
      payment: 'Cash and cards accepted',
      parking: 'Street parking available',
      allergens: 'Please inform staff of allergies',
    },
    reviews: [
      {
        author: 'Sarah M.',
        rating: 5,
        date: '2024-01-20',
        comment: 'Absolutely amazing! The crab omelette is life-changing. Worth the wait!',
        helpful: 145,
      },
      {
        author: 'Mike C.',
        rating: 5,
        date: '2024-01-15',
        comment: 'Best street food in Bangkok. Chef Jay is incredible!',
        helpful: 98,
      },
      {
        author: 'Emma W.',
        rating: 4,
        date: '2024-01-10',
        comment: 'Great food but long wait times. Still worth visiting!',
        helpful: 67,
      },
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
          {restaurant.image}
        </Box>

        {/* Quick Info */}
        <HStack spacing={4} pb={4} borderBottom="1px" borderColor="gray.200" flexWrap="wrap">
          <HStack>
            <Icon as={FaStar} color="accent.500" />
            <Text fontWeight="bold" fontSize="lg">{restaurant.rating}</Text>
            <Text color="gray.600">({restaurant.reviews.toLocaleString()} reviews)</Text>
          </HStack>
          <Badge colorScheme="secondary">{restaurant.cuisine}</Badge>
          <Badge colorScheme="primary">{restaurant.priceRange}</Badge>
        </HStack>

        {/* Tabs */}
        <Tabs>
          <TabList>
            <Tab>Overview</Tab>
            <Tab>Menu</Tab>
            <Tab>Reviews</Tab>
            <Tab>Info</Tab>
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
                    {restaurant.highlights.map((highlight) => (
                      <HStack key={highlight} spacing={3} align="start">
                        <Icon as={FaStar} color="accent.500" mt={1} flexShrink={0} />
                        <Text>{highlight}</Text>
                      </HStack>
                    ))}
                  </SimpleGrid>
                </Box>

                <Card p={6} bg="orange.50" _dark={{ bg: 'orange.900' }}>
                  <Heading size="sm" mb={3}>Cuisine Highlights</Heading>
                  <Flex wrap="wrap" gap={2}>
                    {restaurant.cuisine_specialties.map((specialty) => (
                      <Badge key={specialty} colorScheme="orange" px={3} py={1}>
                        {specialty}
                      </Badge>
                    ))}
                  </Flex>
                </Card>
              </VStack>
            </TabPanel>

            {/* Menu Tab */}
            <TabPanel>
              <VStack spacing={4} align="stretch">
                <Heading size="md">Menu Items</Heading>
                {restaurant.menu_items.map((item, idx) => (
                  <Card key={idx} p={6}>
                    <HStack justify="space-between" align="start" mb={2}>
                      <VStack align="start" spacing={1} flex={1}>
                        <Heading size="sm">{item.name}</Heading>
                        <Text fontSize="sm" color="gray.600">
                          {item.description}
                        </Text>
                      </VStack>
                      <Text fontWeight="bold" color="primary.600" fontSize="lg">
                        {item.price}
                      </Text>
                    </HStack>
                  </Card>
                ))}
              </VStack>
            </TabPanel>

            {/* Reviews Tab */}
            <TabPanel>
              <VStack spacing={6} align="stretch">
                <HStack justify="space-between" align="start">
                  <Box>
                    <Heading size="md" mb={2}>Guest Reviews</Heading>
                    <Text color="gray.600">Based on {restaurant.reviews.length} reviews</Text>
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

            {/* Info Tab */}
            <TabPanel>
              <VStack spacing={6} align="stretch">
                <Card p={6}>
                  <Heading size="sm" mb={4}>Hours & Contact</Heading>
                  <VStack align="start" spacing={3}>
                    <HStack spacing={2}>
                      <Icon as={FaClock} color="primary.500" />
                      <Box>
                        <Text fontWeight="semibold">Hours</Text>
                        <Text fontSize="sm">{restaurant.hours}</Text>
                      </Box>
                    </HStack>
                    <HStack spacing={2}>
                      <Icon as={FaPhone} color="primary.500" />
                      <Text>{restaurant.phone}</Text>
                    </HStack>
                    <HStack spacing={2}>
                      <Icon as={FaEnvelope} color="primary.500" />
                      <Text>{restaurant.email}</Text>
                    </HStack>
                    <HStack spacing={2}>
                      <Icon as={FaMapMarkerAlt} color="primary.500" />
                      <Text>{restaurant.address}</Text>
                    </HStack>
                  </VStack>
                </Card>

                <Card p={6}>
                  <Heading size="sm" mb={4}>Dining Information</Heading>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} fontSize="sm">
                    <Box>
                      <Text fontWeight="semibold" color="gray.700">Reservations</Text>
                      <Text>{restaurant.policies.reservations}</Text>
                    </Box>
                    <Box>
                      <Text fontWeight="semibold" color="gray.700">Payment</Text>
                      <Text>{restaurant.policies.payment}</Text>
                    </Box>
                    <Box>
                      <Text fontWeight="semibold" color="gray.700">Parking</Text>
                      <Text>{restaurant.policies.parking}</Text>
                    </Box>
                    <Box>
                      <Text fontWeight="semibold" color="gray.700">Allergens</Text>
                      <Text>{restaurant.policies.allergens}</Text>
                    </Box>
                  </SimpleGrid>
                </Card>

                <Button colorScheme="secondary" w="full" size="lg">
                  Make a Reservation
                </Button>
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </Container>
  )
}
