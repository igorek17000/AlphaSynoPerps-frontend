import { useColorMode, VStack } from '@chakra-ui/react'
import {
  GridItemHeading,
  LayoutGrid,
  LayoutGridItem,
  NavBar,
  StatTable,
} from './components'
import { AdjustCollateral, BuySellWindow, Positions } from './sections'

function App() {
  return (
    <VStack className="App" alignItems="center" minH="100vh" p={2}>
      <NavBar />
      <LayoutGrid
        templateRows={{
          xl: 'repeat(4, 1fr)',
        }}
        templateColumns={{
          xl: 'repeat(12, 1fr)',
        }}
        gap={2}
        flex="1"
        w="100%"
        position="relative"
      >
        {/* Asset */}
        <LayoutGridItem rowSpan={2} colSpan={{ xl: 3 }}>
          {/* <Assets /> */}
        </LayoutGridItem>

        {/* Price Chart */}
        <LayoutGridItem rowSpan={2} colSpan={{ xl: 6 }} p="0">
          {/* <PriceChart /> */}
        </LayoutGridItem>

        {/* Adjust Collateral*/}
        <LayoutGridItem rowSpan={2} colSpan={{ xl: 3 }}>
          <AdjustCollateral />
        </LayoutGridItem>
        {/* Trades */}
        <LayoutGridItem rowSpan={2} colSpan={{ xl: 3 }}>
          <GridItemHeading>Trades</GridItemHeading>
        </LayoutGridItem>

        {/* Account Positions */}
        <LayoutGridItem rowSpan={2} colSpan={{ xl: 6 }}>
          <Positions />
        </LayoutGridItem>

        {/* Buy/Sell window */}
        <LayoutGridItem rowSpan={2} colSpan={{ xl: 3 }}>
          <BuySellWindow />
        </LayoutGridItem>
      </LayoutGrid>
    </VStack>
  )
}

export default App
