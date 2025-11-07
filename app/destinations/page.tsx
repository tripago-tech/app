import { Container, Heading, Text, SimpleGrid, Box } from '@chakra-ui/react'
import { Card } from '@/components/ui/Card'

export default function DestinationsPage() {
  return (
    <Container maxW="7xl" py={8}>
      <Box mb={8}>
        <Heading size="xl" mb={4}>Explore Destinations</Heading>
        <Text color="gray.600">Discover amazing places around the world</Text>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {/* Destination cards will be populated here */}
        <Card p={6}>
          <Heading size="md" mb={2}>Thailand</Heading>
          <Text>Land of smiles with beautiful beaches and rich culture</Text>
        </Card>
        <Card p={6}>
          <Heading size="md" mb={2}>Japan</Heading>
          <Text>Modern cities, ancient traditions, and stunning nature</Text>
        </Card>
        <Card p={6}>
          <Heading size="md" mb={2}>Italy</Heading>
          <Text>Art, history, cuisine, and breathtaking landscapes</Text>
        </Card>
      </SimpleGrid>
    </Container>
  )
}
