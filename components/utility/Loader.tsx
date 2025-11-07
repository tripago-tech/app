'use client'
import { Center, Spinner, Text, VStack } from '@chakra-ui/react'

interface LoaderProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  text?: string
  fullScreen?: boolean
}

export const Loader = ({ size = 'lg', text, fullScreen = false }: LoaderProps) => {
  const content = (
    <VStack spacing={4}>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="brand.500"
        size={size}
      />
      {text && (
        <Text color="gray.600" _dark={{ color: 'gray.400' }}>
          {text}
        </Text>
      )}
    </VStack>
  )

  if (fullScreen) {
    return (
      <Center
        position="fixed"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg="white"
        _dark={{ bg: 'gray.900' }}
        zIndex={9999}
      >
        {content}
      </Center>
    )
  }

  return <Center py={8}>{content}</Center>
}
