import { createChart, ColorType } from 'lightweight-charts';
import { Box } from '@chakra-ui/react';
import React, { useEffect, useRef } from 'react';

export const CandleStickChart = React.forwardRef((props, ref) => {
  const { data, colors, ...rest } = props;
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
        vertLines: { color: 'RGBA(0, 0, 0, 0.2)' },
        horzLines: { color: 'RGBA(0, 0, 0, 0.2)' },
      },
      width: ref.current.clientWidth,
      height: ref.current.clientHeight,
      rightPriceScale: { borderVisible: false },
      timeScale: {
        borderVisible: false,
        tickMarkFormatter: (time) => {
          const date = new Date(time * 1000);
          return date.getHours() + ':' + date.getMinutes();
        },
      },
    });
    chart.timeScale().fitContent();

    const candlestickSeries = chart.addCandlestickSeries();
    candlestickSeries.setData(data);

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
  ]);

  return <Box ref={ref} {...rest} />;
});
