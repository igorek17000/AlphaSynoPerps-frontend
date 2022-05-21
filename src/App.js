import { Box, VStack } from '@chakra-ui/react';
import {
  LayoutGrid,
  LayoutGridItem,
  NavBar,
  StatTable,
  GridItemHeading,
} from './components';
import { CandleStickChart } from './components/charts';
import { candlestickSeriesData } from './constants/chartMockData';

const colors = {
  backgroundColor: 'rgba(255,255,255,0)',
  textColor: 'white',
  areaTopColor: '#2962FF',
  areaBottomColor: 'rgba(41, 98, 255, 0.0)',
};

function App() {
  return (
    <VStack className="App" alignItems="center" h="100vh" p={2}>
      <NavBar />
      <LayoutGrid
        templateRows={{
          base: 'repeat(7, 1fr)',
          lg: 'repeat(4, 1fr)',
          '2xl': 'repeat(4, 1fr)',
        }}
        templateColumns={{
          base: 'repeat(4, 1fr)',
          lg: 'repeat(8, 1fr)',
          '2xl': 'repeat(12, 1fr)',
        }}
        gap={2}
        height="94%"
        w="100%"
        position="relative"
      >
        {/* asset */}
        <LayoutGridItem rowSpan={2} colSpan={{ base: 4, lg: 6, '2xl': 3 }}>
          <VStack h="100%" alignItems="stretch">
            <GridItemHeading>Assets</GridItemHeading>
            <StatTable
              headingRow={['PAIR', 'PRICE', 'CHANGE']}
              tableRows={[['ETH/USDC', '1963.75', '100%']]}
              activeRow={0}
            />
          </VStack>
        </LayoutGridItem>

        {/* graph */}
        <LayoutGridItem rowSpan={2} colSpan={{ base: 4, lg: 6, '2xl': 6 }}>
          <VStack h="100%" w="100%" alignItems="stretch">
            <GridItemHeading>Price Chart</GridItemHeading>
            <CandleStickChart
              flex="1"
              colors={colors}
              data={candlestickSeriesData}
            />
          </VStack>
        </LayoutGridItem>

        <LayoutGridItem rowSpan={1} colSpan={{ base: 4, lg: 6, '2xl': 3 }}>
          <GridItemHeading>Collateral</GridItemHeading>
        </LayoutGridItem>

        {/* buy sell window */}
        <LayoutGridItem rowSpan={3} colSpan={{ base: 4, lg: 6, '2xl': 3 }}>
          <GridItemHeading>Buy/Sell window</GridItemHeading>
        </LayoutGridItem>

        {/* account status */}
        <LayoutGridItem rowSpan={2} colSpan={{ base: 4, lg: 6, '2xl': 3 }}>
          <GridItemHeading>Trades</GridItemHeading>
        </LayoutGridItem>

        {/* available options */}
        {/* <LayoutGridItem
          rowSpan={2}
          colSpan={{ base: 4, lg: 6, '2xl': 6 }}
          overflowY="scroll"
        >
          <VStack h="100%" alignItems="stretch">
            <StatTable
              headingRow={['STRIKE', 'BID', 'ASK', 'IV-A', 'IV-B']}
              tableRows={[
                ['$66', '$0.05', '$0.25', '135%', '98.3%'],
                ['$66', '$0.05', '$0.25', '135%', '98.3%'],
                ['$66', '$0.05', '$0.25', '135%', '98.3%'],
                ['$66', '$0.05', '$0.25', '135%', '98.3%'],
                ['$66', '$0.05', '$0.25', '135%', '98.3%'],
                ['$66', '$0.05', '$0.25', '135%', '98.3%'],
                ['$66', '$0.05', '$0.25', '135%', '98.3%'],
                ['$66', '$0.05', '$0.25', '135%', '98.3%'],
                ['$66', '$0.05', '$0.25', '135%', '98.3%'],
              ]}
              activeRow={3}
              size="md"
            />
          </VStack>
        </LayoutGridItem> */}

        {/* trades */}
        <LayoutGridItem rowSpan={2} colSpan={{ base: 4, lg: 6, '2xl': 6 }}>
          <GridItemHeading>Positions</GridItemHeading>
        </LayoutGridItem>
      </LayoutGrid>
    </VStack>
  );
}

export default App;
