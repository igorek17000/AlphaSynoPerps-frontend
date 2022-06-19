import { GridItem } from '@chakra-ui/react'
export const GridItemHeading = ({ children, ...props }) => (
  <GridItem
    fontSize="lg"
    color="gray.100"
    pb={1}
    fontWeight="semibold"
    {...props}
  >
    {children}
  </GridItem>
)
