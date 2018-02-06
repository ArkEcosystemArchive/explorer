import Vue from 'vue'
import Vuex from 'vuex'
import CurrencyModule from './modules/currency'
import DelegatesModule from './modules/delegates'
import NetworkModule from './modules/network'
import UserInterfaceModule from './modules/ui'

Vue.use(Vuex)

export const strict = false

export default new Vuex.Store({
  modules: {
    currency: CurrencyModule,
    delegates: DelegatesModule,
    network: NetworkModule,
    ui: UserInterfaceModule,
  },
  strict: true
})
