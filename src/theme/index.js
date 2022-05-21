// 1. Import `extendTheme`
import { extendTheme } from '@chakra-ui/react';
import { styles } from './styles';
import { colors } from './foundations';
import { Button } from './components';

console.log(Button);

const theme = extendTheme({
  colors,
  styles,
  components: {
    Button: {
      baseStyle: {
        bgColor: 'gray.700',
        _hover: {
          bgColor: 'gray.600',
          color: 'white',
        },
        fontWeight: 'semibold',
      },

      sizes: {
        md: {
          fontSize: 'md',
          px: 4,
          py: 3,
        },
      },
      defaultProps: {
        size: 'md',
      },
    },
  },
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
});

export default theme;
