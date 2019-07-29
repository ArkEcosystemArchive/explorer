import * as types from '../mutation-types'

export default {
  namespaced: true,
  state: {
    language: 'en-gb',
    locale: navigator.language || 'en-gb',
    nightMode: false,
    priceChart: true,
    priceChartPeriod: 'day',
    headerType: null,
    menuVisible: false,
    blockSortParams: null,
    transactionSortParams: null,
    walletSortParams: null
  },
  mutations: {
    [types.SET_UI_LANGUAGE] (state, payload) {
      state.language = payload.value
    },
    [types.SET_UI_LOCALE] (state, payload) {
      state.locale = payload.value
    },
    [types.SET_UI_NIGHT_MODE] (state, payload) {
      state.nightMode = payload.value
    },
    [types.SET_UI_HEADER_TYPE] (state, payload) {
      state.headerType = payload.value
    },
    [types.SET_UI_MENU_VISIBLE] (state, payload) {
      state.menuVisible = payload.value
    },
    [types.SET_UI_PRICE_CHART] (state, payload) {
      state.priceChart = payload.value
    },
    [types.SET_UI_PRICE_CHART_PERIOD] (state, payload) {
      state.priceChartPeriod = payload.value
    },
    [types.SET_UI_BLOCK_SORT_PARAMS] (state, payload) {
      state.blockSortParams = payload.value
    },
    [types.SET_UI_TRANSACTION_SORT_PARAMS] (state, payload) {
      state.transactionSortParams = payload.value
    },
    [types.SET_UI_WALLET_SORT_PARAMS] (state, payload) {
      state.walletSortParams = payload.value
    }
  },
  actions: {
    setLanguage: ({ commit }, value) => {
      localStorage.setItem('language', value)

      commit({
        type: types.SET_UI_LANGUAGE,
        value
      })
    },
    setLocale: ({ commit }, value) => {
      localStorage.setItem('locale', value)

      commit({
        type: types.SET_UI_LOCALE,
        value
      })
    },
    setNightMode: ({ commit }, value) => {
      localStorage.setItem('nightMode', value)

      value = JSON.parse(value)

      commit({
        type: types.SET_UI_NIGHT_MODE,
        value
      })
    },
    setHeaderType: ({ commit }, value) => {
      commit({
        type: types.SET_UI_MENU_VISIBLE,
        value: null
      })

      commit({
        type: types.SET_UI_HEADER_TYPE,
        value
      })
    },
    setMenuVisible: ({ commit }, value) => {
      commit({
        type: types.SET_UI_HEADER_TYPE,
        value: null
      })

      commit({
        type: types.SET_UI_MENU_VISIBLE,
        value
      })
    },
    setPriceChart: ({ commit }, value) => {
      localStorage.setItem('priceChart', value)

      commit({
        type: types.SET_UI_PRICE_CHART,
        value: JSON.parse(value)
      })
    },
    setPriceChartPeriod: ({ commit }, value) => {
      localStorage.setItem('priceChartPeriod', value)

      commit({
        type: types.SET_UI_PRICE_CHART_PERIOD,
        value
      })
    },
    setBlockSortParams: ({ commit }, value) => {
      localStorage.setItem('blockSortParams', JSON.stringify(value))

      commit({
        type: types.SET_UI_BLOCK_SORT_PARAMS,
        value
      })
    },
    setTransactionSortParams: ({ commit }, value) => {
      localStorage.setItem('transactionSortParams', JSON.stringify(value))

      commit({
        type: types.SET_UI_TRANSACTION_SORT_PARAMS,
        value
      })
    },
    setWalletSortParams: ({ commit }, value) => {
      localStorage.setItem('walletSortParams', JSON.stringify(value))

      commit({
        type: types.SET_UI_WALLET_SORT_PARAMS,
        value
      })
    }
  },
  getters: {
    language: state => state.language,
    locale: state => state.locale,
    nightMode: state => state.nightMode,
    priceChart: state => state.priceChart,
    priceChartPeriod: state => state.priceChartPeriod,
    headerType: state => state.headerType,
    menuVisible: state => state.menuVisible,

    blockSortParams (state) {
      if (state.blockSortParams) {
        return state.blockSortParams
      }

      const storedParams = localStorage.getItem('blockSortParams')
      return storedParams ? JSON.parse(storedParams) : { field: 'height', type: 'desc' }
    },

    transactionSortParams (state) {
      if (state.transactionSortParams) {
        return state.transactionSortParams
      }

      const storedParams = localStorage.getItem('transactionSortParams')
      return storedParams ? JSON.parse(storedParams) : { field: 'timestamp.unix', type: 'desc' }
    },

    walletSortParams (state) {
      if (state.walletSortParams) {
        return state.walletSortParams
      }

      const storedParams = localStorage.getItem('walletSortParams')
      return storedParams ? JSON.parse(storedParams) : { field: 'originalIndex', type: 'asc' }
    }
  }
}
