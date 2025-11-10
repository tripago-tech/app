import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const theme = extendTheme({
  config,
  colors: {
    primary: {
      50: '#E0F7F4',
      100: '#B3ECE8',
      200: '#80E0DC',
      300: '#4DD4D0',
      400: '#34E0A1', // Tripadvisor Green
      500: '#34E0A1',
      600: '#2BB882',
      700: '#229063',
      800: '#196844',
      900: '#0F4025',
    },
    secondary: {
      50: '#FFF9E6',
      100: '#FFECB3',
      200: '#FFE082',
      300: '#FFD54F',
      400: '#FFD700', // Gold
      500: '#FFD700',
      600: '#DAB000',
      700: '#B38700',
      800: '#8C6600',
      900: '#664400',
    },
    accent: {
      50: '#E0F7F4',
      100: '#B3ECE8',
      200: '#80E0DC',
      300: '#4DD4D0',
      400: '#34E0A1',
      500: '#2CB98F',
      600: '#24A37D',
      700: '#1C8D6B',
      800: '#147759',
      900: '#0C6147',
    },
    gray: {
      50: '#FFFFFF',
      100: '#F7F7F7',
      200: '#EFEFEF',
      300: '#E0E0E0',
      400: '#B0B0B0',
      500: '#808080',
      600: '#606060',
      700: '#404040',
      800: '#202020',
      900: '#1C1C1C', // Text color
    }
  },
  fonts: {
    heading: 'Inter, sans-serif',
    body: 'Inter, sans-serif',
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: '600',
        borderRadius: 'lg',
        _focus: { boxShadow: 'outline' },
      },
      variants: {
        solid: {
          bg: 'primary.500',
          color: 'white',
          _hover: { bg: 'primary.600', transform: 'translateY(-1px)', boxShadow: 'lg' },
          _active: { transform: 'translateY(0)' },
          transition: 'all 0.2s',
        },
        secondary: {
          bg: 'secondary.500',
          color: 'white',
          _hover: { bg: 'secondary.600', transform: 'translateY(-1px)', boxShadow: 'lg' },
          _active: { transform: 'translateY(0)' },
          transition: 'all 0.2s',
        },
        accent: {
          bg: 'accent.500',
          color: 'gray.900',
          _hover: { bg: 'accent.600', transform: 'translateY(-1px)', boxShadow: 'lg' },
          _active: { transform: 'translateY(0)' },
          transition: 'all 0.2s',
        },
      },
    },
    Card: {
      baseStyle: {
        container: {
          borderRadius: 'xl',
          boxShadow: 'sm',
          _hover: { boxShadow: 'lg', transform: 'translateY(-2px)' },
          transition: 'all 0.3s ease',
          bg: 'white',
        },
      },
    },
  },
  styles: {
    global: {
      body: {
        bg: 'gray.50',
        color: 'gray.900',
      },
    },
  },
})

export default theme
