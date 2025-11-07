'use client'
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  Select,
  NumberInput,
  NumberInputField,
  Checkbox,
  CheckboxGroup,
  Stack,
  Divider,
  useToast,
  Progress,
} from '@chakra-ui/react'
import { useState } from 'react'
import { FaRobot, FaMapMarkerAlt, FaDollarSign, FaClock } from 'react-icons/fa'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { generateTripWithAI } from '@/utils/openai'
import { fetchTravelImages } from '@/utils/unsplash'

interface TripPreferences {
  destination: string
  duration: number
  budget: number
  interests: string[]
  travelStyle: string
}

export const AITripGenerator = () => {
  const toast = useToast()
  const [preferences, setPreferences] = useState<TripPreferences>({
    destination: '',
    duration: 3,
    budget: 1000,
    interests: [],
    travelStyle: 'balanced'
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedTrip, setGeneratedTrip] = useState<any>(null)
  const [generationProgress, setGenerationProgress] = useState(0)

  const destinations = [
    { value: 'bangkok', label: 'Bangkok - Capital City' },
    { value: 'chiang-mai', label: 'Chiang Mai - Cultural Hub' },
    { value: 'phuket', label: 'Phuket - Beach Paradise' },
    { value: 'krabi', label: 'Krabi - Island Hopping' },
    { value: 'koh-samui', label: 'Koh Samui - Tropical Island' },
    { value: 'ayutthaya', label: 'Ayutthaya - Ancient Capital' },
  ]

  const interests = [
    'Temples & Culture',
    'Street Food',
    'Beaches',
    'Nightlife',
    'Shopping',
    'Adventure Sports',
    'Nature & Wildlife',
    'Photography',
    'Local Markets',
    'Spa & Wellness'
  ]

  const generateTrip = async () => {
    if (!preferences.destination) {
      toast({
        title: 'Please select a destination',
        status: 'warning',
        duration: 3000,
      })
      return
    }

    setIsGenerating(true)
    setGenerationProgress(0)
    
    try {
      // Simulate AI generation progress
      const progressInterval = setInterval(() => {
        setGenerationProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 200)

      // Generate trip with AI
      const trip = await generateTripWithAI(preferences)
      
      // Fetch destination images
      const images = await fetchTravelImages(preferences.destination, 3)
      
      clearInterval(progressInterval)
      setGenerationProgress(100)
      
      setGeneratedTrip({
        ...trip,
        images: images.map(img => img.url)
      })
      
      toast({
        title: 'Trip generated successfully! 🎉',
        description: 'Your AI-powered itinerary is ready',
        status: 'success',
        duration: 5000,
      })
    } catch (error) {
      toast({
        title: 'Generation failed',
        description: 'Please try again later',
        status: 'error',
        duration: 3000,
      })
    } finally {
      setIsGenerating(false)
      setTimeout(() => setGenerationProgress(0), 1000)
    }
  }

  return (
    <Box py={20} bg="gray.50" _dark={{ bg: 'gray.900' }}>
      <Container maxW="7xl">
        <VStack spacing={12}>
          <VStack spacing={4} textAlign="center">
            <Heading size="xl" color="purple.600" _dark={{ color: 'purple.300' }}>
              🤖 AI Trip Generator
            </Heading>
            <Text fontSize="lg" color="gray.600" _dark={{ color: 'gray.400' }} maxW="2xl">
              Tell us your preferences and let our AI create the perfect Thailand itinerary for you
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={12} w="full">
            {/* Trip Preferences Form */}
            <Card p={8}>
              <VStack spacing={6} align="stretch">
                <Heading size="md" color="gray.700" _dark={{ color: 'gray.300' }}>
                  Trip Preferences
                </Heading>

                <VStack spacing={4} align="stretch">
                  <Box>
                    <Text mb={2} fontWeight="medium">
                      <FaMapMarkerAlt style={{ display: 'inline', marginRight: '8px' }} />
                      Destination
                    </Text>
                    <Select
                      placeholder="Choose your destination"
                      value={preferences.destination}
                      onChange={(e) => setPreferences({...preferences, destination: e.target.value})}
                    >
                      {destinations.map(dest => (
                        <option key={dest.value} value={dest.value}>
                          {dest.label}
                        </option>
                      ))}
                    </Select>
                  </Box>

                  <HStack spacing={4}>
                    <Box flex={1}>
                      <Text mb={2} fontWeight="medium">
                        <FaClock style={{ display: 'inline', marginRight: '8px' }} />
                        Duration (days)
                      </Text>
                      <NumberInput
                        min={1}
                        max={14}
                        value={preferences.duration}
                        onChange={(val) => setPreferences({...preferences, duration: +val})}
                      >
                        <NumberInputField />
                      </NumberInput>
                    </Box>

                    <Box flex={1}>
                      <Text mb={2} fontWeight="medium">
                        <FaDollarSign style={{ display: 'inline', marginRight: '8px' }} />
                        Budget (USD)
                      </Text>
                      <NumberInput
                        min={100}
                        max={10000}
                        step={100}
                        value={preferences.budget}
                        onChange={(val) => setPreferences({...preferences, budget: +val})}
                      >
                        <NumberInputField />
                      </NumberInput>
                    </Box>
                  </HStack>

                  <Box>
                    <Text mb={3} fontWeight="medium">
                      Interests (select all that apply)
                    </Text>
                    <CheckboxGroup
                      value={preferences.interests}
                      onChange={(values) => setPreferences({...preferences, interests: values as string[]})}
                    >
                      <SimpleGrid columns={2} spacing={2}>
                        {interests.map(interest => (
                          <Checkbox key={interest} value={interest} size="sm">
                            {interest}
                          </Checkbox>
                        ))}
                      </SimpleGrid>
                    </CheckboxGroup>
                  </Box>

                  <Box>
                    <Text mb={2} fontWeight="medium">Travel Style</Text>
                    <Select
                      value={preferences.travelStyle}
                      onChange={(e) => setPreferences({...preferences, travelStyle: e.target.value})}
                    >
                      <option value="budget">Budget Traveler</option>
                      <option value="balanced">Balanced</option>
                      <option value="luxury">Luxury Experience</option>
                    </Select>
                  </Box>
                </VStack>

                <Divider />

                {isGenerating && (
                  <Box>
                    <Text mb={2} fontSize="sm" color="purple.600">
                      AI is crafting your perfect trip...
                    </Text>
                    <Progress value={generationProgress} colorScheme="purple" size="sm" />
                  </Box>
                )}

                <Button
                  colorScheme="purple"
                  size="lg"
                  leftIcon={<FaRobot />}
                  onClick={generateTrip}
                  isLoading={isGenerating}
                  loadingText="Generating with AI..."
                  w="full"
                >
                  Generate My Trip with AI
                </Button>
              </VStack>
            </Card>

            {/* Generated Trip Preview */}
            <Card
              p={8}
              bg={generatedTrip ? 'purple.50' : 'gray.100'}
              _dark={{ bg: generatedTrip ? 'purple.900' : 'gray.800' }}
            >
              {generatedTrip ? (
                <VStack spacing={6} align="stretch">
                  <Heading size="md" color="purple.600" _dark={{ color: 'purple.300' }}>
                    🎉 Your AI-Generated Trip
                  </Heading>
                  
                  <Box>
                    <Text fontWeight="bold" fontSize="lg" mb={2}>
                      {generatedTrip.title}
                    </Text>
                    <Text color="gray.600" _dark={{ color: 'gray.400' }} fontSize="sm" mb={3}>
                      {generatedTrip.description}
                    </Text>
                    <Text color="green.600" fontWeight="bold">
                      Total Budget: ${generatedTrip.totalBudget}
                    </Text>
                  </Box>

                  <VStack spacing={4} align="stretch">
                    {generatedTrip.days.slice(0, 2).map((day: any, index: number) => (
                      <Box key={index} p={4} bg="white" _dark={{ bg: 'gray.700' }} borderRadius="lg">
                        <Text fontWeight="bold" mb={2}>Day {day.day} - {day.city}</Text>
                        <VStack spacing={2} align="stretch">
                          {day.activities.slice(0, 3).map((activity: any, i: number) => (
                            <HStack key={i} justify="space-between" fontSize="sm">
                              <Text>{activity.time} - {activity.title}</Text>
                              <Text color="green.500" fontWeight="bold">${activity.cost}</Text>
                            </HStack>
                          ))}
                        </VStack>
                      </Box>
                    ))}
                  </VStack>

                  <HStack spacing={3}>
                    <Button colorScheme="purple" flex={1}>
                      View Full Itinerary
                    </Button>
                    <Button variant="outline" flex={1}>
                      Save Trip
                    </Button>
                  </HStack>
                </VStack>
              ) : (
                <VStack spacing={6} textAlign="center" py={8}>
                  <Box fontSize="4xl">🤖</Box>
                  <VStack spacing={2}>
                    <Text fontWeight="bold" color="gray.600" _dark={{ color: 'gray.400' }}>
                      AI Trip Preview
                    </Text>
                    <Text fontSize="sm" color="gray.500" _dark={{ color: 'gray.500' }}>
                      Fill in your preferences and click "Generate My Trip" to see your personalized itinerary here
                    </Text>
                  </VStack>
                </VStack>
              )}
            </Card>
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  )
}
