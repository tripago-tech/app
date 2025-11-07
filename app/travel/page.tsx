'use client'
import { Container, VStack, Heading, Text } from '@chakra-ui/react'
import { NextSeo } from 'next-seo'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { TravelMap } from '@/components/sections/TravelMap'
import { generateSEO } from '@/utils/seo'

export default function TravelPage() {
  const seo = generateSEO({
    title: 'Explore Places',
    description: 'Discover amazing travel destinations around the world.',
    url: '/travel',
  })

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Travel', isCurrentPage: true },
  ]

  return (
    <>
      <NextSeo {...seo} />
      <Container maxW="7xl" py={8}>
        <VStack spacing={8} align="stretch">
          <Breadcrumb items={breadcrumbItems} />
          
          <VStack spacing={4} align="start">
            <Heading size="xl">Explore Amazing Places</Heading>
            <Text color="gray.600" _dark={{ color: 'gray.400' }}>
              Discover destinations on the map and plan your next adventure
            </Text>
          </VStack>

          <TravelMap />
        </VStack>
      </Container>
    </>
  )
}
