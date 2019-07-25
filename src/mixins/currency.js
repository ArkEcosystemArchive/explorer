import store from '@/store'

const locale = store.getters['ui/locale']

export default {
  methods: {
    readableCrypto (value, appendCurrency = true, decimals = 8) {
      if (typeof value !== 'undefined') {
        value = (value /= 1e8).toLocaleString(locale, {
          maximumFractionDigits: decimals
        })

        return appendCurrency ? `${value} ${
          store.getters['network/symbol'] ||
            store.getters['network/defaults'].symbol ||
            ''
        }` : value
      }
    },

    readableCurrency (value, rate = null, currency = null, normalise = true) {
      const currencyName = currency || store.getters['currency/name']

      if (normalise) {
        value = parseInt(value, 10) / 1e8
      }

      value *= rate || store.getters['currency/rate']

      const cryptos = {
        ARK: 'Ѧ',
        BTC: 'Ƀ',
        ETH: 'Ξ',
        LTC: 'Ł'
      }

      return [store.getters['network/token'], 'BTC', 'ETH', 'LTC'].some(
        c => currencyName.indexOf(c) > -1
      )
        ? `${value.toLocaleString(locale, {
          maximumFractionDigits: 8
        })} ${cryptos[currencyName]}`
        : value.toLocaleString(locale, {
          style: 'currency',
          currency: currencyName
        })
    },

    rawCurrency (value, currencyName) {
      return [store.getters['network/token'], 'BTC', 'ETH', 'LTC'].some(
        c => currencyName.indexOf(c) > -1
      )
        ? value.toLocaleString(locale, {
          maximumFractionDigits: 8
        })
        : value.toLocaleString(locale, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })
    }
  }
}
