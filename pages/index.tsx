import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'

import StockTitle from '../components/StockTitle/StockTitle'
import StockMain from '../components/StockMain/StockMain'

import testJson from '../public/test.json'

const Home: NextPage = () => {
  const stockInfo = testJson

  return (
    <div className={styles.container}>
      <StockTitle metaData={stockInfo['Meta Data']}/>
      <StockMain />
    </div>
  )
}

export default Home
