import axios from 'axios'
import moment from 'moment'
import store from '@/store'

class CryptoCompareService {
  async day() {
    return this.sendRequest('hour', 24, 'HH:mm')
  }

  async week() {
    return this.sendRequest('day', 7, 'DD.MM')
  }

  async month() {
    return this.sendRequest('day', 30, 'DD.MM')
  }

  async quarter() {
    return this.sendRequest('day', 120, 'DD.MM')
  }

  async year() {
    return this.sendRequest('day', 365, 'DD.MM')
  }

  async sendRequest(type, limit, dateTimeFormat) {
    const date = Math.round(new Date().getTime() / 1000)

    let targetCurrency = 'USD'
    if (store.getters['currency/name'] !== store.getters['network/token']) {
      targetCurrency = store.getters['currency/name']
    }

    const response = await axios
      .get(`https://min-api.cryptocompare.com/data/histo${type}`, {
        params: {
          fsym: store.getters['network/token'],
          tsym: targetCurrency,
          toTs: date,
          limit
        }
      })
    return this.transform(response.data.Data, dateTimeFormat)
  }

  async dailyAverage(timestamp) {
    const networkAlias = store.getters['network/alias']
    if (networkAlias !== 'Main') {
      return null
    }

    let ts = moment()
      .utc()
      .set({
        year: 2017,
        month: 2,
        date: 21,
        hour: 13,
        minute: 0,
        second: 0
      })
      .add(timestamp, 'seconds')
      .unix()

    // get last second of the day as unix timestamp
    ts = ts - (ts % 86400) + 86400 - 1

    const targetCurrency = store.getters['currency/name']
    const lastConversion = store.getters['currency/lastConversion']

    if (lastConversion.to === targetCurrency && lastConversion.timestamp === ts) {
      return lastConversion.rate
    }

    const token = store.getters['network/token']
    const cache = JSON.parse(localStorage.getItem(`rates_${targetCurrency}`))

    if (cache && cache.hasOwnProperty(timestamp)) {
      store.dispatch('currency/setLastConversion', {
        to: targetCurrency,
        timestamp: timestamp,
        rate: cache[timestamp]
      })

      return cache[timestamp]
    }

    const response = await axios
      .get('https://min-api.cryptocompare.com/data/dayAvg', {
        params: {
          fsym: token,
          tsym: targetCurrency,
          toTs: ts
        }
      })

    if (response.data.Response === "Error") {
      return null
    }

    const rate = response.data[targetCurrency]

    store.dispatch('currency/setLastConversion', {
      to: targetCurrency,
      timestamp: ts,
      rate: rate
    })

    return rate
  }

  transform(response, dateTimeFormat) {
    return {
      labels: response.map(value => {
        return moment.unix(value.time).format(dateTimeFormat)
      }),
      datasets: response.map(value => {
        return value.close
      })
    }
  }
}

export default new CryptoCompareService()
