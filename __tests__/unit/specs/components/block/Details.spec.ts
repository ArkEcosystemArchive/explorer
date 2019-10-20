import { mount, createLocalVue } from "@vue/test-utils";
import MiscMixin from "@/mixins/misc";

import BlockDetails from "@/components/block/Details";
import { useI18n } from "../../../__utils__/i18n";
import Vuex from "vuex";

describe("Components > Block > Details", () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);

  const i18n = useI18n(localVue);

  const store = new Vuex.Store({
    modules: {
      network: {
        namespaced: true,
        getters: {
          height: () => 1000000,
        },
      },
      currency: {
        namespaced: true,
        getters: {
          symbol: () => "$",
        },
      },
    },
    strict: true,
  });

  it("should display the block details", () => {
    const wrapper = mount(BlockDetails, {
      propsData: {
        block: {
          height: 1,
        },
      },
      stubs: {
        LinkWallet: "<div></div>",
      },
      i18n,
      localVue,
      mixins: [MiscMixin],
      store,
    });

    expect(wrapper.findAll(".list-row-border-b")).toHaveLength(7);
    expect(wrapper.findAll(".list-row-border-b-no-wrap")).toHaveLength(1);
    expect(wrapper.findAll(".list-row")).toHaveLength(1);
  });
});
