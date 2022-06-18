import { GridItem } from '@chakra-ui/react'
export const LayoutGridItem = ({ children, ...props }) => (
  <GridItem bgColor={'gray.800'} borderRadius={10} p={4} {...props}>
    {children}
  </GridItem>
)
