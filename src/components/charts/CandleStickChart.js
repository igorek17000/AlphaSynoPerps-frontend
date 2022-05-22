import { Box } from '@chakra-ui/react';
import { ColorType, createChart } from 'lightweight-charts';
import React, { useEffect } from 'react';

export const CandleStickChart = React.forwardRef((props, ref) => {
  const { data, colors, candlestickSeries, ...rest } = props;
  const {
    backgroundColor,
    lineColor,
    textColor,
    areaTopColor,
    areaBottomColor,
  } = colors;

  useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({ width: ref.current.clientWidth });
    };

    const chart = createChart(ref.current, {
      layout: {
        background: {
          type: ColorType.Solid,
          color: backgroundColor,
        },
        textColor,
        fontFamily: '"Rajdhani", sans-serif',
      },
      grid: {
        vertLines: { color: 'RGBA(0, 0, 0, 0.3)' },
        horzLines: { color: 'RGBA(0, 0, 0, 0.3)' },
      },
      width: ref.current.clientWidth,
      height: ref.current.clientHeight,
      rightPriceScale: { borderVisible: false },
      timeScale: {
        borderVisible: false,
        tickMarkFormatter: (time) => {
          const date = new Date(time * 1000);
          // console.log(date.getHours() + ':' + date.getMinutes());
          return date.getHours() + ':' + date.getMinutes();
        },
      },
    });

    candlestickSeries.current = chart.addCandlestickSeries();
    candlestickSeries.current.setData(data);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);

      chart.remove();
    };
  }, [
    data,
    backgroundColor,
    lineColor,
    ref,
    textColor,
    areaTopColor,
    areaBottomColor,
    candlestickSeries,
  ]);

  return <Box ref={ref} {...rest} />;
});
