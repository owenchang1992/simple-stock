import axios from "axios"

const TIME_SERIES_DAILY = 'TIME_SERIES_DAILY'
const JSON = 'json'
const COMPACT = 'compact'

export const getStock = (stockName = 'MSFT') => {
  return axios({
    method: 'get',
    baseURL: 'https://alpha-vantage.p.rapidapi.com/query',
    headers: {
      'Accept': '*/*',
      'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com',
      'X-RapidAPI-Key': 'd9c985121bmshaa82f3661131823p111d52jsn1752e4662d71'
    },
    params: {
      function: TIME_SERIES_DAILY,
      symbol: stockName,
      datatype: JSON,
      output_size: COMPACT,
    }
})
}

