import { mode } from '@chakra-ui/theme-tools';

// #1A202C = gray.800
// #4A5568 = gray.600
// #E2E8F0 = gray.200

export const styles = {
  global: (props) => ({
    body: {
      fontFamily: '"Rajdhani", sans-serif',
      color: 'gray.300',
      // bgGradient: 'linear-gradient(180deg, #1A202C 0%, #4A5568 100%)',
      bgColor: 'gray.900',
      lineHeight: 'base',
      minHeight: '100vh',
    },

    '*::placeholder': {
      color: 'gray.200',
      fontSize: 'sm',
    },
    '*, *::before, &::after': {
      borderColor: 'gray.200',
      wordWrap: 'break-word',
    },
    '::-webkit-scrollbar': {
      width: '8px',
    },
    '::-webkit-scrollbar-track': {
      background: 'none',
      borderRadius: '30px',
    },
    '::-webkit-scrollbar-thumb': {
      background: 'gray.900',
      borderRadius: '30px',
    },
  }),
};
