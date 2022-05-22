import {
  Button,
  ButtonGroup,
  HStack,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  VStack,
  Icon,
  Box,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
} from '@chakra-ui/react';
import { GoGear } from 'react-icons/go';

export const BuySellWindow = (props) => {
  const [selectedContract, setSelectedContract] = useState('perps');

  // options section states
  const [selectedOptionType, setSelectedOptionType] = useState('call');
  const [selectedMethod, setSelectedMethod] = useState('buy');
  const [selectedStrike, setSelectedStrike] = useState();
  const [optionQuantity, setOptionQuantity] = useState();
  const handleOptionQuantityChange = (e) => {
    !isNaN(Number(e.target.value)) && setOptionQuantity(e.target.value);
  };

  // perpetuals section state
  const [sliderValue, setSliderValue] = useState(50);

  const labelStyles = {
    mt: '2',
    ml: '-2.5',
    fontSize: 'sm',
  };

  return (
    <VStack h="100%" w="100%" alignItems="center">
      {/* Contract Switcher */}
      <ButtonGroup w="100%" mb={4} spacing="0">
        <Button
          w="100%"
          size="sm"
          variant={selectedContract === 'options' ? 'simple' : 'border'}
          onClick={() => {
            setSelectedContract('options');
          }}
        >
          Options
        </Button>
        <Button
          w="100%"
          size="sm"
          variant={selectedContract === 'perps' ? 'simple' : 'border'}
          onClick={() => {
            setSelectedContract('perps');
          }}
        >
          Perpetuals
        </Button>
      </ButtonGroup>

      {/* Options */}
      {selectedContract === 'options' && (
        <VStack w="100%">
          <HStack w="100%" justifyContent="space-between" mb={4}>
            <ButtonGroup w="45%" spacing="0">
              <Button
                w="100%"
                size="sm"
                variant={selectedMethod === 'buy' ? 'green' : 'border'}
                onClick={() => {
                  setSelectedMethod('buy');
                }}
              >
                Buy/Long
              </Button>
              <Button
                w="100%"
                size="sm"
                variant={selectedMethod === 'sell' ? 'red' : 'border'}
                onClick={() => {
                  setSelectedMethod('sell');
                }}
              >
                Sell/Short
              </Button>
            </ButtonGroup>
            <ButtonGroup w="45%" spacing="0">
              <Button
                w="100%"
                size="sm"
                variant={selectedOptionType === 'call' ? 'simple' : 'border'}
                onClick={() => {
                  setSelectedOptionType('call');
                }}
              >
                Call
              </Button>
              <Button
                w="100%"
                size="sm"
                variant={selectedOptionType === 'put' ? 'simple' : 'border'}
                onClick={() => {
                  setSelectedOptionType('put');
                }}
              >
                Put
              </Button>
            </ButtonGroup>
          </HStack>

          <VStack w="100%" spacing={4}>
            <Menu placement="bottom">
              <MenuButton
                size="sm"
                as={Button}
                w="100%"
                rightIcon={<Icon fontSize="20px" as={RiArrowDropDownLine} />}
              >
                {selectedStrike ?? 'Select Strike'}
              </MenuButton>
              <MenuList>
                {[1900, 2000, 2100, 2200, 2300, 2400].map((strikePrice) => (
                  <MenuItem
                    key={strikePrice}
                    onClick={() => {
                      setSelectedStrike(strikePrice);
                    }}
                  >
                    {strikePrice}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
            <Input
              placeholder="Enter Quantity"
              value={optionQuantity}
              onChange={handleOptionQuantityChange}
              disabled={!selectedStrike}
            />
            <Button
              // color={selectedMethod === 'sell' ? 'red.500' : 'green.500'}
              fontWeight="bold"
              variant={selectedMethod === 'sell' ? 'red' : 'green'}
              w="100%"
              leftIcon={<Icon fontSize="20px" as={GoGear} />}
              disabled={!(selectedStrike && optionQuantity)}
            >
              Run risk engine
            </Button>
          </VStack>
        </VStack>
      )}

      {/* Perpetuals */}
      {selectedContract === 'perps' && (
        <VStack w="100%">
          <ButtonGroup w="45%" spacing="0" alignSelf="flex-start" mb={4}>
            <Button
              w="100%"
              size="sm"
              variant={selectedMethod === 'buy' ? 'green' : 'border'}
              onClick={() => {
                setSelectedMethod('buy');
              }}
            >
              Buy/Long
            </Button>
            <Button
              w="100%"
              size="sm"
              variant={selectedMethod === 'sell' ? 'red' : 'border'}
              onClick={() => {
                setSelectedMethod('sell');
              }}
            >
              Sell/Short
            </Button>
          </ButtonGroup>

          <VStack w="100%" spacing={4}>
            <Input
              placeholder="Enter Amount"
              value={optionQuantity}
              onChange={handleOptionQuantityChange}
            />
            <Box w="100%">
              <Box fontSize="sm" alignSelf="flex-start" fontWeight="semibold">
                Leverage
              </Box>
              <Box
                w="100%"
                borderRadius="md"
                px={8}
                py={5}
                pt={10}
                bgColor="gray.700"
              >
                <Slider
                  aria-label="slider-ex-6"
                  onChange={(val) => setSliderValue(val)}
                  min={1}
                >
                  <SliderMark value={25} {...labelStyles}>
                    25x
                  </SliderMark>
                  <SliderMark value={50} {...labelStyles}>
                    50x
                  </SliderMark>
                  <SliderMark value={75} {...labelStyles}>
                    75x
                  </SliderMark>
                  <SliderMark
                    value={sliderValue}
                    textAlign="center"
                    bg="gray.500"
                    borderRadius="9999px"
                    fontSize="sm"
                    fontWeight="bold"
                    color="white"
                    mt="-10"
                    ml="-5"
                    px={2}
                    // w="12"
                  >
                    {sliderValue}x
                  </SliderMark>
                  <SliderTrack>
                    <SliderFilledTrack bgColor="gray.300" />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
              </Box>
            </Box>
            <Button
              // color={selectedMethod === 'sell' ? 'red.500' : 'green.500'}
              fontWeight="bold"
              variant={selectedMethod === 'sell' ? 'red' : 'green'}
              w="100%"
              leftIcon={<Icon fontSize="20px" as={GoGear} />}
            >
              Run risk engine
            </Button>
          </VStack>
        </VStack>
      )}
    </VStack>
  );
};
