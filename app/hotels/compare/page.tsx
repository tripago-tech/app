import { Container, Heading, Text, Box, SimpleGrid, HStack, Badge } from '@chakra-ui/react'
import { Card } from '@/components/ui/Card'
import { FaStar, FaWifi, FaSwimmingPool, FaCar } from 'react-icons/fa'

export default function HotelComparePage() {
  return (
    <Container maxW="7xl" py={8}>
      <Box mb={8}>
        <Heading size="xl" mb={4}>Compare Hotel Prices</Heading>
        <Text color="gray.600">Find the best deals across multiple booking platforms</Text>
      </Box>

      <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={6}>
        <Card p={6}>
          <Heading size="md" mb={2}>Luxury Resort Bangkok</Heading>
          <HStack mb={3}>
            <HStack>
              <FaStar color="gold" />
              <FaStar color="gold" />
              <FaStar color="gold" />
              <FaStar color="gold" />
              <FaStar color="gold" />
            </HStack>
            <Badge colorScheme="purple">5 Star</Badge>
          </HStack>
          <HStack mb={3} fontSize="sm">
            <FaWifi />
            <FaSwimmingPool />
            <FaCar />
          </HStack>
          <Box>
            <Text fontSize="sm" color="gray.600">Price comparison:</Text>
            <Text fontSize="lg" fontWeight="bold" color="green.600">$120/night</Text>
            <Text fontSize="xs" color="gray.500">Best price from Agoda</Text>
          </Box>
        </Card>
      </SimpleGrid>
    </Container>
  )
}
