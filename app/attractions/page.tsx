import { Container, Heading, Text, SimpleGrid, Box, Badge, HStack } from '@chakra-ui/react'
import { Card } from '@/components/ui/Card'
import { FaStar, FaClock, FaTicketAlt } from 'react-icons/fa'

export default function AttractionsPage() {
  return (
    <Container maxW="7xl" py={8}>
      <Box mb={8}>
        <Heading size="xl" mb={4}>Things to Do</Heading>
        <Text color="gray.600">Discover attractions, tours, and experiences</Text>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        <Card p={6}>
          <Heading size="md" mb={2}>Grand Palace Bangkok</Heading>
          <HStack mb={2}>
            <HStack>
              <FaStar color="gold" />
              <Text fontSize="sm">4.9</Text>
            </HStack>
            <Badge colorScheme="purple">Must Visit</Badge>
          </HStack>
          <HStack fontSize="sm" color="gray.600" mb={2}>
            <HStack>
              <FaClock />
              <Text>2-3 hours</Text>
            </HStack>
            <HStack>
              <FaTicketAlt />
              <Text>$15</Text>
            </HStack>
          </HStack>
          <Text>Historic royal palace complex with stunning architecture</Text>
        </Card>
      </SimpleGrid>
    </Container>
  )
}
