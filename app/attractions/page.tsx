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

const attractions = [
  {
    id: 1,
    name: 'Grand Palace Bangkok',
    type: 'Historic Palace',
    location: 'Bangkok, Thailand',
    rating: 4.9,
    reviews: 5234,
    image: '🏛️',
    duration: '2-3 hours',
    price: '$15',
    description: 'The official residence of Thai kings since 1782 with stunning architecture',
    category: 'must-visit',
  },
  {
    id: 2,
    name: 'Wat Arun (Temple of the Dawn)',
    type: 'Historic Temple',
    location: 'Bangkok, Thailand',
    rating: 4.8,
    reviews: 4567,
    image: '⛩️',
    duration: '1-2 hours',
    price: '$3',
    description: 'Iconic riverside temple known for ornate architecture and stunning views',
    category: 'temple',
  },
  {
    id: 3,
    name: 'Floating Markets',
    type: 'Local Experience',
    location: 'Bangkok, Thailand',
    rating: 4.7,
    reviews: 3892,
    image: '🚣',
    duration: '3-4 hours',
    price: '$20',
    description: 'Traditional commerce on water with local vendors and authentic products',
    category: 'experience',
  },
  {
    id: 4,
    name: 'Lumphini Park',
    type: 'Park & Nature',
    location: 'Bangkok, Thailand',
    rating: 4.5,
    reviews: 2156,
    image: '🌳',
    duration: '1-2 hours',
    price: 'Free',
    description: 'Large park with monitor lizards, landscaped gardens, and walking paths',
    category: 'nature',
  },
]

export default function AttractionsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')

  const filteredAttractions = attractions.filter(attraction => {
    const matchSearch = attraction.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       attraction.type.toLowerCase().includes(searchQuery.toLowerCase())
    const matchType = typeFilter === 'all' || attraction.type === typeFilter
    return matchSearch && matchType
  })

  const types = ['Historic Palace', 'Historic Temple', 'Local Experience', 'Park & Nature']

  return (
    <Container maxW="7xl" py={8}>
      <VStack spacing={8} align="stretch">
        {/* Header */}
        <Box>
          <Heading size="xl" mb={2}>🎫 Things to Do & Attractions</Heading>
          <Text color="gray.600">Discover attractions, tours, and experiences</Text>
        </Box>

        {/* Search & Filter */}
        <VStack spacing={4} align="stretch">
          <InputGroup>
            <InputLeftElement>
              <Icon as={FaSearch} color="gray.400" />
            </InputLeftElement>
            <Input
              placeholder="Search attractions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              border="1px"
              borderColor="gray.300"
            />
          </InputGroup>

          <HStack spacing={4}>
            <Box minW="200px">
              <Text fontSize="sm" color="gray.600" mb={2}>Attraction Type</Text>
              <Select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                border="1px"
                borderColor="gray.300"
              >
                <option value="all">All Types</option>
                {types.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </Select>
            </Box>
          </HStack>
        </VStack>

        {/* Results Count */}
        <Text fontWeight="semibold" color="gray.700">
          Showing {filteredAttractions.length} attractions
        </Text>

        {/* Attractions Grid */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {filteredAttractions.map(attraction => (
            <Link key={attraction.id} href={`/attractions/${attraction.id}`}>
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
                  {attraction.image}
                </Box>

                {/* Content */}
                <Box p={6} flex={1} display="flex" flexDirection="column">
                  <VStack align="start" spacing={3} flex={1}>
                    <VStack align="start" spacing={1}>
                      <Heading size="sm">{attraction.name}</Heading>
                      <Text fontSize="xs" color="gray.600">{attraction.type}</Text>
                    </VStack>

                    <HStack fontSize="sm" color="gray.600">
                      <Icon as={FaMapMarkerAlt} />
                      <Text>{attraction.location}</Text>
                    </HStack>

                    <Text fontSize="sm" color="gray.600" noOfLines={2}>
                      {attraction.description}
                    </Text>

                    <HStack spacing={3} w="full">
                      <HStack spacing={1}>
                        <Icon as={FaStar} color="accent.500" w={4} h={4} />
                        <Text fontWeight="bold" fontSize="sm">{attraction.rating}</Text>
                        <Text fontSize="xs" color="gray.600">({attraction.reviews.toLocaleString()})</Text>
                      </HStack>
                      <Badge colorScheme="secondary" fontSize="xs">
                        Must Visit
                      </Badge>
                    </HStack>

                    <HStack spacing={4} fontSize="xs" color="gray.600" w="full">
                      <HStack spacing={1}>
                        <Icon as={FaClock} />
                        <Text>{attraction.duration}</Text>
                      </HStack>
                      <HStack spacing={1}>
                        <Icon as={FaDollarSign} />
                        <Text fontWeight="bold">{attraction.price}</Text>
                      </HStack>
                    </HStack>
                  </VStack>

                  <Button colorScheme="primary" w="full" size="sm" mt={4}>
                    View Details
                  </Button>
                </Box>
              </Card>
            </Link>
          ))}
        </SimpleGrid>

        {/* No Results */}
        {filteredAttractions.length === 0 && (
          <Box textAlign="center" py={12}>
            <Heading size="md" color="gray.600" mb={2}>No attractions found</Heading>
            <Text color="gray.500">Try adjusting your filters to find more options</Text>
          </Box>
        )}
      </VStack>
    </Container>
  )
}
