import * as types from '../mutation-types'

export default {
  namespaced: true,

  state: {
    delegates: null,
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
    setDelegates: ({ commit }, { delegates, timestamp }) => {
      localStorage.setItem('delegates', JSON.stringify(delegates))
      localStorage.setItem('delegatesFetchedAt', timestamp)

      commit({
        type: types.SET_DELEGATES,
        value: delegates
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
    delegates: state => {
      return state.delegates ? state.delegates : (JSON.parse(localStorage.getItem('delegates')) || [])
    },

    forged: state => state.forged,

    byPublicKey: (_, getters) => publicKey => {
      return getters.delegates.find(delegate => {
        return delegate.publicKey === publicKey
      }) || null
    },

    byAddress: (_, getters) => address => {
      return getters.delegates.find(delegate => {
        return delegate.address === address
      }) || null
    },

    stateHasDelegates: state => {
      return !!state.delegates
    }
  }
}
