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
  Icon as ChakraIcon,
  Link as ChakraLink,
} from '@chakra-ui/react'
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

  return (
    <Box
      bg="white"
      borderBottom="1px solid"
      borderColor="#E0E0E0"
      position="sticky"
      top={0}
      zIndex={1000}
      boxShadow="0 1px 3px rgba(0, 0, 0, 0.05)"
    >
      <Container maxW="100%" px={0}>
        {/* Top Navigation Bar */}
        <Flex h="60px" alignItems="center" justifyContent="space-between" px={{ base: 4, md: 8 }}>
          {/* Logo */}
          <Link href="/">
            <HStack spacing={2} cursor="pointer">
              <Text fontSize="24px">🌍</Text>
              <Text fontSize="18px" fontWeight="800" color="#34E0A1">
                TripScope
              </Text>
            </HStack>
          </Link>

          {/* Desktop Navigation - Hidden on mobile */}
          <HStack spacing={8} display={{ base: 'none', lg: 'flex' }} flex={1} justify="center" mx={8}>
            <ChakraLink as={Link} href="/hotels" _hover={{ color: '#34E0A1' }} fontSize="14px" fontWeight="500" color="#1C1C1C">
              {t('navigation.hotels')}
            </ChakraLink>
            <ChakraLink as={Link} href="/attractions" _hover={{ color: '#34E0A1' }} fontSize="14px" fontWeight="500" color="#1C1C1C">
              {t('navigation.attractions')}
            </ChakraLink>
            <ChakraLink as={Link} href="/restaurants" _hover={{ color: '#34E0A1' }} fontSize="14px" fontWeight="500" color="#1C1C1C">
              {t('navigation.restaurants')}
            </ChakraLink>
            <ChakraLink as={Link} href="/destinations" _hover={{ color: '#34E0A1' }} fontSize="14px" fontWeight="500" color="#1C1C1C">
              {t('navigation.destinations')}
            </ChakraLink>
            <ChakraLink as={Link} href="/community" _hover={{ color: '#34E0A1' }} fontSize="14px" fontWeight="500" color="#1C1C1C">
              {t('navigation.community')}
            </ChakraLink>
          </HStack>

          {/* Right side items */}
          <HStack spacing={4}>
            <LanguageSelector />

            <IconButton
              aria-label="Toggle color mode"
              icon={<ChakraIcon as={colorMode === 'light' ? iconMap.moon : iconMap.sun} />}
              onClick={toggleColorMode}
              variant="ghost"
              size="sm"
              color="#1C1C1C"
              _hover={{ bg: '#F7F7F7' }}
            />

            {isAuthenticated ? (
              <Menu>
                <MenuButton as={Avatar} size="sm" name="User" cursor="pointer" />
                <MenuList>
                  <MenuItem icon={<ChakraIcon as={iconMap.user} />} as={Link} href="/profile">
                    {t('common.profile')}
                  </MenuItem>
                  <MenuItem icon={<ChakraIcon as={iconMap.route} />} as={Link} href="/profile/trips">
                    {t('navigation.myTrips')}
                  </MenuItem>
                  <MenuItem icon={<ChakraIcon as={iconMap.star} />} as={Link} href="/profile/reviews">
                    {t('navigation.reviews')}
                  </MenuItem>
                  <MenuItem icon={<ChakraIcon as={iconMap.trophy} />} as={Link} href="/profile/rewards">
                    Rewards
                  </MenuItem>
                  <MenuItem icon={<ChakraIcon as={iconMap.logout} />}>
                    {t('common.logout')}
                  </MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <HStack spacing={2} display={{ base: 'none', md: 'flex' }}>
                <Button variant="ghost" size="sm" as={Link} href="/auth/login" color="#1C1C1C" fontSize="14px">
                  {t('common.login')}
                </Button>
                <Button bg="#34E0A1" color="white" size="sm" as={Link} href="/auth/register" fontSize="14px" _hover={{ bg: '#2CB98F' }}>
                  {t('common.signup')}
                </Button>
              </HStack>
            )}

            {/* Mobile menu button */}
            <IconButton
              display={{ base: 'flex', lg: 'none' }}
              onClick={onToggle}
              icon={<ChakraIcon as={isOpen ? iconMap.close : iconMap.menu} />}
              variant="ghost"
              aria-label="Toggle Navigation"
              color="#1C1C1C"
              _hover={{ bg: '#F7F7F7' }}
            />
          </HStack>
        </Flex>

        {/* Mobile Navigation */}
        <Collapse in={isOpen} animateOpacity>
          <Box pb={4} display={{ lg: 'none' }} bg="white" borderTop="1px solid #E0E0E0">
            <VStack spacing={0} align="stretch">
              <Box px={4} py={3}>
                <ChakraLink as={Link} href="/hotels" display="block" fontSize="14px" fontWeight="500" color="#1C1C1C" py={2} _hover={{ color: '#34E0A1' }}>
                  {t('navigation.hotels')}
                </ChakraLink>
              </Box>
              <Box px={4} py={3} borderTop="1px solid #E0E0E0">
                <ChakraLink as={Link} href="/attractions" display="block" fontSize="14px" fontWeight="500" color="#1C1C1C" py={2} _hover={{ color: '#34E0A1' }}>
                  {t('navigation.attractions')}
                </ChakraLink>
              </Box>
              <Box px={4} py={3} borderTop="1px solid #E0E0E0">
                <ChakraLink as={Link} href="/restaurants" display="block" fontSize="14px" fontWeight="500" color="#1C1C1C" py={2} _hover={{ color: '#34E0A1' }}>
                  {t('navigation.restaurants')}
                </ChakraLink>
              </Box>
              <Box px={4} py={3} borderTop="1px solid #E0E0E0">
                <ChakraLink as={Link} href="/destinations" display="block" fontSize="14px" fontWeight="500" color="#1C1C1C" py={2} _hover={{ color: '#34E0A1' }}>
                  {t('navigation.destinations')}
                </ChakraLink>
              </Box>
              <Box px={4} py={3} borderTop="1px solid #E0E0E0">
                <ChakraLink as={Link} href="/community" display="block" fontSize="14px" fontWeight="500" color="#1C1C1C" py={2} _hover={{ color: '#34E0A1' }}>
                  {t('navigation.community')}
                </ChakraLink>
              </Box>

              {!isAuthenticated && (
                <VStack spacing={2} p={4} borderTop="1px solid #E0E0E0">
                  <Button variant="ghost" size="sm" w="full" as={Link} href="/auth/login" color="#1C1C1C">
                    {t('common.login')}
                  </Button>
                  <Button bg="#34E0A1" color="white" size="sm" w="full" as={Link} href="/auth/register" _hover={{ bg: '#2CB98F' }}>
                    {t('common.signup')}
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
