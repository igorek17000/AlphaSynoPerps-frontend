import { Grid } from '@chakra-ui/react';
export const LayoutGrid = ({ children, ...props }) => (
  <Grid gap={4} w="100%" {...props}>
    {children}
  </Grid>
);
