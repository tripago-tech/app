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
  Progress,
} from '@chakra-ui/react'
import { FaEye, FaEyeSlash, FaGoogle, FaFacebook, FaApple, FaCheck } from 'react-icons/fa'
import Link from 'next/link'
import { useState } from 'react'
import { Card } from '@/components/ui/Card'

export default function RegisterPage() {
  const toast = useToast()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
    agreeNewsletter: false,
  })

  const passwordStrength = formData.password.length > 0 ? (
    formData.password.length >= 12 ? 3 :
    formData.password.length >= 8 ? 2 :
    1
  ) : 0

  const passwordStrengthColor = passwordStrength === 3 ? 'green' : passwordStrength === 2 ? 'yellow' : 'red'
  const passwordStrengthText = passwordStrength === 3 ? 'Strong' : passwordStrength === 2 ? 'Medium' : 'Weak'

  const handleRegister = async () => {
    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      toast({
        title: 'Please fill in all fields',
        status: 'warning',
        duration: 3000,
      })
      return
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: 'Passwords do not match',
        status: 'error',
        duration: 3000,
      })
      return
    }

    if (!formData.agreeTerms) {
      toast({
        title: 'Please agree to the Terms of Service',
        status: 'warning',
        duration: 3000,
      })
      return
    }

    setIsLoading(true)
    // Simulate registration
    setTimeout(() => {
      toast({
        title: 'Account created successfully!',
        description: 'Welcome to TripScope.AI',
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
            <Heading size="lg">Join TripScope.AI</Heading>
            <Text color="gray.600">Create your account and start planning amazing trips</Text>
          </VStack>
        </VStack>

        {/* Register Form */}
        <Card p={8}>
          <VStack spacing={6} align="stretch">
            {/* Full Name */}
            <Box>
              <Text fontWeight="semibold" mb={2}>Full Name</Text>
              <Input
                placeholder="John Doe"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                border="1px"
                borderColor="gray.300"
              />
            </Box>

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
              <Text fontWeight="semibold" mb={2}>Password</Text>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a strong password"
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

              {/* Password Strength */}
              {formData.password && (
                <VStack spacing={1} mt={2} align="start">
                  <HStack justify="space-between" w="full" fontSize="xs">
                    <Text color="gray.600">Password strength:</Text>
                    <Text fontWeight="bold" color={`${passwordStrengthColor}.600`}>
                      {passwordStrengthText}
                    </Text>
                  </HStack>
                  <Progress
                    value={passwordStrength * 33.33}
                    colorScheme={passwordStrengthColor}
                    size="sm"
                    w="full"
                  />
                </VStack>
              )}
            </Box>

            {/* Confirm Password */}
            <Box>
              <Text fontWeight="semibold" mb={2}>Confirm Password</Text>
              <InputGroup>
                <Input
                  type={showConfirm ? 'text' : 'password'}
                  placeholder="Re-enter your password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  border="1px"
                  borderColor={
                    formData.confirmPassword && formData.password !== formData.confirmPassword
                      ? 'red.300'
                      : 'gray.300'
                  }
                />
                <InputRightElement>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setShowConfirm(!showConfirm)}
                  >
                    <Icon as={showConfirm ? FaEyeSlash : FaEye} />
                  </Button>
                </InputRightElement>
              </InputGroup>
              {formData.confirmPassword && formData.password === formData.confirmPassword && (
                <HStack spacing={1} mt={1} fontSize="sm" color="green.600">
                  <Icon as={FaCheck} />
                  <Text>Passwords match</Text>
                </HStack>
              )}
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <Text fontSize="sm" color="red.600" mt={1}>
                  Passwords do not match
                </Text>
              )}
            </Box>

            {/* Checkboxes */}
            <VStack spacing={3} align="start">
              <Checkbox
                isChecked={formData.agreeTerms}
                onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                size="sm"
              >
                <Text fontSize="sm">
                  I agree to the{' '}
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
              </Checkbox>
              <Checkbox
                isChecked={formData.agreeNewsletter}
                onChange={(e) => setFormData({ ...formData, agreeNewsletter: e.target.checked })}
                size="sm"
              >
                <Text fontSize="sm">
                  Send me travel tips and updates (optional)
                </Text>
              </Checkbox>
            </VStack>

            {/* Register Button */}
            <Button
              colorScheme="primary"
              size="lg"
              onClick={handleRegister}
              isLoading={isLoading}
              loadingText="Creating account..."
            >
              Create Account
            </Button>

            {/* Divider */}
            <HStack my={4}>
              <Divider />
              <Text fontSize="sm" color="gray.600" whiteSpace="nowrap">
                Or sign up with
              </Text>
              <Divider />
            </HStack>

            {/* Social Registration */}
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

        {/* Sign In Link */}
        <HStack justify="center" spacing={1}>
          <Text color="gray.600">Already have an account?</Text>
          <Link href="/auth/login">
            <Text color="primary.600" fontWeight="semibold" _hover={{ underline: 'underline' }}>
              Sign in here
            </Text>
          </Link>
        </HStack>
      </VStack>
    </Container>
  )
}
