// 1. Import `extendTheme`
import { extendTheme } from '@chakra-ui/react';
import { styles } from './styles';
import { colors } from './foundations';
import * as components from './components';

const theme = extendTheme({
  colors,
  styles,
  // components,
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
});

export default theme;
