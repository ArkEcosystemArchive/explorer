import { mount, createLocalVue } from "@vue/test-utils";
import CurrencyMixin from "@/mixins/currency";
import MiscMixin from "@/mixins/misc";
import TransactionTypesMixin from "@/mixins/transaction-types";
import StringsMixin from "@/mixins/strings";

import TransactionDetails from "@/components/transaction/Details";
import { CoreTransaction, TypeGroupTransaction } from "@/enums";
import { useI18n } from "../../../__utils__/i18n";
import Vuex from "vuex";
import merge from "lodash/merge";

describe("Components > Transaction > Details", () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);

  const i18n = useI18n(localVue);

  const mountComponent = config => {
    return mount(
      TransactionDetails,
      merge(
        {
          stubs: {
            LinkBlock: "<div></div>",
            LinkWallet: "<div></div>",
          },
          mocks: {
            addressFromPublicKey: async () => "address",
            addressFromMultiSignatureAsset: async () => "multi-signature-address",
            sanitizeVendorfield: (value) => value,
          },
          i18n,
          localVue,
          mixins: [CurrencyMixin, MiscMixin, StringsMixin, TransactionTypesMixin],
          store,
        },
        config,
      ),
    );
  };

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

  it("should display the transaction details", () => {
    const wrapper = mountComponent({
      propsData: {
        transaction: {
          id: "transaction-id",
          confirmations: 1,
          vendorField: "vendor-field",
        },
      },
    });
    expect(wrapper.findAll(".list-row-border-b")).toHaveLength(6);
    expect(wrapper.findAll(".list-row-border-b-no-wrap")).toHaveLength(2);
    expect(wrapper.findAll(".list-row")).toHaveLength(1);
  });

  describe("Multisignature Registration", () => {
    it("should show asset details", () => {
      const wrapper = mountComponent({
        propsData: {
          transaction: {
            id: "transaction-id",
            confirmations: 1,
            type: CoreTransaction.MULTI_SIGNATURE,
            typeGroup: TypeGroupTransaction.CORE,
            asset: {
              multiSignature: {
                publicKeys: [
                  "public-key",
                ],
                min: 1,
              },
            },
          },
        },
      });

      expect(wrapper.find(".TransactionDetails__MultiSignature").exists()).toBe(true);
      expect(wrapper.find(".TransactionDetails__MultiSignature .list-row-border-b").text()).toEqual(expect.stringContaining("Generated address"));
      expect(wrapper.find(".TransactionDetails__MultiSignature .list-row-border-b-no-wrap").text()).toEqual(expect.stringContaining("Participants"));
      expect(wrapper.find(".TransactionDetails__MultiSignature .list-row").text()).toEqual(expect.stringContaining("Minimum participants"));
    });

    it("should show asset details for legacy transactions", () => {
      const wrapper = mountComponent({
        propsData: {
          transaction: {
            id: "transaction-id",
            confirmations: 1,
            type: CoreTransaction.MULTI_SIGNATURE,
            typeGroup: TypeGroupTransaction.CORE,
            asset: {
              multiSignatureLegacy: {
                keysgroup: [
                  "+public-key",
                ],
                lifetime: 1,
                min: 1,
              },
            },
          },
        },
      });

      expect(wrapper.find(".TransactionDetails__MultiSignature").exists()).toBe(true);
      expect(wrapper.find(".TransactionDetails__MultiSignature .list-row-border-b-no-wrap").text()).toEqual(expect.stringContaining("Participants"));
      expect(wrapper.find(".TransactionDetails__MultiSignature .list-row-border-b").text()).toEqual(expect.stringContaining("Minimum participants"));
      expect(wrapper.findAll(".TransactionDetails__MultiSignature .list-row").at(0).text()).toEqual(expect.stringContaining("Lifetime"));
      expect(wrapper.findAll(".TransactionDetails__MultiSignature .list-row").at(1).text()).toEqual(expect.stringContaining("This transaction is a legacy Multisignature Registration"));
    });
  });
});
