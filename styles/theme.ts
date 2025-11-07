import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const theme = extendTheme({
  config,
  colors: {
    primary: {
      50: '#E3F2FD',
      100: '#BBDEFB',
      200: '#90CAF9',
      300: '#64B5F6',
      400: '#42A5F5',
      500: '#007BFF', // Agoda Blue
      600: '#0056B3',
      700: '#003D82',
      800: '#002952',
      900: '#001529',
    },
    secondary: {
      50: '#E8F5F0',
      100: '#C6E9DA',
      200: '#A3DCC4',
      300: '#7FCFAE',
      400: '#5CC298',
      500: '#00C48C', // TripAdvisor Green
      600: '#00A876',
      700: '#008C60',
      800: '#00704A',
      900: '#005434',
    },
    accent: {
      50: '#FFF8E1',
      100: '#FFECB3',
      200: '#FFE082',
      300: '#FFD54F',
      400: '#FFCA28',
      500: '#FFC107', // Warm Yellow
      600: '#FFB300',
      700: '#FFA000',
      800: '#FF8F00',
      900: '#FF6F00',
    },
    gray: {
      50: '#F8FAFC',
      100: '#F1F5F9',
      200: '#E2E8F0',
      300: '#CBD5E1',
      400: '#94A3B8',
      500: '#64748B',
      600: '#475569',
      700: '#334155',
      800: '#1E293B',
      900: '#2C3E50', // Text color
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
