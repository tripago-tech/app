'use client'
import { HStack, Icon, Text } from '@chakra-ui/react'
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'

interface RatingProps {
  rating: number
  maxRating?: number
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
  isReadOnly?: boolean
  onChange?: (rating: number) => void
}

export const Rating = ({
  rating,
  maxRating = 5,
  size = 'md',
  showText = false,
  isReadOnly = true,
  onChange,
}: RatingProps) => {
  const sizeMap = {
    sm: 4,
    md: 5,
    lg: 6,
  }

  const iconSize = sizeMap[size]

  const renderStar = (index: number) => {
    const starValue = index + 1
    const isFullStar = rating >= starValue
    const isHalfStar = rating >= starValue - 0.5 && rating < starValue

    let StarIcon = FaRegStar
    if (isFullStar) StarIcon = FaStar
    else if (isHalfStar) StarIcon = FaStarHalfAlt

    return (
      <Icon
        key={index}
        as={StarIcon}
        w={iconSize}
        h={iconSize}
        color="yellow.400"
        cursor={!isReadOnly ? 'pointer' : 'default'}
        onClick={() => !isReadOnly && onChange?.(starValue)}
        _hover={!isReadOnly ? { transform: 'scale(1.1)' } : {}}
        transition="transform 0.2s"
      />
    )
  }

  return (
    <HStack spacing={1}>
      {Array.from({ length: maxRating }, (_, index) => renderStar(index))}
      {showText && (
        <Text fontSize={size} color="gray.600" _dark={{ color: 'gray.400' }}>
          {rating.toFixed(1)}
        </Text>
      )}
    </HStack>
  )
}
