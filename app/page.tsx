'use client'
import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  VStack, 
  HStack, 
  SimpleGrid,
  Input,
  Button,
  InputGroup,
  InputLeftElement,
  Badge,
  Flex,
  Icon,
  Select
} from '@chakra-ui/react'
import { FaSearch, FaMapMarkerAlt, FaStar, FaHeart, FaPlane, FaCalendarAlt, FaUsers } from 'react-icons/fa'
import { Card } from '@/components/ui/Card'

export default function HomePage() {
  return (
    <Box>
      {/* Hero Section with Search */}
      <Box
        bgGradient="linear(to-r, primary.500, primary.600)"
        color="white"
        py={20}
        position="relative"
        overflow="hidden"
      >
        <Container maxW="6xl" position="relative" zIndex={2}>
          <VStack spacing={8} textAlign="center">
            <VStack spacing={4}>
              <Heading size="2xl" fontWeight="bold">
                Where do you want to go?
              </Heading>
              <Text fontSize="xl" opacity={0.9}>
                Discover amazing places, book hotels, and plan your perfect trip with AI
              </Text>
            </VStack>

            {/* Advanced Search Bar */}
            <Box w="full" maxW="4xl">
              <Card p={6} bg="white" borderRadius="xl" boxShadow="2xl">
                <VStack spacing={4}>
                  <HStack w="full" spacing={4}>
                    <InputGroup flex={2}>
                      <InputLeftElement>
                        <Icon as={FaMapMarkerAlt} color="gray.400" />
                      </InputLeftElement>
                      <Input
                        placeholder="Destination (e.g., Bangkok, Chiang Mai)"
                        border="1px"
                        borderColor="gray.300"
                        color="gray.900"
                        fontSize="md"
                        _focus={{ borderColor: 'primary.500', boxShadow: 'outline' }}
                      />
                    </InputGroup>
                    
                    <InputGroup flex={1}>
                      <InputLeftElement>
                        <Icon as={FaCalendarAlt} color="gray.400" />
                      </InputLeftElement>
                      <Input
                        type="date"
                        border="1px"
                        borderColor="gray.300"
                        color="gray.900"
                        _focus={{ borderColor: 'primary.500', boxShadow: 'outline' }}
                      />
                    </InputGroup>
                    
                    <Select flex={1} border="1px" borderColor="gray.300" color="gray.900">
                      <option value="2">2 Guests</option>
                      <option value="1">1 Guest</option>
                      <option value="3">3 Guests</option>
                      <option value="4">4+ Guests</option>
                    </Select>
                  </HStack>
                  
                  <Button
                    leftIcon={<FaSearch />}
                    colorScheme="primary"
                    size="lg"
                    w="full"
                    py={6}
                  >
                    Search Hotels & Attractions
                  </Button>
                </VStack>
              </Card>
            </Box>

            {/* Quick Actions */}
            <HStack spacing={4} flexWrap="wrap" justify="center">
              <Button variant="outline" colorScheme="whiteAlpha" leftIcon={<FaPlane />} as={Link} href="/travel">
                Flights
              </Button>
              <Button variant="outline" colorScheme="whiteAlpha" leftIcon={<FaMapMarkerAlt />} as={Link} href="/hotels">
                Hotels
              </Button>
              <Button variant="outline" colorScheme="whiteAlpha" leftIcon={<FaStar />} as={Link} href="/attractions">
                Attractions
              </Button>
            </HStack>
          </VStack>
        </Container>

        {/* Background Pattern */}
        <Box
          position="absolute"
          top={0}
          right={0}
          w="50%"
          h="100%"
          opacity={0.1}
          bg="whiteAlpha.100"
        />
      </Box>

      {/* Trending Destinations */}
      <Container maxW="7xl" py={16}>
        <VStack spacing={12}>
          <VStack spacing={4} textAlign="center">
            <Heading size="xl" color="gray.900">
              Trending Destinations
            </Heading>
            <Text color="gray.600" fontSize="lg">
              Discover the most popular places travelers are booking right now
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} w="full">
            {[
              { id: 1, name: 'Bangkok', country: 'Thailand', price: '$45', rating: 4.8, reviews: 12847, image: '🏙️' },
              { id: 2, name: 'Chiang Mai', country: 'Thailand', price: '$35', rating: 4.7, reviews: 8934, image: '🏔️' },
              { id: 3, name: 'Phuket', country: 'Thailand', price: '$65', rating: 4.6, reviews: 15632, image: '🏝️' },
              { id: 4, name: 'Pattaya', country: 'Thailand', price: '$40', rating: 4.5, reviews: 9876, image: '🏖️' },
            ].map((dest) => (
              <Link key={dest.id} href={`/destinations/${dest.id}`}>
                <Card overflow="hidden" cursor="pointer" _hover={{ transform: 'translateY(-4px)' }}>
                  <Box h="200px" bg="gray.100" display="flex" alignItems="center" justifyContent="center">
                    <Text fontSize="6xl">{dest.image}</Text>
                  </Box>
                  <Box p={4}>
                    <VStack align="start" spacing={2}>
                      <HStack justify="space-between" w="full">
                        <VStack align="start" spacing={0}>
                          <Heading size="md">{dest.name}</Heading>
                          <Text color="gray.600" fontSize="sm">{dest.country}</Text>
                        </VStack>
                        <Icon as={FaHeart} color="gray.300" _hover={{ color: 'red.400' }} cursor="pointer" />
                      </HStack>
                      <HStack justify="space-between" w="full">
                        <HStack>
                          <Icon as={FaStar} color="accent.500" />
                          <Text fontWeight="bold">{dest.rating}</Text>
                          <Text fontSize="sm" color="gray.500">({dest.reviews.toLocaleString()})</Text>
                        </HStack>
                        <Text fontWeight="bold" color="primary.600">
                          From {dest.price}/night
                        </Text>
                      </HStack>
                    </VStack>
                  </Box>
                </Card>
              </Link>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>

      {/* Top-Rated Hotels */}
      <Box bg="white" py={16}>
        <Container maxW="7xl">
          <VStack spacing={12}>
            <VStack spacing={4} textAlign="center">
              <Heading size="xl" color="gray.900">
                Top-Rated Hotels
              </Heading>
              <Text color="gray.600" fontSize="lg">
                Stay at the best hotels with excellent reviews and great prices
              </Text>
            </VStack>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} w="full">
              {[
                { 
                  name: 'Mandarin Oriental Bangkok', 
                  location: 'Bangkok, Thailand', 
                  price: '$189', 
                  originalPrice: '$245',
                  rating: 4.9, 
                  reviews: 2847,
                  amenities: ['Free WiFi', 'Pool', 'Spa', 'Restaurant']
                },
                { 
                  name: 'Four Seasons Chiang Mai', 
                  location: 'Chiang Mai, Thailand', 
                  price: '$156', 
                  originalPrice: '$198',
                  rating: 4.8, 
                  reviews: 1892,
                  amenities: ['Free WiFi', 'Pool', 'Garden', 'Breakfast']
                },
                { 
                  name: 'Banyan Tree Phuket', 
                  location: 'Phuket, Thailand', 
                  price: '$267', 
                  originalPrice: '$320',
                  rating: 4.7, 
                  reviews: 1634,
                  amenities: ['Beach Access', 'Pool', 'Spa', 'Golf']
                },
              ].map((hotel, index) => (
                <Card key={index} overflow="hidden" _hover={{ transform: 'translateY(-2px)' }}>
                  <Box h="240px" bg="gray.100" display="flex" alignItems="center" justifyContent="center">
                    <Text fontSize="4xl">🏨</Text>
                  </Box>
                  <Box p={6}>
                    <VStack align="start" spacing={3}>
                      <VStack align="start" spacing={1}>
                        <Heading size="md">{hotel.name}</Heading>
                        <HStack>
                          <Icon as={FaMapMarkerAlt} color="gray.400" />
                          <Text color="gray.600" fontSize="sm">{hotel.location}</Text>
                        </HStack>
                      </VStack>
                      
                      <HStack justify="space-between" w="full">
                        <HStack>
                          <Icon as={FaStar} color="accent.500" />
                          <Text fontWeight="bold">{hotel.rating}</Text>
                          <Text color="gray.600" fontSize="sm">({hotel.reviews.toLocaleString()})</Text>
                        </HStack>
                        <Badge colorScheme="secondary">Excellent</Badge>
                      </HStack>

                      <HStack spacing={2} flexWrap="wrap">
                        {hotel.amenities.slice(0, 3).map((amenity, i) => (
                          <Badge key={i} variant="outline" fontSize="xs">{amenity}</Badge>
                        ))}
                      </HStack>

                      <HStack justify="space-between" w="full" pt={2}>
                        <VStack align="start" spacing={0}>
                          <HStack>
                            <Text fontSize="lg" fontWeight="bold" color="primary.600">
                              {hotel.price}
                            </Text>
                            <Text fontSize="sm" textDecoration="line-through" color="gray.500">
                              {hotel.originalPrice}
                            </Text>
                          </HStack>
                          <Text fontSize="xs" color="gray.600">per night</Text>
                        </VStack>
                        <Button colorScheme="primary" size="md">
                          View Deal
                        </Button>
                      </HStack>
                    </VStack>
                  </Box>
                </Card>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* AI Trip Planner CTA */}
      <Box bgGradient="linear(to-r, secondary.500, secondary.600)" py={16}>
        <Container maxW="4xl">
          <VStack spacing={8} textAlign="center" color="white">
            <VStack spacing={4}>
              <Heading size="xl">Let AI Plan Your Perfect Trip</Heading>
              <Text fontSize="lg" opacity={0.9}>
                Tell us your preferences and budget, and our AI will create a personalized itinerary just for you
              </Text>
            </VStack>
            <Button
              size="lg"
              bg="white"
              color="secondary.600"
              _hover={{ bg: 'gray.100', transform: 'translateY(-2px)' }}
              px={8}
            >
              Start Planning with AI
            </Button>
          </VStack>
        </Container>
      </Box>

      {/* Recent Reviews */}
      <Container maxW="7xl" py={16}>
        <VStack spacing={12}>
          <VStack spacing={4} textAlign="center">
            <Heading size="xl" color="gray.900">
              Recent Traveler Reviews
            </Heading>
            <Text color="gray.600" fontSize="lg">
              See what fellow travelers are saying about their experiences
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} w="full">
            {[
              {
                user: 'Sarah M.',
                location: 'Grand Palace, Bangkok',
                rating: 5,
                comment: 'Absolutely stunning architecture! A must-visit when in Bangkok.',
                helpful: 24
              },
              {
                user: 'Mike Chen',
                location: 'Doi Suthep, Chiang Mai',
                rating: 5,
                comment: 'Amazing views and peaceful atmosphere. The temple is breathtaking.',
                helpful: 18
              },
              {
                user: 'Emma Wilson',
                location: 'Patong Beach, Phuket',
                rating: 4,
                comment: 'Great beach with lots of activities. Can get crowded but worth it!',
                helpful: 31
              }
            ].map((review, index) => (
              <Card key={index} p={6}>
                <VStack align="start" spacing={3}>
                  <HStack justify="space-between" w="full">
                    <Text fontWeight="bold">{review.user}</Text>
                    <HStack>
                      {[...Array(5)].map((_, i) => (
                        <Icon 
                          key={i} 
                          as={FaStar} 
                          color={i < review.rating ? 'accent.500' : 'gray.300'} 
                          size="sm"
                        />
                      ))}
                    </HStack>
                  </HStack>
                  <Text fontSize="sm" color="gray.600">{review.location}</Text>
                  <Text>{review.comment}</Text>
                  <Text fontSize="sm" color="gray.500">
                    {review.helpful} people found this helpful
                  </Text>
                </VStack>
              </Card>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  )
}
