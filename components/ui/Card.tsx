'use client'
import { Box, BoxProps } from '@chakra-ui/react'
import { motion } from 'framer-motion'

const MotionBox = motion(Box)

interface CardProps extends BoxProps {
  animate?: boolean
}

export const Card = ({ animate = true, children, ...props }: CardProps) => {
  const cardProps = {
    bg: 'white',
    _dark: { bg: 'gray.800' },
    borderRadius: 'xl',
    boxShadow: 'lg',
    overflow: 'hidden',
    ...props,
  }

  if (animate) {
    return (
      <MotionBox
        whileHover={{ y: -5, boxShadow: '2xl' }}
        transition={{ duration: 0.2 }}
        {...cardProps}
      >
        {children}
      </MotionBox>
    )
  }

  return <Box {...cardProps}>{children}</Box>
}
