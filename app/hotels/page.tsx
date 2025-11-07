import { Container, Heading, Text, Box, HStack, Button } from '@chakra-ui/react'
import { FaSearch, FaFilter, FaMapMarkerAlt } from 'react-icons/fa'

export default function HotelsPage() {
  return (
    <Container maxW="7xl" py={8}>
      <Box mb={8}>
        <Heading size="xl" mb={4}>Find Hotels</Heading>
        <Text color="gray.600">Compare prices and book the perfect accommodation</Text>
      </Box>

      <HStack spacing={4} mb={8}>
        <Button leftIcon={<FaSearch />} colorScheme="blue">
          Search Hotels
        </Button>
        <Button leftIcon={<FaFilter />} variant="outline">
          Filters
        </Button>
        <Button leftIcon={<FaMapMarkerAlt />} variant="outline">
          Map View
        </Button>
      </HStack>

      <Box>
        <Text>Hotel search and listings will be implemented here</Text>
      </Box>
    </Container>
  )
}
