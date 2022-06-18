import { useColorMode, VStack } from '@chakra-ui/react'
import {
  GridItemHeading,
  LayoutGrid,
  LayoutGridItem,
  NavBar,
  StatTable,
} from './components'
import { AccountInfo, BuySellWindow, PriceChart, Assets } from './sections'

function App() {
  const { colorMode } = useColorMode()
  console.log(colorMode)
  return (
    <VStack className="App" alignItems="center" minH="min-content" p={2}>
      <NavBar />
      <LayoutGrid
        templateRows={{
          xl: 'repeat(4, 1fr)',
        }}
        templateColumns={{
          xl: 'repeat(12, 1fr)',
        }}
        gap={1}
        height="100%"
        w="100%"
        position="relative"
      >
        {/* Asset */}
        <LayoutGridItem rowSpan={2} colSpan={{ xl: 3 }}>
          {/* <Assets /> */}
        </LayoutGridItem>

        {/* Price Chart */}
        <LayoutGridItem rowSpan={2} colSpan={{ xl: 6 }} p="0">
          <PriceChart />
        </LayoutGridItem>

        {/* Account Info*/}
        <LayoutGridItem rowSpan={2} colSpan={{ xl: 3 }}>
          <AccountInfo />
        </LayoutGridItem>
        {/* Trades */}
        <LayoutGridItem rowSpan={2} colSpan={{ xl: 3 }}>
          <GridItemHeading>Trades</GridItemHeading>
        </LayoutGridItem>

        {/* Account Positions */}
        <LayoutGridItem rowSpan={2} colSpan={{ xl: 6 }}>
          <GridItemHeading>Positions</GridItemHeading>
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
