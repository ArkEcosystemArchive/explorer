import Vue from "vue";
import Vuex from "vuex";

// @ts-ignore
import CurrencyModule from "@/store/modules/currency";
// @ts-ignore
import DelegatesModule from "@/store/modules/delegates";
// @ts-ignore
import NetworkModule from "@/store/modules/network";
// @ts-ignore
import UserInterfaceModule from "@/store/modules/ui";

Vue.use(Vuex);

const modules = {
  currency: CurrencyModule,
  delegates: DelegatesModule,
  network: NetworkModule,
  ui: UserInterfaceModule,
};

export default new Vuex.Store({
  modules,
  strict: process.env.NODE_ENV !== "production",
});
