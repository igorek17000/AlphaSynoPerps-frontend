import { VStack } from '@chakra-ui/react';
import React, { useEffect, useState, useRef } from 'react';
import { GridItemHeading } from '../components';
import { CandleStickChart } from '../components';
import { candlestickSeriesData } from '../constants/chartMockData';
import axios from 'axios';

const colors = {
  backgroundColor: 'rgba(255,255,255,0)',
  textColor: '#CBD5E0',
  areaTopColor: '#2962FF',
  areaBottomColor: 'rgba(41, 98, 255, 0.0)',
};

export const PriceChart = (props) => {
  const [candleStickData, setCandleStickData] = useState([]);
  const chartRef = useRef();
  useEffect(() => {
    const makereq = async () => {
      // const apiKey =
      //   'HNReE0c5zfmn0s4csxL15mZ8B4SNRBsToGFjWXOFgiXKFQwozZashNytCFNlOeNW';
      // const apiSecret =
      //   'JQdNoxPg2gAMdqpZxvUn7paDABfZhrnESyyYCXw8MDymRoxkGPu61GiMpE8RbwD8';
      // const client = new Spot(apiKey, apiSecret);
      const res = await axios.get(
        'https://min-api.cryptocompare.com/data/v2/histohour?fsym=ETH&tsym=USD&api_key=8925a4fbc153877ec767efb3f4f062069f706295c45445ba7193f3dbaed393a1'
      );
      // console.log('yooo');
      // const data = res.data.Data.Data.map((candle) => {
      //   const time = new Date(candle.time * 1000).toISOString();
      //   return { ...candle, time };
      // });
      // console.log(data);
      // console.log('ppppppppooo');
      setCandleStickData(res.data.Data.Data);
    };
    makereq();
  }, []);

  useEffect(() => {
    const makereq2 = async () => {
      const webSocket = new WebSocket(
        'wss://streamer.cryptocompare.com/v2?api_key=8925a4fbc153877ec767efb3f4f062069f706295c45445ba7193f3dbaed393a1'
      );
      webSocket.onopen = (event) => {
        console.log('connection open');
        webSocket.send(
          JSON.stringify({
            action: 'SubAdd',
            subs: ['24~CCCAGG~ETH~USDT~H'],
          })
        );
      };

      webSocket.onmessage = (event) => {
        console.log(event.data);
      };
    };
    makereq2();
  }, []);

  return (
    <VStack h="100%" w="100%" alignItems="stretch">
      <GridItemHeading>Price Chart</GridItemHeading>
      <CandleStickChart
        ref={chartRef}
        flex="1"
        colors={colors}
        data={candleStickData}
      />
    </VStack>
  );
};
