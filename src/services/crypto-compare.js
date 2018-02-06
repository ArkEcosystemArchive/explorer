import axios from 'axios'
import moment from 'moment'
import store from '@/store'

class CryptoCompareService {
  day() {
    return this.sendRequest('hour', 24, 'HH:mm')
  }

  week() {
    return this.sendRequest('day', 7, 'DD.MM')
  }

  month() {
    return this.sendRequest('day', 30, 'DD.MM')
  }

  quarter() {
    return this.sendRequest('day', 120, 'DD.MM')
  }

  year() {
    return this.sendRequest('day', 365, 'DD.MM')
  }

  sendRequest(type, limit, dateTimeFormat) {
    const date = Math.round(new Date().getTime() / 1000)

    let targetCurrency = 'USD'
    if (store.getters['currency/name'] !== store.getters['network/token']) {
      targetCurrency = store.getters['currency/name']
    }

    return axios
      .get(`https://min-api.cryptocompare.com/data/histo${type}`, {
        params: {
          fsym: store.getters['network/token'],
          tsym: targetCurrency,
          toTs: date,
          limit
        }
      })
      .then(response =>
        this.transform(response.data.Data, dateTimeFormat)
      )
  }

  transform(response, dateTimeFormat) {
    return Promise.resolve({
      labels: response.map(value => {
        return moment.unix(value.time).format(dateTimeFormat)
      }),
      datasets: response.map(value => {
        return value.close
      })
    })
  }
}

export default new CryptoCompareService()
