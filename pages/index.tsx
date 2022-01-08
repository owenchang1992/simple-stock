import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'

import StockTitle from '../components/StockTitle/StockTitle'
import StockMain from '../components/StockMain/StockMain'

import testJson from '../public/test.json'

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
  const stockData = translateData(testJson)

  return (
    <div className={styles.container}>
      <StockTitle metaData={stockData.metaData}/>
      <StockMain timeSeries={stockData.timeSeries}/>
    </div>
  )
}

export default Home
