import * as types from '../mutation-types'

export default {
  namespaced: true,

  state: {
    delegates: [],
    forged: []
  },

  mutations: {
    [types.SET_DELEGATES] (state, payload) {
      state.delegates = payload.value
    },
    [types.SET_FORGED] (state, payload) {
      state.forged = payload.value
    }
  },

  actions: {
    setDelegates: ({ commit }, value) => {
      commit({
        type: types.SET_DELEGATES,
        value
      })
    },
    setForged: ({ commit }, value) => {
      commit({
        type: types.SET_FORGED,
        value
      })
    }
  },

  getters: {
    delegates: state => state.delegates,
    forged: state => state.forged,

    byPublicKey: (state) => publicKey => {
      return state.delegates.find(delegate => {
        return delegate.publicKey === publicKey
      }) || null
    },

    byAddress: state => address => {
      return state.delegates.find(delegate => {
        return delegate.address === address
      }) || null
    }
  }
}
