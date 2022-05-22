import { VStack } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { GridItemHeading } from '../components';
import { liveCandleStickDataFormatter } from '../utils';
import { StatTable } from '../components';
import { tickerAssets } from '../constants/assets';

export const Assets = (props) => {
  const [priceFeeds, setPriceFeeds] = useState([]);
  useEffect(() => {
    const makereq = async () => {
      const webSocket = new WebSocket(
        'wss://streamer.cryptocompare.com/v2?api_key=8925a4fbc153877ec767efb3f4f062069f706295c45445ba7193f3dbaed393a1'
      );
      webSocket.onopen = (event) => {
        console.log('connection open');
        webSocket.send(
          JSON.stringify({
            action: 'SubAdd',
            subs: ['2~Binance~ETH~USDC'],
          })
        );
      };

      webSocket.onmessage = async (event) => {
        console.log('yooooo');
        const priceFeedReqs = tickerAssets.map((ticker) => {
          const res = axios.get(
            `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${ticker}&tsyms=USDC&api_key=8925a4fbc153877ec767efb3f4f062069f706295c45445ba7193f3dbaed393a1`
          );
          return res;
        });
        const priceFeedRes = await Promise.all(priceFeedReqs);
        const priceFeedsFormatted = priceFeedRes.map((feed, ind) => {
          const { data } = feed;
          const rate = data.RAW[tickerAssets[ind]].USDC.PRICE;
          const perc24hChange =
            data.RAW[tickerAssets[ind]].USDC.CHANGEPCT24HOUR.toFixed(3);
          const symbol = tickerAssets[ind] + '/USDC';
          return [symbol, rate, perc24hChange];
        });
        setPriceFeeds(priceFeedsFormatted);
      };
    };
    makereq();
  }, []);

  return (
    <VStack h="100%" alignItems="stretch">
      <GridItemHeading>Assets</GridItemHeading>
      <StatTable
        headingRow={['PAIR', 'RATE', '%CHANGE(24H)']}
        tableRows={priceFeeds}
        activeRow={0}
      />
    </VStack>
  );
};
