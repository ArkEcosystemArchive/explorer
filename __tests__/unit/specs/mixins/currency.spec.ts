import { createLocalVue, shallowMount, Wrapper } from "@vue/test-utils";
import CurrencyMixin from "@/mixins/currency";
import store from "@/store";
import Vue from "vue";

describe("Mixins > Currency", () => {
  let wrapper: Wrapper<Vue>;

  beforeEach(() => {
    const localVue = createLocalVue();

    const TestComponent = {
      name: "TestComponent",
      template: "<div />",
    };

    wrapper = shallowMount(TestComponent, {
      localVue,
      store,
      mixins: [CurrencyMixin],
    });
  });

  const displayCrypto = value => {
    return value.toLocaleString(undefined, { maximumFractionDigits: 8 });
  };

  const displayFiat = value => {
    return value.toLocaleString(undefined, { minimumFractionDigits: 2 });
  };

  describe("rawCurrency", () => {
    it("should display selected cryptocurrency with 8 digits or less", () => {
      store.dispatch("network/setToken", "ARK");
      expect(wrapper.vm.rawCurrency(10.1234567891234, "ARK")).toEqual(displayCrypto(10.12345679));
      expect(wrapper.vm.rawCurrency(10.1234567891234, "ETH")).toEqual(displayCrypto(10.12345679));
      expect(wrapper.vm.rawCurrency(10.1234567891234, "BTC")).toEqual(displayCrypto(10.12345679));
      expect(wrapper.vm.rawCurrency(10.12345, "ARK")).toEqual(displayCrypto(10.12345));
    });

    it("should display non-cryptocurrency always with 2 digits", () => {
      store.dispatch("network/setToken", "ARK");
      expect(wrapper.vm.rawCurrency(10.1234567891, "USD")).toEqual(displayFiat(10.12));
      expect(wrapper.vm.rawCurrency(10.1234567891, "AUD")).toEqual(displayFiat(10.12));
      expect(wrapper.vm.rawCurrency(10.1234567891, "EUR")).toEqual(displayFiat(10.12));
      expect(wrapper.vm.rawCurrency(10.1, "USD")).toEqual(displayFiat(10.1));
      expect(wrapper.vm.rawCurrency(10, "USD")).toEqual(displayFiat(10.0));
    });
  });

  describe("readableCrypto", () => {
    it("should return crypto value in readable format", () => {
      expect(wrapper.vm.readableCrypto(10 * Math.pow(10, 8), false)).toEqual(displayCrypto(10));
      expect(wrapper.vm.readableCrypto(10.12345678912345 * Math.pow(10, 8), false)).toEqual(displayCrypto(10.12345679));
      expect(wrapper.vm.readableCrypto(10.1234 * Math.pow(10, 8), false)).toEqual(displayCrypto(10.1234));
      expect(wrapper.vm.readableCrypto(10 * Math.pow(10, 8), false, 4)).toEqual(displayCrypto(10));
      expect(wrapper.vm.readableCrypto(10.123456 * Math.pow(10, 8), false, 4)).toEqual(displayCrypto(10.1235));
      expect(wrapper.vm.readableCrypto(10.123456789123456789 * Math.pow(10, 8), false, 10)).toEqual(
        Number(10.123456789123456789).toLocaleString(undefined, { maximumFractionDigits: 8 }),
      );
    });

    it("should return crypto value in readable format, including symbol", () => {
      store.dispatch("network/setSymbol", "Ѧ");
      expect(wrapper.vm.readableCrypto(10 * Math.pow(10, 8))).toEqual(displayCrypto(10) + " Ѧ");
      expect(wrapper.vm.readableCrypto(10 * Math.pow(10, 8), true)).toEqual(displayCrypto(10) + " Ѧ");
      expect(wrapper.vm.readableCrypto(10.12345678912345 * Math.pow(10, 8), true)).toEqual(
        displayCrypto(10.12345679) + " Ѧ",
      );
      expect(wrapper.vm.readableCrypto(10.1234 * Math.pow(10, 8), true)).toEqual(displayCrypto(10.1234) + " Ѧ");
    });

    it("should return nothing if undefined value is given", () => {
      expect(wrapper.vm.readableCrypto()).toBeUndefined();
      expect(wrapper.vm.readableCrypto(undefined)).toBeUndefined();
    });
  });

  describe("readableCurrency", () => {
    const displayCurrency = value => {
      return value.toLocaleString("en-GB", {
        style: "currency",
        currency: "eur",
      });
    };

    store.dispatch("network/setToken", "ARK");

    it("should properly format the given data", () => {
      expect(wrapper.vm.readableCurrency(100000000, null, "ARK")).toEqual("1 Ѧ");
      expect(wrapper.vm.readableCurrency(1000000000, null, "BTC")).toEqual("10 Ƀ");
      expect(wrapper.vm.readableCurrency(10000000000, null, "ETH")).toEqual("100 Ξ");
      expect(wrapper.vm.readableCurrency(100000000000, null, "LTC")).toEqual(`${Number(1000).toLocaleString()} Ł`);
    });

    it("should format currency with 2 decimals", () => {
      expect(wrapper.vm.readableCurrency(10, 1, "eur", false)).toEqual(displayCurrency(10));
      expect(wrapper.vm.readableCurrency(10.3, 1, "eur", false)).toEqual(displayCurrency(10.3));
      expect(wrapper.vm.readableCurrency(10.34, 1, "eur", false)).toEqual(displayCurrency(10.34));
      expect(wrapper.vm.readableCurrency(10.349, 1, "eur", false)).toEqual(displayCurrency(10.35));
    });
  });
});
