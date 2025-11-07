import { Container, Heading, Text, SimpleGrid, Box, Badge, HStack } from '@chakra-ui/react'
import { Card } from '@/components/ui/Card'
import { FaStar, FaMapMarkerAlt } from 'react-icons/fa'

export default function RestaurantsPage() {
  return (
    <Container maxW="7xl" py={8}>
      <Box mb={8}>
        <Heading size="xl" mb={4}>Restaurants & Dining</Heading>
        <Text color="gray.600">Discover the best local cuisine and dining experiences</Text>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        <Card p={6}>
          <Heading size="md" mb={2}>Thai Street Food</Heading>
          <HStack mb={2}>
            <HStack>
              <FaStar color="gold" />
              <Text fontSize="sm">4.8</Text>
            </HStack>
            <Badge colorScheme="green">Local Favorite</Badge>
          </HStack>
          <Text fontSize="sm" color="gray.600" mb={2}>
            <FaMapMarkerAlt style={{ display: 'inline', marginRight: '4px' }} />
            Bangkok, Thailand
          </Text>
          <Text>Authentic street food experience in the heart of Bangkok</Text>
        </Card>
      </SimpleGrid>
    </Container>
  )
}
