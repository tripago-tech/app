import { Container, Heading, Text, Box, VStack, HStack, Avatar, Badge } from '@chakra-ui/react'
import { Card } from '@/components/ui/Card'
import { FaStar, FaThumbsUp, FaComment } from 'react-icons/fa'

export default function ReviewsPage() {
  return (
    <Container maxW="7xl" py={8}>
      <Box mb={8}>
        <Heading size="xl" mb={4}>Travel Reviews</Heading>
        <Text color="gray.600">Read authentic experiences from fellow travelers</Text>
      </Box>

      <VStack spacing={6} align="stretch">
        <Card p={6}>
          <HStack mb={4}>
            <Avatar size="md" name="Sarah Johnson" />
            <Box flex={1}>
              <HStack justify="space-between">
                <Box>
                  <Text fontWeight="bold">Sarah Johnson</Text>
                  <Text fontSize="sm" color="gray.600">Reviewed: Grand Palace Bangkok</Text>
                </Box>
                <Badge colorScheme="gold">Top Reviewer</Badge>
              </HStack>
              <HStack mt={2}>
                <FaStar color="gold" />
                <FaStar color="gold" />
                <FaStar color="gold" />
                <FaStar color="gold" />
                <FaStar color="gold" />
                <Text fontSize="sm" ml={2}>5.0 • 2 days ago</Text>
              </HStack>
            </Box>
          </HStack>
          
          <Text mb={4}>
            Absolutely stunning architecture and rich history! The Grand Palace is a must-visit 
            when in Bangkok. Arrive early to avoid crowds and wear appropriate clothing. 
            The intricate details of the buildings are breathtaking.
          </Text>
          
          <HStack fontSize="sm" color="gray.600">
            <HStack>
              <FaThumbsUp />
              <Text>42 helpful</Text>
            </HStack>
            <HStack>
              <FaComment />
              <Text>12 replies</Text>
            </HStack>
          </HStack>
        </Card>

        <Card p={6}>
          <HStack mb={4}>
            <Avatar size="md" name="Mike Chen" />
            <Box flex={1}>
              <HStack justify="space-between">
                <Box>
                  <Text fontWeight="bold">Mike Chen</Text>
                  <Text fontSize="sm" color="gray.600">Reviewed: Chatuchak Weekend Market</Text>
                </Box>
                <Badge colorScheme="blue">Local Expert</Badge>
              </HStack>
              <HStack mt={2}>
                <FaStar color="gold" />
                <FaStar color="gold" />
                <FaStar color="gold" />
                <FaStar color="gold" />
                <FaStar color="gray.300" />
                <Text fontSize="sm" ml={2}>4.0 • 1 week ago</Text>
              </HStack>
            </Box>
          </HStack>
          
          <Text mb={4}>
            Huge market with everything you can imagine! Great for souvenirs and local food. 
            Can get very crowded and hot, so bring water and comfortable shoes. 
            Bargaining is expected and part of the fun!
          </Text>
          
          <HStack fontSize="sm" color="gray.600">
            <HStack>
              <FaThumbsUp />
              <Text>28 helpful</Text>
            </HStack>
            <HStack>
              <FaComment />
              <Text>7 replies</Text>
            </HStack>
          </HStack>
        </Card>
      </VStack>
    </Container>
  )
}
