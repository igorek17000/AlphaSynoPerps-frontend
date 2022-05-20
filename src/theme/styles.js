import { mode } from '@chakra-ui/theme-tools';

export const styles = {
  global: (props) => ({
    body: {
      fontFamily: '"Rajdhani", sans-serif',
      color: 'gray.300',
      background: 'rgb(26,32,44)',
      bgGradient:
        'linear-gradient(180deg, rgba(26,32,44,1) 0%, rgba(74,85,104,1) 86%)',
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
