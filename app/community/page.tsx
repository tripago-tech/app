'use client'
import {
  Container,
  VStack,
  HStack,
  Box,
  Heading,
  Text,
  SimpleGrid,
  Avatar,
  Badge,
  Button,
  Icon,
  Tab,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Input,
  Select,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Flex,
} from '@chakra-ui/react'
import { Card } from '@/components/ui/Card'
import {
  FaStar,
  FaHeart,
  FaComment,
  FaImage,
  FaTrophy,
  FaMedal,
  FaFire,
  FaShare,
  FaPlus,
} from 'react-icons/fa'
import { useState } from 'react'

interface Review {
  id: string
  author: string
  avatar: string
  rating: number
  title: string
  content: string
  location: string
  date: string
  verified: boolean
  helpful: number
  comments: number
  badge?: string
}

interface Photo {
  id: string
  author: string
  avatar: string
  title: string
  location: string
  date: string
  image: string
  likes: number
  badge?: string
}

interface UserProfile {
  name: string
  level: string
  points: number
  reviews: number
  photos: number
  followers: number
  badges: string[]
}

const mockReviews: Review[] = [
  {
    id: '1',
    author: 'Sarah M.',
    avatar: 'SM',
    rating: 5,
    title: 'Absolutely Stunning!',
    content: 'The Mandarin Oriental Bangkok exceeded all my expectations! The service was impeccable, the food delicious, and the views of the Chao Phraya River are breathtaking. Highly recommend for a luxury stay in Bangkok.',
    location: 'Mandarin Oriental Bangkok',
    date: '2024-01-20',
    verified: true,
    helpful: 145,
    comments: 23,
    badge: 'Verified Traveler'
  },
  {
    id: '2',
    author: 'Mike C.',
    avatar: 'MC',
    rating: 4,
    title: 'Great Experience',
    content: 'Had an amazing time at Chiang Mai. The temples are stunning and the people are incredibly friendly. The street food is some of the best I\'ve ever had!',
    location: 'Chiang Mai',
    date: '2024-01-18',
    verified: true,
    helpful: 98,
    comments: 15,
    badge: 'Experienced Traveler'
  },
  {
    id: '3',
    author: 'Emma W.',
    avatar: 'EW',
    rating: 5,
    title: 'Perfect Beach Getaway',
    content: 'Phuket is absolutely perfect for a beach vacation. Crystal clear water, pristine beaches, and amazing nightlife. We did island hopping and visited Phi Phi Islands - unforgettable!',
    location: 'Phuket',
    date: '2024-01-15',
    verified: true,
    helpful: 234,
    comments: 42,
  },
  {
    id: '4',
    author: 'John D.',
    avatar: 'JD',
    rating: 4,
    title: 'Worth the Visit',
    content: 'Bangkok is vibrant and chaotic in the best way. The temple visits are worthwhile, and the food scene is incredible. Just be prepared for the heat and traffic!',
    location: 'Bangkok',
    date: '2024-01-12',
    verified: true,
    helpful: 167,
    comments: 28,
  },
]

const mockPhotos: Photo[] = [
  {
    id: '1',
    author: 'Sarah M.',
    avatar: 'SM',
    title: 'Sunset at Phi Phi Island',
    location: 'Phuket, Thailand',
    date: '2024-01-20',
    image: '🌅',
    likes: 342,
    badge: 'Featured Photo'
  },
  {
    id: '2',
    author: 'Alex T.',
    avatar: 'AT',
    title: 'Street Food Bangkok',
    location: 'Bangkok, Thailand',
    date: '2024-01-19',
    image: '🍜',
    likes: 289,
  },
  {
    id: '3',
    author: 'Maya P.',
    avatar: 'MP',
    title: 'Floating Market Morning',
    location: 'Bangkok, Thailand',
    date: '2024-01-18',
    image: '🚣',
    likes: 456,
    badge: 'Top Photo'
  },
  {
    id: '4',
    author: 'David L.',
    avatar: 'DL',
    title: 'Temple at Sunrise',
    location: 'Chiang Mai, Thailand',
    date: '2024-01-17',
    image: '⛩️',
    likes: 321,
  },
]

const topContributors: UserProfile[] = [
  {
    name: 'Sarah M.',
    level: 'Gold Member',
    points: 8450,
    reviews: 47,
    photos: 203,
    followers: 1245,
    badges: ['Verified Traveler', 'Top Reviewer', 'Photo Master']
  },
  {
    name: 'Mike C.',
    level: 'Silver Member',
    points: 6320,
    reviews: 34,
    photos: 156,
    followers: 890,
    badges: ['Experienced Traveler', 'Local Expert']
  },
  {
    name: 'Emma W.',
    level: 'Gold Member',
    points: 7890,
    reviews: 41,
    photos: 189,
    followers: 1123,
    badges: ['Verified Traveler', 'Destination Expert']
  },
]

export default function CommunityPage() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [activeTab, setActiveTab] = useState(0)
  const [newReview, setNewReview] = useState({ title: '', content: '', rating: 5 })

  return (
    <Container maxW="7xl" py={8}>
      <VStack spacing={8} align="stretch">
        {/* Header */}
        <HStack justify="space-between" align="start">
          <VStack spacing={2} align="start">
            <Heading size="2xl">🌍 Travel Community</Heading>
            <Text color="gray.600">Connect with fellow travelers, share experiences, and earn rewards</Text>
          </VStack>
          <Button colorScheme="primary" leftIcon={<FaPlus />} onClick={onOpen}>
            Write Review
          </Button>
        </HStack>

        {/* Gamification Section */}
        <SimpleGrid columns={{ base: 1, md: 4 }} spacing={4}>
          <Card p={6} textAlign="center">
            <Icon as={FaTrophy} w={8} h={8} color="accent.500" mx="auto" mb={2} />
            <Text fontWeight="bold" fontSize="2xl">47</Text>
            <Text fontSize="sm" color="gray.600">Your Reviews</Text>
          </Card>
          <Card p={6} textAlign="center">
            <Icon as={FaImage} w={8} h={8} color="secondary.500" mx="auto" mb={2} />
            <Text fontWeight="bold" fontSize="2xl">203</Text>
            <Text fontSize="sm" color="gray.600">Your Photos</Text>
          </Card>
          <Card p={6} textAlign="center">
            <Icon as={FaFire} w={8} h={8} color="primary.500" mx="auto" mb={2} />
            <Text fontWeight="bold" fontSize="2xl">8,450</Text>
            <Text fontSize="sm" color="gray.600">Achievement Points</Text>
          </Card>
          <Card p={6} textAlign="center">
            <Icon as={FaMedal} w={8} h={8} color="orange.500" mx="auto" mb={2} />
            <Text fontWeight="bold" fontSize="2xl">Gold</Text>
            <Text fontSize="sm" color="gray.600">Member Level</Text>
          </Card>
        </SimpleGrid>

        {/* Your Badges */}
        <Card p={6}>
          <Heading size="sm" mb={4}>Your Badges</Heading>
          <Flex wrap="wrap" gap={3}>
            {['Verified Traveler', 'Top Reviewer', 'Photo Master', 'Local Expert', 'Helpful Contributor'].map((badge) => (
              <Badge key={badge} colorScheme="secondary" px={3} py={1} fontSize="sm">
                {badge}
              </Badge>
            ))}
          </Flex>
        </Card>

        {/* Tabs */}
        <Tabs>
          <TabList>
            <Tab>Recent Reviews</Tab>
            <Tab>Community Photos</Tab>
            <Tab>Top Contributors</Tab>
          </TabList>

          <TabPanels>
            {/* Reviews Tab */}
            <TabPanel>
              <VStack spacing={6} align="stretch">
                <HStack justify="space-between">
                  <Box>
                    <Heading size="md" mb={2}>Latest Reviews</Heading>
                    <Text color="gray.600">Verified traveler experiences and insights</Text>
                  </Box>
                  <Select maxW="200px" defaultValue="recent">
                    <option value="recent">Most Recent</option>
                    <option value="helpful">Most Helpful</option>
                    <option value="rating">Highest Rated</option>
                  </Select>
                </HStack>

                <VStack spacing={4} align="stretch">
                  {mockReviews.map((review) => (
                    <Card key={review.id} p={6}>
                      <VStack align="start" spacing={3}>
                        {/* Header */}
                        <HStack justify="space-between" w="full">
                          <HStack spacing={3}>
                            <Avatar size="md" name={review.author} />
                            <Box flex={1}>
                              <HStack justify="space-between" w="full">
                                <HStack spacing={2}>
                                  <Text fontWeight="bold">{review.author}</Text>
                                  {review.verified && (
                                    <Badge colorScheme="green" fontSize="xs">✓ Verified</Badge>
                                  )}
                                  {review.badge && (
                                    <Badge colorScheme="secondary" fontSize="xs">{review.badge}</Badge>
                                  )}
                                </HStack>
                              </HStack>
                              <Text fontSize="xs" color="gray.500">{review.date}</Text>
                            </Box>
                          </HStack>

                          {/* Rating */}
                          <HStack spacing={1}>
                            {[...Array(5)].map((_, i) => (
                              <Icon
                                key={i}
                                as={FaStar}
                                color={i < review.rating ? 'accent.500' : 'gray.300'}
                                w={4}
                                h={4}
                              />
                            ))}
                          </HStack>
                        </HStack>

                        {/* Content */}
                        <Box>
                          <Heading size="sm" mb={2}>{review.title}</Heading>
                          <Text fontSize="sm" color="gray.700" mb={2}>{review.content}</Text>
                          <HStack spacing={2}>
                            <Badge variant="outline" fontSize="xs">
                              {review.location}
                            </Badge>
                          </HStack>
                        </Box>

                        {/* Footer */}
                        <HStack spacing={6} pt={3} borderTop="1px" borderColor="gray.200" w="full" fontSize="sm">
                          <HStack spacing={1} color="gray.600">
                            <Icon as={FaHeart} />
                            <Text>{review.helpful} helpful</Text>
                          </HStack>
                          <HStack spacing={1} color="gray.600">
                            <Icon as={FaComment} />
                            <Text>{review.comments} comments</Text>
                          </HStack>
                          <Flex ml="auto">
                            <Button size="sm" variant="ghost" leftIcon={<FaShare />}>
                              Share
                            </Button>
                          </Flex>
                        </HStack>
                      </VStack>
                    </Card>
                  ))}
                </VStack>
              </VStack>
            </TabPanel>

            {/* Photos Tab */}
            <TabPanel>
              <VStack spacing={6} align="stretch">
                <HStack justify="space-between">
                  <Box>
                    <Heading size="md" mb={2}>Community Photos</Heading>
                    <Text color="gray.600">Inspiring travel moments from our community</Text>
                  </Box>
                  <Button colorScheme="secondary" leftIcon={<FaImage />}>
                    Upload Photo
                  </Button>
                </HStack>

                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                  {mockPhotos.map((photo) => (
                    <Card key={photo.id} overflow="hidden" _hover={{ transform: 'translateY(-4px)' }}>
                      <Box
                        h="250px"
                        bg="gray.100"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        fontSize="6xl"
                        position="relative"
                      >
                        {photo.image}
                        {photo.badge && (
                          <Badge
                            position="absolute"
                            top={3}
                            right={3}
                            colorScheme="secondary"
                            fontSize="xs"
                          >
                            {photo.badge}
                          </Badge>
                        )}
                      </Box>
                      <Box p={4}>
                        <Heading size="sm" mb={1}>{photo.title}</Heading>
                        <HStack fontSize="xs" color="gray.600" mb={3}>
                          <Text>{photo.location}</Text>
                          <Text>•</Text>
                          <Text>{photo.date}</Text>
                        </HStack>
                        <HStack justify="space-between">
                          <HStack spacing={1}>
                            <Avatar size="xs" name={photo.author} />
                            <Text fontSize="xs" fontWeight="semibold">{photo.author}</Text>
                          </HStack>
                          <HStack spacing={1} color="red.500">
                            <Icon as={FaHeart} w={4} h={4} />
                            <Text fontSize="xs">{photo.likes}</Text>
                          </HStack>
                        </HStack>
                      </Box>
                    </Card>
                  ))}
                </SimpleGrid>
              </VStack>
            </TabPanel>

            {/* Top Contributors Tab */}
            <TabPanel>
              <VStack spacing={6} align="stretch">
                <Box>
                  <Heading size="md" mb={2}>Top Community Contributors</Heading>
                  <Text color="gray.600">Recognizing our most active and helpful community members</Text>
                </Box>

                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                  {topContributors.map((contributor, idx) => (
                    <Card key={idx} p={6} textAlign="center">
                      <Avatar size="xl" name={contributor.name} mx="auto" mb={4} />
                      <VStack spacing={2} align="stretch">
                        <Box>
                          <Heading size="sm">{contributor.name}</Heading>
                          <Badge colorScheme="secondary" fontSize="xs" mt={2}>
                            {contributor.level}
                          </Badge>
                        </Box>

                        <SimpleGrid columns={3} spacing={2} fontSize="xs">
                          <Box>
                            <Text fontWeight="bold" fontSize="lg">{contributor.reviews}</Text>
                            <Text color="gray.600">Reviews</Text>
                          </Box>
                          <Box>
                            <Text fontWeight="bold" fontSize="lg">{contributor.photos}</Text>
                            <Text color="gray.600">Photos</Text>
                          </Box>
                          <Box>
                            <Text fontWeight="bold" fontSize="lg">{contributor.followers}</Text>
                            <Text color="gray.600">Followers</Text>
                          </Box>
                        </SimpleGrid>

                        <VStack spacing={1} align="stretch">
                          <Text fontWeight="bold" color="primary.600">
                            {contributor.points.toLocaleString()} Points
                          </Text>
                          <Flex wrap="wrap" gap={1} justify="center">
                            {contributor.badges.map((badge) => (
                              <Badge key={badge} colorScheme="primary" fontSize="xs">
                                {badge}
                              </Badge>
                            ))}
                          </Flex>
                        </VStack>

                        <Button colorScheme="secondary" size="sm" w="full">
                          View Profile
                        </Button>
                      </VStack>
                    </Card>
                  ))}
                </SimpleGrid>
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>

      {/* Write Review Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Write a Review</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4} align="stretch">
              <Box>
                <Text fontWeight="semibold" mb={2}>Title</Text>
                <Input
                  placeholder="What was great (or not)?"
                  value={newReview.title}
                  onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                />
              </Box>

              <Box>
                <Text fontWeight="semibold" mb={2}>Rating</Text>
                <Select value={newReview.rating} onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}>
                  <option value={5}>⭐⭐⭐⭐�� Excellent</option>
                  <option value={4}>⭐⭐⭐⭐ Very Good</option>
                  <option value={3}>⭐⭐⭐ Good</option>
                  <option value={2}>⭐⭐ Fair</option>
                  <option value={1}>⭐ Poor</option>
                </Select>
              </Box>

              <Box>
                <Text fontWeight="semibold" mb={2}>Your Review</Text>
                <Textarea
                  placeholder="Share your experience with other travelers..."
                  value={newReview.content}
                  onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
                  rows={6}
                />
              </Box>

              <HStack spacing={3}>
                <Button colorScheme="primary" flex={1} onClick={onClose}>
                  Post Review
                </Button>
                <Button variant="outline" flex={1} onClick={onClose}>
                  Cancel
                </Button>
              </HStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  )
}
