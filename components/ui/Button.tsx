'use client'
import { Button as ChakraButton, ButtonProps } from '@chakra-ui/react'
import { motion } from 'framer-motion'

const MotionButton = motion(ChakraButton)

interface CustomButtonProps extends ButtonProps {
  animate?: boolean
}

export const Button = ({ animate = true, children, ...props }: CustomButtonProps) => {
  if (animate) {
    return (
      <MotionButton
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        {...props}
      >
        {children}
      </MotionButton>
    )
  }

  return <ChakraButton {...props}>{children}</ChakraButton>
}
