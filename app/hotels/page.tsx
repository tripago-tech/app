'use client'
import {
  Container,
  Heading,
  Text,
  Box,
  HStack,
  VStack,
  SimpleGrid,
  Input,
  Select,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Button,
  Icon,
  Flex,
  Badge,
  Checkbox,
  Stack,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react'
import { FaSearch, FaFilter, FaMapMarkerAlt, FaStar, FaWifi, FaSwimmingPool, FaUtensils, FaDumbbell, FaEye } from 'react-icons/fa'
import Link from 'next/link'
import { useState } from 'react'
import { Card } from '@/components/ui/Card'

const mockHotels = [
  {
    id: 1,
    name: 'Mandarin Oriental Bangkok',
    location: 'Bangkok, Thailand',
    price: 189,
    originalPrice: 245,
    rating: 4.9,
    reviews: 2847,
    image: '🏨',
    amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant'],
    type: 'Luxury'
  },
  {
    id: 2,
    name: 'Four Seasons Chiang Mai',
    location: 'Chiang Mai, Thailand',
    price: 156,
    originalPrice: 198,
    rating: 4.8,
    reviews: 1892,
    image: '🏔️',
    amenities: ['WiFi', 'Pool', 'Garden', 'Breakfast'],
    type: 'Luxury'
  },
  {
    id: 3,
    name: 'Banyan Tree Phuket',
    location: 'Phuket, Thailand',
    price: 267,
    originalPrice: 320,
    rating: 4.7,
    reviews: 1634,
    image: '🏖️',
    amenities: ['Beach', 'Pool', 'Spa', 'Golf'],
    type: 'Ultra-Luxury'
  },
  {
    id: 4,
    name: 'Pullman Bangkok Grande Sukhumvit',
    location: 'Bangkok, Thailand',
    price: 95,
    originalPrice: 120,
    rating: 4.6,
    reviews: 3421,
    image: '🏙️',
    amenities: ['WiFi', 'Gym', 'Restaurant', 'Business Center'],
    type: 'Upper-Midrange'
  },
  {
    id: 5,
    name: 'Ibis Bangkok Riverside',
    location: 'Bangkok, Thailand',
    price: 65,
    originalPrice: 85,
    rating: 4.4,
    reviews: 2156,
    image: '🏢',
    amenities: ['WiFi', 'Restaurant', 'Bar'],
    type: 'Midrange'
  },
  {
    id: 6,
    name: 'Akyra Manor',
    location: 'Chiang Mai, Thailand',
    price: 78,
    originalPrice: 98,
    rating: 4.5,
    reviews: 987,
    image: '🏘️',
    amenities: ['WiFi', 'Pool', 'Breakfast'],
    type: 'Midrange'
  },
  {
    id: 7,
    name: 'Renaissance Phuket',
    location: 'Phuket, Thailand',
    price: 145,
    originalPrice: 180,
    rating: 4.7,
    reviews: 1876,
    image: '🏝️',
    amenities: ['Beach', 'Pool', 'Spa', 'Restaurant'],
    type: 'Upscale'
  },
  {
    id: 8,
    name: 'Boutique Hotel Krabi',
    location: 'Krabi, Thailand',
    price: 52,
    originalPrice: 68,
    rating: 4.3,
    reviews: 743,
    image: '⛱️',
    amenities: ['WiFi', 'Breakfast', 'Beach Access'],
    type: 'Budget-Friendly'
  },
]

export default function HotelsPage() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [filters, setFilters] = useState({
    location: '',
    priceRange: [50, 300],
    rating: 4,
    amenities: [],
    hotelType: 'all'
  })

  const filteredHotels = mockHotels.filter(hotel => {
    if (filters.location && !hotel.location.toLowerCase().includes(filters.location.toLowerCase())) {
      return false
    }
    if (hotel.price < filters.priceRange[0] || hotel.price > filters.priceRange[1]) {
      return false
    }
    if (hotel.rating < filters.rating) {
      return false
    }
    if (filters.hotelType !== 'all' && hotel.type !== filters.hotelType) {
      return false
    }
    if (filters.amenities.length > 0) {
      const hasAllAmenities = filters.amenities.every(a =>
        hotel.amenities.some(ha => ha.toLowerCase().includes(a.toLowerCase()))
      )
      if (!hasAllAmenities) return false
    }
    return true
  })

  const amenityOptions = ['WiFi', 'Pool', 'Spa', 'Restaurant', 'Gym', 'Beach', 'Breakfast']
  const hotelTypes = ['Luxury', 'Ultra-Luxury', 'Upscale', 'Upper-Midrange', 'Midrange', 'Budget-Friendly']

  const FilterPanel = () => (
    <VStack spacing={6} align="stretch">
      <Box>
        <Text fontWeight="bold" mb={3}>Location</Text>
        <Input
          placeholder="City or area"
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          border="1px"
          borderColor="gray.300"
        />
      </Box>

      <Box>
        <Text fontWeight="bold" mb={3}>Price per Night</Text>
        <VStack spacing={3}>
          <Text fontSize="sm" color="gray.600">
            ${filters.priceRange[0]} - ${filters.priceRange[1]}
          </Text>
          <RangeSlider
            min={20}
            max={500}
            step={10}
            value={filters.priceRange}
            onChange={(val) => setFilters({ ...filters, priceRange: val })}
          >
            <RangeSliderTrack>
              <RangeSliderFilledTrack />
            </RangeSliderTrack>
            <RangeSliderThumb index={0} />
            <RangeSliderThumb index={1} />
          </RangeSlider>
        </VStack>
      </Box>

      <Box>
        <Text fontWeight="bold" mb={3}>Minimum Rating</Text>
        <HStack spacing={2}>
          {[3, 3.5, 4, 4.5, 5].map((rating) => (
            <Button
              key={rating}
              size="sm"
              variant={filters.rating === rating ? 'solid' : 'outline'}
              colorScheme="primary"
              onClick={() => setFilters({ ...filters, rating })}
            >
              {rating}+
            </Button>
          ))}
        </HStack>
      </Box>

      <Box>
        <Text fontWeight="bold" mb={3}>Hotel Type</Text>
        <Select
          value={filters.hotelType}
          onChange={(e) => setFilters({ ...filters, hotelType: e.target.value })}
          border="1px"
          borderColor="gray.300"
        >
          <option value="all">All Types</option>
          {hotelTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </Select>
      </Box>

      <Box>
        <Text fontWeight="bold" mb={3}>Amenities</Text>
        <Stack spacing={2}>
          {amenityOptions.map((amenity) => (
            <Checkbox
              key={amenity}
              isChecked={filters.amenities.includes(amenity)}
              onChange={(e) => {
                if (e.target.checked) {
                  setFilters({ ...filters, amenities: [...filters.amenities, amenity] })
                } else {
                  setFilters({ ...filters, amenities: filters.amenities.filter(a => a !== amenity) })
                }
              }}
            >
              {amenity}
            </Checkbox>
          ))}
        </Stack>
      </Box>

      <Button
        colorScheme="secondary"
        w="full"
        onClick={() => setFilters({ location: '', priceRange: [50, 300], rating: 4, amenities: [], hotelType: 'all' })}
      >
        Clear Filters
      </Button>
    </VStack>
  )

  return (
    <Container maxW="7xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading size="xl" mb={2}>Find Hotels</Heading>
          <Text color="gray.600">Compare prices and book the perfect accommodation</Text>
        </Box>

        <HStack spacing={4} flexWrap="wrap">
          <InputGroup maxW="sm" flex={1} minW="200px">
            <InputLeftElement>
              <Icon as={FaSearch} color="gray.400" />
            </InputLeftElement>
            <Input
              placeholder="Search by location"
              value={filters.location}
              onChange={(e) => setFilters({ ...filters, location: e.target.value })}
              border="1px"
              borderColor="gray.300"
            />
          </InputGroup>

          <Button
            display={{ base: 'flex', md: 'none' }}
            leftIcon={<FaFilter />}
            variant="outline"
            onClick={onOpen}
          >
            Filters
          </Button>
        </HStack>

        <Flex gap={8} align="flex-start">
          {/* Desktop Filter Sidebar */}
          <Box
            display={{ base: 'none', md: 'block' }}
            w="280px"
            flexShrink={0}
          >
            <Box bg="white" p={6} borderRadius="lg" boxShadow="sm">
              <FilterPanel />
            </Box>
          </Box>

          {/* Mobile Filter Drawer */}
          <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerHeader borderBottomWidth="1px">Filters</DrawerHeader>
              <DrawerCloseButton />
              <DrawerBody>
                <FilterPanel />
              </DrawerBody>
            </DrawerContent>
          </Drawer>

          {/* Hotels List */}
          <VStack spacing={6} flex={1} align="stretch">
            <Flex justify="space-between" align="center">
              <Text fontWeight="semibold" color="gray.700">
                Showing {filteredHotels.length} hotels
              </Text>
              <Select
                maxW="200px"
                defaultValue="popular"
                border="1px"
                borderColor="gray.300"
              >
                <option value="popular">Most Popular</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Rating</option>
              </Select>
            </Flex>

            <SimpleGrid columns={{ base: 1 }} spacing={6}>
              {filteredHotels.map((hotel) => (
                <Card key={hotel.id} overflow="hidden" _hover={{ boxShadow: 'lg' }} display="flex">
                  <Box
                    w={{ base: '100%', sm: '200px' }}
                    h={{ base: '200px', sm: '250px' }}
                    bg="gray.100"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    flexShrink={0}
                  >
                    <Text fontSize="5xl">{hotel.image}</Text>
                  </Box>

                  <Box p={{ base: 4, md: 6 }} flex={1} display="flex" flexDirection="column">
                    <VStack align="start" spacing={3} flex={1}>
                      <VStack align="start" spacing={1}>
                        <Heading size="md">{hotel.name}</Heading>
                        <HStack fontSize="sm" color="gray.600">
                          <Icon as={FaMapMarkerAlt} />
                          <Text>{hotel.location}</Text>
                        </HStack>
                      </VStack>

                      <HStack>
                        <HStack spacing={1}>
                          <Icon as={FaStar} color="accent.500" />
                          <Text fontWeight="bold">{hotel.rating}</Text>
                          <Text fontSize="sm" color="gray.600">
                            ({hotel.reviews.toLocaleString()} reviews)
                          </Text>
                        </HStack>
                        <Badge colorScheme="secondary" fontSize="xs">
                          {hotel.type}
                        </Badge>
                      </HStack>

                      <HStack spacing={2} flexWrap="wrap" gap={2}>
                        {hotel.amenities.map((amenity) => {
                          let icon = FaWifi
                          if (amenity.toLowerCase() === 'pool') icon = FaSwimmingPool
                          else if (amenity.toLowerCase() === 'restaurant') icon = FaUtensils
                          else if (amenity.toLowerCase() === 'gym') icon = FaDumbbell

                          return (
                            <HStack key={amenity} fontSize="xs" color="gray.600" spacing={1}>
                              <Icon as={icon} w={3} h={3} />
                              <Text>{amenity}</Text>
                            </HStack>
                          )
                        })}
                      </HStack>
                    </VStack>

                    <Flex justify="space-between" align="flex-end" mt={4}>
                      <VStack align="start" spacing={0}>
                        <HStack spacing={1}>
                          <Text fontSize="2xl" fontWeight="bold" color="primary.600">
                            ${hotel.price}
                          </Text>
                          <Text fontSize="sm" textDecoration="line-through" color="gray.500">
                            ${hotel.originalPrice}
                          </Text>
                        </HStack>
                        <Text fontSize="xs" color="gray.600">per night</Text>
                      </VStack>
                      <Link href={`/hotels/${hotel.id}`}>
                        <Button colorScheme="primary" rightIcon={<FaEye />}>
                          View Details
                        </Button>
                      </Link>
                    </Flex>
                  </Box>
                </Card>
              ))}
            </SimpleGrid>

            {filteredHotels.length === 0 && (
              <Box textAlign="center" py={12}>
                <Heading size="md" color="gray.600" mb={2}>No hotels found</Heading>
                <Text color="gray.500">Try adjusting your filters to see more results</Text>
              </Box>
            )}
          </VStack>
        </Flex>
      </VStack>
    </Container>
  )
}
