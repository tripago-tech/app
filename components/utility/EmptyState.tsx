'use client'
import { VStack, Text, Icon, Box } from '@chakra-ui/react'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { Button } from '@/components/ui/Button'

interface EmptyStateProps {
  icon?: React.ElementType
  title: string
  description?: string
  actionLabel?: string
  onAction?: () => void
}

export const EmptyState = ({
  icon = FaMapMarkerAlt,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) => {
  return (
    <Box textAlign="center" py={16}>
      <VStack spacing={4}>
        <Icon
          as={icon}
          w={16}
          h={16}
          color="gray.400"
          _dark={{ color: 'gray.600' }}
        />
        <Text fontSize="xl" fontWeight="semibold" color="gray.700" _dark={{ color: 'gray.300' }}>
          {title}
        </Text>
        {description && (
          <Text color="gray.500" _dark={{ color: 'gray.500' }} maxW="md">
            {description}
          </Text>
        )}
        {actionLabel && onAction && (
          <Button colorScheme="brand" onClick={onAction} mt={4}>
            {actionLabel}
          </Button>
        )}
      </VStack>
    </Box>
  )
}
