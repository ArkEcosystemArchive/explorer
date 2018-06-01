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

  readableTimestamp(value, timeZoneOffset) {
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
      .add(Math.abs(typeof timeZoneOffset !== 'undefined' ? timeZoneOffset : new Date().getTimezoneOffset()), 'minutes')
      .add(value, 'seconds')
      .format('DD.MM.YYYY HH:mm:ss')
  },

  readableTimestampAgo(time, compareTime) {
    const getTime = function (t) {
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
        .add(t, 'seconds')
    }

    const momentTime = getTime(time)
    return typeof compareTime !== 'undefined' ? momentTime.from(getTime(compareTime)) : momentTime.fromNow()
  },

  truncate(value, length = 13, truncateWhere = 'middle') {
    switch (truncateWhere) {
      case 'left':
        return (value.length > length)
          ? `...${value.slice(value.length - length + 3)}`
          : value

      case 'middle':
        const odd = length % 2
        const truncationLength = Math.floor((length - 1) / 2)
        return (value.length > length)
          ? `${value.slice(0, truncationLength - odd)}...${value.slice(value.length - truncationLength + 1)}`
          : value

      case 'right':
        return (value.length > length)
          ? `${value.slice(0, length - 3)}...`
          : value

      default:
        return value
    }
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

  readableCrypto(value, appendCurrency = true, decimals = 8) {
    if (typeof value !== 'undefined') {
      value = (value /= Math.pow(10, 8)).toLocaleString(undefined, {
        maximumFractionDigits: decimals,
      })

      return appendCurrency ? `${value} ${store.getters['network/symbol']}` : value
    }
  },

  networkToken() {
    return store.getters['network/token']
  },

  capitalize(value) {
    return value.charAt(0).toUpperCase() + value.slice(1)
  },

  percentageString(value, decimals = 2) {
    if (typeof value !== 'undefined') {
      value = value.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })

      return value + '%'
    }

    return '-'
  },
}

Vue.mixin({
  methods,
})

export default methods
