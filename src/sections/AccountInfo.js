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
import { parseEther, getExistingContract } from '../utils';
import { assetAddresses, assets } from '../constants/assets';
import { useWeb3React } from '@web3-react/core';

export const AccountInfo = (props) => {
  const { account, library } = useWeb3React();

  // form state
  const [selectedAssetIndex, setSelectedAssetIndex] = useState();
  const [collateralAmount, setCollateralAmount] = useState();
  const handleAmountChange = (e) => {
    !isNaN(Number(e.target.value)) && setCollateralAmount(e.target.value);
  };

  const depositCollateral = async () => {
    const _amount = parseEther(collateralAmount);
    const assetAddress = assetAddresses[selectedAssetIndex];
    let vaultAddress;
    let vaultContract;
    const index = selectedAssetIndex;

    const vault = await getExistingContract(
      vaultContract,
      vaultAddress,
      library,
      account
    );

    await vault.addCollateral(account, assetAddress, _amount, index);
  };

  const withdrawCollateral = async () => {
    const _amount = parseEther(collateralAmount);
    const assetAddress = assetAddresses[selectedAssetIndex];
    const index = selectedAssetIndex;
    let vaultContract;
    let vaultAddress;

    const vault = await getExistingContract(
      vaultContract,
      vaultAddress,
      library,
      account
    );

    await vault.withdrawCollateral(account, assetAddress, _amount, index);
  };

  return (
    <VStack h="100%" w="100%" alignItems="center">
      <GridItemHeading w="100%">Account Info</GridItemHeading>
      <Menu placement="bottom">
        <MenuButton
          size="md"
          as={Button}
          w="100%"
          rightIcon={<Icon fontSize="30px" as={RiArrowDropDownLine} />}
        >
          {selectedAssetIndex ? assets[selectedAssetIndex] : 'Select Asset'}
        </MenuButton>
        <MenuList>
          {assets.map((asset, index) => (
            <MenuItem
              key={index}
              onClick={() => {
                setSelectedAssetIndex(index);
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
        <Button
          w="100%"
          size="sm"
          onClick={() => {
            depositCollateral();
          }}
        >
          Deposit
        </Button>
        <Button
          w="100%"
          size="sm"
          onClick={() => {
            withdrawCollateral();
          }}
        >
          Withdraw
        </Button>
      </ButtonGroup>
    </VStack>
  );
};
