'use client'
import {
  Container,
  VStack,
  Heading,
  Text,
  HStack,
  Box,
  SimpleGrid,
  Badge,
  Image,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react'
import { useState } from 'react'
import { FaStar, FaMapMarkerAlt, FaCheck, FaTimes } from 'react-icons/fa'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Rating } from '@/components/ui/Rating'

const compareHotels = [
  {
    id: 'h1',
    name: 'Paradise Resort Phuket',
    location: 'Patong Beach, Phuket',
    rating: 4.8,
    reviewCount: 1234,
    price: 99,
    originalPrice: 120,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400',
    starRating: 5,
    amenities: {
      'Free WiFi': true,
      'Swimming Pool': true,
      'Breakfast Included': true,
      'Beach Access': true,
      'Spa': true,
      'Gym': true,
      'Restaurant': true,
      'Room Service': true,
      'Airport Shuttle': false,
      'Pet Friendly': false
    },
    highlights: ['Beachfront location', 'Excellent breakfast', 'Friendly staff'],
    distance: '0.2 km from beach'
  },
  {
    id: 'h2',
    name: 'Bangkok Grand Hotel',
    location: 'Sukhumvit, Bangkok',
    rating: 4.5,
    reviewCount: 892,
    price: 75,
    originalPrice: 85,
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400',
    starRating: 4,
    amenities: {
      'Free WiFi': true,
      'Swimming Pool': true,
      'Breakfast Included': false,
      'Beach Access': false,
      'Spa': false,
      'Gym': true,
      'Restaurant': true,
      'Room Service': true,
      'Airport Shuttle': true,
      'Pet Friendly': false
    },
    highlights: ['Central location', 'Modern facilities', 'Business center'],
    distance: '0.5 km from BTS'
  },
  {
    id: 'h3',
    name: 'Chiang Mai Boutique',
    location: 'Old City, Chiang Mai',
    rating: 4.7,
    reviewCount: 567,
    price: 45,
    originalPrice: 55,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
    starRating: 3,
    amenities: {
      'Free WiFi': true,
      'Swimming Pool': false,
      'Breakfast Included': true,
      'Beach Access': false,
      'Spa': false,
      'Gym': false,
      'Restaurant': true,
      'Room Service': false,
      'Airport Shuttle': false,
      'Pet Friendly': true
    },
    highlights: ['Cultural location', 'Authentic design', 'Bicycle rental'],
    distance: '0.1 km from temples'
  }
]

export default function ComparePage() {
  const [selectedHotels, setSelectedHotels] = useState(compareHotels)
  
  const amenityKeys = Object.keys(compareHotels[0].amenities)

  return (
    <Container maxW="7xl" py={8}>
      <VStack spacing={8} align="stretch">
        <VStack spacing={4} textAlign="center">
          <Heading size="2xl" color="blue.600">
            🔍 Compare Hotels
          </Heading>
          <Text fontSize="lg" color="gray.600" maxW="2xl">
            Compare features, prices, and amenities side by side to find your perfect stay
          </Text>
        </VStack>

        {/* Hotel Cards Comparison */}
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
          {selectedHotels.map((hotel) => (
            <Card key={hotel.id} p={0} overflow="hidden">
              <Box position="relative">
                <Image
                  src={hotel.image}
                  alt={hotel.name}
                  h="200px"
                  w="full"
                  objectFit="cover"
                />
                <Badge
                  position="absolute"
                  top={3}
                  right={3}
                  colorScheme="green"
                  px={2}
                  py={1}
                  borderRadius="full"
                >
                  Save ${hotel.originalPrice - hotel.price}
                </Badge>
              </Box>
              
              <VStack p={6} spacing={4} align="stretch">
                <VStack spacing={2} align="start">
                  <HStack justify="space-between" w="full">
                    <VStack spacing={1} align="start">
                      <HStack>
                        {Array.from({length: hotel.starRating}, (_, i) => (
                          <FaStar key={i} color="gold" size={14} />
                        ))}
                      </HStack>
                      <Heading size="md">{hotel.name}</Heading>
                    </VStack>
                    <VStack spacing={0} align="end">
                      <Text fontSize="sm" textDecoration="line-through" color="gray.500">
                        ${hotel.originalPrice}
                      </Text>
                      <Text fontSize="2xl" fontWeight="bold" color="green.600">
                        ${hotel.price}
                      </Text>
                      <Text fontSize="xs" color="gray.500">per night</Text>
                    </VStack>
                  </HStack>
                  
                  <HStack>
                    <FaMapMarkerAlt size={12} color="gray" />
                    <Text fontSize="sm" color="gray.600">{hotel.location}</Text>
                  </HStack>
                  
                  <HStack>
                    <Rating rating={hotel.rating} size="sm" showText />
                    <Text fontSize="sm" color="gray.500">
                      ({hotel.reviewCount})
                    </Text>
                  </HStack>
                </VStack>

                <VStack spacing={2} align="stretch">
                  <Text fontSize="sm" fontWeight="medium">Key Highlights:</Text>
                  {hotel.highlights.map((highlight, i) => (
                    <HStack key={i}>
                      <FaCheck color="green" size={12} />
                      <Text fontSize="sm">{highlight}</Text>
                    </HStack>
                  ))}
                </VStack>

                <Button 
                  colorScheme="blue" 
                  size="sm"
                  onClick={() => window.location.href = `/hotel/${hotel.id}`}
                >
                  View Details
                </Button>
              </VStack>
            </Card>
          ))}
        </SimpleGrid>

        {/* Detailed Comparison Table */}
        <Card p={6}>
          <VStack spacing={6} align="stretch">
            <Heading size="lg">Detailed Comparison</Heading>
            
            <TableContainer>
              <Table variant="simple" size="sm">
                <Thead>
                  <Tr>
                    <Th>Features</Th>
                    {selectedHotels.map((hotel) => (
                      <Th key={hotel.id} textAlign="center">
                        <VStack spacing={1}>
                          <Text fontSize="sm" fontWeight="bold">{hotel.name}</Text>
                          <Text fontSize="xs" color="gray.500">{hotel.starRating}★ Hotel</Text>
                        </VStack>
                      </Th>
                    ))}
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr bg="gray.50" _dark={{ bg: "gray.700" }}>
                    <Td fontWeight="bold">Price per night</Td>
                    {selectedHotels.map((hotel) => (
                      <Td key={hotel.id} textAlign="center">
                        <VStack spacing={0}>
                          <Text fontSize="lg" fontWeight="bold" color="green.600">
                            ${hotel.price}
                          </Text>
                          <Text fontSize="xs" textDecoration="line-through" color="gray.500">
                            ${hotel.originalPrice}
                          </Text>
                        </VStack>
                      </Td>
                    ))}
                  </Tr>
                  
                  <Tr>
                    <Td fontWeight="bold">Guest Rating</Td>
                    {selectedHotels.map((hotel) => (
                      <Td key={hotel.id} textAlign="center">
                        <VStack spacing={1}>
                          <Text fontWeight="bold">{hotel.rating}</Text>
                          <Rating rating={hotel.rating} size="sm" />
                          <Text fontSize="xs" color="gray.500">
                            {hotel.reviewCount} reviews
                          </Text>
                        </VStack>
                      </Td>
                    ))}
                  </Tr>
                  
                  <Tr bg="gray.50" _dark={{ bg: "gray.700" }}>
                    <Td fontWeight="bold">Distance</Td>
                    {selectedHotels.map((hotel) => (
                      <Td key={hotel.id} textAlign="center">
                        <Text fontSize="sm">{hotel.distance}</Text>
                      </Td>
                    ))}
                  </Tr>

                  {amenityKeys.map((amenity, index) => (
                    <Tr key={amenity} bg={index % 2 === 0 ? "white" : "gray.50"} _dark={{ bg: index % 2 === 0 ? "gray.800" : "gray.700" }}>
                      <Td fontWeight="medium">{amenity}</Td>
                      {selectedHotels.map((hotel) => (
                        <Td key={hotel.id} textAlign="center">
                          {hotel.amenities[amenity] ? (
                            <FaCheck color="green" size={16} />
                          ) : (
                            <FaTimes color="red" size={16} />
                          )}
                        </Td>
                      ))}
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </VStack>
        </Card>

        {/* AI Recommendation */}
        <Card p={6} bg="blue.50" _dark={{ bg: "blue.900" }}>
          <VStack spacing={4} align="stretch">
            <Heading size="md" color="blue.600">
              🤖 AI Recommendation
            </Heading>
            
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
              <Box p={4} bg="white" _dark={{ bg: "gray.700" }} borderRadius="lg" border="2px solid" borderColor="green.400">
                <VStack spacing={2}>
                  <Badge colorScheme="green" px={3} py={1}>Best Value</Badge>
                  <Text fontWeight="bold">{selectedHotels[2].name}</Text>
                  <Text fontSize="sm" textAlign="center">
                    Great price with essential amenities and excellent location near cultural sites.
                  </Text>
                </VStack>
              </Box>
              
              <Box p={4} bg="white" _dark={{ bg: "gray.700" }} borderRadius="lg" border="2px solid" borderColor="blue.400">
                <VStack spacing={2}>
                  <Badge colorScheme="blue" px={3} py={1}>Best Luxury</Badge>
                  <Text fontWeight="bold">{selectedHotels[0].name}</Text>
                  <Text fontSize="sm" textAlign="center">
                    Premium beachfront experience with top-rated amenities and service.
                  </Text>
                </VStack>
              </Box>
              
              <Box p={4} bg="white" _dark={{ bg: "gray.700" }} borderRadius="lg" border="2px solid" borderColor="orange.400">
                <VStack spacing={2}>
                  <Badge colorScheme="orange" px={3} py={1}>Best Business</Badge>
                  <Text fontWeight="bold">{selectedHotels[1].name}</Text>
                  <Text fontSize="sm" textAlign="center">
                    Perfect for business travelers with modern facilities and central location.
                  </Text>
                </VStack>
              </Box>
            </SimpleGrid>
          </VStack>
        </Card>

        {/* Action Buttons */}
        <HStack justify="center" spacing={4}>
          <Button colorScheme="blue" size="lg">
            Book Selected Hotel
          </Button>
          <Button variant="outline" size="lg">
            Add More Hotels to Compare
          </Button>
        </HStack>
      </VStack>
    </Container>
  )
}
