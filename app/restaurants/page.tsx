'use client'
import {
  Container,
  Heading,
  Text,
  SimpleGrid,
  Box,
  Badge,
  HStack,
  Button,
  VStack,
  Icon,
  Input,
  Select,
  Flex,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react'
import { Card } from '@/components/ui/Card'
import { FaStar, FaMapMarkerAlt, FaSearch, FaClock, FaDollarSign } from 'react-icons/fa'
import Link from 'next/link'
import { useState } from 'react'

const restaurants = [
  {
    id: 1,
    name: 'Jay Fai',
    cuisine: 'Thai Street Food',
    location: 'Bangkok, Thailand',
    rating: 4.9,
    reviews: 2847,
    priceRange: '$$',
    image: '🍜',
    hours: '11:00 AM - 10:00 PM',
    description: 'Famous street food restaurant with innovative Thai dishes',
  },
  {
    id: 2,
    name: 'Chote Chitr',
    cuisine: 'Homestyle Thai',
    location: 'Bangkok, Thailand',
    rating: 4.6,
    reviews: 1923,
    priceRange: '$',
    image: '🍲',
    hours: '9:00 AM - 8:00 PM',
    description: 'Authentic homestyle Thai cooking with family recipes',
  },
  {
    id: 3,
    name: 'Nahm',
    cuisine: 'Fine Thai Dining',
    location: 'Bangkok, Thailand',
    rating: 4.8,
    reviews: 1456,
    priceRange: '$$$',
    image: '🍽️',
    hours: '12:00 PM - 11:00 PM',
    description: 'Award-winning Thai cuisine in an elegant setting',
  },
  {
    id: 4,
    name: 'Somtam Der',
    cuisine: 'Isaan Cuisine',
    location: 'Bangkok, Thailand',
    rating: 4.5,
    reviews: 1234,
    priceRange: '$$',
    image: '🥗',
    hours: '10:00 AM - 10:00 PM',
    description: 'Authentic northeastern Thai (Isaan) flavors',
  },
]

export default function RestaurantsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [cuisineFilter, setCuisineFilter] = useState('all')

  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
    const matchCuisine = cuisineFilter === 'all' || restaurant.cuisine === cuisineFilter
    return matchSearch && matchCuisine
  })

  const cuisines = ['Thai Street Food', 'Homestyle Thai', 'Fine Thai Dining', 'Isaan Cuisine']

  return (
    <Container maxW="7xl" py={8}>
      <VStack spacing={8} align="stretch">
        {/* Header */}
        <Box>
          <Heading size="xl" mb={2}>🍜 Restaurants & Dining</Heading>
          <Text color="gray.600">Discover the best local cuisine and dining experiences</Text>
        </Box>

        {/* Search & Filter */}
        <VStack spacing={4} align="stretch">
          <InputGroup>
            <InputLeftElement>
              <Icon as={FaSearch} color="gray.400" />
            </InputLeftElement>
            <Input
              placeholder="Search restaurants..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              border="1px"
              borderColor="gray.300"
            />
          </InputGroup>

          <HStack spacing={4}>
            <Box minW="200px">
              <Text fontSize="sm" color="gray.600" mb={2}>Cuisine Type</Text>
              <Select
                value={cuisineFilter}
                onChange={(e) => setCuisineFilter(e.target.value)}
                border="1px"
                borderColor="gray.300"
              >
                <option value="all">All Cuisines</option>
                {cuisines.map(cuisine => (
                  <option key={cuisine} value={cuisine}>{cuisine}</option>
                ))}
              </Select>
            </Box>
          </HStack>
        </VStack>

        {/* Results Count */}
        <Text fontWeight="semibold" color="gray.700">
          Showing {filteredRestaurants.length} restaurants
        </Text>

        {/* Restaurants Grid */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {filteredRestaurants.map(restaurant => (
            <Link key={restaurant.id} href={`/restaurants/${restaurant.id}`}>
              <Card
                p={0}
                overflow="hidden"
                _hover={{ transform: 'translateY(-4px)', boxShadow: 'lg' }}
                cursor="pointer"
                h="full"
                display="flex"
                flexDirection="column"
              >
                {/* Image */}
                <Box
                  h="180px"
                  bg="gray.100"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontSize="4xl"
                >
                  {restaurant.image}
                </Box>

                {/* Content */}
                <Box p={6} flex={1} display="flex" flexDirection="column">
                  <VStack align="start" spacing={3} flex={1}>
                    <VStack align="start" spacing={1}>
                      <Heading size="sm">{restaurant.name}</Heading>
                      <Text fontSize="xs" color="gray.600">{restaurant.cuisine}</Text>
                    </VStack>

                    <HStack fontSize="sm" color="gray.600">
                      <Icon as={FaMapMarkerAlt} />
                      <Text>{restaurant.location}</Text>
                    </HStack>

                    <Text fontSize="sm" color="gray.600" noOfLines={2}>
                      {restaurant.description}
                    </Text>

                    <HStack spacing={3} w="full">
                      <HStack spacing={1}>
                        <Icon as={FaStar} color="accent.500" w={4} h={4} />
                        <Text fontWeight="bold" fontSize="sm">{restaurant.rating}</Text>
                        <Text fontSize="xs" color="gray.600">({restaurant.reviews.toLocaleString()})</Text>
                      </HStack>
                      <Badge colorScheme="primary" fontSize="xs">
                        {restaurant.priceRange}
                      </Badge>
                    </HStack>

                    <HStack fontSize="xs" color="gray.600" spacing={2}>
                      <Icon as={FaClock} />
                      <Text>{restaurant.hours}</Text>
                    </HStack>
                  </VStack>

                  <Link href={`/restaurants/${restaurant.id}`}>
                    <Button colorScheme="secondary" w="full" size="sm" mt={4}>
                      View Details
                    </Button>
                  </Link>
                </Box>
              </Card>
            </Link>
          ))}
        </SimpleGrid>

        {/* No Results */}
        {filteredRestaurants.length === 0 && (
          <Box textAlign="center" py={12}>
            <Heading size="md" color="gray.600" mb={2}>No restaurants found</Heading>
            <Text color="gray.500">Try adjusting your filters to find more options</Text>
          </Box>
        )}
      </VStack>
    </Container>
  )
}
