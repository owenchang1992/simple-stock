import type { NextPage } from 'next'
import useSWR from 'swr'
import styles from '../styles/Home.module.css'
import { getStock } from '../apis/getStock'

import StockTitle from '../components/StockTitle/StockTitle'
import StockMain from '../components/StockMain/StockMain'

import testData from '../public/test.json'

//TODO 1. handle organize Meta Data 2. fix typescript any
const translateData = (stockData: any) => {
  const translateTimeSeries = (data: { [x: string]: { [x: string]: any } }) => {
    const keys = Object.keys(data)

    const newTimeSeries = keys.map((title) => ({
      title,
      open: Number(data[title]['1. open']),
      height: Number(data[title]['2. high']),
      low: Number(data[title]['3. low']),
      close: Number(data[title]['4. close']),
      volume: Number(data[title]['5. volume']),
    }))

    return newTimeSeries
  }

  return  {
    metaData: stockData['Meta Data'],
    timeSeries: translateTimeSeries(
      stockData['Time Series (Daily)']
    ),
  }
}

const Home: NextPage = () => {
  // const { data, error } = useSWR('AAPL', getStock)
  // const stockData = data && !error && translateData(data.data)
  const stockData = translateData(testData)

  return (
    stockData ? (
      <div className={styles.container}>
        <StockTitle metaData={stockData.metaData}/>
        <StockMain timeSeries={stockData.timeSeries}/>
      </div>
    ) : null
  )
}

export default Home
