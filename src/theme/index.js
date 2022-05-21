// 1. Import `extendTheme`
import { extendTheme } from '@chakra-ui/react';
import { styles } from './styles';
import { colors, fontWeights } from './foundations';
import { Button, Input } from './components';

console.log(Button);

const theme = extendTheme({
  components: {
    Button,
    Input,
  },
  colors,
  fontWeights,
  styles,
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
});

export default theme;
