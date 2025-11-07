'use client'
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  Button,
  Badge,
  Icon,
  Flex,
  Divider,
  Progress,
  Avatar,
  Grid,
  GridItem
} from '@chakra-ui/react'
import { 
  FaStar, 
  FaMapMarkerAlt, 
  FaWifi, 
  FaSwimmingPool, 
  FaCar, 
  FaUtensils,
  FaHeart,
  FaShare,
  FaCalendarAlt
} from 'react-icons/fa'
import { Card } from '@/components/ui/Card'

export default function HotelDetailPage() {
  return (
    <Box>
      {/* Hotel Header */}
      <Box bg="white" borderBottom="1px" borderColor="gray.200">
        <Container maxW="7xl" py={6}>
          <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={8}>
            <GridItem>
              <VStack align="start" spacing={4}>
                <HStack justify="space-between" w="full">
                  <VStack align="start" spacing={2}>
                    <Heading size="xl">Grand Palace Hotel Bangkok</Heading>
                    <HStack>
                      <Icon as={FaMapMarkerAlt} color="gray.500" />
                      <Text color="gray.600">Khao San Road, Bangkok, Thailand</Text>
                    </HStack>
                  </VStack>
                  <HStack>
                    <Button variant="outline" leftIcon={<FaShare />} size="sm">
                      Share
                    </Button>
                    <Button variant="outline" leftIcon={<FaHeart />} size="sm">
                      Save
                    </Button>
                  </HStack>
                </HStack>

                <HStack spacing={4}>
                  <HStack>
                    <Icon as={FaStar} color="accent.500" />
                    <Text fontWeight="bold" fontSize="lg">4.8</Text>
                    <Text color="gray.600">(1,247 reviews)</Text>
                  </HStack>
                  <Badge colorScheme="secondary" size="lg">Excellent</Badge>
                  <Badge colorScheme="primary">5-Star Hotel</Badge>
                </HStack>

                <HStack spacing={6}>
                  <HStack>
                    <Icon as={FaWifi} color="primary.500" />
                    <Text fontSize="sm">Free WiFi</Text>
                  </HStack>
                  <HStack>
                    <Icon as={FaSwimmingPool} color="primary.500" />
                    <Text fontSize="sm">Pool</Text>
                  </HStack>
                  <HStack>
                    <Icon as={FaCar} color="primary.500" />
                    <Text fontSize="sm">Parking</Text>
                  </HStack>
                  <HStack>
                    <Icon as={FaUtensils} color="primary.500" />
                    <Text fontSize="sm">Restaurant</Text>
                  </HStack>
                </HStack>
              </VStack>
            </GridItem>

            <GridItem>
              <Card p={6} bg="primary.50" border="2px" borderColor="primary.200">
                <VStack spacing={4}>
                  <HStack justify="space-between" w="full">
                    <VStack align="start" spacing={0}>
                      <Text fontSize="sm" color="gray.600">Starting from</Text>
                      <HStack>
                        <Text fontSize="2xl" fontWeight="bold" color="primary.600">$89</Text>
                        <Text color="gray.600">/night</Text>
                      </HStack>
                      <Text fontSize="xs" color="gray.500">Taxes and fees included</Text>
                    </VStack>
                    <Badge colorScheme="accent" fontSize="sm">20% OFF</Badge>
                  </HStack>
                  
                  <Button
                    colorScheme="primary"
                    size="lg"
                    w="full"
                    leftIcon={<FaCalendarAlt />}
                  >
                    Check Availability
                  </Button>
                  
                  <Text fontSize="xs" color="gray.600" textAlign="center">
                    Free cancellation • No prepayment needed
                  </Text>
                </VStack>
              </Card>
            </GridItem>
          </Grid>
        </Container>
      </Box>

      {/* Hotel Images */}
      <Container maxW="7xl" py={8}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4} h="400px">
          <Box bg="gray.200" borderRadius="lg" display="flex" alignItems="center" justifyContent="center">
            <Text fontSize="4xl">🏨</Text>
          </Box>
          <Box bg="gray.200" borderRadius="lg" display="flex" alignItems="center" justifyContent="center">
            <Text fontSize="4xl">🛏️</Text>
          </Box>
          <Box bg="gray.200" borderRadius="lg" display="flex" alignItems="center" justifyContent="center">
            <Text fontSize="4xl">🏊</Text>
          </Box>
          <Box bg="gray.200" borderRadius="lg" display="flex" alignItems="center" justifyContent="center">
            <Text fontSize="4xl">🍽️</Text>
          </Box>
        </SimpleGrid>
      </Container>

      {/* Hotel Details */}
      <Container maxW="7xl" pb={16}>
        <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={12}>
          <GridItem>
            <VStack spacing={8} align="stretch">
              {/* Description */}
              <Box>
                <Heading size="lg" mb={4}>About this hotel</Heading>
                <Text color="gray.700" lineHeight="tall">
                  Experience luxury in the heart of Bangkok at Grand Palace Hotel. Located just minutes 
                  from the famous Grand Palace and Wat Pho temple, our 5-star hotel offers world-class 
                  amenities and exceptional service. Enjoy spacious rooms with modern amenities, 
                  multiple dining options, and a rooftop pool with stunning city views.
                </Text>
              </Box>

              {/* Reviews Summary */}
              <Box>
                <Heading size="lg" mb={6}>Guest Reviews</Heading>
                <Card p={6}>
                  <VStack spacing={4}>
                    <HStack justify="space-between" w="full">
                      <VStack align="start" spacing={1}>
                        <HStack>
                          <Text fontSize="3xl" fontWeight="bold" color="primary.600">4.8</Text>
                          <VStack align="start" spacing={0}>
                            <HStack>
                              {[1,2,3,4,5].map(i => (
                                <Icon key={i} as={FaStar} color="accent.500" />
                              ))}
                            </HStack>
                            <Text fontSize="sm" color="gray.600">Based on 1,247 reviews</Text>
                          </VStack>
                        </HStack>
                      </VStack>
                      <Badge colorScheme="secondary" fontSize="md" p={2}>Excellent</Badge>
                    </HStack>

                    <VStack spacing={3} w="full">
                      {[
                        { category: 'Cleanliness', score: 4.9 },
                        { category: 'Location', score: 4.8 },
                        { category: 'Service', score: 4.7 },
                        { category: 'Value', score: 4.6 },
                      ].map((item, index) => (
                        <HStack key={index} w="full">
                          <Text fontSize="sm" minW="80px">{item.category}</Text>
                          <Progress value={item.score * 20} colorScheme="primary" flex={1} />
                          <Text fontSize="sm" fontWeight="bold" minW="30px">{item.score}</Text>
                        </HStack>
                      ))}
                    </VStack>
                  </VStack>
                </Card>
              </Box>

              {/* Recent Reviews */}
              <Box>
                <Heading size="md" mb={4}>Recent Reviews</Heading>
                <VStack spacing={4}>
                  {[
                    { name: 'Sarah Johnson', rating: 5, comment: 'Amazing location and excellent service!', date: '2 days ago' },
                    { name: 'Mike Chen', rating: 4, comment: 'Great hotel with beautiful rooms and friendly staff.', date: '1 week ago' },
                  ].map((review, index) => (
                    <Card key={index} p={4} w="full">
                      <HStack align="start" spacing={4}>
                        <Avatar size="md" name={review.name} />
                        <VStack align="start" spacing={2} flex={1}>
                          <HStack justify="space-between" w="full">
                            <Text fontWeight="bold">{review.name}</Text>
                            <Text fontSize="sm" color="gray.500">{review.date}</Text>
                          </HStack>
                          <HStack>
                            {[1,2,3,4,5].map(i => (
                              <Icon 
                                key={i} 
                                as={FaStar} 
                                color={i <= review.rating ? 'accent.500' : 'gray.300'} 
                                size="sm"
                              />
                            ))}
                          </HStack>
                          <Text color="gray.700">{review.comment}</Text>
                        </VStack>
                      </HStack>
                    </Card>
                  ))}
                </VStack>
              </Box>
            </VStack>
          </GridItem>

          <GridItem>
            <VStack spacing={6} position="sticky" top={6}>
              {/* Booking Widget */}
              <Card p={6} w="full">
                <VStack spacing={4}>
                  <Heading size="md" textAlign="center">Book Your Stay</Heading>
                  <Divider />
                  
                  <VStack spacing={3} w="full">
                    <HStack justify="space-between" w="full">
                      <Text>Check-in</Text>
                      <Button variant="outline" size="sm">Select Date</Button>
                    </HStack>
                    <HStack justify="space-between" w="full">
                      <Text>Check-out</Text>
                      <Button variant="outline" size="sm">Select Date</Button>
                    </HStack>
                    <HStack justify="space-between" w="full">
                      <Text>Guests</Text>
                      <Button variant="outline" size="sm">2 Adults</Button>
                    </HStack>
                  </VStack>

                  <Divider />

                  <VStack spacing={2} w="full">
                    <HStack justify="space-between" w="full">
                      <Text>Room rate (2 nights)</Text>
                      <Text>$178</Text>
                    </HStack>
                    <HStack justify="space-between" w="full">
                      <Text>Taxes & fees</Text>
                      <Text>$22</Text>
                    </HStack>
                    <Divider />
                    <HStack justify="space-between" w="full">
                      <Text fontWeight="bold">Total</Text>
                      <Text fontWeight="bold" color="primary.600">$200</Text>
                    </HStack>
                  </VStack>

                  <Button colorScheme="primary" size="lg" w="full">
                    Book Now
                  </Button>
                </VStack>
              </Card>

              {/* Price Comparison */}
              <Card p={6} w="full">
                <VStack spacing={4}>
                  <Heading size="md">Price Comparison</Heading>
                  <VStack spacing={3} w="full">
                    <HStack justify="space-between" w="full">
                      <Text fontWeight="bold" color="primary.600">TripScope.AI</Text>
                      <Text fontWeight="bold" color="primary.600">$89</Text>
                    </HStack>
                    <HStack justify="space-between" w="full">
                      <Text>Booking.com</Text>
                      <Text>$95</Text>
                    </HStack>
                    <HStack justify="space-between" w="full">
                      <Text>Agoda</Text>
                      <Text>$92</Text>
                    </HStack>
                    <HStack justify="space-between" w="full">
                      <Text>Expedia</Text>
                      <Text>$98</Text>
                    </HStack>
                  </VStack>
                  <Badge colorScheme="secondary" w="full" textAlign="center" p={2}>
                    Best Price Guaranteed
                  </Badge>
                </VStack>
              </Card>
            </VStack>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  )
}
