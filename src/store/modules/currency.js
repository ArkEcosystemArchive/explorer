import * as types from '../mutation-types'

export default {
  namespaced: true,
  state: {
    name: 'ARK',
    rate: 1,
    symbol: 'Ѧ',
    lastConversion: {
      to: 'USD',
      timestamp: 1,
      rate: 1
    }
  },
  mutations: {
    [types.SET_CURRENCY_NAME](state, payload) {
      state.name = payload.value
    },
    [types.SET_CURRENCY_RATE](state, payload) {
      state.rate = payload.value
    },
    [types.SET_CURRENCY_SYMBOL](state, payload) {
      state.symbol = payload.value
    },
    [types.SET_CURRENCY_LAST_CONVERSION](state, payload) {
      state.lastConversion = payload.value
    }
  },
  actions: {
    setName: ({commit}, value) => {
      localStorage.setItem('currencyName', value)

      commit({
        type: types.SET_CURRENCY_NAME,
        value
      })
    },
    setRate: ({commit}, value) => {
      localStorage.setItem('currencyRate', value)

      commit({
        type: types.SET_CURRENCY_RATE,
        value
      })
    },
    setSymbol: ({commit}, value) => {
      localStorage.setItem('currencySymbol', value)

      commit({
        type: types.SET_CURRENCY_SYMBOL,
        value
      })
    },
    setLastConversion: ({commit}, value) => {
      let rates = JSON.parse(localStorage.getItem(`rates_${value.to}`))

      rates = rates || {}
      rates[value.timestamp] = value.rate

      localStorage.setItem(`rates_${value.to}`, JSON.stringify(rates))

      commit({
        type: types.SET_CURRENCY_LAST_CONVERSION,
        value
      })
    }
  },
  getters: {
    name: state => state.name,
    rate: state => state.rate,
    symbol: state => state.symbol,
    lastConversion: state => state.lastConversion
  }
}
