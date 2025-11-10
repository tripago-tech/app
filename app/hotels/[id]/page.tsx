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
  Stack,
  Image as ChakraImage,
} from '@chakra-ui/react'
import {
  FaStar,
  FaMapMarkerAlt,
  FaWifi,
  FaSwimmingPool,
  FaUtensils,
  FaDumbbell,
  FaParking,
  FaTv,
  FaPhone,
  FaEnvelope,
  FaCalendarAlt,
  FaUsers,
  FaCreditCard,
  FaHeart,
  FaShare,
  FaArrowLeft,
} from 'react-icons/fa'
import { Card } from '@/components/ui/Card'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useRouter as useNextRouter } from 'next/router'

const hotelDetails = {
  1: {
    name: 'Mandarin Oriental Bangkok',
    location: 'Bangkok, Thailand',
    price: 189,
    originalPrice: 245,
    rating: 4.9,
    reviews: 2847,
    image: '🏨',
    type: 'Luxury',
    description: 'Experience unparalleled luxury and service at Mandarin Oriental Bangkok, one of the world\'s most prestigious hotels located on the banks of the Chao Phraya River.',
    fullDescription: 'Mandarin Oriental Bangkok is synonymous with luxury and elegance, offering an unforgettable experience to discerning travelers. Overlooking the Chao Phraya River, our iconic hotel combines Thai charm with contemporary elegance. Our impeccable service, combined with world-class amenities, makes us the preferred choice for luxury travelers.',
    amenities: [
      { name: 'WiFi', icon: FaWifi },
      { name: 'Pool', icon: FaSwimmingPool },
      { name: 'Spa', icon: FaUtensils },
      { name: 'Restaurant', icon: FaUtensils },
      { name: 'Gym', icon: FaDumbbell },
      { name: 'Parking', icon: FaParking },
      { name: 'TV', icon: FaTv },
      { name: '24/7 Service', icon: FaPhone },
    ],
    rooms: [
      { type: 'Standard Room', price: 189, capacity: 2, size: '45 sqm' },
      { type: 'Deluxe Room', price: 240, capacity: 2, size: '55 sqm' },
      { type: 'Suite', price: 350, capacity: 4, size: '85 sqm' },
      { type: 'Presidential Suite', price: 800, capacity: 4, size: '150 sqm' },
    ],
    highlights: [
      'Prime location on the Chao Phraya River',
      'World-class spa and wellness center',
      'Award-winning restaurants and bars',
      'Personalized concierge service',
      'River view rooms available',
      'Close to major attractions',
    ],
    policies: {
      checkIn: '3:00 PM',
      checkOut: '12:00 PM',
      cancellation: 'Free cancellation up to 7 days before arrival',
      pets: 'Pets allowed with additional fee',
    },
    contact: {
      phone: '+66 2 659 8888',
      email: 'reservations@mohg.com',
      address: '48 Oriental Avenue, Bangkok 10500, Thailand',
    },
    reviews: [
      {
        author: 'Sarah M.',
        rating: 5,
        date: '2024-01-15',
        comment: 'Absolutely stunning property! The service is impeccable and the river views are breathtaking. Highly recommend!',
        helpful: 45,
      },
      {
        author: 'John D.',
        rating: 5,
        date: '2024-01-10',
        comment: 'One of the best luxury hotels I\'ve stayed at. Every detail is perfect.',
        helpful: 32,
      },
      {
        author: 'Emma W.',
        rating: 4,
        date: '2024-01-05',
        comment: 'Great hotel but a bit pricey. Still worth the experience.',
        helpful: 28,
      },
    ],
  },
}

export default function HotelDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  const hotel = hotelDetails[id as keyof typeof hotelDetails]

  if (!hotel) {
    return (
      <Container maxW="7xl" py={8}>
        <VStack spacing={4}>
          <Heading size="lg">Hotel not found</Heading>
          <Button as={Link} href="/hotels" leftIcon={<FaArrowLeft />}>
            Back to Hotels
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
              href="/hotels"
              variant="ghost"
              leftIcon={<FaArrowLeft />}
              size="sm"
            >
              Back to Hotels
            </Button>
            <Heading size="2xl">{hotel.name}</Heading>
            <HStack color="gray.600" fontSize="sm">
              <Icon as={FaMapMarkerAlt} />
              <Text>{hotel.location}</Text>
            </HStack>
          </VStack>
          <HStack spacing={2}>
            <Button variant="outline" leftIcon={<FaHeart />} />
            <Button variant="outline" leftIcon={<FaShare />} />
          </HStack>
        </HStack>

        {/* Image Gallery Section */}
        <Box
          w="full"
          h={{ base: '300px', md: '450px' }}
          bg="gray.100"
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="lg"
        >
          <Text fontSize="6xl">{hotel.image}</Text>
        </Box>

        {/* Rating and Quick Info */}
        <HStack spacing={4} pb={4} borderBottom="1px" borderColor="gray.200" flexWrap="wrap">
          <HStack>
            <Icon as={FaStar} color="accent.500" />
            <Text fontWeight="bold" fontSize="lg">{hotel.rating}</Text>
            <Text color="gray.600">({hotel.reviews.toLocaleString()} reviews)</Text>
          </HStack>
          <Badge colorScheme="secondary">{hotel.type}</Badge>
          <Text fontWeight="semibold" color="primary.600">From ${hotel.price}/night</Text>
        </HStack>

        {/* Main Content Tabs */}
        <Tabs>
          <TabList>
            <Tab>Overview</Tab>
            <Tab>Rooms & Rates</Tab>
            <Tab>Amenities</Tab>
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
                    {hotel.fullDescription}
                  </Text>
                </Box>

                <Box>
                  <Heading size="md" mb={4}>Why Choose This Hotel?</Heading>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                    {hotel.highlights.map((highlight) => (
                      <HStack key={highlight} spacing={3} align="start">
                        <Icon as={FaStar} color="accent.500" mt={1} flexShrink={0} />
                        <Text>{highlight}</Text>
                      </HStack>
                    ))}
                  </SimpleGrid>
                </Box>

                <Card p={6} bg="blue.50" _dark={{ bg: 'blue.900' }}>
                  <Heading size="sm" mb={3}>Important Information</Heading>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} fontSize="sm">
                    <Box>
                      <Text fontWeight="semibold" color="gray.700">Check-in</Text>
                      <Text>{hotel.policies.checkIn}</Text>
                    </Box>
                    <Box>
                      <Text fontWeight="semibold" color="gray.700">Check-out</Text>
                      <Text>{hotel.policies.checkOut}</Text>
                    </Box>
                    <Box>
                      <Text fontWeight="semibold" color="gray.700">Cancellation</Text>
                      <Text>{hotel.policies.cancellation}</Text>
                    </Box>
                    <Box>
                      <Text fontWeight="semibold" color="gray.700">Pets</Text>
                      <Text>{hotel.policies.pets}</Text>
                    </Box>
                  </SimpleGrid>
                </Card>
              </VStack>
            </TabPanel>

            {/* Rooms Tab */}
            <TabPanel>
              <VStack spacing={4} align="stretch">
                <Heading size="md">Available Rooms</Heading>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  {hotel.rooms.map((room) => (
                    <Card key={room.type} p={6}>
                      <VStack align="start" spacing={3}>
                        <Heading size="sm">{room.type}</Heading>
                        <HStack spacing={4} fontSize="sm" color="gray.600">
                          <HStack>
                            <Icon as={FaUsers} />
                            <Text>{room.capacity} guests</Text>
                          </HStack>
                          <Text>•</Text>
                          <Text>{room.size}</Text>
                        </HStack>
                        <Heading size="md" color="primary.600">
                          ${room.price}
                        </Heading>
                        <Button colorScheme="primary" w="full">
                          Book Now
                        </Button>
                      </VStack>
                    </Card>
                  ))}
                </SimpleGrid>
              </VStack>
            </TabPanel>

            {/* Amenities Tab */}
            <TabPanel>
              <SimpleGrid columns={{ base: 2, md: 3 }} spacing={4}>
                {hotel.amenities.map((amenity) => (
                  <HStack key={amenity.name} spacing={3} p={4} bg="gray.50" borderRadius="lg">
                    <Icon as={amenity.icon} color="primary.500" w={5} h={5} />
                    <Text fontWeight="medium">{amenity.name}</Text>
                  </HStack>
                ))}
              </SimpleGrid>
            </TabPanel>

            {/* Reviews Tab */}
            <TabPanel>
              <VStack spacing={6} align="stretch">
                <HStack justify="space-between" align="start">
                  <Box>
                    <Heading size="md" mb={2}>Guest Reviews</Heading>
                    <Text color="gray.600">Based on {hotel.reviews.length} verified reviews</Text>
                  </Box>
                  <Button colorScheme="primary">Write a Review</Button>
                </HStack>

                <VStack spacing={4}>
                  {hotel.reviews.map((review, idx) => (
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
                      <Text>{hotel.contact.address}</Text>
                    </HStack>
                    <HStack spacing={2}>
                      <Icon as={FaPhone} color="primary.500" />
                      <Text>{hotel.contact.phone}</Text>
                    </HStack>
                    <HStack spacing={2}>
                      <Icon as={FaEnvelope} color="primary.500" />
                      <Text>{hotel.contact.email}</Text>
                    </HStack>
                  </VStack>
                </Card>
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>

        {/* Booking Section */}
        <Card p={6} bg="primary.50" _dark={{ bg: 'primary.900' }}>
          <VStack spacing={4} align="stretch">
            <Heading size="md">Reserve Your Stay</Heading>
            <SimpleGrid columns={{ base: 1, md: 4 }} spacing={4}>
              <Box>
                <Text fontSize="sm" color="gray.600" mb={2}>Check-in</Text>
                <Input type="date" />
              </Box>
              <Box>
                <Text fontSize="sm" color="gray.600" mb={2}>Check-out</Text>
                <Input type="date" />
              </Box>
              <Box>
                <Text fontSize="sm" color="gray.600" mb={2}>Guests</Text>
                <Select>
                  <option>1 Guest</option>
                  <option>2 Guests</option>
                  <option>3 Guests</option>
                  <option>4+ Guests</option>
                </Select>
              </Box>
              <Flex align="flex-end">
                <Button colorScheme="secondary" w="full" leftIcon={<FaCreditCard />}>
                  Book Now
                </Button>
              </Flex>
            </SimpleGrid>
          </VStack>
        </Card>
      </VStack>
    </Container>
  )
}
