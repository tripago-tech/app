'use client'
import {
  Box,
  Container,
  VStack,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Text,
} from '@chakra-ui/react'
import { useState } from 'react'
import { FaMapMarkerAlt, FaCalendar, FaUsers, FaSearch } from 'react-icons/fa'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

export const HotelSearchWidget = () => {
  const [searchData, setSearchData] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: 2,
    rooms: 1
  })

  const handleSearch = () => {
    // Navigate to hotels page with search parameters
    const params = new URLSearchParams({
      destination: searchData.destination,
      checkIn: searchData.checkIn,
      checkOut: searchData.checkOut,
      guests: searchData.guests.toString(),
      rooms: searchData.rooms.toString()
    })
    
    window.location.href = `/hotels?${params.toString()}`
  }

  return (
    <Box py={16} bg="gray.50" _dark={{ bg: "gray.900" }}>
      <Container maxW="6xl">
        <Card p={8} shadow="2xl" transform="translateY(-50px)" bg="white" _dark={{ bg: "gray.800" }}>
          <VStack spacing={6}>
            <VStack spacing={2} textAlign="center">
              <Text fontSize="2xl" fontWeight="bold" color="blue.600" _dark={{ color: "blue.300" }}>
                🔍 Find Your Perfect Hotel
              </Text>
              <Text color="gray.600" _dark={{ color: "gray.400" }}>
                Search and compare prices from Agoda, Booking.com, and more
              </Text>
            </VStack>

            <Box w="full">
              <VStack spacing={4}>
                {/* Desktop Layout */}
                <HStack spacing={4} w="full" display={{ base: "none", lg: "flex" }}>
                  <Box flex={2}>
                    <Text mb={2} fontSize="sm" fontWeight="medium" color="gray.700" _dark={{ color: "gray.300" }}>
                      Destination
                    </Text>
                    <InputGroup>
                      <InputLeftElement>
                        <FaMapMarkerAlt color="gray.400" />
                      </InputLeftElement>
                      <Input
                        placeholder="City, hotel name, or landmark"
                        value={searchData.destination}
                        onChange={(e) => setSearchData({...searchData, destination: e.target.value})}
                        size="lg"
                      />
                    </InputGroup>
                  </Box>

                  <Box flex={1}>
                    <Text mb={2} fontSize="sm" fontWeight="medium" color="gray.700" _dark={{ color: "gray.300" }}>
                      Check-in
                    </Text>
                    <InputGroup>
                      <InputLeftElement>
                        <FaCalendar color="gray.400" />
                      </InputLeftElement>
                      <Input
                        type="date"
                        value={searchData.checkIn}
                        onChange={(e) => setSearchData({...searchData, checkIn: e.target.value})}
                        size="lg"
                      />
                    </InputGroup>
                  </Box>

                  <Box flex={1}>
                    <Text mb={2} fontSize="sm" fontWeight="medium" color="gray.700" _dark={{ color: "gray.300" }}>
                      Check-out
                    </Text>
                    <InputGroup>
                      <InputLeftElement>
                        <FaCalendar color="gray.400" />
                      </InputLeftElement>
                      <Input
                        type="date"
                        value={searchData.checkOut}
                        onChange={(e) => setSearchData({...searchData, checkOut: e.target.value})}
                        size="lg"
                      />
                    </InputGroup>
                  </Box>

                  <Box flex={1}>
                    <Text mb={2} fontSize="sm" fontWeight="medium" color="gray.700" _dark={{ color: "gray.300" }}>
                      Guests & Rooms
                    </Text>
                    <HStack>
                      <Select
                        value={searchData.guests}
                        onChange={(e) => setSearchData({...searchData, guests: +e.target.value})}
                        size="lg"
                      >
                        <option value={1}>1 Guest</option>
                        <option value={2}>2 Guests</option>
                        <option value={3}>3 Guests</option>
                        <option value={4}>4+ Guests</option>
                      </Select>
                      <Select
                        value={searchData.rooms}
                        onChange={(e) => setSearchData({...searchData, rooms: +e.target.value})}
                        size="lg"
                      >
                        <option value={1}>1 Room</option>
                        <option value={2}>2 Rooms</option>
                        <option value={3}>3+ Rooms</option>
                      </Select>
                    </HStack>
                  </Box>

                  <Box>
                    <Text mb={2} fontSize="sm" opacity={0}>
                      Search
                    </Text>
                    <Button
                      colorScheme="blue"
                      size="lg"
                      leftIcon={<FaSearch />}
                      onClick={handleSearch}
                      px={8}
                    >
                      Search Hotels
                    </Button>
                  </Box>
                </HStack>

                {/* Mobile Layout */}
                <VStack spacing={4} w="full" display={{ base: "flex", lg: "none" }}>
                  <Box w="full">
                    <Text mb={2} fontSize="sm" fontWeight="medium">Destination</Text>
                    <InputGroup>
                      <InputLeftElement>
                        <FaMapMarkerAlt color="gray.400" />
                      </InputLeftElement>
                      <Input
                        placeholder="Where are you going?"
                        value={searchData.destination}
                        onChange={(e) => setSearchData({...searchData, destination: e.target.value})}
                      />
                    </InputGroup>
                  </Box>

                  <HStack w="full" spacing={4}>
                    <Box flex={1}>
                      <Text mb={2} fontSize="sm" fontWeight="medium">Check-in</Text>
                      <Input
                        type="date"
                        value={searchData.checkIn}
                        onChange={(e) => setSearchData({...searchData, checkIn: e.target.value})}
                      />
                    </Box>
                    <Box flex={1}>
                      <Text mb={2} fontSize="sm" fontWeight="medium">Check-out</Text>
                      <Input
                        type="date"
                        value={searchData.checkOut}
                        onChange={(e) => setSearchData({...searchData, checkOut: e.target.value})}
                      />
                    </Box>
                  </HStack>

                  <HStack w="full" spacing={4}>
                    <Box flex={1}>
                      <Text mb={2} fontSize="sm" fontWeight="medium">Guests</Text>
                      <Select
                        value={searchData.guests}
                        onChange={(e) => setSearchData({...searchData, guests: +e.target.value})}
                      >
                        <option value={1}>1 Guest</option>
                        <option value={2}>2 Guests</option>
                        <option value={3}>3 Guests</option>
                        <option value={4}>4+ Guests</option>
                      </Select>
                    </Box>
                    <Box flex={1}>
                      <Text mb={2} fontSize="sm" fontWeight="medium">Rooms</Text>
                      <Select
                        value={searchData.rooms}
                        onChange={(e) => setSearchData({...searchData, rooms: +e.target.value})}
                      >
                        <option value={1}>1 Room</option>
                        <option value={2}>2 Rooms</option>
                        <option value={3}>3+ Rooms</option>
                      </Select>
                    </Box>
                  </HStack>

                  <Button
                    colorScheme="blue"
                    size="lg"
                    leftIcon={<FaSearch />}
                    onClick={handleSearch}
                    w="full"
                  >
                    Search Hotels
                  </Button>
                </VStack>
              </VStack>
            </Box>

            {/* Quick Search Suggestions */}
            <Box w="full">
              <Text fontSize="sm" color="gray.600" _dark={{ color: "gray.400" }} mb={3}>
                Popular destinations:
              </Text>
              <HStack spacing={2} flexWrap="wrap">
                {['Bangkok', 'Phuket', 'Chiang Mai', 'Pattaya', 'Koh Samui', 'Krabi'].map((city) => (
                  <Button
                    key={city}
                    size="sm"
                    variant="outline"
                    onClick={() => setSearchData({...searchData, destination: city})}
                  >
                    {city}
                  </Button>
                ))}
              </HStack>
            </Box>
          </VStack>
        </Card>
      </Container>
    </Box>
  )
}
