'use client'
import {
  Container,
  VStack,
  HStack,
  Box,
  Heading,
  Text,
  SimpleGrid,
  Badge,
  Button,
  Icon,
  Input,
  Select,
  Flex,
  InputGroup,
  InputLeftElement,
  Avatar,
} from '@chakra-ui/react'
import {
  FaSearch,
  FaCalendar,
  FaClock,
  FaUser,
  FaTag,
  FaArrowRight,
  FaFire,
  FaComments,
} from 'react-icons/fa'
import Link from 'next/link'
import { useState } from 'react'
import { Card } from '@/components/ui/Card'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  category: string
  author: string
  authorAvatar: string
  date: string
  readTime: number
  image: string
  tags: string[]
  featured: boolean
  views: number
  comments: number
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: '7 Essential Tips for First-Time Bangkok Travelers',
    excerpt: 'Learn the insider secrets to make your Bangkok experience unforgettable. From navigating the BTS to finding the best street food.',
    content: 'Bangkok is a vibrant, chaotic, and incredibly rewarding destination...',
    category: 'Travel Guide',
    author: 'Sarah M.',
    authorAvatar: 'SM',
    date: '2024-01-22',
    readTime: 8,
    image: '🏙️',
    tags: ['Bangkok', 'Tips', 'Thailand', 'First-Time'],
    featured: true,
    views: 2847,
    comments: 34
  },
  {
    id: '2',
    title: 'Budget Travel in Southeast Asia: Complete Guide',
    excerpt: 'Master the art of traveling on a shoestring budget without sacrificing experiences. Detailed breakdown of costs and money-saving hacks.',
    content: 'Southeast Asia is one of the most budget-friendly regions in the world...',
    category: 'Budget Travel',
    author: 'Mike C.',
    authorAvatar: 'MC',
    date: '2024-01-20',
    readTime: 12,
    image: '💰',
    tags: ['Budget', 'Southeast Asia', 'Money-Saving', 'Travel Hacks'],
    featured: true,
    views: 3421,
    comments: 56
  },
  {
    id: '3',
    title: 'The Ultimate Thai Food Guide: 20 Must-Try Dishes',
    excerpt: 'Discover the authentic flavors of Thailand. A comprehensive guide to the dishes you absolutely must try during your visit.',
    content: 'Thai cuisine is one of the most beloved in the world...',
    category: 'Food & Culture',
    author: 'Emma W.',
    authorAvatar: 'EW',
    date: '2024-01-18',
    readTime: 10,
    image: '🍜',
    tags: ['Food', 'Thailand', 'Culture', 'Dining'],
    featured: false,
    views: 2156,
    comments: 42
  },
  {
    id: '4',
    title: 'Island Hopping in Phuket: Best Routes & Tips',
    excerpt: 'Plan the perfect island-hopping adventure. Discover hidden gems and popular destinations around Phuket with practical tips.',
    content: 'The islands surrounding Phuket offer some of the most spectacular views...',
    category: 'Adventure',
    author: 'David L.',
    authorAvatar: 'DL',
    date: '2024-01-16',
    readTime: 9,
    image: '🏝️',
    tags: ['Islands', 'Adventure', 'Phuket', 'Snorkeling'],
    featured: false,
    views: 1987,
    comments: 28
  },
  {
    id: '5',
    title: 'Temple Etiquette: How to Respectfully Visit Thai Temples',
    excerpt: 'Learn the rules and customs for visiting Thailand\'s beautiful temples. A guide to being a respectful traveler.',
    content: 'Thai temples are sacred places with rich cultural significance...',
    category: 'Culture',
    author: 'Alex T.',
    authorAvatar: 'AT',
    date: '2024-01-14',
    readTime: 6,
    image: '⛩️',
    tags: ['Culture', 'Temples', 'Etiquette', 'Respect'],
    featured: false,
    views: 1645,
    comments: 19
  },
  {
    id: '6',
    title: 'Best Time to Visit Thailand: Monthly Weather & Events',
    excerpt: 'Understand Thailand\'s climate patterns and plan your trip for the perfect weather. Includes major festivals and events.',
    content: 'Thailand has three main seasons, each with its own advantages...',
    category: 'Planning',
    author: 'Lisa P.',
    authorAvatar: 'LP',
    date: '2024-01-12',
    readTime: 7,
    image: '📅',
    tags: ['Weather', 'Planning', 'Seasons', 'Events'],
    featured: true,
    views: 2234,
    comments: 31
  },
  {
    id: '7',
    title: 'Photography Tips: Capturing the Beauty of Thailand',
    excerpt: 'Learn professional photography techniques to capture stunning travel photos. Includes gear recommendations and location tips.',
    content: 'Thailand is a photographer\'s paradise with incredible diversity...',
    category: 'Photography',
    author: 'James K.',
    authorAvatar: 'JK',
    date: '2024-01-10',
    readTime: 11,
    image: '📸',
    tags: ['Photography', 'Tips', 'Gear', 'Composition'],
    featured: false,
    views: 1534,
    comments: 22
  },
  {
    id: '8',
    title: 'Sustainable Travel: Eco-Friendly Tips for Thailand',
    excerpt: 'Travel responsibly and minimize your environmental impact. A guide to sustainable tourism practices in Thailand.',
    content: 'As travelers, we have a responsibility to protect the places we visit...',
    category: 'Sustainability',
    author: 'Maya P.',
    authorAvatar: 'MP',
    date: '2024-01-08',
    readTime: 8,
    image: '🌱',
    tags: ['Eco-Friendly', 'Sustainability', 'Conservation', 'Responsibility'],
    featured: false,
    views: 987,
    comments: 15
  },
]

const categories = ['All', 'Travel Guide', 'Budget Travel', 'Food & Culture', 'Adventure', 'Photography', 'Planning', 'Sustainability']

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredPosts = blogPosts.filter(post => {
    const matchCategory = selectedCategory === 'All' || post.category === selectedCategory
    const matchSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchCategory && matchSearch
  })

  const featuredPosts = blogPosts.filter(post => post.featured)

  return (
    <Container maxW="7xl" py={8}>
      <VStack spacing={12} align="stretch">
        {/* Hero Section */}
        <VStack spacing={4} textAlign="center" py={8}>
          <Heading size="2xl">✈️ Travel Blog & Tips</Heading>
          <Text color="gray.600" maxW="2xl" fontSize="lg">
            Expert travel guides, insider tips, and inspiring stories from the road. Everything you need to plan your perfect adventure.
          </Text>
        </VStack>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <VStack spacing={6} align="stretch">
            <Heading size="lg">Featured Articles</Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
              {featuredPosts.slice(0, 3).map(post => (
                <Link key={post.id} href={`/blog/${post.id}`}>
                  <Card
                    overflow="hidden"
                    _hover={{ transform: 'translateY(-4px)', boxShadow: 'lg' }}
                    cursor="pointer"
                    h="full"
                    display="flex"
                    flexDirection="column"
                  >
                    {/* Image */}
                    <Box
                      h="200px"
                      bg="gray.100"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      fontSize="5xl"
                      position="relative"
                    >
                      {post.image}
                      <Badge
                        position="absolute"
                        top={3}
                        right={3}
                        colorScheme="secondary"
                        fontSize="xs"
                        leftIcon={<FaFire />}
                      >
                        Featured
                      </Badge>
                    </Box>

                    {/* Content */}
                    <Box p={6} flex={1} display="flex" flexDirection="column">
                      <Badge colorScheme="primary" mb={3} w="fit-content">
                        {post.category}
                      </Badge>

                      <Heading size="sm" mb={3} flex={1}>
                        {post.title}
                      </Heading>

                      <Text fontSize="sm" color="gray.600" mb={4} noOfLines={2}>
                        {post.excerpt}
                      </Text>

                      {/* Meta */}
                      <VStack align="start" spacing={3} borderTop="1px" borderColor="gray.200" pt={4}>
                        <HStack fontSize="xs" color="gray.600" spacing={4}>
                          <HStack>
                            <Icon as={FaCalendar} w={3} h={3} />
                            <Text>{new Date(post.date).toLocaleDateString()}</Text>
                          </HStack>
                          <HStack>
                            <Icon as={FaClock} w={3} h={3} />
                            <Text>{post.readTime} min read</Text>
                          </HStack>
                        </HStack>
                        <HStack justify="space-between" w="full" fontSize="xs" color="gray.500">
                          <HStack>
                            <Icon as={FaComments} />
                            <Text>{post.comments}</Text>
                          </HStack>
                          <Text>{post.views.toLocaleString()} views</Text>
                        </HStack>
                      </VStack>
                    </Box>
                  </Card>
                </Link>
              ))}
            </SimpleGrid>
          </VStack>
        )}

        {/* Search and Filter */}
        <VStack spacing={4} align="stretch">
          <InputGroup>
            <InputLeftElement>
              <Icon as={FaSearch} color="gray.400" />
            </InputLeftElement>
            <Input
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              border="1px"
              borderColor="gray.300"
            />
          </InputGroup>

          <HStack spacing={2} flexWrap="wrap">
            {categories.map(category => (
              <Button
                key={category}
                size="sm"
                variant={selectedCategory === category ? 'solid' : 'outline'}
                colorScheme={selectedCategory === category ? 'primary' : 'gray'}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </HStack>
        </VStack>

        {/* All Articles */}
        <VStack spacing={6} align="stretch">
          <HStack justify="space-between">
            <Box>
              <Heading size="lg" mb={2}>Latest Articles</Heading>
              <Text color="gray.600">Found {filteredPosts.length} articles</Text>
            </Box>
            <Select maxW="150px" defaultValue="latest">
              <option value="latest">Latest First</option>
              <option value="popular">Most Popular</option>
              <option value="readtime">Shortest Read</option>
            </Select>
          </HStack>

          <VStack spacing={4} align="stretch">
            {filteredPosts.map(post => (
              <Link key={post.id} href={`/blog/${post.id}`}>
                <Card
                  p={6}
                  display="flex"
                  _hover={{ bg: 'gray.50', boxShadow: 'md' }}
                  cursor="pointer"
                >
                  <Flex gap={6} align="start" w="full">
                    {/* Thumbnail */}
                    <Box
                      minW="120px"
                      h="120px"
                      bg="gray.100"
                      borderRadius="lg"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      fontSize="3xl"
                      flexShrink={0}
                    >
                      {post.image}
                    </Box>

                    {/* Content */}
                    <VStack align="start" spacing={2} flex={1} justify="space-between">
                      <VStack align="start" spacing={2}>
                        <HStack spacing={2}>
                          <Badge colorScheme="primary" fontSize="xs">
                            {post.category}
                          </Badge>
                          {post.featured && (
                            <Badge colorScheme="secondary" fontSize="xs" leftIcon={<FaFire />}>
                              Featured
                            </Badge>
                          )}
                        </HStack>

                        <Heading size="sm">{post.title}</Heading>
                        <Text fontSize="sm" color="gray.600" noOfLines={2}>
                          {post.excerpt}
                        </Text>
                      </VStack>

                      {/* Meta and Tags */}
                      <VStack align="start" spacing={2} w="full">
                        <Flex wrap="wrap" gap={2}>
                          {post.tags.slice(0, 3).map(tag => (
                            <Badge key={tag} size="sm" variant="subtle">
                              {tag}
                            </Badge>
                          ))}
                        </Flex>

                        <HStack fontSize="xs" color="gray.600" spacing={4} w="full" justify="space-between">
                          <HStack spacing={4}>
                            <HStack spacing={1}>
                              <Avatar size="xs" name={post.author} />
                              <Text>{post.author}</Text>
                            </HStack>
                            <HStack>
                              <Icon as={FaCalendar} w={3} h={3} />
                              <Text>{new Date(post.date).toLocaleDateString()}</Text>
                            </HStack>
                            <HStack>
                              <Icon as={FaClock} w={3} h={3} />
                              <Text>{post.readTime} min</Text>
                            </HStack>
                          </HStack>
                          <HStack spacing={3}>
                            <HStack spacing={1}>
                              <Icon as={FaComments} />
                              <Text>{post.comments}</Text>
                            </HStack>
                            <Text>{post.views.toLocaleString()} views</Text>
                          </HStack>
                        </HStack>
                      </VStack>
                    </VStack>

                    {/* Read More */}
                    <Icon as={FaArrowRight} mt={2} color="primary.500" />
                  </Flex>
                </Card>
              </Link>
            ))}
          </VStack>

          {filteredPosts.length === 0 && (
            <Box textAlign="center" py={12}>
              <Heading size="md" color="gray.600" mb={2}>No articles found</Heading>
              <Text color="gray.500">Try adjusting your search or filters</Text>
            </Box>
          )}
        </VStack>

        {/* Newsletter Section */}
        <Card p={8} bg="gradient-to-r from-primary.500 to-secondary.500" color="white">
          <VStack spacing={4} textAlign="center" maxW="500px" mx="auto">
            <Heading size="md">Stay Updated</Heading>
            <Text opacity={0.9}>
              Get the latest travel tips, guides, and inspiration delivered to your inbox every week.
            </Text>
            <HStack w="full" spacing={2}>
              <Input placeholder="Your email" bg="white" color="gray.900" />
              <Button colorScheme="whiteAlpha" px={8}>
                Subscribe
              </Button>
            </HStack>
          </VStack>
        </Card>
      </VStack>
    </Container>
  )
}
