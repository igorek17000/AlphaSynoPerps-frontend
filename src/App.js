import { useColorMode, VStack } from '@chakra-ui/react';
import {
  GridItemHeading,
  LayoutGrid,
  LayoutGridItem,
  NavBar,
  StatTable,
} from './components';
import { AccountInfo, BuySellWindow, PriceChart } from './sections';

function App() {
  const { colorMode } = useColorMode();
  console.log(colorMode);
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
        gap={2}
        height="100%"
        w="100%"
        position="relative"
      >
        {/* Asset */}
        <LayoutGridItem rowSpan={2} colSpan={{ xl: 3 }}>
          <VStack h="100%" alignItems="stretch">
            <GridItemHeading>Assets</GridItemHeading>
            <StatTable
              headingRow={['PAIR', 'PRICE', 'CHANGE']}
              tableRows={[['ETH/USDC', '1963.75', '100%']]}
              activeRow={0}
            />
          </VStack>
        </LayoutGridItem>

        {/* Price Chart */}
        <LayoutGridItem rowSpan={2} colSpan={{ xl: 6 }}>
          <PriceChart />
        </LayoutGridItem>

        {/* Account Info*/}
        <LayoutGridItem rowSpan={1} colSpan={{ xl: 3 }}>
          <AccountInfo />
        </LayoutGridItem>

        {/* Buy/Sell window */}
        <LayoutGridItem rowSpan={3} colSpan={{ xl: 3 }}>
          <BuySellWindow />
        </LayoutGridItem>

        {/* Trades */}
        <LayoutGridItem rowSpan={2} colSpan={{ xl: 3 }}>
          <GridItemHeading>Trades</GridItemHeading>
        </LayoutGridItem>

        {/* Account Positions */}
        <LayoutGridItem rowSpan={2} colSpan={{ xl: 6 }}>
          <GridItemHeading>Positions</GridItemHeading>
        </LayoutGridItem>
      </LayoutGrid>
    </VStack>
  );
}

export default App;
