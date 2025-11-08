'use client'
import {
  Container,
  VStack,
  Box,
  Heading,
  Text,
  Button,
  Icon,
  SimpleGrid,
} from '@chakra-ui/react'
import { FaHome, FaSearch, FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa'
import Link from 'next/link'

export default function NotFound() {
  return (
    <Container maxW="7xl" py={20}>
      <VStack spacing={12} align="stretch" textAlign="center">
        {/* Error Code */}
        <VStack spacing={4}>
          <Text fontSize="8xl" fontWeight="bold" color="primary.500" lineHeight={1}>
            404
          </Text>
          <Heading size="2xl">Page Not Found</Heading>
          <Text color="gray.600" maxW="500px">
            Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
          </Text>
        </VStack>

        {/* Illustration */}
        <Box fontSize="6xl" py={8}>
          🗺️
        </Box>

        {/* Action Buttons */}
        <VStack spacing={4} maxW="sm" mx="auto" w="full">
          <Button
            as={Link}
            href="/"
            colorScheme="primary"
            size="lg"
            w="full"
            leftIcon={<FaHome />}
          >
            Back to Home
          </Button>
          <Button
            as={Link}
            href="/destinations"
            variant="outline"
            size="lg"
            w="full"
            leftIcon={<FaMapMarkerAlt />}
          >
            Explore Destinations
          </Button>
        </VStack>

        {/* Suggested Links */}
        <VStack spacing={6} align="stretch" pt={8} borderTop="1px" borderColor="gray.200">
          <Text fontWeight="semibold" color="gray.700">Try these popular pages:</Text>
          <SimpleGrid columns={{ base: 2, md: 3 }} spacing={4}>
            {[
              { href: '/hotels', label: '🏨 Hotels', icon: FaSearch },
              { href: '/destinations', label: '✈️ Destinations', icon: FaMapMarkerAlt },
              { href: '/community', label: '👥 Community', icon: FaSearch },
              { href: '/planner', label: '📋 Trip Planner', icon: FaSearch },
              { href: '/blog', label: '📝 Blog', icon: FaSearch },
              { href: '/profile', label: '👤 Profile', icon: FaSearch },
            ].map((item) => (
              <Link key={item.href} href={item.href}>
                <Box
                  p={6}
                  bg="gray.50"
                  _hover={{ bg: 'gray.100', transform: 'translateY(-2px)', boxShadow: 'md' }}
                  borderRadius="lg"
                  cursor="pointer"
                  transition="all 0.2s"
                  textAlign="center"
                >
                  <Text fontSize="2xl" mb={2}>{item.label.split(' ')[0]}</Text>
                  <Text fontSize="sm" fontWeight="semibold" color="primary.600">
                    {item.label.split(' ')[1]}
                  </Text>
                </Box>
              </Link>
            ))}
          </SimpleGrid>
        </VStack>

        {/* Help Text */}
        <VStack spacing={2} pt={8}>
          <Text color="gray.600" fontSize="sm">
            Can't find what you're looking for?
          </Text>
          <Link href="/contact">
            <Text color="primary.600" fontWeight="semibold" _hover={{ textDecoration: 'underline' }}>
              Contact our support team →
            </Text>
          </Link>
        </VStack>
      </VStack>
    </Container>
  )
}
