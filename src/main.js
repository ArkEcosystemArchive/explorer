require('es6-promise').polyfill()

/* eslint-disable import/first */
import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import App from './App'
import router from './router'
import store from './store'
import i18n from './i18n'
import directives from './directives'
import VTooltip from 'v-tooltip'
import TableComponent from 'vue-table-component'
import _ from 'lodash'

require('./components')
require('./mixins')

sync(store, router)

Vue.config.productionTip = false

Vue.use(directives)
Vue.use(VTooltip, {
  defaultHtml: false,
  defaultContainer: 'main'
})
Vue.use(TableComponent, {
  sortHandler: (rows, column, order) => _.orderBy(rows, `data.${column}`, order),
  filterNoResults: i18n.t('No results')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  store,
  components: { App },
  template: '<App/>',
})
