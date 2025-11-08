'use client'
import {
  Box,
  Flex,
  HStack,
  IconButton,
  useColorMode,
  Text,
  Container,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  useDisclosure,
  Collapse,
  Stack,
  VStack,
} from '@chakra-ui/react'
import { Icon as ChakraIcon } from '@chakra-ui/react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { LanguageSelector } from '@/components/ui/LanguageSelector'
import { useTranslation } from '@/hooks/useTranslation'
import { iconMap } from '@/utils/iconMap'

export const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const { isOpen, onToggle } = useDisclosure()
  const { t } = useTranslation()
  const isAuthenticated = false

  // Dynamic colors based on theme
  const bgColor = { base: 'white', _dark: 'gray.900' }
  const textColor = { base: 'gray.700', _dark: 'gray.200' }
  const borderColor = { base: 'gray.200', _dark: 'gray.700' }
  const hoverBg = { base: 'gray.50', _dark: 'gray.800' }
  const headingColor = { base: 'gray.900', _dark: 'white' }

  return (
    <Box
      bg="white"
      _dark={{ bg: 'gray.900' }}
      borderBottom="1px"
      borderColor="gray.200"
      _dark={{ borderColor: 'gray.700' }}
      position="sticky"
      top={0}
      zIndex={1000}
    >
      <Container maxW="7xl">
        <Flex h={16} alignItems="center" justifyContent="space-between">
          {/* Mobile menu button */}
          <IconButton
            display={{ base: 'flex', md: 'none' }}
            onClick={onToggle}
            icon={<ChakraIcon as={isOpen ? iconMap.close : iconMap.menu} />}
            variant="ghost"
            aria-label="Toggle Navigation"
          />

          {/* Logo */}
          <Link href="/">
            <HStack spacing={2}>
              <Text fontSize="2xl">🔍</Text>
              <Text fontSize="xl" fontWeight="bold" color="primary.600">
                TripScope.AI
              </Text>
            </HStack>
          </Link>

          {/* Desktop Navigation */}
          <HStack spacing={6} display={{ base: 'none', md: 'flex' }}>
            <Menu>
              <MenuButton as={Button} variant="ghost" size="sm" leftIcon={<ChakraIcon as={iconMap.destination} />} color={textColor}>
                {t('navigation.destinations')}
              </MenuButton>
              <MenuList zIndex={1001}>
                <MenuItem as={Link} href="/destinations">Browse All</MenuItem>
                <MenuItem as={Link} href="/destinations/regions">By Region</MenuItem>
                <MenuItem as={Link} href="/destinations/themes">By Theme</MenuItem>
                <MenuItem as={Link} href="/maps">Interactive Map</MenuItem>
              </MenuList>
            </Menu>

            <Menu>
              <MenuButton as={Button} variant="ghost" size="sm" leftIcon={<FaHotel />} color="gray.700">
                Hotels
              </MenuButton>
              <MenuList zIndex={1001}>
                <MenuItem as={Link} href="/hotels">Search Hotels</MenuItem>
                <MenuItem as={Link} href="/hotels/compare">Compare Prices</MenuItem>
                <MenuItem as={Link} href="/hotels/top-rated">Top Rated</MenuItem>
              </MenuList>
            </Menu>

            <Menu>
              <MenuButton as={Button} variant="ghost" size="sm" leftIcon={<FaUtensils />} color="gray.700">
                Restaurants
              </MenuButton>
              <MenuList zIndex={1001}>
                <MenuItem as={Link} href="/restaurants">Find Restaurants</MenuItem>
                <MenuItem as={Link} href="/restaurants/cuisine">By Cuisine</MenuItem>
                <MenuItem as={Link} href="/restaurants/nearby">Near Me</MenuItem>
              </MenuList>
            </Menu>

            <Menu>
              <MenuButton as={Button} variant="ghost" size="sm" leftIcon={<FaCamera />} color="gray.700">
                Attractions
              </MenuButton>
              <MenuList zIndex={1001}>
                <MenuItem as={Link} href="/attractions">Things to Do</MenuItem>
                <MenuItem as={Link} href="/attractions/tours">Tours & Tickets</MenuItem>
                <MenuItem as={Link} href="/attractions/culture">Museums & Culture</MenuItem>
              </MenuList>
            </Menu>

            <Menu>
              <MenuButton as={Button} variant="ghost" size="sm" leftIcon={<FaRoute />} color="gray.700">
                Plan Trip
              </MenuButton>
              <MenuList zIndex={1001}>
                <MenuItem as={Link} href="/planner">Trip Planner</MenuItem>
                <MenuItem as={Link} href="/generate">AI Generator</MenuItem>
                <MenuItem as={Link} href="/planner/trips">My Trips</MenuItem>
              </MenuList>
            </Menu>

            <Menu>
              <MenuButton as={Button} variant="ghost" size="sm" leftIcon={<FaUsers />} color="gray.700">
                Community
              </MenuButton>
              <MenuList zIndex={1001}>
                <MenuItem as={Link} href="/community/feed">Travel Feed</MenuItem>
                <MenuItem as={Link} href="/community/reviews">Reviews</MenuItem>
                <MenuItem as={Link} href="/community/photos">Photos</MenuItem>
                <MenuItem as={Link} href="/community/forums">Forums</MenuItem>
              </MenuList>
            </Menu>
          </HStack>

          {/* Right side items */}
          <HStack spacing={4}>
            <LanguageSelector />

            <IconButton
              aria-label="Toggle color mode"
              icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
              onClick={toggleColorMode}
              variant="ghost"
              size="sm"
            />

            {isAuthenticated ? (
              <Menu>
                <MenuButton>
                  <Avatar size="sm" name="User" />
                </MenuButton>
                <MenuList>
                  <MenuItem icon={<FaUser />} as={Link} href="/profile">
                    Profile
                  </MenuItem>
                  <MenuItem icon={<FaRoute />} as={Link} href="/profile/trips">
                    My Trips
                  </MenuItem>
                  <MenuItem icon={<FaStar />} as={Link} href="/profile/reviews">
                    My Reviews
                  </MenuItem>
                  <MenuItem icon={<FaUsers />} as={Link} href="/profile/rewards">
                    Rewards
                  </MenuItem>
                  <MenuItem icon={<FaSignOutAlt />}>
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <HStack spacing={2} display={{ base: 'none', sm: 'flex' }}>
                <Button variant="ghost" size="sm" as={Link} href="/auth/login">
                  Login
                </Button>
                <Button colorScheme="primary" size="sm" as={Link} href="/auth/register">
                  Sign Up
                </Button>
              </HStack>
            )}
          </HStack>
        </Flex>

        {/* Mobile Navigation */}
        <Collapse in={isOpen} animateOpacity>
          <Box pb={4} display={{ md: 'none' }}>
            <VStack spacing={4} align="stretch">
              <VStack align="stretch" spacing={2}>
                <Text fontWeight="bold" fontSize="sm" color="gray.600">Destinations</Text>
                <Stack spacing={1} pl={4}>
                  <Button variant="ghost" size="sm" justifyContent="flex-start" as={Link} href="/destinations">
                    Browse All
                  </Button>
                  <Button variant="ghost" size="sm" justifyContent="flex-start" as={Link} href="/destinations/regions">
                    By Region
                  </Button>
                  <Button variant="ghost" size="sm" justifyContent="flex-start" as={Link} href="/destinations/themes">
                    By Theme
                  </Button>
                </Stack>
              </VStack>

              <VStack align="stretch" spacing={2}>
                <Text fontWeight="bold" fontSize="sm" color="gray.600">Hotels</Text>
                <Stack spacing={1} pl={4}>
                  <Button variant="ghost" size="sm" justifyContent="flex-start" as={Link} href="/hotels">
                    Search Hotels
                  </Button>
                  <Button variant="ghost" size="sm" justifyContent="flex-start" as={Link} href="/hotels/compare">
                    Compare Prices
                  </Button>
                </Stack>
              </VStack>

              <VStack align="stretch" spacing={2}>
                <Text fontWeight="bold" fontSize="sm" color="gray.600">Community</Text>
                <Stack spacing={1} pl={4}>
                  <Button variant="ghost" size="sm" justifyContent="flex-start" as={Link} href="/community/reviews">
                    Reviews
                  </Button>
                  <Button variant="ghost" size="sm" justifyContent="flex-start" as={Link} href="/community/photos">
                    Photos
                  </Button>
                </Stack>
              </VStack>
              
              {!isAuthenticated && (
                <VStack spacing={2} pt={4}>
                  <Button variant="ghost" size="sm" w="full" as={Link} href="/auth/login">
                    Login
                  </Button>
                  <Button colorScheme="primary" size="sm" w="full" as={Link} href="/auth/register">
                    Sign Up
                  </Button>
                </VStack>
              )}
            </VStack>
          </Box>
        </Collapse>
      </Container>
    </Box>
  )
}
