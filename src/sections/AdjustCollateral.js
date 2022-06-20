import {
  Box,
  Button,
  ButtonGroup,
  HStack,
  Icon,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  VStack,
} from '@chakra-ui/react'
import { useWeb3React } from '@web3-react/core'
import { useState, useEffect } from 'react'
import { RiArrowDropDownLine } from 'react-icons/ri'
import { GridItemHeading } from '../components'
import { assetAddresses, assets } from '../constants/assets'
import AlphaSynoPerps from '../contracts/AlphaSynoPerps.json'
import { getExistingContract, parseEther, toBN, formatEther } from '../utils'

export const AdjustCollateral = (props) => {
  const { account, library } = useWeb3React()

  const [selectedAssetIndex, setSelectedAssetIndex] = useState()
  const [collateralAmount, setCollateralAmount] = useState()
  const handleAmountChange = (e) => {
    !isNaN(Number(e.target.value)) && setCollateralAmount(e.target.value)
  }

  const [collateral, setCollateral] = useState([])

  const vaultAddress = '0xbe9854019e5EFA4109582ca7bBF003C842535D53'

  const getCollateral = async () => {
    const vault = await getExistingContract(
      AlphaSynoPerps,
      vaultAddress,
      library,
      account,
    )
    const [collAsset, collAmount] = await vault.getColl(account)
    return [collAsset, collAmount]
  }

  const depositCollateral = async () => {
    const _amount = parseEther(collateralAmount)
    const assetAddress = assetAddresses[selectedAssetIndex]

    const [existingCollAsset, existingCollAmount] = await getCollateral()

    let assetIndex = existingCollAsset.findIndex(
      (assetAddr) => assetAddr === assetAddress,
    )

    assetIndex = assetIndex === -1 ? existingCollAsset.length : assetIndex

    const vault = await getExistingContract(
      AlphaSynoPerps,
      vaultAddress,
      library,
      account,
    )

    const tx = await vault.addCollateral(
      account,
      assetAddress,
      _amount,
      toBN(`${assetIndex}`),
    )
    await tx.wait()
    setCollateral((await getCollateral())[1])
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

    const tx = await vault.withdrawCollateral(
      account,
      assetAddress,
      _amount,
      index,
    )
    await tx.wait()
    setCollateral((await getCollateral())[1])
  }

  console.log(collateral)

  useEffect(() => {
    const Func = async () => {
      setCollateral((await getCollateral())[1])
    }
    library && account && Func()
  }, [library, account])

  return (
    <VStack h="100%" w="100%" alignItems="center">
      <GridItemHeading w="100%">Adjust Collateral</GridItemHeading>
      <HStack w="100%" flex="1" justifyContent="space-around">
        {assets.map((asset, ind) => (
          <VStack>
            <Box fontWeight="bold" fontSize="lg">
              {asset}
            </Box>
            <Box fontWeight="bold">
              {collateral[ind] ? formatEther(collateral[ind]) : 0}
            </Box>
          </VStack>
        ))}
      </HStack>
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
