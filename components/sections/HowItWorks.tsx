'use client'
import {
  Container,
  Heading,
  SimpleGrid,
  VStack,
  Text,
  Box,
  HStack,
  Icon,
} from '@chakra-ui/react'
import { FaRobot, FaMapMarkerAlt, FaUsers, FaShare } from 'react-icons/fa'
import { Card } from '@/components/ui/Card'

const steps = [
  {
    icon: FaRobot,
    title: 'Tell AI Your Preferences',
    description: 'Share your destination, budget, duration, and interests. Our AI understands what you love.',
    color: 'purple.500',
    bgColor: 'purple.50',
  },
  {
    icon: FaMapMarkerAlt,
    title: 'Get Personalized Itinerary',
    description: 'Receive a detailed day-by-day plan with places to visit, restaurants, and activities.',
    color: 'blue.500',
    bgColor: 'blue.50',
  },
  {
    icon: FaUsers,
    title: 'Join the Community',
    description: 'Share your experiences, read reviews, and get tips from fellow travelers.',
    color: 'green.500',
    bgColor: 'green.50',
  },
  {
    icon: FaShare,
    title: 'Share Your Adventure',
    description: 'Document your trip, upload photos, and inspire others with your travel stories.',
    color: 'orange.500',
    bgColor: 'orange.50',
  }
]

export const HowItWorks = () => {
  return (
    <Box py={20} bg="white" _dark={{ bg: 'gray.800' }}>
      <Container maxW="7xl">
        <VStack spacing={16}>
          <VStack spacing={4} textAlign="center">
            <Heading size="xl" color="gray.800" _dark={{ color: 'gray.200' }}>
              🚀 How TripMate.AI Works
            </Heading>
            <Text fontSize="lg" color="gray.600" _dark={{ color: 'gray.400' }} maxW="2xl">
              From planning to sharing, we make your Thailand travel experience seamless and memorable
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8} w="full">
            {steps.map((step, index) => (
              <Card key={index} p={8} textAlign="center">
                <VStack spacing={6}>
                  <Box
                    bg={step.bgColor}
                    _dark={{ bg: `${step.color.split('.')[0]}.900` }}
                    p={4}
                    borderRadius="full"
                    display="inline-flex"
                  >
                    <Icon as={step.icon} w={8} h={8} color={step.color} />
                  </Box>

                  <VStack spacing={3}>
                    <Heading size="md" color="gray.800" _dark={{ color: 'gray.200' }}>
                      {step.title}
                    </Heading>
                    <Text
                      color="gray.600"
                      _dark={{ color: 'gray.400' }}
                      fontSize="sm"
                      lineHeight="tall"
                    >
                      {step.description}
                    </Text>
                  </VStack>
                </VStack>
              </Card>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  )
}
