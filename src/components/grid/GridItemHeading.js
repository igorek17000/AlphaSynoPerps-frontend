import { GridItem } from '@chakra-ui/react';
export const GridItemHeading = ({ children, ...props }) => (
  <GridItem fontWeight="bold" {...props}>
    {children}
  </GridItem>
);
