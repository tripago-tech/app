import { Container, Heading, Text, SimpleGrid, Box, HStack, Avatar, Badge } from '@chakra-ui/react'
import { Card } from '@/components/ui/Card'
import { FaStar, FaHeart, FaComment } from 'react-icons/fa'

export default function CommunityPage() {
  return (
    <Container maxW="7xl" py={8}>
      <Box mb={8}>
        <Heading size="xl" mb={4}>Travel Community</Heading>
        <Text color="gray.600">Connect with fellow travelers and share experiences</Text>
      </Box>

      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
        <Box>
          <Heading size="lg" mb={4}>Recent Reviews</Heading>
          <Card p={6} mb={4}>
            <HStack mb={3}>
              <Avatar size="sm" name="John Doe" />
              <Box>
                <Text fontWeight="bold">John Doe</Text>
                <HStack>
                  <FaStar color="gold" />
                  <FaStar color="gold" />
                  <FaStar color="gold" />
                  <FaStar color="gold" />
                  <FaStar color="gold" />
                </HStack>
              </Box>
              <Badge colorScheme="blue">Verified</Badge>
            </HStack>
            <Text mb={2}>Amazing stay at the resort! The staff was incredibly friendly...</Text>
            <HStack fontSize="sm" color="gray.600">
              <HStack>
                <FaHeart />
                <Text>24</Text>
              </HStack>
              <HStack>
                <FaComment />
                <Text>8</Text>
              </HStack>
            </HStack>
          </Card>
        </Box>

        <Box>
          <Heading size="lg" mb={4}>Travel Photos</Heading>
          <SimpleGrid columns={2} spacing={4}>
            <Card p={4}>
              <Text fontSize="sm">Sunset at Phi Phi Island</Text>
            </Card>
            <Card p={4}>
              <Text fontSize="sm">Street Food in Bangkok</Text>
            </Card>
          </SimpleGrid>
        </Box>
      </SimpleGrid>
    </Container>
  )
}
