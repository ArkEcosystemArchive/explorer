import Vue from 'vue'
import moment from 'moment'
import store from '@/store'

const methods = {
  isDelegateByAddress(address) {
    return (
      this.$store.getters['delegates/delegates'].filter(
        d => d.address === address
      ).length > 0
    )
  },

  isDelegateByPublicKey(publicKey) {
    return (
      this.$store.getters['delegates/delegates'].filter(
        d => d.publicKey === publicKey
      ).length > 0
    )
  },

  readableTimestamp(value) {
    return moment()
      .utc()
      .set({
        year: 2017,
        month: 2,
        date: 21,
        hour: 13,
        minute: 0,
        second: 0,
      })
      .add(Math.abs(new Date().getTimezoneOffset()), 'minutes')
      .add(value, 'seconds')
      .format('DD.MM.YYYY HH:mm:ss')
  },

  readableTimestampAgo(value) {
    return moment()
      .utc()
      .set({
        year: 2017,
        month: 2,
        date: 21,
        hour: 13,
        minute: 0,
        second: 0,
      })
      .add(value, 'seconds')
      .fromNow()
  },

  truncate(value, length = 12) {
    return (value.length > length)
      ? `${value.slice(0, 5)}...${value.slice(value.length - 5)}`
      : value
  },

  rawCurrency(value, currencyName) {
    return [store.getters['network/token'], 'BTC', 'ETH', 'LTC'].some(
      c => currencyName.indexOf(c) > -1
    )
      ? value.toLocaleString(undefined, {
        maximumFractionDigits: 8,
      })
      : value.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
  },

  readableNumber(value, digits = 2) {
    return value.toFixed(digits)
  },

  readableFiat(value) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: store.getters['currency/name'],
      minimumFractionDigits: 2,
    }).format(value)
  },

  readableCurrency(value, currency = null, normalise = true) {
    const currencyName = currency || store.getters['currency/name']

    value *= store.getters['currency/rate']

    if (normalise) {
      value /= Math.pow(10, 8)
    }

    return [store.getters['network/token'], 'BTC', 'ETH', 'LTC'].some(
      c => currencyName.indexOf(c) > -1
    )
      ? value.toLocaleString(undefined, {
        maximumFractionDigits: 8,
      })
      : value.toLocaleString(undefined, {
        maximumFractionDigits: 2,
      })
  },

  readableCrypto(value, appendCurrency = true) {
    value = (value /= Math.pow(10, 8)).toLocaleString(undefined, {
      maximumFractionDigits: 8,
    })

    return appendCurrency ? `${value} ${store.getters['network/symbol']}` : value
  },

  capitalize(value) {
    return value.charAt(0).toUpperCase() + value.slice(1)
  },
}

Vue.mixin({
  methods,
})

export default methods
