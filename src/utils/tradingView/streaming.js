import { parseFullSymbol } from './helpers.js'
import * as io from 'socket.io-client'

const apiKey =
  '45d75c29c47e938467fc02fa1a1aba98b5b45f160fe9dca6af376adb3dbbd295'
const socket = new WebSocket(
  'wss://streamer.cryptocompare.com/v2?api_key=' + apiKey,
)

const channelToSubscription = new Map()

socket.onopen = () => {
  console.log('[socket] Connected')
}

socket.onclose = (event) => {
  console.log('[socket] Disconnected:', event.reason)
}

socket.onerror = (error) => {
  console.log('[socket] Error:', error)
}

socket.onmessage = (event) => {
  const { data } = event
  console.log('[socket] Message:', data)
  const [
    eventTypeStr,
    exchange,
    fromSymbol,
    toSymbol,
    ,
    ,
    tradeTimeStr,
    ,
    tradePriceStr,
  ] = data.split('~')

  if (parseInt(eventTypeStr) !== 0) {
    // skip all non-TRADE events
    return
  }
  const tradePrice = parseFloat(tradePriceStr)
  const tradeTime = parseInt(tradeTimeStr)
  const channelString = `0~${exchange}~${fromSymbol}~${toSymbol}`
  const subscriptionItem = channelToSubscription.get(channelString)
  if (subscriptionItem === undefined) {
    return
  }
  const lastDailyBar = subscriptionItem.lastDailyBar
  const nextDailyBarTime = getNextDailyBarTime(lastDailyBar.time)

  let bar
  if (tradeTime >= nextDailyBarTime) {
    bar = {
      time: nextDailyBarTime,
      open: tradePrice,
      high: tradePrice,
      low: tradePrice,
      close: tradePrice,
    }
    console.log('[socket] Generate new bar', bar)
  } else {
    bar = {
      ...lastDailyBar,
      high: Math.max(lastDailyBar.high, tradePrice),
      low: Math.min(lastDailyBar.low, tradePrice),
      close: tradePrice,
    }
    console.log('[socket] Update the latest bar by price', tradePrice)
  }
  subscriptionItem.lastDailyBar = bar

  // send data to every subscriber of that symbol
  subscriptionItem.handlers.forEach((handler) => handler.callback(bar))
}

function getNextDailyBarTime(barTime) {
  const date = new Date(barTime * 1000)
  date.setDate(date.getDate() + 1)
  return date.getTime() / 1000
}

export function subscribeOnStream(
  symbolInfo,
  resolution,
  onRealtimeCallback,
  subscribeUID,
  onResetCacheNeededCallback,
  lastDailyBar,
) {
  const parsedSymbol = parseFullSymbol(symbolInfo.full_name)
  const channelString = `24~${parsedSymbol.exchange}~${parsedSymbol.fromSymbol}~${parsedSymbol.toSymbol}~m`
  const handler = {
    id: subscribeUID,
    callback: onRealtimeCallback,
  }
  let subscriptionItem = channelToSubscription.get(channelString)
  if (subscriptionItem) {
    // already subscribed to the channel, use the existing subscription
    subscriptionItem.handlers.push(handler)
    return
  }
  subscriptionItem = {
    subscribeUID,
    resolution,
    lastDailyBar,
    handlers: [handler],
  }
  channelToSubscription.set(channelString, subscriptionItem)
  console.log(
    '[subscribeBars]: Subscribe to streaming. Channel:',
    channelString,
  )
  socket.send(JSON.stringify({ action: 'SubAdd', subs: [channelString] }))
}

export function unsubscribeFromStream(subscriberUID) {
  // find a subscription with id === subscriberUID
  for (const channelString of channelToSubscription.keys()) {
    const subscriptionItem = channelToSubscription.get(channelString)
    const handlerIndex = subscriptionItem.handlers.findIndex(
      (handler) => handler.id === subscriberUID,
    )

    if (handlerIndex !== -1) {
      // remove from handlers
      subscriptionItem.handlers.splice(handlerIndex, 1)

      if (subscriptionItem.handlers.length === 0) {
        // unsubscribe from the channel, if it was the last handler
        console.log(
          '[unsubscribeBars]: Unsubscribe from streaming. Channel:',
          channelString,
        )
        socket.send(
          JSON.stringify({ action: 'SubRemove', subs: [channelString] }),
        )
        channelToSubscription.delete(channelString)
        break
      }
    }
  }
}
