// tslint:disable-next-line:no-var-requires
require("es6-promise").polyfill();

import "@/assets/css/style.css";
import "nprogress/nprogress.css";

import Vue from "vue";
import { sync } from "vuex-router-sync";
// @ts-ignore
import App from "./App.vue";
import router from "./router";
import store from "./store";
import directives from "./directives";
import mixins from "./mixins";
// @ts-ignore
import VTooltip from "v-tooltip";
// @ts-ignore
import VueGoodTablePlugin from "vue-good-table";
import PortalVue from "portal-vue";
import i18n from "./i18n";

import VueMatomo from "vue-matomo"
import MatomoConfig, { setupMatomoConfig } from "./config/matomo"

// tslint:disable-next-line:no-var-requires
require("./components");

sync(store, router);

Vue.config.productionTip = false;

Vue.use(directives);
Vue.use(VTooltip, {
  defaultHtml: false,
  defaultContainer: "main",
});
Vue.use(VueGoodTablePlugin);
Vue.use(PortalVue);

if(process.env.VUE_APP_EXPLORER_CONFIG === "sandbox" || process.env.VUE_APP_EXPLORER_CONFIG === "livenet") {
  setupMatomoConfig();
  Vue.use(VueMatomo, MatomoConfig)
}

Vue.mixin(mixins);

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount("#app");
