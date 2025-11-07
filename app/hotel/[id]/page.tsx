'use client'
import {
  Container,
  VStack,
  Heading,
  Text,
  HStack,
  Box,
  SimpleGrid,
  Badge,
  Image,
  Divider,
  Avatar,
  Progress,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react'
import { useState } from 'react'
import { FaStar, FaMapMarkerAlt, FaWifi, FaSwimmingPool, FaCar, FaHeart, FaShare, FaThumbsUp } from 'react-icons/fa'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Rating } from '@/components/ui/Rating'
import { ImageGallery } from '@/components/content/ImageGallery'
import { MapEmbed } from '@/components/content/MapEmbed'

const mockHotel = {
  id: 'h1',
  name: 'Paradise Resort Phuket',
  location: 'Patong Beach, Phuket, Thailand',
  coordinates: { lat: 7.8804, lng: 98.2967 },
  rating: 4.8,
  reviewCount: 1234,
  starRating: 5,
  price: 99,
  originalPrice: 120,
  images: [
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800',
  ],
  description: 'Experience luxury at Paradise Resort Phuket, located on the pristine Patong Beach. Our 5-star resort offers world-class amenities, stunning ocean views, and exceptional service.',
  amenities: [
    { name: 'Free WiFi', icon: FaWifi },
    { name: 'Swimming Pool', icon: FaSwimmingPool },
    { name: 'Free Parking', icon: FaCar },
    { name: 'Beach Access', icon: null },
    { name: 'Spa & Wellness', icon: null },
    { name: 'Restaurant', icon: null },
    { name: 'Fitness Center', icon: null },
    { name: 'Room Service', icon: null }
  ],
  aiInsights: {
    positive: [
      { text: 'Excellent location near beach', mentions: 89 },
      { text: 'Outstanding breakfast buffet', mentions: 67 },
      { text: 'Friendly and helpful staff', mentions: 156 },
      { text: 'Clean and spacious rooms', mentions: 98 }
    ],
    negative: [
      { text: 'Pool can be crowded during peak hours', mentions: 23 },
      { text: 'WiFi speed could be better', mentions: 15 }
    ],
    score: 0.85
  },
  reviews: [
    {
      id: 'r1',
      user: {
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
        country: 'USA',
        reviewCount: 15
      },
      rating: 5,
      title: 'Perfect beachfront getaway!',
      content: 'Amazing stay at Paradise Resort! The location is unbeatable - literally steps from Patong Beach. The staff was incredibly friendly and the breakfast buffet was outstanding. Room was clean and spacious with a beautiful ocean view.',
      photos: [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300',
        'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=300'
      ],
      stayDate: '2024-02-15',
      helpful: 24,
      verified: true,
      createdAt: '2024-02-20'
    },
    {
      id: 'r2',
      user: {
        name: 'Mike Chen',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
        country: 'Singapore',
        reviewCount: 8
      },
      rating: 4,
      title: 'Great hotel with minor issues',
      content: 'Overall excellent experience. The pool area is beautiful but gets quite crowded. WiFi in the room was a bit slow. However, the location and service more than make up for these minor inconveniences.',
      photos: [],
      stayDate: '2024-02-10',
      helpful: 12,
      verified: true,
      createdAt: '2024-02-12'
    }
  ],
  ratingBreakdown: {
    5: 65,
    4: 25,
    3: 7,
    2: 2,
    1: 1
  }
}

export default function HotelDetailPage({ params }: { params: { id: string } }) {
  const [selectedTab, setSelectedTab] = useState(0)

  return (
    <Container maxW="7xl" py={8}>
      <VStack spacing={8} align="stretch">
        {/* Hotel Header */}
        <VStack spacing={4} align="start">
          <HStack justify="space-between" w="full">
            <VStack spacing={2} align="start">
              <HStack>
                {Array.from({length: mockHotel.starRating}, (_, i) => (
                  <FaStar key={i} color="gold" size={16} />
                ))}
              </HStack>
              <Heading size="2xl">{mockHotel.name}</Heading>
              <HStack>
                <FaMapMarkerAlt color="gray" />
                <Text color="gray.600">{mockHotel.location}</Text>
              </HStack>
            </VStack>
            
            <VStack spacing={2} align="end">
              <HStack>
                <Text fontSize="lg" textDecoration="line-through" color="gray.500">
                  ${mockHotel.originalPrice}
                </Text>
                <Text fontSize="3xl" fontWeight="bold" color="green.600">
                  ${mockHotel.price}
                </Text>
              </HStack>
              <Text color="gray.500">per night</Text>
              <HStack>
                <Button leftIcon={<FaHeart />} variant="outline" size="sm">
                  Save
                </Button>
                <Button leftIcon={<FaShare />} variant="outline" size="sm">
                  Share
                </Button>
              </HStack>
            </VStack>
          </HStack>

          <HStack>
            <Rating rating={mockHotel.rating} size="md" showText />
            <Text color="gray.500">({mockHotel.reviewCount} reviews)</Text>
          </HStack>
        </VStack>

        {/* Image Gallery */}
        <ImageGallery images={mockHotel.images} height="400px" />

        {/* Main Content */}
        <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={8}>
          <Box gridColumn={{ lg: "1 / 3" }}>
            <Tabs index={selectedTab} onChange={setSelectedTab}>
              <TabList>
                <Tab>Overview</Tab>
                <Tab>Reviews ({mockHotel.reviewCount})</Tab>
                <Tab>Location</Tab>
              </TabList>

              <TabPanels>
                {/* Overview Tab */}
                <TabPanel px={0}>
                  <VStack spacing={6} align="stretch">
                    {/* AI Insights */}
                    <Card p={6} bg="blue.50" _dark={{ bg: "blue.900" }}>
                      <VStack spacing={4} align="stretch">
                        <Heading size="md" color="blue.600">
                          🤖 AI Insights from Reviews
                        </Heading>
                        
                        <VStack spacing={3} align="stretch">
                          <Box>
                            <Text fontWeight="medium" color="green.600" mb={2}>
                              ✅ What guests love:
                            </Text>
                            {mockHotel.aiInsights.positive.map((insight, i) => (
                              <HStack key={i} justify="space-between" fontSize="sm">
                                <Text>{insight.text}</Text>
                                <Badge colorScheme="green" size="sm">
                                  {insight.mentions} mentions
                                </Badge>
                              </HStack>
                            ))}
                          </Box>
                          
                          <Box>
                            <Text fontWeight="medium" color="orange.600" mb={2}>
                              ⚠️ Areas for improvement:
                            </Text>
                            {mockHotel.aiInsights.negative.map((insight, i) => (
                              <HStack key={i} justify="space-between" fontSize="sm">
                                <Text>{insight.text}</Text>
                                <Badge colorScheme="orange" size="sm">
                                  {insight.mentions} mentions
                                </Badge>
                              </HStack>
                            ))}
                          </Box>
                        </VStack>
                      </VStack>
                    </Card>

                    {/* Description */}
                    <Box>
                      <Heading size="md" mb={3}>About this hotel</Heading>
                      <Text lineHeight="tall" color="gray.700" _dark={{ color: "gray.300" }}>
                        {mockHotel.description}
                      </Text>
                    </Box>

                    {/* Amenities */}
                    <Box>
                      <Heading size="md" mb={3}>Amenities</Heading>
                      <SimpleGrid columns={{ base: 2, md: 3 }} spacing={3}>
                        {mockHotel.amenities.map((amenity, i) => (
                          <HStack key={i}>
                            {amenity.icon && <amenity.icon color="blue" />}
                            <Text fontSize="sm">{amenity.name}</Text>
                          </HStack>
                        ))}
                      </SimpleGrid>
                    </Box>
                  </VStack>
                </TabPanel>

                {/* Reviews Tab */}
                <TabPanel px={0}>
                  <VStack spacing={6} align="stretch">
                    {/* Rating Summary */}
                    <Card p={6}>
                      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                        <VStack spacing={4}>
                          <VStack>
                            <Text fontSize="4xl" fontWeight="bold" color="blue.600">
                              {mockHotel.rating}
                            </Text>
                            <Rating rating={mockHotel.rating} size="lg" />
                            <Text color="gray.500">
                              Based on {mockHotel.reviewCount} reviews
                            </Text>
                          </VStack>
                        </VStack>
                        
                        <VStack spacing={2} align="stretch">
                          {Object.entries(mockHotel.ratingBreakdown)
                            .reverse()
                            .map(([stars, count]) => (
                            <HStack key={stars}>
                              <Text fontSize="sm" w="20px">{stars}★</Text>
                              <Progress 
                                value={(count / mockHotel.reviewCount) * 100} 
                                colorScheme="blue" 
                                size="sm" 
                                flex={1}
                              />
                              <Text fontSize="sm" w="30px">{count}%</Text>
                            </HStack>
                          ))}
                        </VStack>
                      </SimpleGrid>
                    </Card>

                    {/* Individual Reviews */}
                    <VStack spacing={4} align="stretch">
                      {mockHotel.reviews.map((review) => (
                        <Card key={review.id} p={6}>
                          <VStack spacing={4} align="stretch">
                            <HStack justify="space-between">
                              <HStack>
                                <Avatar size="md" src={review.user.avatar} name={review.user.name} />
                                <VStack spacing={1} align="start">
                                  <HStack>
                                    <Text fontWeight="bold">{review.user.name}</Text>
                                    {review.verified && (
                                      <Badge colorScheme="green" size="sm">Verified</Badge>
                                    )}
                                  </HStack>
                                  <Text fontSize="sm" color="gray.500">
                                    {review.user.country} • {review.user.reviewCount} reviews
                                  </Text>
                                </VStack>
                              </HStack>
                              <VStack spacing={1} align="end">
                                <Rating rating={review.rating} size="sm" />
                                <Text fontSize="sm" color="gray.500">
                                  Stayed {review.stayDate}
                                </Text>
                              </VStack>
                            </HStack>

                            <VStack spacing={2} align="start">
                              <Text fontWeight="bold">{review.title}</Text>
                              <Text lineHeight="tall">{review.content}</Text>
                            </VStack>

                            {review.photos.length > 0 && (
                              <HStack spacing={2}>
                                {review.photos.map((photo, i) => (
                                  <Image
                                    key={i}
                                    src={photo}
                                    alt="Review photo"
                                    w="80px"
                                    h="80px"
                                    objectFit="cover"
                                    borderRadius="md"
                                  />
                                ))}
                              </HStack>
                            )}

                            <HStack justify="space-between">
                              <Text fontSize="sm" color="gray.500">
                                {review.createdAt}
                              </Text>
                              <Button size="sm" variant="ghost" leftIcon={<FaThumbsUp />}>
                                Helpful ({review.helpful})
                              </Button>
                            </HStack>
                          </VStack>
                        </Card>
                      ))}
                    </VStack>
                  </VStack>
                </TabPanel>

                {/* Location Tab */}
                <TabPanel px={0}>
                  <VStack spacing={4} align="stretch">
                    <Heading size="md">Location & Nearby</Heading>
                    <MapEmbed
                      center={[mockHotel.coordinates.lat, mockHotel.coordinates.lng]}
                      zoom={15}
                      height="400px"
                      markers={[{
                        position: [mockHotel.coordinates.lat, mockHotel.coordinates.lng],
                        popup: mockHotel.name
                      }]}
                    />
                    <Text color="gray.600">
                      <FaMapMarkerAlt style={{ display: 'inline', marginRight: '8px' }} />
                      {mockHotel.location}
                    </Text>
                  </VStack>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>

          {/* Booking Sidebar */}
          <Card p={6} h="fit-content" position="sticky" top="20px">
            <VStack spacing={4} align="stretch">
              <VStack spacing={2}>
                <HStack justify="space-between" w="full">
                  <Text fontSize="sm" textDecoration="line-through" color="gray.500">
                    ${mockHotel.originalPrice}
                  </Text>
                  <Text fontSize="2xl" fontWeight="bold" color="green.600">
                    ${mockHotel.price}
                  </Text>
                </HStack>
                <Text fontSize="sm" color="gray.500" textAlign="center">
                  per night (taxes included)
                </Text>
              </VStack>

              <Divider />

              <VStack spacing={3} align="stretch">
                <Button colorScheme="blue" size="lg">
                  Book Direct - Best Price
                </Button>
                <Button variant="outline" size="md">
                  Book on Agoda
                </Button>
                <Button variant="outline" size="md">
                  Book on Booking.com
                </Button>
              </VStack>

              <Divider />

              <VStack spacing={2} fontSize="sm" color="gray.600">
                <Text>✅ Free cancellation until 24h before</Text>
                <Text>✅ No booking fees</Text>
                <Text>✅ Best price guarantee</Text>
              </VStack>
            </VStack>
          </Card>
        </SimpleGrid>
      </VStack>
    </Container>
  )
}
