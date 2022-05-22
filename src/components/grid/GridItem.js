import { GridItem } from '@chakra-ui/react';
export const LayoutGridItem = ({ children, ...props }) => (
  <GridItem
    border="1px solid"
    borderColor="gray.700"
    bgColor={'gray.800'}
    borderRadius={4}
    p={4}
    {...props}
  >
    {children}
  </GridItem>
);
