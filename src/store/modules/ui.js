import * as types from '../mutation-types'

export default {
  namespaced: true,
  state: {
    language: 'en-GB',
    locale: navigator.language || 'en-GB',
    nightMode: false,
    priceChart: true,
    priceChartPeriod: 'day',
    priceChartType: 'price',
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
    [types.SET_UI_PRICE_CHART_TYPE] (state, payload) {
      state.priceChartType = payload.value
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
    setPriceChartType: ({ commit }, value) => {
      localStorage.setItem('priceChartType', value)

      commit({
        type: types.SET_UI_PRICE_CHART_TYPE,
        value
      })
    },
    setBlockSortParams: ({ commit }, value) => {
      value = JSON.stringify(value)

      localStorage.setItem('blockSortParams', value)

      commit({
        type: types.SET_UI_BLOCK_SORT_PARAMS,
        value
      })
    },
    setTransactionSortParams: ({ commit }, value) => {
      value = JSON.stringify(value)

      localStorage.setItem('transactionSortParams', value)

      commit({
        type: types.SET_UI_TRANSACTION_SORT_PARAMS,
        value
      })
    },
    setWalletSortParams: ({ commit }, value) => {
      value = JSON.stringify(value)

      localStorage.setItem('walletSortParams', value)

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
    priceChartType: state => state.priceChartType,
    headerType: state => state.headerType,
    menuVisible: state => state.menuVisible,

    blockSortParams (state) {
      const params = state.blockSortParams || localStorage.getItem('blockSortParams')
      return params ? JSON.parse(params) : { field: 'height', type: 'desc' }
    },

    transactionSortParams (state) {
      const params = state.transactionSortParams || localStorage.getItem('transactionSortParams')
      return params ? JSON.parse(params) : { field: 'timestamp.unix', type: 'desc' }
    },

    walletSortParams (state) {
      const params = state.walletSortParams || localStorage.getItem('walletSortParams')
      return params ? JSON.parse(params) : { field: 'originalIndex', type: 'asc' }
    }
  }
}
