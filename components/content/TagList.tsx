'use client'
import { HStack, Wrap, WrapItem } from '@chakra-ui/react'
import { Badge } from '@/components/ui/Badge'

interface TagListProps {
  tags: string[]
  colorScheme?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'solid' | 'subtle' | 'outline'
  onTagClick?: (tag: string) => void
}

export const TagList = ({
  tags,
  colorScheme = 'blue',
  size = 'md',
  variant = 'subtle',
  onTagClick,
}: TagListProps) => {
  return (
    <Wrap spacing={2}>
      {tags.map((tag, index) => (
        <WrapItem key={index}>
          <Badge
            colorScheme={colorScheme}
            size={size}
            variant={variant}
            cursor={onTagClick ? 'pointer' : 'default'}
            onClick={() => onTagClick?.(tag)}
            animate={!!onTagClick}
          >
            {tag}
          </Badge>
        </WrapItem>
      ))}
    </Wrap>
  )
}
