'use client'
import { Box, BoxProps } from '@chakra-ui/react'

interface CardProps extends BoxProps {
  animate?: boolean
}

export const Card = ({ animate = true, children, ...props }: CardProps) => {
  const cardProps = {
    bg: 'white',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    _hover: animate ? { boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)', transform: 'translateY(-4px)' } : {},
    ...props,
  }

  return <Box {...cardProps}>{children}</Box>
}
