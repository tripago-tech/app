import { NextSeoProps } from 'next-seo'
import { SEOProps } from '@/types'

const defaultSEO: NextSeoProps = {
  title: 'Travel App - Discover Amazing Places',
  description: 'Explore the world with our comprehensive travel guide. Find amazing places, plan your trips, and share your experiences.',
  canonical: process.env.NEXT_PUBLIC_SITE_URL,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'Travel App',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Travel App',
      },
    ],
  },
  twitter: {
    handle: '@travelapp',
    site: '@travelapp',
    cardType: 'summary_large_image',
  },
}

export const generateSEO = (props: SEOProps): NextSeoProps => {
  return {
    ...defaultSEO,
    title: `${props.title} | Travel App`,
    description: props.description,
    canonical: props.url ? `${process.env.NEXT_PUBLIC_SITE_URL}${props.url}` : defaultSEO.canonical,
    openGraph: {
      ...defaultSEO.openGraph,
      title: props.title,
      description: props.description,
      url: props.url ? `${process.env.NEXT_PUBLIC_SITE_URL}${props.url}` : defaultSEO.openGraph?.url,
      type: props.type as any || 'website',
      images: props.image ? [
        {
          url: props.image,
          width: 1200,
          height: 630,
          alt: props.title,
        },
      ] : defaultSEO.openGraph?.images,
    },
  }
}

export default defaultSEO
