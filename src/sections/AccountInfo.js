import {
  Button,
  ButtonGroup,
  Icon,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { GridItemHeading } from '../components';

export const AccountInfo = (props) => {
  const [selectedAsset, setSelectedAsset] = useState();
  const [collateralAmount, setCollateralAmount] = useState();
  const handleAmountChange = (e) => {
    !isNaN(Number(e.target.value)) && setCollateralAmount(e.target.value);
  };

  return (
    <VStack h="100%" w="100%" alignItems="center">
      <GridItemHeading w="100%">Account Info</GridItemHeading>
      <Menu placement="bottom">
        <MenuButton
          size="sm"
          as={Button}
          w="100%"
          rightIcon={<Icon fontSize="20px" as={RiArrowDropDownLine} />}
        >
          {selectedAsset ?? 'Select Asset'}
        </MenuButton>
        <MenuList>
          {['ETH', 'USDC'].map((asset) => (
            <MenuItem
              key={asset}
              onClick={() => {
                setSelectedAsset(asset);
              }}
            >
              {asset}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      <Input
        value={collateralAmount}
        onChange={handleAmountChange}
        placeholder="Enter Amount"
      />
      <ButtonGroup w="100%">
        <Button w="100%" size="sm">
          Deposit
        </Button>
        <Button w="100%" size="sm">
          Withdraw
        </Button>
      </ButtonGroup>
    </VStack>
  );
};
