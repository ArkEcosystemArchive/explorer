import axios from 'axios'
import moment from 'moment'
import genericPool from 'generic-pool'
import store from '@/store'

// CryptoCompare API supports until 50 requests per second
const MAX_REQUEST_PER_SECOND = 50
const SECONDS_PER_DAY = 86400

const requestFactory = {
  create () {
    return axios
  },
  destroy (resource) {
    return Promise.resolve()
  }
}

const requestPool = genericPool.createPool(requestFactory, {
  max: MAX_REQUEST_PER_SECOND
})

class CryptoCompareService {
  async get (url, options) {
    const client = await requestPool.acquire()
    const response = await client.get(url, options)

    // @see https://github.com/coopernurse/node-pool/issues/206
    try {
      await requestPool.release(client)
    } catch (error) {
      if (error.message !== 'Resource not currently part of this pool') {
        throw error
      }
    }

    return response
  }

  async price (currency) {
    const response = await this.get(`https://min-api.cryptocompare.com/data/price?fsym=ARK&tsyms=${currency}`)
    if (response.data[currency]) {
      return Number(response.data[currency])
    }
  }

  async day () {
    return this.sendRequest('hour', 24, 'HH:mm')
  }

  async week () {
    return this.sendRequest('day', 7, 'DD.MM')
  }

  async month () {
    return this.sendRequest('day', 30, 'DD.MM')
  }

  async quarter () {
    return this.sendRequest('day', 120, 'DD.MM')
  }

  async year () {
    return this.sendRequest('day', 365, 'DD.MM')
  }

  async sendRequest (type, limit, dateTimeFormat) {
    const date = Math.round(new Date().getTime() / 1000)
    const token = store.getters['network/token']

    let targetCurrency = 'USD'
    if (store.getters['currency/name'] !== token) {
      targetCurrency = store.getters['currency/name']
    }

    const response = await this.get(`https://min-api.cryptocompare.com/data/histo${type}`, {
      params: {
        fsym: token,
        tsym: targetCurrency,
        toTs: date,
        limit
      }
    })

    return this.transform(response.data.Data, dateTimeFormat)
  }

  async dailyAverage (timestamp) {
    const networkAlias = store.getters['network/alias']
    if (networkAlias !== 'Main') {
      return null
    }

    let ts = moment
      .unix(timestamp)
    ts = ts.unix()

    // get last second of the day as unix timestamp
    ts = ts - (ts % SECONDS_PER_DAY) + SECONDS_PER_DAY - 1

    const targetCurrency = store.getters['currency/name']
    const lastConversion = store.getters['currency/lastConversion']

    if (lastConversion.to === targetCurrency && lastConversion.timestamp === ts) {
      return lastConversion.rate
    }

    const token = store.getters['network/token']
    const cache = JSON.parse(localStorage.getItem(`rates_${targetCurrency}`))

    if (cache && cache[ts]) {
      store.dispatch('currency/setLastConversion', {
        to: targetCurrency,
        timestamp: ts,
        rate: cache[ts]
      })

      return cache[ts]
    }

    const response = await this.get('https://min-api.cryptocompare.com/data/dayAvg', {
      params: {
        fsym: token,
        tsym: targetCurrency,
        toTs: ts
      }
    })

    if (response.data.Response === 'Error') {
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

  transform (response, dateTimeFormat) {
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
