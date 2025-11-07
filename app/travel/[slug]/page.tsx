'use client'
import { Container, VStack, Heading, Text, HStack, SimpleGrid } from '@chakra-ui/react'
import { NextSeo } from 'next-seo'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { ImageGallery } from '@/components/content/ImageGallery'
import { MapEmbed } from '@/components/content/MapEmbed'
import { Rating } from '@/components/ui/Rating'
import { TagList } from '@/components/content/TagList'
import { Button } from '@/components/ui/Button'
import { generateSEO } from '@/utils/seo'
import { useTripPlanner } from '@/hooks/useTripPlanner'
import { useTranslation } from '@/hooks/useTranslation'

// Mock data - in real app, this would come from API
const mockPlace = {
  id: '1',
  name: 'Santorini, Greece',
  description: 'Santorini is one of the most beautiful islands in Greece, famous for its stunning sunsets, white-washed buildings, and crystal-clear waters.',
  images: [
    'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800',
    'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800',
    'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800',
  ],
  location: {
    lat: 36.3932,
    lng: 25.4615,
    address: 'Santorini, Greece',
  },
  rating: 4.8,
  tags: ['Beach', 'Romantic', 'Sunset', 'Island'],
  category: 'Beach',
  reviews: [],
}

export default function PlacePage({ params }: { params: { slug: string } }) {
  const { addPlaceToTrip, isFavorite, addToFavorites, removeFromFavorites } = useTripPlanner()
  const { t } = useTranslation()
  
  const seo = generateSEO({
    title: mockPlace.name,
    description: mockPlace.description,
    url: `/travel/${params.slug}`,
    image: mockPlace.images[0],
  })

  const breadcrumbItems = [
    { label: t('common.home'), href: '/' },
    { label: t('nav.travel'), href: '/travel' },
    { label: mockPlace.name, isCurrentPage: true },
  ]

  const handleAddToTrip = () => {
    addPlaceToTrip(mockPlace)
  }

  const handleToggleFavorite = () => {
    if (isFavorite(mockPlace.id)) {
      removeFromFavorites(mockPlace.id)
    } else {
      addToFavorites(mockPlace)
    }
  }

  return (
    <>
      <NextSeo {...seo} />
      <Container maxW="7xl" py={8}>
        <VStack spacing={8} align="stretch">
          <Breadcrumb items={breadcrumbItems} />
          
          <VStack spacing={6} align="start">
            <VStack spacing={4} align="start" w="full">
              <Heading size="2xl">{mockPlace.name}</Heading>
              <HStack spacing={4}>
                <Rating rating={mockPlace.rating} showText />
                <Text color="gray.600" _dark={{ color: 'gray.400' }}>
                  {mockPlace.location.address}
                </Text>
              </HStack>
              <TagList tags={mockPlace.tags} />
            </VStack>

            <ImageGallery images={mockPlace.images} height="400px" />

            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8} w="full">
              <VStack spacing={6} align="start">
                <VStack spacing={4} align="start">
                  <Heading size="lg">{t('places.about')}</Heading>
                  <Text color="gray.700" _dark={{ color: 'gray.300' }} lineHeight="tall">
                    {mockPlace.description}
                  </Text>
                </VStack>

                <HStack spacing={4}>
                  <Button colorScheme="brand" onClick={handleAddToTrip}>
                    {t('places.addToTrip')}
                  </Button>
                  <Button
                    variant="outline"
                    colorScheme={isFavorite(mockPlace.id) ? 'red' : 'gray'}
                    onClick={handleToggleFavorite}
                  >
                    {isFavorite(mockPlace.id) ? t('places.removeFromFavorites') : t('places.addToFavorites')}
                  </Button>
                </HStack>
              </VStack>

              <VStack spacing={4} align="start">
                <Heading size="lg">{t('places.location')}</Heading>
                <MapEmbed
                  center={[mockPlace.location.lat, mockPlace.location.lng]}
                  zoom={12}
                  height="300px"
                  markers={[
                    {
                      position: [mockPlace.location.lat, mockPlace.location.lng],
                      popup: mockPlace.name,
                    },
                  ]}
                />
              </VStack>
            </SimpleGrid>
          </VStack>
        </VStack>
      </Container>
    </>
  )
}
