import axios from 'axios'

class CoinMarketCapService {
  price(currency) {
    return axios
      .get(`https://api.coinmarketcap.com/v1/ticker/ark/?convert=${currency}`)
      .then(response => Number(response.data[0][`price_${currency.toLowerCase()}`]))
  }
}

export default new CoinMarketCapService()
