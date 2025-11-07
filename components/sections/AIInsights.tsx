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
  Progress,
} from '@chakra-ui/react'
import { FaRobot, FaChartLine, FaEye, FaBrain } from 'react-icons/fa'
import { Card } from '@/components/ui/Card'

const aiFeatures = [
  {
    icon: FaRobot,
    title: 'Smart Review Analysis',
    description: 'AI analyzes thousands of reviews to highlight what guests really love and what needs improvement.',
    color: 'blue.500',
    bgColor: 'blue.50',
    stats: '2M+ reviews analyzed'
  },
  {
    icon: FaChartLine,
    title: 'Price Prediction',
    description: 'Get insights on the best time to book with AI-powered price forecasting and trend analysis.',
    color: 'green.500',
    bgColor: 'green.50',
    stats: '85% accuracy rate'
  },
  {
    icon: FaEye,
    title: 'Personalized Recommendations',
    description: 'Discover hotels tailored to your preferences based on your search history and ratings.',
    color: 'purple.500',
    bgColor: 'purple.50',
    stats: '50K+ personalized matches'
  },
  {
    icon: FaBrain,
    title: 'Sentiment Insights',
    description: 'Understand guest emotions and satisfaction levels with advanced sentiment analysis.',
    color: 'orange.500',
    bgColor: 'orange.50',
    stats: '95% sentiment accuracy'
  }
]

export const AIInsights = () => {
  return (
    <Box py={20} bg="white" _dark={{ bg: 'gray.800' }}>
      <Container maxW="7xl">
        <VStack spacing={16}>
          <VStack spacing={4} textAlign="center">
            <Heading size="xl" color="gray.800" _dark={{ color: 'gray.200' }}>
              🤖 AI-Powered Hotel Intelligence
            </Heading>
            <Text fontSize="lg" color="gray.600" _dark={{ color: 'gray.400' }} maxW="3xl">
              Our advanced AI analyzes millions of data points to give you the smartest hotel recommendations and insights
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} w="full">
            {aiFeatures.map((feature, index) => (
              <Card key={index} p={8}>
                <VStack spacing={6} align="start">
                  <HStack spacing={4}>
                    <Box
                      bg={feature.bgColor}
                      _dark={{ bg: `${feature.color.split('.')[0]}.900` }}
                      p={3}
                      borderRadius="lg"
                    >
                      <Icon as={feature.icon} w={6} h={6} color={feature.color} />
                    </Box>
                    <VStack spacing={1} align="start">
                      <Heading size="md" color="gray.800" _dark={{ color: 'gray.200' }}>
                        {feature.title}
                      </Heading>
                      <Text fontSize="sm" color={feature.color} fontWeight="bold">
                        {feature.stats}
                      </Text>
                    </VStack>
                  </HStack>
                  
                  <Text color="gray.600" _dark={{ color: 'gray.400' }} lineHeight="tall">
                    {feature.description}
                  </Text>
                </VStack>
              </Card>
            ))}
          </SimpleGrid>

          {/* AI Performance Stats */}
          <Card p={8} w="full" bg="blue.50" _dark={{ bg: "blue.900" }}>
            <VStack spacing={6}>
              <Heading size="lg" color="blue.600" _dark={{ color: "blue.300" }} textAlign="center">
                🎯 AI Performance Metrics
              </Heading>
              
              <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} w="full">
                <VStack spacing={3}>
                  <Text fontSize="3xl" fontWeight="bold" color="blue.600">
                    98.5%
                  </Text>
                  <Text fontSize="sm" color="gray.600" textAlign="center">
                    Review Analysis Accuracy
                  </Text>
                  <Progress value={98.5} colorScheme="blue" size="sm" w="full" />
                </VStack>
                
                <VStack spacing={3}>
                  <Text fontSize="3xl" fontWeight="bold" color="green.600">
                    2.3M
                  </Text>
                  <Text fontSize="sm" color="gray.600" textAlign="center">
                    Hotels Analyzed Daily
                  </Text>
                  <Progress value={85} colorScheme="green" size="sm" w="full" />
                </VStack>
                
                <VStack spacing={3}>
                  <Text fontSize="3xl" fontWeight="bold" color="purple.600">
                    4.8/5
                  </Text>
                  <Text fontSize="sm" color="gray.600" textAlign="center">
                    User Satisfaction Score
                  </Text>
                  <Progress value={96} colorScheme="purple" size="sm" w="full" />
                </VStack>
              </SimpleGrid>
            </VStack>
          </Card>
        </VStack>
      </Container>
    </Box>
  )
}
