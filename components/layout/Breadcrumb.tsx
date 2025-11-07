'use client'
import {
  Breadcrumb as ChakraBreadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from '@chakra-ui/react'
import Link from 'next/link'
import { FaChevronRight } from 'react-icons/fa'

interface BreadcrumbItem {
  label: string
  href?: string
  isCurrentPage?: boolean
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <ChakraBreadcrumb separator={<FaChevronRight size={12} />} spacing={2}>
      {items.map((item, index) => (
        <BreadcrumbItem key={index} isCurrentPage={item.isCurrentPage}>
          {item.href && !item.isCurrentPage ? (
            <BreadcrumbLink as={Link} href={item.href}>
              {item.label}
            </BreadcrumbLink>
          ) : (
            <BreadcrumbLink>{item.label}</BreadcrumbLink>
          )}
        </BreadcrumbItem>
      ))}
    </ChakraBreadcrumb>
  )
}
