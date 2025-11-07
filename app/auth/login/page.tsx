'use client'
import {
  Container,
  VStack,
  HStack,
  Box,
  Heading,
  Text,
  Input,
  Button,
  Checkbox,
  Divider,
  Icon,
  InputGroup,
  InputRightElement,
  useToast,
} from '@chakra-ui/react'
import { FaEye, FaEyeSlash, FaGoogle, FaFacebook, FaApple } from 'react-icons/fa'
import Link from 'next/link'
import { useState } from 'react'
import { Card } from '@/components/ui/Card'

export default function LoginPage() {
  const toast = useToast()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  })

  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      toast({
        title: 'Please fill in all fields',
        status: 'warning',
        duration: 3000,
      })
      return
    }

    setIsLoading(true)
    // Simulate login
    setTimeout(() => {
      toast({
        title: 'Login successful!',
        description: 'Welcome back to TripScope.AI',
        status: 'success',
        duration: 3000,
      })
      setIsLoading(false)
    }, 1000)
  }

  return (
    <Container maxW="md" py={20}>
      <VStack spacing={8} align="stretch">
        {/* Logo */}
        <VStack spacing={4} textAlign="center" mb={4}>
          <Text fontSize="3xl">🔍</Text>
          <VStack spacing={2}>
            <Heading size="lg">Welcome Back</Heading>
            <Text color="gray.600">Sign in to your TripScope.AI account</Text>
          </VStack>
        </VStack>

        {/* Login Form */}
        <Card p={8}>
          <VStack spacing={6} align="stretch">
            {/* Email */}
            <Box>
              <Text fontWeight="semibold" mb={2}>Email Address</Text>
              <Input
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                border="1px"
                borderColor="gray.300"
              />
            </Box>

            {/* Password */}
            <Box>
              <HStack justify="space-between" mb={2}>
                <Text fontWeight="semibold">Password</Text>
                <Link href="/auth/forgot-password">
                  <Text fontSize="sm" color="primary.600" _hover={{ underline: 'underline' }}>
                    Forgot password?
                  </Text>
                </Link>
              </HStack>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  border="1px"
                  borderColor="gray.300"
                />
                <InputRightElement>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <Icon as={showPassword ? FaEyeSlash : FaEye} />
                  </Button>
                </InputRightElement>
              </InputGroup>
            </Box>

            {/* Remember Me */}
            <Checkbox
              isChecked={formData.rememberMe}
              onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
            >
              Keep me signed in
            </Checkbox>

            {/* Login Button */}
            <Button
              colorScheme="primary"
              size="lg"
              onClick={handleLogin}
              isLoading={isLoading}
              loadingText="Signing in..."
            >
              Sign In
            </Button>

            {/* Divider */}
            <HStack my={4}>
              <Divider />
              <Text fontSize="sm" color="gray.600" whiteSpace="nowrap">
                Or continue with
              </Text>
              <Divider />
            </HStack>

            {/* Social Login */}
            <VStack spacing={3} align="stretch">
              <Button
                variant="outline"
                leftIcon={<FaGoogle />}
                borderColor="gray.300"
                _hover={{ bg: 'gray.50' }}
              >
                Google
              </Button>
              <Button
                variant="outline"
                leftIcon={<FaFacebook />}
                borderColor="gray.300"
                _hover={{ bg: 'gray.50' }}
              >
                Facebook
              </Button>
              <Button
                variant="outline"
                leftIcon={<FaApple />}
                borderColor="gray.300"
                _hover={{ bg: 'gray.50' }}
              >
                Apple
              </Button>
            </VStack>
          </VStack>
        </Card>

        {/* Sign Up Link */}
        <HStack justify="center" spacing={1}>
          <Text color="gray.600">Don't have an account?</Text>
          <Link href="/auth/register">
            <Text color="primary.600" fontWeight="semibold" _hover={{ underline: 'underline' }}>
              Sign up here
            </Text>
          </Link>
        </HStack>

        {/* Terms */}
        <Text fontSize="xs" color="gray.500" textAlign="center">
          By signing in, you agree to our{' '}
          <Link href="/terms">
            <Text as="span" color="primary.600" _hover={{ underline: 'underline' }}>
              Terms of Service
            </Text>
          </Link>{' '}
          and{' '}
          <Link href="/privacy">
            <Text as="span" color="primary.600" _hover={{ underline: 'underline' }}>
              Privacy Policy
            </Text>
          </Link>
        </Text>
      </VStack>
    </Container>
  )
}
