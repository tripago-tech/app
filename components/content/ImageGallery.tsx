'use client'
import { Box, Image } from '@chakra-ui/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

interface ImageGalleryProps {
  images: string[]
  height?: string
  autoplay?: boolean
  showNavigation?: boolean
  showPagination?: boolean
}

export const ImageGallery = ({
  images,
  height = '400px',
  autoplay = false,
  showNavigation = true,
  showPagination = true,
}: ImageGalleryProps) => {
  return (
    <Box height={height} borderRadius="lg" overflow="hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={showNavigation}
        pagination={showPagination ? { clickable: true } : false}
        autoplay={autoplay ? { delay: 3000 } : false}
        style={{ height: '100%' }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <Image
              src={image}
              alt={`Gallery image ${index + 1}`}
              width="100%"
              height="100%"
              objectFit="cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  )
}
