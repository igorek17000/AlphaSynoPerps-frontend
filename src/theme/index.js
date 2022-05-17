// 1. Import `extendTheme`
import { extendTheme } from '@chakra-ui/react';
import { styles } from './styles';
import { colors } from './foundations';

const theme = extendTheme({
  colors,
  styles,
});

export default theme;
