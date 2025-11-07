'use client'
import {
  Container,
  VStack,
  Heading,
  Text,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Box,
} from '@chakra-ui/react'
import { FaSearch } from 'react-icons/fa'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { FeaturedDestinations } from '@/components/sections/FeaturedDestinations'

export default function ExplorePage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Explore Destinations', isCurrentPage: true },
  ]

  return (
    <Container maxW="7xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Breadcrumb items={breadcrumbItems} />
        
        <VStack spacing={6} align="start">
          <VStack spacing={4} align="start" w="full">
            <Heading size="2xl" color="gray.800" _dark={{ color: 'gray.200' }}>
              🏝️ Explore Thailand Destinations
            </Heading>
            <Text fontSize="lg" color="gray.600" _dark={{ color: 'gray.400' }} maxW="3xl">
              Discover the best places to visit in Thailand with AI-powered trip recommendations. 
              From bustling cities to pristine beaches, find your perfect adventure.
            </Text>
          </VStack>

          <Box w="full" bg="gray.50" _dark={{ bg: 'gray.800' }} p={6} borderRadius="xl">
            <HStack spacing={4} w="full">
              <InputGroup flex={2}>
                <InputLeftElement>
                  <FaSearch color="gray.400" />
                </InputLeftElement>
                <Input
                  placeholder="Search destinations, activities, or places..."
                  bg="white"
                  _dark={{ bg: 'gray.700' }}
                />
              </InputGroup>
              
              <Select flex={1} bg="white" _dark={{ bg: 'gray.700' }}>
                <option value="">All Regions</option>
                <option value="central">Central Thailand</option>
                <option value="north">Northern Thailand</option>
                <option value="south">Southern Thailand</option>
              </Select>
            </HStack>
          </Box>
        </VStack>

        <FeaturedDestinations />
      </VStack>
    </Container>
  )
}
