import { Grid } from '@chakra-ui/react';
export const LayoutGrid = ({ children, ...props }) => (
  <Grid {...props}>{children}</Grid>
);
