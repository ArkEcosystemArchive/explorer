import axios from 'axios'
import store from '@/store'

class CoinMarketCapService {
  price(currency) {
    const cmcCurrencyName = store.getters['network/config'].cmcCurrencyName
    if (!cmcCurrencyName) {
      return Promise.resolve(0)
    }

    return axios
      .get(`https://api.coinmarketcap.com/v1/ticker/${cmcCurrencyName}/?convert=${currency}`)
      .then(response => Number(response.data[0][`price_${currency.toLowerCase()}`]))
  }
}

export default new CoinMarketCapService()
