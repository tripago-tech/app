'use client'
import {
  Container,
  Heading,
  Text,
  SimpleGrid,
  Box,
  VStack,
  HStack,
  Button,
  Badge,
  Icon,
  Input,
  Select,
  Flex,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react'
import { FaSearch, FaMapMarkerAlt, FaStar, FaHeart, FaCamera, FaUtensils, FaMountain, FaCity, FaTree } from 'react-icons/fa'
import Link from 'next/link'
import { useState } from 'react'
import { Card } from '@/components/ui/Card'

const mockDestinations = [
  {
    id: 1,
    name: 'Bangkok',
    country: 'Thailand',
    region: 'Southeast Asia',
    theme: ['city', 'culture', 'food'],
    description: 'The vibrant capital of Thailand with ornate temples, bustling street markets, and world-class cuisine.',
    highlights: ['Grand Palace', 'Temple of the Dawn', 'Floating Markets'],
    rating: 4.8,
    reviews: 3245,
    image: '🏙️',
    hotelCount: 2847,
    avgTemp: '28°C',
    bestMonths: 'Nov-Feb'
  },
  {
    id: 2,
    name: 'Chiang Mai',
    country: 'Thailand',
    region: 'Southeast Asia',
    theme: ['mountain', 'culture', 'adventure'],
    description: 'Mountain city in northern Thailand known for its temples, night markets, and elephant sanctuaries.',
    highlights: ['Doi Suthep Temple', 'Chiang Mai Night Bazaar', 'Elephant Camps'],
    rating: 4.7,
    reviews: 2156,
    image: '🏔️',
    hotelCount: 1243,
    avgTemp: '25°C',
    bestMonths: 'Oct-Mar'
  },
  {
    id: 3,
    name: 'Phuket',
    country: 'Thailand',
    region: 'Southeast Asia',
    theme: ['beach', 'adventure', 'food'],
    description: 'Thailand\'s largest island with pristine beaches, water sports, and island hopping opportunities.',
    highlights: ['Patong Beach', 'Phang Nga Bay', 'Similan Islands'],
    rating: 4.6,
    reviews: 4321,
    image: '🏝️',
    hotelCount: 2156,
    avgTemp: '30°C',
    bestMonths: 'Dec-Apr'
  },
  {
    id: 4,
    name: 'Kyoto',
    country: 'Japan',
    region: 'East Asia',
    theme: ['culture', 'mountain', 'food'],
    description: 'Ancient capital of Japan with thousands of temples, traditional gardens, and authentic cultural experiences.',
    highlights: ['Fushimi Inari Shrine', 'Arashiyama Bamboo', 'Kinkaku-ji Temple'],
    rating: 4.9,
    reviews: 5432,
    image: '⛩️',
    hotelCount: 1876,
    avgTemp: '15°C',
    bestMonths: 'Mar-May, Sep-Nov'
  },
  {
    id: 5,
    name: 'Rome',
    country: 'Italy',
    region: 'Europe',
    theme: ['culture', 'food', 'history'],
    description: 'The Eternal City with iconic landmarks, world-famous cuisine, and Renaissance art.',
    highlights: ['Colosseum', 'Vatican City', 'Roman Forum'],
    rating: 4.8,
    reviews: 6123,
    image: '🏛️',
    hotelCount: 2543,
    avgTemp: '18°C',
    bestMonths: 'Apr-Oct'
  },
  {
    id: 6,
    name: 'Paris',
    country: 'France',
    region: 'Europe',
    theme: ['culture', 'food', 'city'],
    description: 'The City of Light with charming cafes, world-class museums, and iconic monuments.',
    highlights: ['Eiffel Tower', 'Louvre Museum', 'Notre-Dame'],
    rating: 4.7,
    reviews: 7654,
    image: '🗼',
    hotelCount: 3421,
    avgTemp: '16°C',
    bestMonths: 'Apr-Oct'
  },
  {
    id: 7,
    name: 'Krabi',
    country: 'Thailand',
    region: 'Southeast Asia',
    theme: ['beach', 'adventure', 'nature'],
    description: 'Coastal province known for dramatic limestone cliffs, turquoise waters, and island adventure.',
    highlights: ['Railay Beach', 'Phi Phi Islands', 'Four Islands Tour'],
    rating: 4.7,
    reviews: 2987,
    image: '⛱️',
    hotelCount: 987,
    avgTemp: '29°C',
    bestMonths: 'Dec-Apr'
  },
  {
    id: 8,
    name: 'Barcelona',
    country: 'Spain',
    region: 'Europe',
    theme: ['culture', 'city', 'food'],
    description: 'Vibrant Mediterranean city with modernist architecture, beaches, and innovative cuisine.',
    highlights: ['Sagrada Família', 'Park Güell', 'Gothic Quarter'],
    rating: 4.6,
    reviews: 5123,
    image: '🏖️',
    hotelCount: 2134,
    avgTemp: '17°C',
    bestMonths: 'May-Oct'
  },
  {
    id: 9,
    name: 'Tokyo',
    country: 'Japan',
    region: 'East Asia',
    theme: ['city', 'food', 'culture'],
    description: 'Japan\'s bustling capital blending ancient traditions with cutting-edge technology.',
    highlights: ['Senso-ji Temple', 'Shibuya Crossing', 'Tokyo Tower'],
    rating: 4.8,
    reviews: 8234,
    image: '🗾',
    hotelCount: 4123,
    avgTemp: '16°C',
    bestMonths: 'Mar-May, Sep-Nov'
  },
  {
    id: 10,
    name: 'Bali',
    country: 'Indonesia',
    region: 'Southeast Asia',
    theme: ['beach', 'culture', 'adventure'],
    description: 'Island paradise with temples, rice terraces, beaches, and spiritual retreats.',
    highlights: ['Ubud Temples', 'Tegallalang Rice Terraces', 'Sanur Beach'],
    rating: 4.7,
    reviews: 6543,
    image: '🏝️',
    hotelCount: 3234,
    avgTemp: '27°C',
    bestMonths: 'Apr-Oct'
  },
]

const themeIcons = {
  beach: FaCity,
  mountain: FaMountain,
  city: FaCity,
  culture: FaCamera,
  food: FaUtensils,
  adventure: FaTree,
}

export default function DestinationsPage() {
  const [filters, setFilters] = useState({
    search: '',
    region: 'all',
    theme: 'all',
  })

  const filteredDestinations = mockDestinations.filter(dest => {
    if (filters.search && !dest.name.toLowerCase().includes(filters.search.toLowerCase()) &&
        !dest.country.toLowerCase().includes(filters.search.toLowerCase())) {
      return false
    }
    if (filters.region !== 'all' && dest.region !== filters.region) {
      return false
    }
    if (filters.theme !== 'all' && !dest.theme.includes(filters.theme)) {
      return false
    }
    return true
  })

  const regions = ['Southeast Asia', 'East Asia', 'Europe']
  const themes = ['beach', 'mountain', 'city', 'culture', 'food', 'adventure']

  return (
    <Container maxW="7xl" py={8}>
      <VStack spacing={8} align="stretch">
        {/* Header */}
        <Box>
          <Heading size="xl" mb={2}>Explore Destinations</Heading>
          <Text color="gray.600">Discover amazing places around the world and plan your next adventure</Text>
        </Box>

        {/* Search and Filters */}
        <VStack spacing={4} align="stretch">
          <InputGroup>
            <InputLeftElement>
              <Icon as={FaSearch} color="gray.400" />
            </InputLeftElement>
            <Input
              placeholder="Search destinations..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              border="1px"
              borderColor="gray.300"
            />
          </InputGroup>

          <HStack spacing={4} flexWrap="wrap">
            <Box minW="180px">
              <Text fontSize="sm" color="gray.600" mb={2}>Region</Text>
              <Select
                value={filters.region}
                onChange={(e) => setFilters({ ...filters, region: e.target.value })}
                border="1px"
                borderColor="gray.300"
              >
                <option value="all">All Regions</option>
                {regions.map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </Select>
            </Box>

            <Box minW="180px">
              <Text fontSize="sm" color="gray.600" mb={2}>Travel Theme</Text>
              <Select
                value={filters.theme}
                onChange={(e) => setFilters({ ...filters, theme: e.target.value })}
                border="1px"
                borderColor="gray.300"
              >
                <option value="all">All Themes</option>
                {themes.map(theme => (
                  <option key={theme} value={theme}>
                    {theme.charAt(0).toUpperCase() + theme.slice(1)}
                  </option>
                ))}
              </Select>
            </Box>
          </HStack>
        </VStack>

        {/* Results Count */}
        <Text fontWeight="semibold" color="gray.700">
          Showing {filteredDestinations.length} destinations
        </Text>

        {/* Destinations Grid */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {filteredDestinations.map((dest) => (
            <Link key={dest.id} href={`/destinations/${dest.id}`}>
              <Card
                overflow="hidden"
                _hover={{ transform: 'translateY(-4px)', boxShadow: 'lg' }}
                cursor="pointer"
                h="full"
                display="flex"
                flexDirection="column"
              >
                {/* Image Section */}
                <Box
                  h="200px"
                  bg="gray.100"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  position="relative"
                >
                  <Text fontSize="5xl">{dest.image}</Text>
                  <Button
                    position="absolute"
                    top={2}
                    right={2}
                    size="sm"
                    variant="ghost"
                    bg="white"
                    _hover={{ bg: 'gray.100' }}
                  >
                    <Icon as={FaHeart} />
                  </Button>
                </Box>

                {/* Content Section */}
                <Box p={5} flex={1} display="flex" flexDirection="column">
                  {/* Title and Location */}
                  <VStack align="start" spacing={2} mb={4}>
                    <VStack align="start" spacing={0}>
                      <Heading size="md">{dest.name}</Heading>
                      <HStack fontSize="sm" color="gray.600">
                        <Icon as={FaMapMarkerAlt} />
                        <Text>{dest.country}</Text>
                      </HStack>
                    </VStack>
                    <Text fontSize="sm" color="gray.600" noOfLines={2}>
                      {dest.description}
                    </Text>
                  </VStack>

                  {/* Rating */}
                  <HStack spacing={3} mb={4} fontSize="sm">
                    <HStack spacing={1}>
                      <Icon as={FaStar} color="accent.500" />
                      <Text fontWeight="bold">{dest.rating}</Text>
                      <Text color="gray.600">({dest.reviews.toLocaleString()})</Text>
                    </HStack>
                  </HStack>

                  {/* Theme Badges */}
                  <HStack spacing={2} flexWrap="wrap" gap={2} mb={4}>
                    {dest.theme.slice(0, 2).map((t) => {
                      const Icon_ = themeIcons[t as keyof typeof themeIcons]
                      return (
                        <Badge
                          key={t}
                          variant="subtle"
                          colorScheme="primary"
                          display="flex"
                          alignItems="center"
                          gap={1}
                          fontSize="xs"
                        >
                          <Icon as={Icon_} w={3} h={3} />
                          {t.charAt(0).toUpperCase() + t.slice(1)}
                        </Badge>
                      )
                    })}
                  </HStack>

                  {/* Additional Info */}
                  <VStack align="start" spacing={2} fontSize="sm" mb={4} flex={1}>
                    <HStack spacing={6}>
                      <Box>
                        <Text fontWeight="semibold" color="gray.600">Hotels</Text>
                        <Text fontWeight="bold" color="primary.600">{dest.hotelCount.toLocaleString()}+</Text>
                      </Box>
                      <Box>
                        <Text fontWeight="semibold" color="gray.600">Best Time</Text>
                        <Text fontWeight="bold">{dest.bestMonths}</Text>
                      </Box>
                    </HStack>
                  </VStack>

                  {/* View Button */}
                  <Link href={`/destinations/${dest.id}`}>
                    <Button colorScheme="primary" w="full" size="sm">
                      View Destination
                    </Button>
                  </Link>
                </Box>
              </Card>
            </Link>
          ))}
        </SimpleGrid>

        {/* No Results */}
        {filteredDestinations.length === 0 && (
          <Box textAlign="center" py={12}>
            <Heading size="md" color="gray.600" mb={2}>No destinations found</Heading>
            <Text color="gray.500">Try adjusting your filters to discover more destinations</Text>
          </Box>
        )}
      </VStack>
    </Container>
  )
}
