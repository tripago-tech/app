'use client'
import { Button as ChakraButton, ButtonProps } from '@chakra-ui/react'
import { forwardRef } from 'react'

interface CustomButtonProps extends ButtonProps {
  animate?: boolean
}

export const Button = forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ animate = true, children, ...props }, ref) => {
    return (
      <ChakraButton
        ref={ref}
        _hover={animate ? { transform: 'translateY(-2px)', boxShadow: 'lg' } : {}}
        _active={animate ? { transform: 'translateY(0)' } : {}}
        transition="all 0.2s"
        {...props}
      >
        {children}
      </ChakraButton>
    )
  }
)

Button.displayName = 'Button'
