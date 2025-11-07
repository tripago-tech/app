'use client'
import {
  Container,
  Heading,
  SimpleGrid,
  VStack,
  Text,
  Image,
  HStack,
} from '@chakra-ui/react'
import { Card } from '@/components/ui/Card'
import { Rating } from '@/components/ui/Rating'
import { TagList } from '@/components/content/TagList'
import { useTranslation } from '@/hooks/useTranslation'
import { motion } from 'framer-motion'

const MotionCard = motion(Card)

const mockPlaces = [
  {
    id: '1',
    name: 'Bangkok',
    image: 'https://images.unsplash.com/photo-1563492065-1a83e8c2b2e8?w=500',
    rating: 4.8,
    tags: ['Temples', 'Street Food', 'Shopping'],
    description: 'Vibrant capital with golden temples and incredible street food.',
  },
  {
    id: '2',
    name: 'Chiang Mai',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500',
    rating: 4.9,
    tags: ['Culture', 'Mountains', 'Temples'],
    description: 'Ancient city surrounded by mountains and rich culture.',
  },
  {
    id: '3',
    name: 'Phuket',
    image: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=500',
    rating: 4.7,
    tags: ['Beaches', 'Islands', 'Water Sports'],
    description: 'Tropical paradise with stunning beaches and clear waters.',
  },
]

export const PopularPlaces = () => {
  const { t } = useTranslation()

  return (
    <Container maxW="7xl" py={16}>
      <VStack spacing={12}>
        <VStack spacing={4} textAlign="center">
          <Heading size="xl">{t('places.popular')}</Heading>
          <Text color="gray.600" _dark={{ color: 'gray.400' }} maxW="2xl">
            {t('places.popularDesc')}
          </Text>
        </VStack>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} w="full">
          {mockPlaces.map((place, index) => (
            <MotionCard
              key={place.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              cursor="pointer"
            >
              <Image
                src={place.image}
                alt={place.name}
                h="200px"
                w="full"
                objectFit="cover"
              />
              <VStack p={6} align="start" spacing={3}>
                <Heading size="md">{place.name}</Heading>
                <HStack>
                  <Rating rating={place.rating} showText />
                </HStack>
                <Text color="gray.600" _dark={{ color: 'gray.400' }}>
                  {place.description}
                </Text>
                <TagList tags={place.tags} size="sm" />
              </VStack>
            </MotionCard>
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  )
}
