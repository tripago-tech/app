'use client'
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  Image,
  SimpleGrid,
  Badge,
} from '@chakra-ui/react'
import { FaRobot, FaMapMarkerAlt, FaUsers } from 'react-icons/fa'

export const HeroSection = () => {
  return (
    <Box
      bgGradient="linear(135deg, #667eea 0%, #764ba2 100%)"
      color="white"
      py={20}
      position="relative"
    >
      <Container maxW="7xl">
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={12} alignItems="center">
          <VStack spacing={8} align="start">
            <VStack spacing={4} align="start">
              <Badge colorScheme="purple" px={3} py={1} borderRadius="full">
                🤖 AI-Powered Travel Planning
              </Badge>
              
              <Heading size="3xl" lineHeight="shorter">
                Plan Your Perfect
                <Text as="span" color="yellow.300"> Thailand Trip </Text>
                in Minutes
              </Heading>
              
              <Text fontSize="xl" opacity={0.9} maxW="lg">
                Get personalized AI-generated itineraries, discover hidden gems, 
                and join a community of travelers exploring Thailand.
              </Text>
            </VStack>

            <HStack spacing={6}>
              <Button
                size="lg"
                bg="yellow.400"
                color="gray.800"
                _hover={{ bg: 'yellow.300' }}
                leftIcon={<FaRobot />}
                px={8}
              >
                Generate My Trip
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                borderColor="whiteAlpha.300"
                color="white"
                _hover={{ bg: 'whiteAlpha.200' }}
              >
                Explore Destinations
              </Button>
            </HStack>

            <HStack spacing={8} pt={4}>
              <VStack spacing={1}>
                <HStack>
                  <FaMapMarkerAlt />
                  <Text fontWeight="bold">1000+</Text>
                </HStack>
                <Text fontSize="sm" opacity={0.8}>Places</Text>
              </VStack>
              
              <VStack spacing={1}>
                <HStack>
                  <FaUsers />
                  <Text fontWeight="bold">5K+</Text>
                </HStack>
                <Text fontSize="sm" opacity={0.8}>Travelers</Text>
              </VStack>
              
              <VStack spacing={1}>
                <HStack>
                  <FaRobot />
                  <Text fontWeight="bold">AI-Powered</Text>
                </HStack>
                <Text fontSize="sm" opacity={0.8}>Smart Planning</Text>
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
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop"
                alt="Thailand Travel"
                borderRadius="xl"
                w="full"
                h="300px"
                objectFit="cover"
              />
              
              <VStack spacing={3} mt={4} align="start">
                <Text fontWeight="bold" fontSize="lg">
                  🏝️ 7-Day Phuket Adventure
                </Text>
                <Text fontSize="sm" opacity={0.9}>
                  AI-generated itinerary • $800 budget • Beach & Culture
                </Text>
                <HStack spacing={2}>
                  <Badge colorScheme="green">Beaches</Badge>
                  <Badge colorScheme="blue">Culture</Badge>
                  <Badge colorScheme="orange">Food</Badge>
                </HStack>
              </VStack>
            </Box>
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  )
}
