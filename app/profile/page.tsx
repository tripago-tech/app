import { Container, Heading, Text, SimpleGrid, Box, HStack, Avatar, Badge, VStack } from '@chakra-ui/react'
import { Card } from '@/components/ui/Card'
import { FaStar, FaMapMarkerAlt, FaCamera, FaTrophy } from 'react-icons/fa'

export default function ProfilePage() {
  return (
    <Container maxW="7xl" py={8}>
      <Box mb={8}>
        <HStack spacing={6} mb={6}>
          <Avatar size="xl" name="John Doe" />
          <VStack align="start" spacing={2}>
            <Heading size="lg">John Doe</Heading>
            <Text color="gray.600">Travel Enthusiast</Text>
            <HStack>
              <Badge colorScheme="gold">Explorer</Badge>
              <Badge colorScheme="blue">Top Reviewer</Badge>
            </HStack>
          </VStack>
        </HStack>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
        <Card p={6} textAlign="center">
          <FaMapMarkerAlt size={24} color="blue" style={{ margin: '0 auto 8px' }} />
          <Heading size="lg">12</Heading>
          <Text color="gray.600">Countries Visited</Text>
        </Card>
        <Card p={6} textAlign="center">
          <FaStar size={24} color="gold" style={{ margin: '0 auto 8px' }} />
          <Heading size="lg">48</Heading>
          <Text color="gray.600">Reviews Written</Text>
        </Card>
        <Card p={6} textAlign="center">
          <FaCamera size={24} color="green" style={{ margin: '0 auto 8px' }} />
          <Heading size="lg">156</Heading>
          <Text color="gray.600">Photos Shared</Text>
        </Card>
        <Card p={6} textAlign="center">
          <FaTrophy size={24} color="purple" style={{ margin: '0 auto 8px' }} />
          <Heading size="lg">2,450</Heading>
          <Text color="gray.600">Points Earned</Text>
        </Card>
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
        <Box>
          <Heading size="md" mb={4}>Recent Activity</Heading>
          <Card p={4}>
            <Text>Recent reviews and activities will be shown here</Text>
          </Card>
        </Box>
        <Box>
          <Heading size="md" mb={4}>Achievements</Heading>
          <Card p={4}>
            <Text>Badges and achievements will be displayed here</Text>
          </Card>
        </Box>
      </SimpleGrid>
    </Container>
  )
}
