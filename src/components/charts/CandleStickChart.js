import { createChart, ColorType } from 'lightweight-charts';
import { Box } from '@chakra-ui/react';
import React, { useEffect, useRef } from 'react';

export const CandleStickChart = (props) => {
  const chartContainerRef = useRef();
  const { data, colors } = props;
  const {
    backgroundColor,
    lineColor,
    textColor,
    areaTopColor,
    areaBottomColor,
  } = colors;

  useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: {
          type: ColorType.Solid,
          color: backgroundColor,
        },
        textColor,
      },
      grid: {
        vertLines: { color: 'RGBA(0, 0, 0, 0.2)' },
        horzLines: { color: 'RGBA(0, 0, 0, 0.2)' },
      },
      width: chartContainerRef.current.clientWidth,
      height: 300,
      rightPriceScale: { borderVisible: false },
      timeScale: { borderVisible: false },
    });
    chart.timeScale().fitContent();

    const candlestickSeries = chart.addCandlestickSeries();
    candlestickSeries.setData(data);

    setTimeout(() => {
      candlestickSeries.update({
        time: '2018-12-31',
        open: 109.87,
        high: 114.69,
        low: 85.66,
        close: 112,
      });
    }, 4000);

    setTimeout(() => {
      candlestickSeries.update({
        time: '2019-01-01',
        open: 112,
        high: 112,
        low: 100,
        close: 101,
      });
    }, 6000);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);

      chart.remove();
    };
  }, [
    data,
    backgroundColor,
    lineColor,
    textColor,
    areaTopColor,
    areaBottomColor,
  ]);

  return <Box ref={chartContainerRef} />;
};
