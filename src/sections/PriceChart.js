import { VStack } from '@chakra-ui/react'
import React, { useEffect, useState, useRef } from 'react'
import { GridItemHeading } from '../components'
import { CandleStickChart } from '../components'
import { liveCandleStickDataFormatter } from '../utils'
import axios from 'axios'
import { AdvChart } from '../components/charts/AdvCharts'

const colors = {
  backgroundColor: 'rgba(255,255,255,0)',
  textColor: '#CBD5E0',
  areaTopColor: '#2962FF',
  areaBottomColor: 'rgba(41, 98, 255, 0.0)',
}

export const PriceChart = (props) => {
  const [candleStickData, setCandleStickData] = useState([])
  const candlestickSeries = useRef()
  const chartRef = useRef()

  // useEffect(() => {
  //   const makereq = async () => {
  //     const webSocket = new WebSocket(
  //       'wss://streamer.cryptocompare.com/v2?api_key=aa582ebc7c7672f2280fce8605d91af7c1a71425d17099a4b8ac77db18a21b57',
  //     )
  //     webSocket.onopen = (event) => {
  //       console.log('connection open')
  //       webSocket.send(
  //         JSON.stringify({
  //           action: 'SubAdd',
  //           subs: ['24~CCCAGG~ETH~USDC~m'],
  //         }),
  //       )
  //     }

  //     webSocket.onmessage = (event) => {
  //       const { TYPE } = JSON.parse(event.data)
  //       if (TYPE === '24') {
  //         candlestickSeries.current.update(
  //           liveCandleStickDataFormatter(JSON.parse(event.data)),
  //         )
  //       }
  //     }
  //   }
  //   makereq()
  // }, [])

  const chartProps = {
    symbol: 'Bitfinex:BTC/USD',
    interval: '5D',
    libraryPath: '../charting_library/',
    chartsStorageUrl: 'https://saveload.tradingview.com',
    chartsStorageApiVersion: '1.1',
    clientId: 'tradingview.com',
    userId: 'public_user_id',
    fullscreen: false,
    autosize: true,
    studiesOverrides: {},
  }

  return (
    <VStack h="100%" w="100%" alignItems="stretch">
      {/* <GridItemHeading>Price Chart</GridItemHeading> */}
      {/* <CandleStickChart
        ref={chartRef}
        candlestickSeries={candlestickSeries}
        flex="1"
        colors={colors}
        data={candleStickData}
      /> */}
      <AdvChart ref={chartRef} {...chartProps} />
    </VStack>
  )
}
