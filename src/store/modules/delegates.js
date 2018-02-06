import * as types from '../mutation-types'

export default {
  namespaced: true,
  state: {
    delegates: [],
    forged: []
  },
  mutations: {
    [types.SET_DELEGATES](state, payload) {
      state.delegates = payload.value
    },
    [types.SET_FORGED](state, payload) {
      state.forged = payload.value
    }
  },
  actions: {
    setDelegates: ({commit}, value) => {
      commit({
        type: types.SET_DELEGATES,
        value
      })
    },
    setForged: ({commit}, value) => {
      commit({
        type: types.SET_FORGED,
        value
      })
    }
  },
  getters: {
    delegates: state => state.delegates,
    forged: state => state.forged
  }
}
