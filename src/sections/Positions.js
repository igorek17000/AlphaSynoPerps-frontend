import { Button, ButtonGroup, VStack, Box, HStack } from '@chakra-ui/react'
import { useWeb3React } from '@web3-react/core'
import { useEffect, useState } from 'react'
import { GridItemHeading, StatTable } from '../components'
import AlphaSynoPerps from '../contracts/AlphaSynoPerps.json'
import { dateTimeFormatter, formatEther, getExistingContract } from '../utils'

export const Positions = (props) => {
  const { account, library } = useWeb3React()
  const [selectedContract, setSelectedContract] = useState('options')
  const [shortOptionPositions, setShortPositions] = useState([])
  const [longOptionPositions, setLongPositions] = useState([])
  const [perpPosition, setPerpPosition] = useState()

  const vaultAddress = '0xbe9854019e5EFA4109582ca7bBF003C842535D53'

  //   console.log(shortOptionPositions)

  useEffect(() => {
    const fetchPositions = async () => {
      const vault = await getExistingContract(
        AlphaSynoPerps,
        vaultAddress,
        library,
        account,
      )
      const _shortOptionPositions = await vault.getShortOptions(
        account,
        '0xCBb3a155CC7aa08434E575878e18A7a7B025b62F',
      )
      const _longOptionPositions = await vault.getLongOptions(
        account,
        '0xCBb3a155CC7aa08434E575878e18A7a7B025b62F',
      )
      const _perpPosition = await vault.getPerpPos(
        account,
        '0xCBb3a155CC7aa08434E575878e18A7a7B025b62F',
      )
      //   console.log(_shortOptionPositions[0])
      //   console.log(longOptionPositions[0])
      //   console.log(_perpPosition)
      setShortPositions(
        _shortOptionPositions.map((pos) => [
          dateTimeFormatter(pos.expiryTimestamp.toString()),
          formatEther(pos.strikePrice),
          formatEther(pos.amount),
          pos.isPut ? 'Put' : 'Call',
        ]),
      )
      setLongPositions(
        _longOptionPositions.map((pos) => [
          dateTimeFormatter(pos.expiryTimestamp.toString()),

          formatEther(pos.strikePrice),
          formatEther(pos.amount),
          pos.isPut ? 'Put' : 'Call',
        ]),
      )
      const { amount, isLong, lastUpdatedAt, openPrice } = _perpPosition
      console.log({
        amount: formatEther(amount),
        type: isLong ? 'Long' : 'Short',
        lastUpdatedAt: dateTimeFormatter(lastUpdatedAt.toString()),
        openprice: formatEther(openPrice),
      })
      setPerpPosition({
        amount: formatEther(amount),
        type: isLong ? 'Long' : 'Short',
        lastUpdatedAt: dateTimeFormatter(lastUpdatedAt.toString()),
        openPrice: formatEther(openPrice),
      })
    }
    account && library && fetchPositions()
  }, [account, library])

  return (
    <VStack h="100%" w="100%" alignItems="stretch">
      <GridItemHeading w="100%">Postions</GridItemHeading>
      <ButtonGroup pb={4} alignSelf="flex-start">
        <Button
          w="100%"
          size="md"
          variant={selectedContract === 'options' ? 'simple' : 'border'}
          onClick={() => {
            setSelectedContract('options')
          }}
        >
          Options
        </Button>
        <Button
          w="100%"
          size="md"
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
          {shortOptionPositions.length > 0 && (
            <>
              <GridItemHeading fontWeight="normal" w="100%">
                Short
              </GridItemHeading>
              <StatTable
                headingRow={['Expiry', 'Strike', 'Size', 'Type']}
                tableRows={shortOptionPositions}
                activeRow={0}
              />
            </>
          )}
          {longOptionPositions.length > 0 && (
            <>
              <GridItemHeading fontWeight="normal" w="100%">
                Long
              </GridItemHeading>
              <StatTable
                headingRow={['Expiry', 'Strike', 'Size', 'Type']}
                tableRows={longOptionPositions}
                activeRow={0}
              />
            </>
          )}
        </VStack>
      )}

      {/* Perpetuals */}
      {selectedContract === 'perps' && perpPosition && (
        <VStack alignItems="stretch" w="100%" alignSelf="center">
          <VStack>
            <Box fontWeight="bold">Amount</Box>
            <Box>{perpPosition.amount}</Box>
          </VStack>
          <VStack>
            <Box fontWeight="bold">Open price</Box>
            <Box>{perpPosition.openPrice}</Box>
          </VStack>
          <VStack>
            <Box fontWeight="bold">Last Updated At</Box>
            <Box>{perpPosition.lastUpdatedAt}</Box>
          </VStack>
          <VStack>
            <Box fontWeight="bold">Type</Box>
            <Box>{perpPosition.type}</Box>
          </VStack>
        </VStack>
      )}
    </VStack>
  )
}
