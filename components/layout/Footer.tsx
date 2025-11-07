'use client'
import {
  Box,
  Container,
  Stack,
  Text,
  Link,
  HStack,
  Icon,
} from '@chakra-ui/react'
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'

export const Footer = () => {
  return (
    <Box
      bg="gray.50"
      _dark={{ bg: 'gray.900' }}
      borderTop="1px"
      borderColor="gray.200"
      _dark={{ borderColor: 'gray.700' }}
    >
      <Container maxW="7xl" py={8}>
        <Stack spacing={8} direction={{ base: 'column', md: 'row' }} justify="space-between">
          <Stack spacing={4}>
            <HStack spacing={2}>
              <Text fontSize="2xl">🔍</Text>
              <Text fontSize="lg" fontWeight="bold" color="blue.600" _dark={{ color: 'blue.300' }}>
                TripScope.AI
              </Text>
            </HStack>
            <Text color="gray.600" _dark={{ color: 'gray.400' }} maxW="md">
              AI-powered hotel discovery and booking platform. Compare prices, 
              read smart reviews, and find your perfect stay with confidence.
            </Text>
          </Stack>

          <Stack direction={{ base: 'column', md: 'row' }} spacing={8}>
            <Stack spacing={2}>
              <Text fontWeight="semibold">Discover</Text>
              <Link href="/hotels" color="gray.600" _dark={{ color: 'gray.400' }}>
                Hotels
              </Link>
              <Link href="/explore" color="gray.600" _dark={{ color: 'gray.400' }}>
                Destinations
              </Link>
              <Link href="/compare" color="gray.600" _dark={{ color: 'gray.400' }}>
                Compare Hotels
              </Link>
            </Stack>

            <Stack spacing={2}>
              <Text fontWeight="semibold">AI Features</Text>
              <Link href="/generate" color="gray.600" _dark={{ color: 'gray.400' }}>
                AI Trip Planner
              </Link>
              <Link href="/community" color="gray.600" _dark={{ color: 'gray.400' }}>
                Smart Reviews
              </Link>
            </Stack>

            <Stack spacing={2}>
              <Text fontWeight="semibold">Support</Text>
              <Link href="/help" color="gray.600" _dark={{ color: 'gray.400' }}>
                Help Center
              </Link>
              <Link href="/contact" color="gray.600" _dark={{ color: 'gray.400' }}>
                Contact Us
              </Link>
            </Stack>
          </Stack>
        </Stack>

        <Stack
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          align="center"
          pt={8}
          borderTop="1px"
          borderColor="gray.200"
          _dark={{ borderColor: 'gray.700' }}
        >
          <Text color="gray.600" _dark={{ color: 'gray.400' }}>
            © 2024 TripScope.AI. All rights reserved.
          </Text>
          <HStack spacing={4}>
            <Icon as={FaFacebook} w={5} h={5} color="gray.400" cursor="pointer" />
            <Icon as={FaTwitter} w={5} h={5} color="gray.400" cursor="pointer" />
            <Icon as={FaInstagram} w={5} h={5} color="gray.400" cursor="pointer" />
          </HStack>
        </Stack>
      </Container>
    </Box>
  )
}
