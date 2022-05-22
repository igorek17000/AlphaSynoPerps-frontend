import { useColorMode, VStack } from '@chakra-ui/react';
import {
  GridItemHeading,
  LayoutGrid,
  LayoutGridItem,
  NavBar,
  StatTable,
} from './components';
import { CandleStickChart } from './components';
import { candlestickSeriesData } from './constants/chartMockData';
import { AccountInfo, BuySellWindow } from './sections';

const colors = {
  backgroundColor: 'rgba(255,255,255,0)',
  textColor: '#CBD5E0',
  areaTopColor: '#2962FF',
  areaBottomColor: 'rgba(41, 98, 255, 0.0)',
};

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
          <VStack h="100%" w="100%" alignItems="stretch">
            <GridItemHeading>Price Chart</GridItemHeading>
            <CandleStickChart
              flex="1"
              colors={colors}
              data={candlestickSeriesData}
            />
          </VStack>
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
