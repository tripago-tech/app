import { Container, Heading, Text, Box, HStack, Button } from '@chakra-ui/react'
import { FaMapMarkerAlt, FaFilter, FaLayerGroup } from 'react-icons/fa'

export default function MapsPage() {
  return (
    <Container maxW="7xl" py={8}>
      <Box mb={8}>
        <Heading size="xl" mb={4}>Interactive Map</Heading>
        <Text color="gray.600">Explore destinations, hotels, and attractions on the map</Text>
      </Box>

      <HStack spacing={4} mb={6}>
        <Button leftIcon={<FaMapMarkerAlt />} colorScheme="blue" size="sm">
          Hotels
        </Button>
        <Button leftIcon={<FaMapMarkerAlt />} variant="outline" size="sm">
          Restaurants
        </Button>
        <Button leftIcon={<FaMapMarkerAlt />} variant="outline" size="sm">
          Attractions
        </Button>
        <Button leftIcon={<FaFilter />} variant="outline" size="sm">
          Filters
        </Button>
        <Button leftIcon={<FaLayerGroup />} variant="outline" size="sm">
          Layers
        </Button>
      </HStack>

      <Box h="600px" bg="gray.100" borderRadius="lg" p={8} textAlign="center">
        <Text color="gray.600" fontSize="lg">
          Interactive map will be implemented here using Leaflet
        </Text>
        <Text color="gray.500" fontSize="sm" mt={2}>
          Features: Clustering, filters, real-time data, route planning
        </Text>
      </Box>
    </Container>
  )
}
