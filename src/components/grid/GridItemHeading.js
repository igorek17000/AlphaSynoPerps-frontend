import { GridItem } from '@chakra-ui/react';
export const GridItemHeading = ({ children, ...props }) => (
  <GridItem pb={1} fontWeight="semibold" {...props}>
    {children}
  </GridItem>
);
