import { shallowMount, createLocalVue } from "@vue/test-utils";

import NotFound from "@/components/utils/NotFound";
import { useI18n } from "../../../__utils__/i18n";
import Vuex from "vuex";

describe("Components > Utils > NotFound", () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);

  const i18n = useI18n(localVue);

  const store = new Vuex.Store({
    modules: {
      ui: {
        namespaced: true,
        getters: {
          nightMode: () => false,
        },
      },
    },
    strict: true,
  });

  it("should render NotFound", () => {
    const wrapper = shallowMount(NotFound, {
      propsData: {
        isLoading: false,
        dataType: "block",
        dataId: "BLOCK_ID",
      },
      i18n,
      localVue,
      store,
    });

    expect(wrapper.isVueInstance()).toBe(true);
  });

  it("should emit a reload event", () => {
    const wrapper = shallowMount(NotFound, {
      propsData: {
        isLoading: false,
        dataType: "block",
        dataId: "BLOCK_ID",
      },
      i18n,
      localVue,
      store,
    });

    const button = wrapper.find("button");
    button.trigger("click");
    expect(wrapper.emitted("reload")).toBeTruthy();
  });
});
