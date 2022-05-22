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
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';
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
          </HStack>

          <VStack w="100%">
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
    </VStack>
  );
};
