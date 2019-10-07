import { VueConstructor } from "vue";
import clickOutside from "./click-outside";

export default {
  install(Vue: VueConstructor) {
    Vue.directive("click-outside", clickOutside);
  },
};
