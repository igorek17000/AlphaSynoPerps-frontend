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
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { RiArrowDropDownLine } from 'react-icons/ri'
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
} from '@chakra-ui/react'
import { GoGear } from 'react-icons/go'
import {
  dateTimeFormatter,
  parseEther,
  getExistingContract,
  toBN,
} from '../utils'
import { assetAddresses } from '../constants/assets'
import { useWeb3React } from '@web3-react/core'
import AlphaSynoPerps from '../contracts/AlphaSynoPerps.json'
import { GridItemHeading } from '../components'

export const BuySellWindow = (props) => {
  const { account, library } = useWeb3React()
  const [selectedContract, setSelectedContract] = useState('options')
  const [selectedMethod, setSelectedMethod] = useState('buy')

  const vaultAddress = '0xbe9854019e5EFA4109582ca7bBF003C842535D53'

  // options section states
  const [selectedOptionType, setSelectedOptionType] = useState('call')

  const [selectedStrike, setSelectedStrike] = useState()
  const [selectedExpiryTime, setSelectedExpiryTime] = useState()
  const [optionQuantity, setOptionQuantity] = useState()
  const handleOptionQuantityChange = (e) => {
    !isNaN(Number(e.target.value)) && setOptionQuantity(e.target.value)
  }

  // perpetuals section state
  const [sliderValue, setSliderValue] = useState(50)
  const [perpAmount, setPerpAmount] = useState()
  const handlePerpAmountChange = (e) => {
    !isNaN(Number(e.target.value)) && setPerpAmount(e.target.value)
  }

  const labelStyles = {
    mt: '2',
    ml: '-2.5',
    fontSize: 'sm',
    fontWeight: 'semibold',
  }

  const openOptionPosition = async () => {
    const isPut = selectedOptionType === 'put'
    const isShort = selectedMethod === 'sell'
    const amount = parseEther(optionQuantity)
    const underlyingAsset = '0xCBb3a155CC7aa08434E575878e18A7a7B025b62F'
    const expiryTimestamp = toBN(selectedExpiryTime)
    const strikePrice = parseEther(`${selectedStrike}`)

    const vault = await getExistingContract(
      AlphaSynoPerps,
      vaultAddress,
      library,
      account,
    )

    const derivAssets = await vault.getDerivAssets(account)
    console.log(derivAssets)

    let assetIdx = derivAssets.findIndex(
      (assetAddr) => assetAddr === underlyingAsset,
    )

    assetIdx = assetIdx === -1 ? derivAssets.length : assetIdx

    if (isShort) {
      let index, shortPositions
      try {
        shortPositions = await vault.getShortOptions(account, underlyingAsset)
        index = shortPositions.length
      } catch (error) {
        index = 0
      }

      const tx = await vault.shortOption(
        account,
        underlyingAsset,
        strikePrice,
        expiryTimestamp,
        isPut,
        amount,
        assetIdx,
        index,
      )
      await tx.wait()
      console.log(await vault.getAllOptions(account, underlyingAsset))
    } else {
      let index, longPositions
      try {
        longPositions = await vault.getLongOptions(account, underlyingAsset)
        index = longPositions.length
      } catch (error) {
        index = 0
      }
      const tx = await vault.longOption(
        account,
        underlyingAsset,
        strikePrice,
        expiryTimestamp,
        isPut,
        amount,
        assetIdx,
        index,
      )
      await tx.wait()
      console.log(await vault.getAllOptions(account, underlyingAsset))
    }
  }

  const openPerpPosition = async () => {
    const isShort = selectedMethod === 'sell'
    const amount = parseEther(perpAmount)
    const underlyingAsset = '0xCBb3a155CC7aa08434E575878e18A7a7B025b62F'
    const openPrice = parseEther('2000')

    const vault = await getExistingContract(
      AlphaSynoPerps,
      vaultAddress,
      library,
      account,
    )

    const derivAssets = await vault.getDerivAssets(account)

    let assetIdx = derivAssets.findIndex(
      (assetAddr) => assetAddr === underlyingAsset,
    )

    assetIdx = assetIdx === -1 ? derivAssets.length : assetIdx
    let tx
    if (isShort) {
      tx = await vault.shortPerp(
        account,
        underlyingAsset,
        amount,
        openPrice,
        assetIdx,
      )
    } else {
      tx = await vault.longPerp(
        account,
        underlyingAsset,
        amount,
        openPrice,
        assetIdx,
      )
    }
    await tx.wait()

    console.log(await vault.getPerpPos(account, underlyingAsset))
  }

  return (
    <VStack h="100%" w="100%" alignItems="stretch">
      <GridItemHeading w="100%">Open position</GridItemHeading>
      <ButtonGroup pb={4}>
        <Button
          w="100%"
          size="sm"
          variant={selectedContract === 'options' ? 'simple' : 'border'}
          onClick={() => {
            setSelectedContract('options')
          }}
        >
          Options
        </Button>
        <Button
          w="100%"
          size="sm"
          variant={selectedContract === 'perps' ? 'simple' : 'border'}
          onClick={() => {
            setSelectedContract('perps')
          }}
        >
          Perpetuals
        </Button>
      </ButtonGroup>

      {/* Options */}
      {selectedContract === 'options' && (
        <VStack alignItems="stretch" w="100%" alignSelf="center">
          <HStack justifyContent="space-between" mb={4}>
            <ButtonGroup w="45%">
              <Button
                w="100%"
                size="sm"
                variant={selectedMethod === 'buy' ? 'green' : 'border'}
                onClick={() => {
                  setSelectedMethod('buy')
                }}
              >
                Long
              </Button>
              <Button
                w="100%"
                size="sm"
                variant={selectedMethod === 'sell' ? 'red' : 'border'}
                onClick={() => {
                  setSelectedMethod('sell')
                }}
              >
                Short
              </Button>
            </ButtonGroup>
            <ButtonGroup w="45%">
              <Button
                w="100%"
                size="sm"
                variant={selectedOptionType === 'call' ? 'simple' : 'border'}
                onClick={() => {
                  setSelectedOptionType('call')
                }}
              >
                Call
              </Button>
              <Button
                w="100%"
                size="sm"
                variant={selectedOptionType === 'put' ? 'simple' : 'border'}
                onClick={() => {
                  setSelectedOptionType('put')
                }}
              >
                Put
              </Button>
            </ButtonGroup>
          </HStack>

          <VStack spacing={4}>
            <Menu placement="bottom">
              <MenuButton
                size="md"
                as={Button}
                variant="border"
                w="100%"
                rightIcon={<Icon fontSize="30px" as={RiArrowDropDownLine} />}
              >
                {selectedStrike ?? 'Select Strike'}
              </MenuButton>
              <MenuList>
                {[1900, 2000, 2100, 2200, 2300, 2400].map((strikePrice) => (
                  <MenuItem
                    key={strikePrice}
                    onClick={() => {
                      setSelectedStrike(strikePrice)
                    }}
                  >
                    {strikePrice}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
            <Menu placement="bottom">
              <MenuButton
                size="md"
                as={Button}
                variant="border"
                w="100%"
                rightIcon={<Icon fontSize="30px" as={RiArrowDropDownLine} />}
              >
                {selectedExpiryTime
                  ? dateTimeFormatter(selectedExpiryTime)
                  : 'Select Expiry'}
              </MenuButton>
              <MenuList>
                {[
                  1653292800,
                  1653379200,
                  1653638400,
                  1654243200,
                  1654848000,
                  1656057600,
                  1664524800,
                ].map((expiryTime) => (
                  <MenuItem
                    key={expiryTime}
                    onClick={() => {
                      setSelectedExpiryTime(expiryTime)
                    }}
                  >
                    {dateTimeFormatter(expiryTime)}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
            <Input
              placeholder="Enter Quantity"
              value={optionQuantity}
              onChange={handleOptionQuantityChange}
              disabled={!(selectedExpiryTime && selectedStrike)}
            />
            <Button
              // color={selectedMethod === 'sell' ? 'red.500' : 'green.500'}
              fontWeight="bold"
              variant={selectedMethod === 'sell' ? 'red' : 'green'}
              w="100%"
              // leftIcon={<Icon fontSize="20px" as={GoGear} />}
              disabled={
                !(selectedExpiryTime && selectedStrike && optionQuantity)
              }
              onClick={() => {
                openOptionPosition()
              }}
            >
              Confirm
            </Button>
          </VStack>
        </VStack>
      )}

      {/* Perpetuals */}
      {selectedContract === 'perps' && (
        <VStack alignItems="stretch" w="100%" alignSelf="center">
          <ButtonGroup w="45%" alignSelf="flex-start" mb={4}>
            <Button
              w="100%"
              size="sm"
              variant={selectedMethod === 'buy' ? 'green' : 'border'}
              onClick={() => {
                setSelectedMethod('buy')
              }}
            >
              Long
            </Button>
            <Button
              w="100%"
              size="sm"
              variant={selectedMethod === 'sell' ? 'red' : 'border'}
              onClick={() => {
                setSelectedMethod('sell')
              }}
            >
              Short
            </Button>
          </ButtonGroup>

          <VStack alignItems="stretch" spacing={4}>
            <Input
              placeholder="Enter Amount"
              value={perpAmount}
              onChange={handlePerpAmountChange}
            />
            {/* <Box>
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
                    bg="gray.600"
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
            </Box> */}
            <Button
              fontWeight="bold"
              size="md"
              variant={selectedMethod === 'sell' ? 'red' : 'green'}
              // leftIcon={<Icon fontSize="20px" as={GoGear} />}
              onClick={() => {
                openPerpPosition()
              }}
            >
              Confirm
            </Button>
          </VStack>
        </VStack>
      )}
    </VStack>
  )
}
