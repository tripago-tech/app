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
        borderRadius: '8px',
        fontSize: '14px',
        _focus: { boxShadow: 'outline' },
      },
      variants: {
        solid: {
          bg: 'primary.500',
          color: 'white',
          _hover: { bg: 'primary.600', transform: 'translateY(-2px)', boxShadow: '0 4px 12px rgba(52, 224, 161, 0.3)' },
          _active: { transform: 'translateY(0)' },
          transition: 'all 0.2s',
        },
        secondary: {
          bg: 'secondary.500',
          color: 'gray.900',
          _hover: { bg: 'secondary.600', transform: 'translateY(-2px)', boxShadow: '0 4px 12px rgba(255, 215, 0, 0.3)' },
          _active: { transform: 'translateY(0)' },
          transition: 'all 0.2s',
        },
        ghost: {
          color: 'gray.600',
          _hover: { bg: 'gray.100', color: 'gray.900' },
          transition: 'all 0.2s',
        },
      },
    },
    Card: {
      baseStyle: {
        container: {
          borderRadius: '10px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
          _hover: { boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)', transform: 'translateY(-4px)' },
          transition: 'all 0.3s ease',
          bg: 'white',
          overflow: 'hidden',
        },
      },
    },
  },
  styles: {
    global: {
      body: {
        bg: 'white',
        color: '#1C1C1C',
        fontFamily: 'Inter, sans-serif',
        lineHeight: '1.6',
      },
      html: {
        bg: 'white',
      },
    },
  },
})

export default theme
