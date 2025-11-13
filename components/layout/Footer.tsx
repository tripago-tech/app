'use client'
import {
  Box,
  Container,
  Stack,
  Text,
  Link as ChakraLink,
  HStack,
  Icon,
  SimpleGrid,
} from '@chakra-ui/react'
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'
import Link from 'next/link'

export const Footer = () => {
  return (
    <Box
      bg="#F7F7F7"
      borderTop="1px solid"
      borderColor="#E0E0E0"
    >
      <Container maxW="100%" px={{ base: 4, md: 8 }}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8} py={12}>
          {/* Brand Section */}
          <Stack spacing={4}>
            <HStack spacing={2}>
              <Text fontSize="24px">🌍</Text>
              <Text fontSize="16px" fontWeight="800" color="#34E0A1">
                TripScope
              </Text>
            </HStack>
            <Text color="#606060" fontSize="13px" lineHeight="1.6">
              Discover your next adventure. Explore authentic travel experiences,
              trusted reviews, and expert tips from real travelers.
            </Text>
          </Stack>

          {/* Discover Section */}
          <Stack spacing={3}>
            <Text fontWeight="700" fontSize="14px" color="#1C1C1C">
              Discover
            </Text>
            <ChakraLink as={Link} href="/hotels" color="#606060" fontSize="13px" _hover={{ color: '#34E0A1' }}>
              Hotels
            </ChakraLink>
            <ChakraLink as={Link} href="/destinations" color="#606060" fontSize="13px" _hover={{ color: '#34E0A1' }}>
              Destinations
            </ChakraLink>
            <ChakraLink as={Link} href="/attractions" color="#606060" fontSize="13px" _hover={{ color: '#34E0A1' }}>
              Things to Do
            </ChakraLink>
            <ChakraLink as={Link} href="/restaurants" color="#606060" fontSize="13px" _hover={{ color: '#34E0A1' }}>
              Restaurants
            </ChakraLink>
          </Stack>

          {/* Features Section */}
          <Stack spacing={3}>
            <Text fontWeight="700" fontSize="14px" color="#1C1C1C">
              Features
            </Text>
            <ChakraLink as={Link} href="/planner" color="#606060" fontSize="13px" _hover={{ color: '#34E0A1' }}>
              Trip Planner
            </ChakraLink>
            <ChakraLink as={Link} href="/generate" color="#606060" fontSize="13px" _hover={{ color: '#34E0A1' }}>
              AI Generator
            </ChakraLink>
            <ChakraLink as={Link} href="/community" color="#606060" fontSize="13px" _hover={{ color: '#34E0A1' }}>
              Community
            </ChakraLink>
            <ChakraLink as={Link} href="/maps" color="#606060" fontSize="13px" _hover={{ color: '#34E0A1' }}>
              Maps
            </ChakraLink>
          </Stack>

          {/* Support Section */}
          <Stack spacing={3}>
            <Text fontWeight="700" fontSize="14px" color="#1C1C1C">
              Support
            </Text>
            <ChakraLink href="#" color="#606060" fontSize="13px" _hover={{ color: '#34E0A1' }}>
              Help Center
            </ChakraLink>
            <ChakraLink href="#" color="#606060" fontSize="13px" _hover={{ color: '#34E0A1' }}>
              Contact Us
            </ChakraLink>
            <ChakraLink href="#" color="#606060" fontSize="13px" _hover={{ color: '#34E0A1' }}>
              Privacy Policy
            </ChakraLink>
            <ChakraLink href="#" color="#606060" fontSize="13px" _hover={{ color: '#34E0A1' }}>
              Terms of Service
            </ChakraLink>
          </Stack>
        </SimpleGrid>

        {/* Bottom Footer */}
        <Stack
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          align="center"
          py={6}
          borderTop="1px solid"
          borderColor="#E0E0E0"
          spacing={4}
        >
          <Text color="#606060" fontSize="12px">
            © 2024 TripScope. All rights reserved.
          </Text>
          <HStack spacing={4}>
            <Icon as={FaFacebook} w={4} h={4} color="#34E0A1" cursor="pointer" _hover={{ opacity: 0.8 }} transition="opacity 0.2s" />
            <Icon as={FaTwitter} w={4} h={4} color="#34E0A1" cursor="pointer" _hover={{ opacity: 0.8 }} transition="opacity 0.2s" />
            <Icon as={FaInstagram} w={4} h={4} color="#34E0A1" cursor="pointer" _hover={{ opacity: 0.8 }} transition="opacity 0.2s" />
          </HStack>
        </Stack>
      </Container>
    </Box>
  )
}
