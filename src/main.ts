require('es6-promise').polyfill()

import "@/assets/css/style.css";
import Vue from 'vue'
import { sync } from 'vuex-router-sync'
// @ts-ignore
import App from './App.vue'
// @ts-ignore
import router from './router'
// @ts-ignore
import store from './store'
// @ts-ignore
import directives from './directives'
// @ts-ignore
import mixins from './mixins'
// @ts-ignore
import VTooltip from 'v-tooltip'
// @ts-ignore
import VueGoodTablePlugin from 'vue-good-table'
// @ts-ignore
import NProgress from 'vue-nprogress'
import i18n from './i18n'

require('./components')

sync(store, router)

Vue.config.productionTip = false

Vue.use(directives)
Vue.use(VTooltip, {
  defaultHtml: false,
  defaultContainer: 'main'
})
Vue.use(VueGoodTablePlugin)
Vue.use(NProgress)

Vue.mixin(mixins)

const nprogress = new NProgress({
  showSpinner: false
})

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App)
}).$mount("#app");
