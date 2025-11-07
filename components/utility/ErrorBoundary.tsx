'use client'
import { Component, ErrorInfo, ReactNode } from 'react'
import { Box, Text, VStack, Icon } from '@chakra-ui/react'
import { FaExclamationTriangle } from 'react-icons/fa'
import { Button } from '@/components/ui/Button'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <Box textAlign="center" py={16}>
          <VStack spacing={4}>
            <Icon
              as={FaExclamationTriangle}
              w={16}
              h={16}
              color="red.400"
            />
            <Text fontSize="xl" fontWeight="semibold" color="gray.700" _dark={{ color: 'gray.300' }}>
              Something went wrong
            </Text>
            <Text color="gray.500" _dark={{ color: 'gray.500' }} maxW="md">
              We encountered an unexpected error. Please try refreshing the page.
            </Text>
            <Button
              colorScheme="red"
              onClick={() => window.location.reload()}
              mt={4}
            >
              Refresh Page
            </Button>
          </VStack>
        </Box>
      )
    }

    return this.props.children
  }
}
