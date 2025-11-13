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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Flex,
  Image as ChakraImage,
  Progress,
} from '@chakra-ui/react'
import { Card } from '@/components/ui/Card'
import {
  FaUser,
  FaEdit,
  FaHeart,
  FaMapMarkerAlt,
  FaCalendar,
  FaDollarSign,
  FaStar,
  FaComments,
  FaImage,
  FaTrophy,
  FaSignOutAlt,
  FaCheck,
  FaArrowRight,
} from 'react-icons/fa'
import Link from 'next/link'

interface SavedTrip {
  id: string
  title: string
  destination: string
  startDate: string
  endDate: string
  status: 'planning' | 'upcoming' | 'completed'
  progress: number
  days: number
  budget: number
  spent: number
  highlights: string[]
}

interface UserReview {
  id: string
  destination: string
  rating: number
  title: string
  date: string
  helpful: number
}

export default function ProfilePage() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  // Mock user data
  const user = {
    name: 'Sarah Mitchell',
    email: 'sarah.mitchell@email.com',
    joinDate: 'March 2022',
    level: 'Gold Member',
    points: 8450,
    followers: 1245,
    avatar: 'SM',
    bio: 'Travel enthusiast, food lover, and adventure seeker. Currently exploring Southeast Asia! 🌏',
  }

  const savedTrips: SavedTrip[] = [
    {
      id: '1',
      title: '7-Day Bangkok & Chiang Mai Adventure',
      destination: 'Bangkok → Chiang Mai',
      startDate: '2024-03-15',
      endDate: '2024-03-22',
      status: 'upcoming',
      progress: 0,
      days: 7,
      budget: 1200,
      spent: 350,
      highlights: ['Temples', 'Street Food', 'Culture', 'Markets']
    },
    {
      id: '2',
      title: '5-Day Phuket Beach Getaway',
      destination: 'Phuket',
      startDate: '2024-02-10',
      endDate: '2024-02-15',
      status: 'completed',
      progress: 100,
      days: 5,
      budget: 800,
      spent: 800,
      highlights: ['Beaches', 'Island Hopping', 'Sunset', 'Snorkeling']
    },
    {
      id: '3',
      title: '3-Day Krabi Rock Climbing',
      destination: 'Krabi',
      startDate: '2024-04-20',
      endDate: '2024-04-23',
      status: 'planning',
      progress: 45,
      days: 3,
      budget: 600,
      spent: 320,
      highlights: ['Adventure', 'Rock Climbing', 'Beaches', 'Nature']
    }
  ]

  const recentReviews: UserReview[] = [
    {
      id: '1',
      destination: 'Mandarin Oriental Bangkok',
      rating: 5,
      title: 'Absolutely Stunning Hotel!',
      date: '2024-01-20',
      helpful: 145,
    },
    {
      id: '2',
      destination: 'Chiang Mai',
      rating: 4,
      title: 'Amazing Cultural Experience',
      date: '2024-01-15',
      helpful: 98,
    },
    {
      id: '3',
      destination: 'Phuket Beaches',
      rating: 5,
      title: 'Paradise on Earth',
      date: '2024-01-10',
      helpful: 234,
    },
  ]

  const stats = [
    { icon: FaMapMarkerAlt, label: 'Trips Taken', value: '12', color: 'blue' },
    { icon: FaComments, label: 'Reviews Written', value: '47', color: 'purple' },
    { icon: FaImage, label: 'Photos Shared', value: '203', color: 'pink' },
    { icon: FaTrophy, label: 'Points Earned', value: '8,450', color: 'yellow' },
  ]

  const badges = ['Verified Traveler', 'Top Reviewer', 'Photo Master', 'Local Expert', 'Helpful Contributor']

  return (
    <Container maxW="7xl" py={8}>
      <VStack spacing={8} align="stretch">
        {/* Header - User Profile Card */}
        <Card p={8} bg="gradient-to-r from-primary.500 to-secondary.500">
          <Flex justify="space-between" align="start" color="white">
            <HStack spacing={6} align="start">
              <Avatar size="2xl" name={user.name} />
              <VStack align="start" spacing={2}>
                <HStack spacing={3}>
                  <Heading size="lg">{user.name}</Heading>
                  <Badge colorScheme="secondary" fontSize="sm" px={3} py={1}>
                    {user.level}
                  </Badge>
                </HStack>
                <Text opacity={0.9}>{user.email}</Text>
                <Text fontSize="sm" opacity={0.85}>
                  Joined {user.joinDate} • {user.followers.toLocaleString()} followers
                </Text>
              </VStack>
            </HStack>
            <HStack spacing={2}>
              <Button leftIcon={<FaEdit />} colorScheme="whiteAlpha">
                Edit Profile
              </Button>
              <Button leftIcon={<FaSignOutAlt />} variant="outline" _hover={{ bg: 'whiteAlpha.200' }}>
                Logout
              </Button>
            </HStack>
          </Flex>
        </Card>

        {/* Bio */}
        <Card p={6}>
          <Text color="gray.700">{user.bio}</Text>
        </Card>

        {/* Stats Grid */}
        <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
          {stats.map((stat, idx) => (
            <Card key={idx} p={6} textAlign="center">
              <Icon as={stat.icon} w={8} h={8} color={`${stat.color}.500`} mx="auto" mb={2} />
              <Text fontWeight="bold" fontSize="2xl">{stat.value}</Text>
              <Text fontSize="sm" color="gray.600">{stat.label}</Text>
            </Card>
          ))}
        </SimpleGrid>

        {/* Badges */}
        <Card p={6}>
          <Heading size="sm" mb={4}>Your Badges</Heading>
          <Flex wrap="wrap" gap={3}>
            {badges.map((badge) => (
              <Badge key={badge} colorScheme="secondary" px={3} py={1} fontSize="sm">
                {badge}
              </Badge>
            ))}
          </Flex>
        </Card>

        {/* Tabs */}
        <Tabs>
          <TabList>
            <Tab>My Trips</Tab>
            <Tab>My Reviews</Tab>
            <Tab>Saved Destinations</Tab>
            <Tab>Preferences</Tab>
          </TabList>

          <TabPanels>
            {/* My Trips Tab */}
            <TabPanel>
              <VStack spacing={6} align="stretch">
                <HStack justify="space-between">
                  <Box>
                    <Heading size="md" mb={2}>Your Saved Trips</Heading>
                    <Text color="gray.600">Manage your travel plans and itineraries</Text>
                  </Box>
                  <Button as={Link} href="/planner" colorScheme="primary" leftIcon={<FaArrowRight />}>
                    Create New Trip
                  </Button>
                </HStack>

                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                  {savedTrips.map((trip) => (
                    <Card key={trip.id} overflow="hidden">
                      <Box h="180px" bg="gray.100" display="flex" alignItems="center" justifyContent="center" fontSize="4xl">
                        {trip.status === 'completed' ? '✅' : trip.status === 'upcoming' ? '📅' : '📝'}
                      </Box>
                      <Box p={6}>
                        <VStack align="start" spacing={3}>
                          <HStack justify="space-between" w="full">
                            <Heading size="sm">{trip.title}</Heading>
                            <Badge
                              colorScheme={
                                trip.status === 'completed' ? 'green' :
                                trip.status === 'upcoming' ? 'blue' : 'orange'
                              }
                              textTransform="capitalize"
                            >
                              {trip.status}
                            </Badge>
                          </HStack>

                          <HStack fontSize="sm" color="gray.600" spacing={4}>
                            <HStack>
                              <Icon as={FaMapMarkerAlt} />
                              <Text>{trip.destination}</Text>
                            </HStack>
                            <HStack>
                              <Icon as={FaCalendar} />
                              <Text>{trip.days} days</Text>
                            </HStack>
                          </HStack>

                          {trip.status === 'planning' && (
                            <Box w="full">
                              <HStack justify="space-between" mb={1}>
                                <Text fontSize="xs" color="gray.600">Planning Progress</Text>
                                <Text fontSize="xs" fontWeight="bold">{trip.progress}%</Text>
                              </HStack>
                              <Progress value={trip.progress} colorScheme="purple" size="sm" />
                            </Box>
                          )}

                          <HStack fontSize="sm" color="gray.600">
                            <Icon as={FaDollarSign} />
                            <Text>${trip.spent} spent of ${trip.budget}</Text>
                          </HStack>

                          <Flex wrap="wrap" gap={2} w="full">
                            {trip.highlights.slice(0, 3).map((highlight) => (
                              <Badge key={highlight} size="sm" variant="subtle" colorScheme="primary">
                                {highlight}
                              </Badge>
                            ))}
                          </Flex>

                          <Button colorScheme="primary" w="full" size="sm">
                            {trip.status === 'completed' ? 'View Trip' : 'Continue Planning'}
                          </Button>
                        </VStack>
                      </Box>
                    </Card>
                  ))}
                </SimpleGrid>
              </VStack>
            </TabPanel>

            {/* My Reviews Tab */}
            <TabPanel>
              <VStack spacing={6} align="stretch">
                <Box>
                  <Heading size="md" mb={2}>Your Reviews</Heading>
                  <Text color="gray.600">Your contributions to the travel community</Text>
                </Box>

                <VStack spacing={4} align="stretch">
                  {recentReviews.map((review) => (
                    <Card key={review.id} p={6}>
                      <HStack justify="space-between" align="start" mb={3}>
                        <VStack align="start" spacing={1}>
                          <Heading size="sm">{review.destination}</Heading>
                          <Text fontSize="xs" color="gray.600">{review.date}</Text>
                        </VStack>
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
                      <Text fontWeight="semibold" mb={2}>{review.title}</Text>
                      <HStack fontSize="sm" color="gray.600">
                        <Icon as={FaHeart} />
                        <Text>{review.helpful} people found this helpful</Text>
                        <Flex ml="auto" gap={2}>
                          <Button size="xs" variant="ghost">Edit</Button>
                          <Button size="xs" variant="ghost" colorScheme="red">Delete</Button>
                        </Flex>
                      </HStack>
                    </Card>
                  ))}
                </VStack>

                <Button colorScheme="secondary" leftIcon={<FaArrowRight />} alignSelf="flex-start">
                  View All Reviews
                </Button>
              </VStack>
            </TabPanel>

            {/* Saved Destinations Tab */}
            <TabPanel>
              <VStack spacing={6} align="stretch">
                <Box>
                  <Heading size="md" mb={2}>Your Wishlist</Heading>
                  <Text color="gray.600">Destinations you want to visit</Text>
                </Box>

                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                  {[
                    { name: 'Bali, Indonesia', image: '🏝️', priority: 'high' },
                    { name: 'Tokyo, Japan', image: '🗾', priority: 'high' },
                    { name: 'Paris, France', image: '🗼', priority: 'medium' },
                    { name: 'Iceland', image: '🏔️', priority: 'medium' },
                  ].map((destination) => (
                    <Card key={destination.name} p={6} cursor="pointer" _hover={{ shadow: 'lg' }}>
                      <Box
                        h="150px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        fontSize="5xl"
                        mb={4}
                        bg="gray.50"
                        borderRadius="lg"
                      >
                        {destination.image}
                      </Box>
                      <Heading size="sm" mb={2}>{destination.name}</Heading>
                      <HStack justify="space-between">
                        <Badge
                          colorScheme={destination.priority === 'high' ? 'red' : 'orange'}
                          fontSize="xs"
                        >
                          {destination.priority.toUpperCase()} PRIORITY
                        </Badge>
                        <Button size="xs" variant="ghost" colorScheme="red">
                          Remove
                        </Button>
                      </HStack>
                    </Card>
                  ))}
                </SimpleGrid>
              </VStack>
            </TabPanel>

            {/* Preferences Tab */}
            <TabPanel>
              <VStack spacing={6} align="stretch" maxW="600px">
                <Card p={6}>
                  <VStack spacing={6} align="stretch">
                    <Box>
                      <Heading size="sm" mb={4}>Account Settings</Heading>
                      <VStack spacing={4} align="stretch">
                        <Box>
                          <Text fontWeight="semibold" mb={2}>Email Notifications</Text>
                          <Select defaultValue="all">
                            <option value="all">All updates</option>
                            <option value="important">Important only</option>
                            <option value="none">None</option>
                          </Select>
                        </Box>

                        <Box>
                          <Text fontWeight="semibold" mb={2}>Language</Text>
                          <Select defaultValue="en">
                            <option value="en">English</option>
                            <option value="es">Spanish</option>
                            <option value="fr">French</option>
                            <option value="th">Thai</option>
                          </Select>
                        </Box>

                        <Box>
                          <Text fontWeight="semibold" mb={2}>Travel Style</Text>
                          <Select defaultValue="balanced">
                            <option value="budget">Budget Traveler</option>
                            <option value="balanced">Balanced</option>
                            <option value="luxury">Luxury Experience</option>
                          </Select>
                        </Box>
                      </VStack>
                    </Box>

                    <Box borderTop="1px" borderColor="gray.200" pt={6}>
                      <Heading size="sm" mb={4}>Privacy</Heading>
                      <VStack spacing={3} align="stretch" fontSize="sm">
                        <HStack justify="space-between">
                          <Text>Make profile public</Text>
                          <Button size="xs" variant="ghost">Toggle</Button>
                        </HStack>
                        <HStack justify="space-between">
                          <Text>Show trip history</Text>
                          <Button size="xs" variant="ghost">Toggle</Button>
                        </HStack>
                        <HStack justify="space-between">
                          <Text>Allow reviews on my contributions</Text>
                          <Button size="xs" variant="ghost">Toggle</Button>
                        </HStack>
                      </VStack>
                    </Box>

                    <Box borderTop="1px" borderColor="gray.200" pt={6}>
                      <Heading size="sm" mb={4} color="red.600">Danger Zone</Heading>
                      <Button colorScheme="red" variant="outline" w="full">
                        Delete Account
                      </Button>
                    </Box>
                  </VStack>
                </Card>
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </Container>
  )
}
