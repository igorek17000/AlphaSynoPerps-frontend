import {
  Box,
  Button,
  ButtonGroup,
  Icon,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  VStack,
} from '@chakra-ui/react'
import { useWeb3React } from '@web3-react/core'
import { useState } from 'react'
import { RiArrowDropDownLine } from 'react-icons/ri'
import { GridItemHeading } from '../components'
import { assetAddresses, assets } from '../constants/assets'
import AlphaSynoPerps from '../contracts/AlphaSynoPerps.json'
import { getExistingContract, parseEther, toBN } from '../utils'

export const AccountInfo = (props) => {
  const { account, library } = useWeb3React()

  // form state
  const [selectedAssetIndex, setSelectedAssetIndex] = useState()
  const [collateralAmount, setCollateralAmount] = useState()
  const handleAmountChange = (e) => {
    !isNaN(Number(e.target.value)) && setCollateralAmount(e.target.value)
  }

  console.log(selectedAssetIndex)
  const vaultAddress = '0xbC114f0995EA2bcFb2A32EC73EeAa972b585c2c0'

  const depositCollateral = async () => {
    const _amount = parseEther(collateralAmount)
    const assetAddress = assetAddresses[selectedAssetIndex]

    const index = parseEther(`${selectedAssetIndex}`)

    const vault = await getExistingContract(
      AlphaSynoPerps,
      vaultAddress,
      library,
      account,
    )

    await vault.addCollateral(account, assetAddress, _amount, toBN('1'))
  }

  const withdrawCollateral = async () => {
    const _amount = parseEther(collateralAmount)
    const assetAddress = assetAddresses[selectedAssetIndex]
    const index = selectedAssetIndex

    const vault = await getExistingContract(
      AlphaSynoPerps,
      vaultAddress,
      library,
      account,
    )

    await vault.withdrawCollateral(account, assetAddress, _amount, index)
  }

  const getCollateralAmount = async () => {
    const vault = await getExistingContract(
      AlphaSynoPerps,
      vaultAddress,
      library,
      account,
    )

    console.log(await vault.getColl(account))
  }

  return (
    <VStack h="100%" w="100%" alignItems="center">
      <GridItemHeading w="100%">Account Info</GridItemHeading>
      <Box flex="1"></Box>
      <Menu placement="bottom">
        <MenuButton
          size="md"
          as={Button}
          w="100%"
          rightIcon={<Icon fontSize="30px" as={RiArrowDropDownLine} />}
        >
          {parseInt(selectedAssetIndex) >= 0
            ? assets[selectedAssetIndex]
            : 'Select Asset'}
        </MenuButton>
        <MenuList>
          {assets.map((asset, index) => (
            <MenuItem
              key={index}
              onClick={() => {
                setSelectedAssetIndex(index)
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
          variant="green"
          onClick={() => {
            depositCollateral()
          }}
        >
          Deposit
        </Button>
        <Button
          w="100%"
          size="sm"
          variant="red"
          onClick={() => {
            withdrawCollateral()
          }}
        >
          Withdraw
        </Button>
      </ButtonGroup>
    </VStack>
  )
}
