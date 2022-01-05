import styles from './StockTitle.module.scss'

interface Props {
  metaData: {
    ['1. Information']?: string,
    ['2. Symbol']: string,
    ['3. Last Refreshed']?: string,
    ['4. Output Size']?: string,
    ['5. Time Zone']?: string,
  }
}

const StockTitle: React.FC<Props> = ({ metaData }) => {
  return (
    <label className={styles.title}>{metaData['2. Symbol']}</label>
  )
}

export default StockTitle