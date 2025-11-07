'use client'
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  Badge,
  Image,
} from '@chakra-ui/react'
import { FaStar, FaHotel, FaUsers, FaRobot } from 'react-icons/fa'

export const TripScopeHero = () => {
  return (
    <Box
      bgGradient="linear(135deg, #1e40af 0%, #3b82f6 50%, #06b6d4 100%)"
      color="white"
      py={20}
      position="relative"
      overflow="hidden"
    >
      <Container maxW="7xl" position="relative">
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={12} alignItems="center">
          <VStack spacing={8} align="start">
            <VStack spacing={4} align="start">
              <Badge colorScheme="blue" px={4} py={2} borderRadius="full" fontSize="sm">
                🔍 Smart Hotel Discovery + AI Reviews
              </Badge>
              
              <Heading size="3xl" lineHeight="shorter">
                Find Your Perfect Hotel with
                <Text as="span" color="cyan.300"> AI-Powered </Text>
                Insights
              </Heading>
              
              <Text fontSize="xl" opacity={0.9} maxW="lg">
                Compare prices across Agoda, Booking.com and more. Get AI-analyzed reviews, 
                personalized recommendations, and book with confidence.
              </Text>
            </VStack>

            <HStack spacing={8} pt={4}>
              <VStack spacing={1}>
                <HStack>
                  <FaHotel />
                  <Text fontWeight="bold">50K+</Text>
                </HStack>
                <Text fontSize="sm" opacity={0.8}>Hotels</Text>
              </VStack>
              
              <VStack spacing={1}>
                <HStack>
                  <FaStar />
                  <Text fontWeight="bold">2M+</Text>
                </HStack>
                <Text fontSize="sm" opacity={0.8}>Reviews</Text>
              </VStack>
              
              <VStack spacing={1}>
                <HStack>
                  <FaUsers />
                  <Text fontWeight="bold">100K+</Text>
                </HStack>
                <Text fontSize="sm" opacity={0.8}>Travelers</Text>
              </VStack>
              
              <VStack spacing={1}>
                <HStack>
                  <FaRobot />
                  <Text fontWeight="bold">AI-Powered</Text>
                </HStack>
                <Text fontSize="sm" opacity={0.8}>Smart Insights</Text>
              </VStack>
            </HStack>
          </VStack>

          <Box>
            <Box
              bg="whiteAlpha.200"
              borderRadius="2xl"
              p={6}
              backdropFilter="blur(10px)"
              border="1px solid"
              borderColor="whiteAlpha.300"
            >
              <Image
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop"
                alt="Luxury Hotel"
                borderRadius="xl"
                w="full"
                h="300px"
                objectFit="cover"
              />
              
              <VStack spacing={3} mt={4} align="start">
                <HStack justify="space-between" w="full">
                  <VStack spacing={1} align="start">
                    <Text fontWeight="bold" fontSize="lg">
                      🏨 Paradise Resort Phuket
                    </Text>
                    <HStack>
                      <HStack spacing={1}>
                        {Array.from({length: 5}, (_, i) => (
                          <FaStar key={i} color="gold" size={14} />
                        ))}
                      </HStack>
                      <Text fontSize="sm">4.8 (1,234 reviews)</Text>
                    </HStack>
                  </VStack>
                  <VStack spacing={0} align="end">
                    <Text fontSize="sm" textDecoration="line-through" opacity={0.7}>
                      $120
                    </Text>
                    <Text fontSize="2xl" fontWeight="bold" color="cyan.300">
                      $99
                    </Text>
                    <Text fontSize="xs" opacity={0.8}>per night</Text>
                  </VStack>
                </HStack>
                
                <Box w="full" p={3} bg="whiteAlpha.200" borderRadius="lg">
                  <Text fontSize="sm" fontWeight="medium" mb={2}>
                    🤖 AI Insights:
                  </Text>
                  <VStack spacing={1} align="start" fontSize="xs">
                    <Text>✅ Excellent beachfront location (89 mentions)</Text>
                    <Text>✅ Outstanding breakfast buffet (67 mentions)</Text>
                    <Text>⚠️ Pool can be crowded during peak hours</Text>
                  </VStack>
                </Box>
              </VStack>
            </Box>
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  )
}
