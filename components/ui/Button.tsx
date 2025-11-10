'use client'
import { Box, ButtonProps, useMultiStyleConfig } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { forwardRef } from 'react'

const MotionBox = motion(Box)

interface CustomButtonProps extends ButtonProps {
  animate?: boolean
}

const BaseButton = forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ animate = true, children, ...props }, ref) => {
    const styles = useMultiStyleConfig('Button', props)

    const buttonProps = {
      as: 'button',
      ref,
      ...props,
      sx: styles,
    }

    if (animate) {
      return (
        <MotionBox
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          {...buttonProps}
        >
          {children}
        </MotionBox>
      )
    }

    return (
      <Box {...buttonProps}>
        {children}
      </Box>
    )
  }
)

BaseButton.displayName = 'Button'

export { BaseButton as Button }
