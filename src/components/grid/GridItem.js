import { GridItem } from '@chakra-ui/react';
export const LayoutGridItem = ({ children, ...props }) => (
  <GridItem
    bgColor={'gray.800'}
    borderRadius={'md'}
    py="1rem"
    px="1rem"
    {...props}
  >
    {children}
  </GridItem>
);
