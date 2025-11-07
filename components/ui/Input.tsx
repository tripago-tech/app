'use client'
import {
  Input as ChakraInput,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  InputProps,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react'
import { forwardRef } from 'react'

interface CustomInputProps extends InputProps {
  label?: string
  error?: string
  leftIcon?: React.ReactElement
  rightIcon?: React.ReactElement
}

export const Input = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ label, error, leftIcon, rightIcon, ...props }, ref) => {
    return (
      <FormControl isInvalid={!!error}>
        {label && <FormLabel>{label}</FormLabel>}
        <InputGroup>
          {leftIcon && <InputLeftElement>{leftIcon}</InputLeftElement>}
          <ChakraInput
            ref={ref}
            focusBorderColor="brand.500"
            errorBorderColor="red.500"
            {...props}
          />
          {rightIcon && <InputRightElement>{rightIcon}</InputRightElement>}
        </InputGroup>
        {error && <FormErrorMessage>{error}</FormErrorMessage>}
      </FormControl>
    )
  }
)

Input.displayName = 'Input'
