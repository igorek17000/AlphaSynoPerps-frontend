import { mode } from '@chakra-ui/theme-tools';

export const styles = {
  global: (props) => ({
    body: {
      fontFamily: '"Rajdhani", sans-serif',
      color: mode('#2026D', '#ffffff')(props),
      bgColor: mode('#ffffff', '#2026D')(props),
      lineHeight: 'base',
      minHeight: '100vh',
    },

    '*::placeholder': {
      color: mode('#20265D', '#e0e0e0')(props),
      fontSize: 'sm',
    },
    '*, *::before, &::after': {
      borderColor: mode('gray.200', 'whiteAlpha.300')(props),
      wordWrap: 'break-word',
    },
    '::-webkit-scrollbar': {
      width: '8px',
    },
    '::-webkit-scrollbar-track': {
      background: 'none',
      border: '1px solid white',
      borderRadius: '30px',
    },
    '::-webkit-scrollbar-thumb': {
      background: mode(
        'rgba(32, 38, 93, 0.5);',
        'rgba(255, 255, 255, 0.5)'
      )(props),
      borderRadius: '30px',
    },
    '::-webkit-scrollbar-thumb:hover': {
      background: mode('#20265D', 'white')(props),
    },
  }),
};
