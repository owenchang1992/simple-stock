import axios from "axios"

export const getStock = (stockName = 'AAPL') => axios({
  method: 'get',
  baseURL: '/api/get_stock',
  params: { symbol: stockName }
})

