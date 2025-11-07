'use client'
import { Box, Button, Icon, Text, VStack } from '@chakra-ui/react'
import { FaRobot, FaPlane } from 'react-icons/fa'
import { motion } from 'framer-motion'

const MotionBox = motion(Box)

export const FloatingAIButton = () => {
  return (
    <MotionBox
      position="fixed"
      bottom={6}
      right={6}
      zIndex={1000}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button
        size="lg"
        borderRadius="full"
        bg="secondary.500"
        color="white"
        _hover={{ bg: 'secondary.600', transform: 'translateY(-2px)' }}
        boxShadow="xl"
        p={6}
        h="auto"
        minW="auto"
      >
        <VStack spacing={1}>
          <Icon as={FaRobot} fontSize="xl" />
          <Text fontSize="xs" fontWeight="bold">
            Plan My Trip
          </Text>
        </VStack>
      </Button>
    </MotionBox>
  )
}
