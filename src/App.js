import {
  Button,
  ButtonGroup,
  VStack,
  Input,
  useColorMode,
} from '@chakra-ui/react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from '@chakra-ui/react';

import {
  GridItemHeading,
  LayoutGrid,
  LayoutGridItem,
  NavBar,
  StatTable,
} from './components';
import { CandleStickChart } from './components/charts';
import { candlestickSeriesData } from './constants/chartMockData';

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
    <VStack className="App" alignItems="center" h="100vh" minH="800px" p={2}>
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
        {/* Asset */}
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

        {/* Price Chart */}
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

        {/* Add/Withdraw Collateral */}
        <LayoutGridItem rowSpan={1} colSpan={{ base: 4, lg: 6, '2xl': 3 }}>
          <VStack h="100%" w="100%" alignItems="center">
            <GridItemHeading w="100%">Collateral</GridItemHeading>
            <Menu placement="bottom">
              <MenuButton size="sm" as={Button} w="66%">
                Select Asset
              </MenuButton>
              <MenuList>
                <MenuItem>Download</MenuItem>
                <MenuItem>Create a Copy</MenuItem>
                <MenuItem>Mark as Draft</MenuItem>
                <MenuItem>Delete</MenuItem>
                <MenuItem>Attend a Workshop</MenuItem>
              </MenuList>
            </Menu>
            <Input placeholder="Enter Amount" />
            <ButtonGroup w="100%">
              <Button w="100%" size="sm">
                Deposit
              </Button>
              <Button w="100%" size="sm">
                Withdraw
              </Button>
            </ButtonGroup>
          </VStack>
        </LayoutGridItem>

        {/* Buy/Sell window */}
        <LayoutGridItem rowSpan={3} colSpan={{ base: 4, lg: 6, '2xl': 3 }}>
          <GridItemHeading>Buy/Sell Window</GridItemHeading>
        </LayoutGridItem>

        {/* Trades */}
        <LayoutGridItem rowSpan={2} colSpan={{ base: 4, lg: 6, '2xl': 3 }}>
          <GridItemHeading>Trades</GridItemHeading>
        </LayoutGridItem>

        {/* Account Positions */}
        <LayoutGridItem rowSpan={2} colSpan={{ base: 4, lg: 6, '2xl': 6 }}>
          <GridItemHeading>Positions</GridItemHeading>
        </LayoutGridItem>
      </LayoutGrid>
    </VStack>
  );
}

export default App;
