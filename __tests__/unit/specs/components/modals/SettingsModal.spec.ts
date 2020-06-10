import { mount, createLocalVue, Wrapper } from "@vue/test-utils";
import Vue from "vue";
import Vuex from "vuex";
import merge from "lodash/merge";
import mixins from "@/mixins";
import ButtonSwitch from "@/components/ButtonSwitch";
import InputSelect from "@/components/input/InputSelect";
import SettingsModal from "@/components/modals/SettingsModal";
import { useI18n } from "../../../__utils__/i18n";

// mock crypto compare service to avoid querying api
jest.mock("@/services/crypto-compare");

describe("Components > Modals > SettingsModal", () => {
  let wrapper: Wrapper<Vue>;
  let dispatchMock: () => any;

  const localVue = createLocalVue();
  localVue.use(Vuex);

  const i18n = useI18n(localVue);

  const store = new Vuex.Store({
    modules: {
      ui: {
        namespaced: true,
        state: {
          nightMode: false,
          priceChartOptions: {
            enabled: false,
          },
        },
        getters: {
          nightMode: () => false,
          priceChartOptions: () => {
            return { enabled: false };
          },
        },
      },
      network: {
        namespaced: true,
        state: {
          currencies: { BRL: "R$", EUR: "€", USD: "$" },
          defaults: {
            priceChartOptions: { enabled: true },
          },
        },
        getters: {
          currencies: () => ({ BRL: "R$", EUR: "€", USD: "$" }),
          defaults: () => ({ priceChartOptions: { enabled: true } }),
        },
      },
    },
    strict: true,
  });

  const mountComponent = config => {
    return mount(
      SettingsModal,
      merge(
        {
          stubs: {
            ButtonSwitch: ButtonSwitch,
            InputSelect: InputSelect,
          },
          i18n,
          localVue,
          mixins,
          store,
        },
        config,
      ),
    );
  };

  it("should render SettingsModal", () => {
    wrapper = mountComponent();
    expect(wrapper.isVueInstance()).toBe(true);
  });

  describe("Currency", () => {
    it("should show the currencies", () => {
      wrapper = mountComponent();

      const el = wrapper.find(".SettingsModal__select__currency");

      expect(el.findAll("option")).toHaveLength(3);
      expect(el.findAll("option").at(0).text()).toBe("BRL");
      expect(el.findAll("option").at(1).text()).toBe("EUR");
      expect(el.findAll("option").at(2).text()).toBe("USD");
    });

    it("should change currency " => () {
      wrapper = mountComponent();

      wrapper.find(".SettingsModal__select__currency").vm.$emit("input", {
        target: {
          name: "currency",
          value: "EUR",
        }
      });

      expect(wrapper.vm.currencyName).toBe("EUR");
      expect(wrapper.vm.currencySymbol).toBe("€");
    });
  });

  describe("Smartbridge Filter", () => {
    it("should show the smartbridge filter", () => {
      wrapper = mountComponent();

      const el = wrapper.find(".SettingsModal__select__smartbridge-filter");

      expect(el.findAll("option")).toHaveLength(3);
      expect(el.findAll("option").at(0).text()).toBe("Unfiltered");
      expect(el.findAll("option").at(1).text()).toBe("Filtered");
      expect(el.findAll("option").at(2).text()).toBe("Hidden");
    });

    it("should change the smartbridge filter" => () {
      wrapper = mountComponent();

      wrapper.find(".SettingsModal__select__smartbridge-filter").vm.$emit("input", {
        target: {
          name: "smartbridge-filter",
          value: "hidden",
        }
      });

      expect(wrapper.vm.smartbridgeFilter).toBe("hidden");
    });

    it("should show disclaimer" => () {
      wrapper = mountComponent();

      wrapper.find(".SettingsModal__select__smartbridge-filter").vm.$emit("input", {
        target: {
          name: "smartbridge-filter",
          value: "Unfiltered",
        }
      });

      wrapper.vm.$nextTick(() => {
        const div = wrapper.find(".SettingsModal__disclaimer");
        expect(div.isVisible()).toBeTrue();
      });
    });

    it("should accept the disclaimer" => () {
      wrapper = mountComponent();

      wrapper.find(".SettingsModal__select__smartbridge-filter").vm.$emit("input", {
        target: {
          name: "smartbridge-filter",
          value: "Unfiltered",
        }
      });

      wrapper.vm.$nextTick(() => {
        const checkbox = wrapper.find(".SettingsModal__disclaimer__terms__checkbox");
        checkbox.trigger("click");
        expect(wrapper.vm.isAcceptTerms).toBe(true);
      });
    });
  });

  describe("Dark Theme", () => {
    it("should toggle to night mode", done => {
      wrapper = mountComponent();

      const el = wrapper.find(".SettingsModal__toggle__darkTheme");
      el.trigger("click");

      wrapper.vm.$nextTick(() => {
        expect(wrapper.vm.nightMode).toBe(true);
        done();
      });
    });

    it("should toggle to day mode", () => {
      wrapper = mountComponent();
      wrapper.vm.nightMode = true;

      wrapper.find(".SettingsModal__toggle__darkTheme").vm.$emit("change");

      expect(wrapper.vm.nightMode).toBe(false);
    });
  });

  describe("Price Chart", () => {
    it("should toggle the price chart", done => {
      wrapper = mountComponent();

      const el = wrapper.find(".SettingsModal__toggle__priceChart");
      el.trigger("click");

      wrapper.vm.$nextTick(() => {
        expect(wrapper.vm.chartMode).toBe(true);
        done();
      });
    });
  });

  describe("Language", () => {
    it("should show the languages", () => {
      wrapper = mountComponent();

      const el = wrapper.find(".SettingsModal__select__language");

      expect(el.findAll("option")).toHaveLength(7);
      expect(el.findAll("option").at(0).text()).toBe("English (UK)");
      expect(el.findAll("option").at(1).text()).toBe("English (US)");
      expect(el.findAll("option").at(2).text()).toBe("Italiano");
      expect(el.findAll("option").at(3).text()).toBe("Français");
      expect(el.findAll("option").at(4).text()).toBe("Nederlands");
      expect(el.findAll("option").at(5).text()).toBe("Polski");
      expect(el.findAll("option").at(6).text()).toBe("Português (BR)");
    });

    it("should change language " => () {
      wrapper = mountComponent();

      wrapper.find(".SettingsModal__select__language").vm.$emit("input", {
        target: {
          name: "language",
          value: "en-GB",
        }
      });

      expect(wrapper.vm.language).toBe("en-GB");
    });
  });
});
