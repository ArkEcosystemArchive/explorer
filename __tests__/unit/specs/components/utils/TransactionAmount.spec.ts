import { mount, createLocalVue } from "@vue/test-utils";
import CurrencyMixin from "@/mixins/currency";
import TransactionTypesMixin from "@/mixins/transaction-types";
import store from "@/store";

import TransactionAmount from "@/components/utils/TransactionAmount";
import { useI18n } from "../../../__utils__/i18n";
import Vuex from "vuex";

describe("Components > Utils > TransactionAmount", () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);

  const i18n = useI18n(localVue);

  const incomingAddress = "AUDud8tvyVZa67p3QY7XPRUTjRGnWQQ9Xv";
  const outgoingAddress = "AN7BURQn5oqBRBADeWhmmUMJGQTy5Seey3";

  beforeAll(() => {
    store.dispatch("network/setSymbol", "Ѧ");
    store.dispatch("currency/setName", "USD");
    store.dispatch("currency/setSymbol", "$");
  });

  it("should display an outgoing transaction in red", () => {
    const $route = {
      params: {
        address: incomingAddress,
      },
    };

    const wrapper = mount(TransactionAmount, {
      propsData: {
        transaction: {
          sender: incomingAddress,
          recipient: outgoingAddress,
          amount: "100000000",
          timestamp: {
            unix: 1535190579,
          },
          type: 0,
          typeGroup: 1,
        },
      },
      mocks: {
        $route,
      },
      i18n,
      localVue,
      mixins: [CurrencyMixin, TransactionTypesMixin],
      store,
    });

    expect(wrapper.classes()).toContain("text-red");
    expect(wrapper.classes()).not.toContain("text-green");
    expect(wrapper.text()).toEqual(wrapper.vm.readableCrypto(100000000).trim());
  });

  it("should display an incoming transaction in green", () => {
    const $route = {
      params: {
        address: incomingAddress,
      },
    };

    const wrapper = mount(TransactionAmount, {
      propsData: {
        transaction: {
          sender: outgoingAddress,
          recipient: incomingAddress,
          amount: "100000000",
          timestamp: {
            unix: 1535190579,
          },
          type: 0,
          typeGroup: 1,
        },
      },
      mocks: {
        $route,
      },
      i18n,
      localVue,
      mixins: [CurrencyMixin, TransactionTypesMixin],
      store,
    });

    expect(wrapper.classes()).toContain("text-green");
    expect(wrapper.classes()).not.toContain("text-red");
    expect(wrapper.text()).toEqual(wrapper.vm.readableCrypto(100000000).trim());
  });

  it("should display special transactions in red", () => {
    const $route = {
      params: {
        address: incomingAddress,
      },
    };

    const wrapper = mount(TransactionAmount, {
      propsData: {
        transaction: {
          sender: incomingAddress,
          recipient: incomingAddress,
          amount: "100000000",
          timestamp: {
            unix: 1535190579,
          },
          type: 1,
          typeGroup: 1,
        },
      },
      mocks: {
        $route,
      },
      i18n,
      localVue,
      mixins: [CurrencyMixin, TransactionTypesMixin],
      store,
    });

    expect(wrapper.classes()).toContain("text-red");
    expect(wrapper.classes()).not.toContain("text-green");
    expect(wrapper.text()).toEqual(wrapper.vm.readableCrypto(100000000).trim());
  });

  it("should display a fee amount without additional coloring", () => {
    const $route = {
      params: {
        address: incomingAddress,
      },
    };

    const wrapper = mount(TransactionAmount, {
      propsData: {
        transaction: {
          sender: incomingAddress,
          recipient: outgoingAddress,
          fee: "100000000",
          timestamp: {
            unix: 1535190579,
          },
          type: 1,
          typeGroup: 1,
        },
        isFee: true,
      },
      mocks: {
        $route,
      },
      i18n,
      localVue,
      mixins: [CurrencyMixin, TransactionTypesMixin],
      store,
    });

    expect(wrapper.classes()).not.toContain("text-red");
    expect(wrapper.classes()).not.toContain("text-green");
    expect(wrapper.text()).toEqual(wrapper.vm.readableCrypto(100000000).trim());
  });
});
