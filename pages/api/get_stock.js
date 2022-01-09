import axios from "axios"

const TIME_SERIES_DAILY = 'TIME_SERIES_DAILY'
const JSON = 'json'
const COMPACT = 'compact'

const getStock = (stockName = 'MSFT') => {
  return axios({
    method: 'get',
    baseURL: 'https://alpha-vantage.p.rapidapi.com/query',
    headers: {
      'Accept': '*/*',
      'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com',
      'X-RapidAPI-Key': process.env.RAPIDAPI_KEY
    },
    params: {
      function: TIME_SERIES_DAILY,
      symbol: stockName,
      datatype: JSON,
      output_size: COMPACT,
    }
  })
}

export default function handler(req, res) {
  getStock(req.query.symbol)
    .then((resp) => res.status(200).json(resp.data))
    .catch(error => console.log(error))
}