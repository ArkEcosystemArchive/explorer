require('es6-promise').polyfill()

import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import App from './App'
import router from './router'
import store from './store'
// import i18n from './i18n'
import VTooltip from 'v-tooltip'

require('./mixins')

sync(store, router)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // i18n,
  router,
  store,
  components: { App },
  template: '<App/>',
})

Vue.use(VTooltip)
