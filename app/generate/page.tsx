'use client'
import {
  Container,
  VStack,
  Heading,
  Text,
  Box,
} from '@chakra-ui/react'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { AITripGenerator } from '@/components/sections/AITripGenerator'

export default function GeneratePage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'AI Trip Generator', isCurrentPage: true },
  ]

  return (
    <Container maxW="7xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Breadcrumb items={breadcrumbItems} />
        
        <VStack spacing={6} textAlign="center">
          <VStack spacing={4}>
            <Heading size="2xl" color="gray.800" _dark={{ color: 'gray.200' }}>
              🤖 AI Trip Generator
            </Heading>
            <Text fontSize="lg" color="gray.600" _dark={{ color: 'gray.400' }} maxW="3xl">
              Tell our AI about your dream Thailand trip and get a personalized itinerary 
              with places to visit, restaurants to try, and activities to enjoy.
            </Text>
          </VStack>

          <Box
            bg="purple.50"
            _dark={{ bg: 'purple.900' }}
            p={6}
            borderRadius="xl"
            maxW="2xl"
          >
            <Text fontSize="sm" color="purple.700" _dark={{ color: 'purple.300' }}>
              ✨ <strong>Pro Tip:</strong> The more details you provide about your interests and preferences, 
              the better our AI can customize your perfect Thailand adventure!
            </Text>
          </Box>
        </VStack>

        <AITripGenerator />
      </VStack>
    </Container>
  )
}
