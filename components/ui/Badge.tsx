'use client'
import { Badge as ChakraBadge, BadgeProps } from '@chakra-ui/react'
import { motion } from 'framer-motion'

const MotionBadge = motion(ChakraBadge)

interface CustomBadgeProps extends BadgeProps {
  animate?: boolean
}

export const Badge = ({ animate = false, children, ...props }: CustomBadgeProps) => {
  const badgeProps = {
    px: 3,
    py: 1,
    borderRadius: 'full',
    fontSize: 'sm',
    fontWeight: 'medium',
    ...props,
  }

  if (animate) {
    return (
      <MotionBadge
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
        {...badgeProps}
      >
        {children}
      </MotionBadge>
    )
  }

  return <ChakraBadge {...badgeProps}>{children}</ChakraBadge>
}
