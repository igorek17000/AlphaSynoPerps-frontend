import { Button, ButtonGroup, VStack } from '@chakra-ui/react'
import { useWeb3React } from '@web3-react/core'
import { useEffect, useState } from 'react'
import { GridItemHeading, StatTable } from '../components'
import AlphaSynoPerps from '../contracts/AlphaSynoPerps.json'
import { getExistingContract } from '../utils'

export const Positions = (props) => {
  const { account, library } = useWeb3React()
  const [selectedContract, setSelectedContract] = useState('options')
  const [shortOptionPositions, setShortPositions] = useState([])
  const [longOptionPositions, setLongPositions] = useState([])
  const [perpPositions, setPerpPositions] = useState([])

  const vaultAddress = '0x275b9fe6FFb8f619E60958aEB2CafB50e9c0745b'

  useEffect(() => {
    const fetchPositions = async () => {
      const vault = await getExistingContract(
        AlphaSynoPerps,
        vaultAddress,
        library,
        account,
      )
      const shortPositions = await vault.getShortOptions(
        account,
        '0xCBb3a155CC7aa08434E575878e18A7a7B025b62F',
      )
      const longPositions = await vault.getLongOptions(
        account,
        '0xCBb3a155CC7aa08434E575878e18A7a7B025b62F',
      )
      const perpPositions = await vault.getPerpPos(
        account,
        '0xCBb3a155CC7aa08434E575878e18A7a7B025b62F',
      )
    }
    account && library && fetchPositions()
  }, [])

  return (
    <VStack h="100%" w="100%" alignItems="stretch">
      <GridItemHeading w="100%">Postions</GridItemHeading>
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
          <StatTable
            headingRow={['Expiry', 'Strike', 'Size', 'Type']}
            tableRows={[['0', '0', '0', '0']]}
            activeRow={0}
          />
        </VStack>
      )}

      {/* Perpetuals */}
      {selectedContract === 'perps' && (
        <VStack alignItems="stretch" w="100%" alignSelf="center">
          <StatTable
            headingRow={['Expiry', 'Strike', 'Size', 'Type']}
            tableRows={[['0', '0', '0', '0']]}
            activeRow={0}
          />
        </VStack>
      )}
    </VStack>
  )
}
