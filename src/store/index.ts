import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";

import { currency } from "@/store/modules/currency";
import { delegates } from "@/store/modules/delegates";
import { network } from "@/store/modules/network";
import { ui } from "@/store/modules/ui";

Vue.use(Vuex);

const modules = {
  currency,
  delegates,
  network,
  ui,
};

const store: StoreOptions<{}> = {
  modules,
  strict: process.env.NODE_ENV !== "production",
};

export default new Vuex.Store<{}>(store);
