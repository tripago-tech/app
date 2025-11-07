'use client'
import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  ModalProps,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'

const MotionModalContent = motion(ModalContent)

interface CustomModalProps extends Omit<ModalProps, 'children'> {
  title?: string
  footer?: React.ReactNode
  children: React.ReactNode
}

export const Modal = ({ title, footer, children, ...props }: CustomModalProps) => {
  return (
    <ChakraModal {...props}>
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
      <MotionModalContent
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {title && <ModalHeader>{title}</ModalHeader>}
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
        {footer && <ModalFooter>{footer}</ModalFooter>}
      </MotionModalContent>
    </ChakraModal>
  )
}
