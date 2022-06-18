import { Box } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { widget } from '../../charting_library'
// import { Datafeeds } from '../../charting_library'
import Datafeed from '../../utils/tradingView/datafeed'

export const AdvChart = React.forwardRef((props, ref) => {
  let tvWidget

  useEffect(() => {
    const widgetOptions = {
      symbol: props.symbol,
      datafeed: Datafeed,
      interval: props.interval,
      container: ref.current,
      library_path: props.libraryPath,

      locale: 'en',
      disabled_features: ['use_localstorage_for_settings'],
      enabled_features: ['study_templates'],
      charts_storage_url: props.chartsStorageUrl,
      charts_storage_api_version: props.chartsStorageApiVersion,
      client_id: props.clientId,
      user_id: props.userId,
      fullscreen: props.fullscreen,
      autosize: props.autosize,
      studies_overrides: props.studiesOverrides,
      theme: 'Dark',
    }

    tvWidget = new widget(widgetOptions)

    // tvWidget.onChartReady(() => {
    //   tvWidget.headerReady().then(() => {
    //     const button = tvWidget.createButton()
    //     button.setAttribute('title', 'Click to show a notification popup')
    //     button.classList.add('apply-common-tooltip')
    //     button.addEventListener('click', () =>
    //       tvWidget.showNoticeDialog({
    //         title: 'Notification',
    //         body: 'TradingView Charting Library API works correctly',
    //         callback: () => {
    //           console.log('Noticed!')
    //         },
    //       }),
    //     )

    //     button.innerHTML = 'Check API'
    //   })
    // })
    return () => {
      if (tvWidget !== null) {
        tvWidget.remove()
        tvWidget = null
      }
    }
  }, [])

  return <Box ref={ref} h="100%" />
})
