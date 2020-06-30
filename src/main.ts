// tslint:disable-next-line:no-var-requires
require("es6-promise").polyfill();

import "@/assets/css/style.css";
import "nprogress/nprogress.css";

import { makeServer } from "./mirage";

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

// @ts-ignore
if (window.Cypress) {
  makeServer();
}

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

Vue.mixin(mixins);

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
