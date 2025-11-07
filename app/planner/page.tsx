'use client'
import {
  Container,
  VStack,
  HStack,
  Box,
  Heading,
  Text,
  SimpleGrid,
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
  Badge,
  Flex,
  Card as ChakraCard,
  CardBody,
  CardHeader,
  Divider,
} from '@chakra-ui/react'
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaDollarSign,
  FaUsers,
  FaPlane,
  FaHotel,
  FaUtensils,
  FaCamera,
  FaArrowRight,
  FaCheck,
  FaTrash,
  FaPlus,
  FaClock,
} from 'react-icons/fa'
import { useState } from 'react'
import { Card } from '@/components/ui/Card'

interface TripItem {
  id: string
  type: 'flight' | 'hotel' | 'activity' | 'restaurant'
  title: string
  date: string
  time?: string
  location?: string
  cost?: number
  notes?: string
}

interface TripPlan {
  destination: string
  startDate: string
  endDate: string
  travelers: number
  budget: number
  items: TripItem[]
}

export default function PlannerPage() {
  const [tripPlan, setTripPlan] = useState<TripPlan>({
    destination: 'Bangkok',
    startDate: '2024-03-15',
    endDate: '2024-03-22',
    travelers: 2,
    budget: 2000,
    items: [
      {
        id: '1',
        type: 'flight',
        title: 'Flight to Bangkok',
        date: '2024-03-15',
        time: '14:00',
        cost: 400,
        notes: 'Thai Airways International'
      },
      {
        id: '2',
        type: 'hotel',
        title: 'Mandarin Oriental Bangkok',
        date: '2024-03-15',
        location: 'Bangkok',
        cost: 189,
        notes: 'Deluxe Room with river view'
      },
    ]
  })

  const [newItem, setNewItem] = useState<Partial<TripItem>>({
    type: 'activity',
    date: tripPlan.startDate,
  })

  const addItem = () => {
    if (newItem.title) {
      setTripPlan({
        ...tripPlan,
        items: [
          ...tripPlan.items,
          {
            id: Date.now().toString(),
            type: (newItem.type || 'activity') as TripItem['type'],
            title: newItem.title,
            date: newItem.date || tripPlan.startDate,
            time: newItem.time,
            location: newItem.location,
            cost: newItem.cost,
            notes: newItem.notes,
          }
        ]
      })
      setNewItem({ type: 'activity', date: tripPlan.startDate })
    }
  }

  const removeItem = (id: string) => {
    setTripPlan({
      ...tripPlan,
      items: tripPlan.items.filter(item => item.id !== id)
    })
  }

  const totalSpent = tripPlan.items.reduce((sum, item) => sum + (item.cost || 0), 0)
  const remainingBudget = tripPlan.budget - totalSpent

  const itemsByDate = tripPlan.items.reduce((acc, item) => {
    if (!acc[item.date]) {
      acc[item.date] = []
    }
    acc[item.date].push(item)
    return acc
  }, {} as Record<string, TripItem[]>)

  const getItemIcon = (type: string) => {
    switch (type) {
      case 'flight':
        return FaPlane
      case 'hotel':
        return FaHotel
      case 'restaurant':
        return FaUtensils
      case 'activity':
        return FaCamera
      default:
        return FaMapMarkerAlt
    }
  }

  const getItemColor = (type: string) => {
    switch (type) {
      case 'flight':
        return 'blue'
      case 'hotel':
        return 'purple'
      case 'restaurant':
        return 'orange'
      case 'activity':
        return 'green'
      default:
        return 'gray'
    }
  }

  return (
    <Container maxW="7xl" py={8}>
      <VStack spacing={8} align="stretch">
        {/* Header */}
        <VStack spacing={2} align="start">
          <Heading size="2xl">✈️ Trip Planner</Heading>
          <Text color="gray.600">Plan your perfect trip with detailed itinerary and budget tracking</Text>
        </VStack>

        <Tabs>
          <TabList>
            <Tab>Trip Overview</Tab>
            <Tab>Itinerary</Tab>
            <Tab>Budget</Tab>
            <Tab>Checklist</Tab>
          </TabList>

          <TabPanels>
            {/* Trip Overview Tab */}
            <TabPanel>
              <VStack spacing={6} align="stretch">
                {/* Trip Details */}
                <Card p={6}>
                  <Heading size="md" mb={6}>Trip Details</Heading>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                    <Box>
                      <Text fontWeight="semibold" mb={2} fontSize="sm" color="gray.600">
                        Destination
                      </Text>
                      <Input
                        value={tripPlan.destination}
                        onChange={(e) => setTripPlan({ ...tripPlan, destination: e.target.value })}
                        placeholder="Where are you going?"
                      />
                    </Box>

                    <Box>
                      <Text fontWeight="semibold" mb={2} fontSize="sm" color="gray.600">
                        Number of Travelers
                      </Text>
                      <Select
                        value={tripPlan.travelers}
                        onChange={(e) => setTripPlan({ ...tripPlan, travelers: parseInt(e.target.value) })}
                      >
                        <option value={1}>1 Person</option>
                        <option value={2}>2 People</option>
                        <option value={3}>3 People</option>
                        <option value={4}>4+ People</option>
                      </Select>
                    </Box>

                    <Box>
                      <Text fontWeight="semibold" mb={2} fontSize="sm" color="gray.600">
                        Start Date
                      </Text>
                      <Input
                        type="date"
                        value={tripPlan.startDate}
                        onChange={(e) => setTripPlan({ ...tripPlan, startDate: e.target.value })}
                      />
                    </Box>

                    <Box>
                      <Text fontWeight="semibold" mb={2} fontSize="sm" color="gray.600">
                        End Date
                      </Text>
                      <Input
                        type="date"
                        value={tripPlan.endDate}
                        onChange={(e) => setTripPlan({ ...tripPlan, endDate: e.target.value })}
                      />
                    </Box>

                    <Box colSpan={{ base: 1, md: 2 }}>
                      <Text fontWeight="semibold" mb={2} fontSize="sm" color="gray.600">
                        Total Budget
                      </Text>
                      <Input
                        type="number"
                        value={tripPlan.budget}
                        onChange={(e) => setTripPlan({ ...tripPlan, budget: parseInt(e.target.value) })}
                        placeholder="Your total budget"
                      />
                    </Box>
                  </SimpleGrid>
                </Card>

                {/* Quick Stats */}
                <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
                  <ChakraCard>
                    <CardBody>
                      <VStack spacing={2} align="start">
                        <HStack>
                          <Icon as={FaCalendarAlt} color="blue.500" />
                          <Text fontSize="sm" color="gray.600">Duration</Text>
                        </HStack>
                        <Text fontWeight="bold" fontSize="2xl">
                          {Math.ceil((new Date(tripPlan.endDate).getTime() - new Date(tripPlan.startDate).getTime()) / (1000 * 60 * 60 * 24))} days
                        </Text>
                      </VStack>
                    </CardBody>
                  </ChakraCard>

                  <ChakraCard>
                    <CardBody>
                      <VStack spacing={2} align="start">
                        <HStack>
                          <Icon as={FaUsers} color="purple.500" />
                          <Text fontSize="sm" color="gray.600">Travelers</Text>
                        </HStack>
                        <Text fontWeight="bold" fontSize="2xl">
                          {tripPlan.travelers}
                        </Text>
                      </VStack>
                    </CardBody>
                  </ChakraCard>

                  <ChakraCard>
                    <CardBody>
                      <VStack spacing={2} align="start">
                        <HStack>
                          <Icon as={FaDollarSign} color="green.500" />
                          <Text fontSize="sm" color="gray.600">Budget</Text>
                        </HStack>
                        <Text fontWeight="bold" fontSize="2xl">
                          ${tripPlan.budget}
                        </Text>
                      </VStack>
                    </CardBody>
                  </ChakraCard>

                  <ChakraCard>
                    <CardBody>
                      <VStack spacing={2} align="start">
                        <HStack>
                          <Icon as={FaCheck} color="orange.500" />
                          <Text fontSize="sm" color="gray.600">Items Planned</Text>
                        </HStack>
                        <Text fontWeight="bold" fontSize="2xl">
                          {tripPlan.items.length}
                        </Text>
                      </VStack>
                    </CardBody>
                  </ChakraCard>
                </SimpleGrid>
              </VStack>
            </TabPanel>

            {/* Itinerary Tab */}
            <TabPanel>
              <VStack spacing={6} align="stretch">
                {/* Add New Item */}
                <Card p={6} bg="gray.50" _dark={{ bg: 'gray.900' }}>
                  <Heading size="sm" mb={4}>Add Item to Itinerary</Heading>
                  <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} mb={4}>
                    <Box>
                      <Text fontSize="sm" fontWeight="semibold" mb={2} color="gray.600">Type</Text>
                      <Select
                        value={newItem.type || 'activity'}
                        onChange={(e) => setNewItem({ ...newItem, type: e.target.value as TripItem['type'] })}
                      >
                        <option value="flight">Flight</option>
                        <option value="hotel">Hotel</option>
                        <option value="activity">Activity</option>
                        <option value="restaurant">Restaurant</option>
                      </Select>
                    </Box>

                    <Box>
                      <Text fontSize="sm" fontWeight="semibold" mb={2} color="gray.600">Date</Text>
                      <Input
                        type="date"
                        value={newItem.date || tripPlan.startDate}
                        onChange={(e) => setNewItem({ ...newItem, date: e.target.value })}
                      />
                    </Box>

                    <Box>
                      <Text fontSize="sm" fontWeight="semibold" mb={2} color="gray.600">Time</Text>
                      <Input
                        type="time"
                        value={newItem.time || '09:00'}
                        onChange={(e) => setNewItem({ ...newItem, time: e.target.value })}
                      />
                    </Box>
                  </SimpleGrid>

                  <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} mb={4}>
                    <Box>
                      <Text fontSize="sm" fontWeight="semibold" mb={2} color="gray.600">Title</Text>
                      <Input
                        placeholder="Item name"
                        value={newItem.title || ''}
                        onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                      />
                    </Box>

                    <Box>
                      <Text fontSize="sm" fontWeight="semibold" mb={2} color="gray.600">Location</Text>
                      <Input
                        placeholder="Location"
                        value={newItem.location || ''}
                        onChange={(e) => setNewItem({ ...newItem, location: e.target.value })}
                      />
                    </Box>

                    <Box>
                      <Text fontSize="sm" fontWeight="semibold" mb={2} color="gray.600">Cost</Text>
                      <Input
                        type="number"
                        placeholder="0"
                        value={newItem.cost || ''}
                        onChange={(e) => setNewItem({ ...newItem, cost: parseInt(e.target.value) })}
                      />
                    </Box>
                  </SimpleGrid>

                  <Box mb={4}>
                    <Text fontSize="sm" fontWeight="semibold" mb={2} color="gray.600">Notes</Text>
                    <Textarea
                      placeholder="Additional notes"
                      value={newItem.notes || ''}
                      onChange={(e) => setNewItem({ ...newItem, notes: e.target.value })}
                    />
                  </Box>

                  <Button colorScheme="primary" leftIcon={<FaPlus />} onClick={addItem}>
                    Add to Itinerary
                  </Button>
                </Card>

                {/* Itinerary Timeline */}
                <Box>
                  <Heading size="sm" mb={6}>Daily Itinerary</Heading>
                  <VStack spacing={8} align="stretch">
                    {Object.entries(itemsByDate).sort().map(([date, items]) => (
                      <Box key={date}>
                        <HStack mb={4} pb={4} borderBottom="2px" borderColor="primary.200">
                          <Icon as={FaCalendarAlt} color="primary.500" />
                          <Text fontWeight="bold" fontSize="lg">
                            {new Date(date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                          </Text>
                          <Badge colorScheme="primary">{items.length} items</Badge>
                        </HStack>

                        <VStack spacing={3} align="stretch" ml={6}>
                          {items.sort((a, b) => (a.time || '').localeCompare(b.time || '')).map((item) => (
                            <Card key={item.id} p={4} bg="white">
                              <Flex justify="space-between" align="start">
                                <HStack spacing={4} flex={1} align="start">
                                  <Icon
                                    as={getItemIcon(item.type)}
                                    color={`${getItemColor(item.type)}.500`}
                                    mt={1}
                                    w={5}
                                    h={5}
                                  />
                                  <VStack align="start" spacing={1} flex={1}>
                                    <HStack>
                                      <Text fontWeight="bold">{item.title}</Text>
                                      <Badge colorScheme={getItemColor(item.type)} fontSize="xs">
                                        {item.type}
                                      </Badge>
                                    </HStack>
                                    {item.time && (
                                      <HStack fontSize="sm" color="gray.600">
                                        <Icon as={FaClock} w={3} h={3} />
                                        <Text>{item.time}</Text>
                                      </HStack>
                                    )}
                                    {item.location && (
                                      <HStack fontSize="sm" color="gray.600">
                                        <Icon as={FaMapMarkerAlt} w={3} h={3} />
                                        <Text>{item.location}</Text>
                                      </HStack>
                                    )}
                                    {item.notes && (
                                      <Text fontSize="sm" color="gray.600">{item.notes}</Text>
                                    )}
                                    {item.cost && (
                                      <Text fontSize="sm" fontWeight="bold" color="primary.600">
                                        ${item.cost}
                                      </Text>
                                    )}
                                  </VStack>
                                </HStack>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  colorScheme="red"
                                  leftIcon={<FaTrash />}
                                  onClick={() => removeItem(item.id)}
                                >
                                  Delete
                                </Button>
                              </Flex>
                            </Card>
                          ))}
                        </VStack>
                      </Box>
                    ))}
                  </VStack>
                </Box>
              </VStack>
            </TabPanel>

            {/* Budget Tab */}
            <TabPanel>
              <VStack spacing={6} align="stretch">
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
                  <ChakraCard borderLeftWidth="4px" borderLeftColor="blue.500">
                    <CardBody>
                      <Text fontSize="sm" color="gray.600" mb={2}>Total Budget</Text>
                      <Text fontSize="3xl" fontWeight="bold">${tripPlan.budget}</Text>
                    </CardBody>
                  </ChakraCard>

                  <ChakraCard borderLeftWidth="4px" borderLeftColor="orange.500">
                    <CardBody>
                      <Text fontSize="sm" color="gray.600" mb={2}>Amount Spent</Text>
                      <Text fontSize="3xl" fontWeight="bold">${totalSpent}</Text>
                    </CardBody>
                  </ChakraCard>

                  <ChakraCard borderLeftWidth="4px" borderLeftColor={remainingBudget >= 0 ? 'green.500' : 'red.500'}>
                    <CardBody>
                      <Text fontSize="sm" color="gray.600" mb={2}>Remaining Budget</Text>
                      <Text fontSize="3xl" fontWeight="bold" color={remainingBudget >= 0 ? 'green.600' : 'red.600'}>
                        ${remainingBudget}
                      </Text>
                    </CardBody>
                  </ChakraCard>
                </SimpleGrid>

                {/* Breakdown */}
                <Card p={6}>
                  <Heading size="sm" mb={4}>Expense Breakdown</Heading>
                  <VStack spacing={3} align="stretch">
                    {['flight', 'hotel', 'activity', 'restaurant'].map((type) => {
                      const typeItems = tripPlan.items.filter(item => item.type === type)
                      const typeTotal = typeItems.reduce((sum, item) => sum + (item.cost || 0), 0)
                      const percentage = tripPlan.budget > 0 ? (typeTotal / tripPlan.budget) * 100 : 0

                      return (
                        <Box key={type}>
                          <HStack justify="space-between" mb={2}>
                            <HStack>
                              <Icon as={getItemIcon(type)} color={`${getItemColor(type)}.500`} />
                              <Text fontWeight="semibold" textTransform="capitalize">
                                {type}
                              </Text>
                              <Badge colorScheme={getItemColor(type)} fontSize="xs">
                                {typeItems.length}
                              </Badge>
                            </HStack>
                            <Text fontWeight="bold">${typeTotal} ({percentage.toFixed(1)}%)</Text>
                          </HStack>
                          <Box w="full" h="8px" bg="gray.200" borderRadius="full" overflow="hidden">
                            <Box
                              h="full"
                              w={`${percentage}%`}
                              bg={`${getItemColor(type)}.500`}
                            />
                          </Box>
                        </Box>
                      )
                    })}
                  </VStack>
                </Card>
              </VStack>
            </TabPanel>

            {/* Checklist Tab */}
            <TabPanel>
              <VStack spacing={4} align="stretch">
                <Card p={6} bg="blue.50" _dark={{ bg: 'blue.900' }}>
                  <VStack align="start" spacing={3}>
                    <Heading size="sm">Pre-Trip Checklist</Heading>
                    {[
                      'Passport and travel documents',
                      'Check visa requirements',
                      'Travel insurance',
                      'Book flights',
                      'Reserve hotels',
                      'Arrange ground transportation',
                      'Exchange currency',
                      'Notify bank',
                      'Pack luggage',
                      'Check weather forecast',
                    ].map((item, idx) => (
                      <HStack key={idx} spacing={3}>
                        <Icon as={FaCheck} color="green.500" />
                        <Text>{item}</Text>
                      </HStack>
                    ))}
                  </VStack>
                </Card>
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>

        {/* Action Buttons */}
        <HStack spacing={4} justify="center" pt={8}>
          <Button colorScheme="primary" size="lg" leftIcon={<FaArrowRight />}>
            Save Trip Plan
          </Button>
          <Button variant="outline" size="lg">
            Share Plan
          </Button>
          <Button variant="outline" size="lg">
            Export PDF
          </Button>
        </HStack>
      </VStack>
    </Container>
  )
}
