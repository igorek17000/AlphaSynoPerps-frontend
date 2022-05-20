import { Box, VStack } from '@chakra-ui/react';
import { LayoutGrid, LayoutGridItem, NavBar, StatTable } from './components';
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
    <VStack className="App" alignItems="center" p="2rem" pt="0">
      <NavBar />
      <LayoutGrid
        templateRows={{
          base: 'repeat(7, 1fr)',
          lg: 'repeat(4, 1fr)',
          '2xl': 'repeat(3, 1fr)',
        }}
        templateColumns={{
          base: 'repeat(4, 1fr)',
          lg: 'repeat(8, 1fr)',
          '2xl': 'repeat(12, 1fr)',
        }}
        gap={4}
        w="100%"
        maxH="100%"
        flex="1"
      >
        {/* asset */}
        <LayoutGridItem
          rowSpan={1}
          colSpan={{ base: 4, lg: 6, '2xl': 3 }}
          maxH="50vh"
        >
          <StatTable
            headingRow={['PAIR', 'PRICE', 'CHANGE']}
            tableRows={[
              ['ETH/USDC', '1963.75', '100%'],
              ['ETH/USDC', '1963.75', '100%'],
              ['ETH/USDC', '1963.75', '100%'],
              ['ETH/USDC', '1963.75', '100%'],
              ['ETH/USDC', '1963.75', '100%'],
              ['ETH/USDC', '1963.75', '100%'],
              ['ETH/USDC', '1963.75', '100%'],
              ['ETH/USDC', '1963.75', '100%'],
              ['ETH/USDC', '1963.75', '100%'],
              ['ETH/USDC', '1963.75', '100%'],
              ['ETH/USDC', '1963.75', '100%'],
              ['ETH/USDC', '1963.75', '100%'],
              ['ETH/USDC', '1963.75', '100%'],
              ['ETH/USDC', '1963.75', '100%'],
            ]}
            activeRow={3}
          />
        </LayoutGridItem>

        {/* graph */}
        <LayoutGridItem rowSpan={1} colSpan={{ base: 4, lg: 6, '2xl': 6 }}>
          <CandleStickChart colors={colors} data={candlestickSeriesData} />
        </LayoutGridItem>

        {/* buy sell window */}
        <LayoutGridItem rowSpan={2} colSpan={{ base: 4, lg: 6, '2xl': 3 }}>
          buy sell window
        </LayoutGridItem>

        {/* account status */}
        <LayoutGridItem rowSpan={1} colSpan={{ base: 4, lg: 6, '2xl': 3 }}>
          account status
        </LayoutGridItem>

        {/* available options */}
        <LayoutGridItem
          rowSpan={1}
          colSpan={{ base: 4, lg: 6, '2xl': 6 }}
          maxH="50vh"
        >
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
        </LayoutGridItem>

        {/* you postions */}
        <LayoutGridItem rowSpan={1} colSpan={{ base: 4, lg: 6, '2xl': 3 }}>
          {/* <StatTable /> */}
        </LayoutGridItem>

        <Box></Box>
      </LayoutGrid>
    </VStack>
  );
}

export default App;
