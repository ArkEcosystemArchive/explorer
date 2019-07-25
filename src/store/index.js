import Vue from 'vue'
import Vuex from 'vuex'

import CurrencyModule from '@/store/modules/currency'
import DelegatesModule from '@/store/modules/delegates'
import NetworkModule from '@/store/modules/network'
import UserInterfaceModule from '@/store/modules/ui'

Vue.use(Vuex)

const modules = {
  currency: CurrencyModule,
  delegates: DelegatesModule,
  network: NetworkModule,
  ui: UserInterfaceModule
}

export default new Vuex.Store({
  modules,
  strict: process.env.NODE_ENV !== 'production'
})
