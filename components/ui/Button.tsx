'use client'
import { Button as ChakraButton, ButtonProps } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { forwardRef } from 'react'

const MotionButton = motion(ChakraButton)

interface CustomButtonProps extends ButtonProps {
  animate?: boolean
}

export const Button = forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ animate = true, children, ...props }, ref) => {
    if (animate) {
      return (
        <MotionButton
          ref={ref}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          {...props}
        >
          {children}
        </MotionButton>
      )
    }

    return (
      <ChakraButton ref={ref} {...props}>
        {children}
      </ChakraButton>
    )
  }
)
