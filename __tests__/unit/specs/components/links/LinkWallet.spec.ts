import { mount, createLocalVue, RouterLinkStub, Wrapper } from "@vue/test-utils";
import StringsMixin from "@/mixins/strings";
import TransactionTypesMixin from "@/mixins/transaction-types";
import store from "@/store";
import merge from "lodash/merge";

import { LinkWallet, LinkAddress } from "@/components/links";
import SvgIcon from "@/components/SvgIcon";
import { useI18n } from "../../../__utils__/i18n";

describe("Components > Links > Wallet", () => {
  let wrapper: Wrapper<Vue>;

  const localVue = createLocalVue();
  const i18n = useI18n(localVue);

  const testAddress = "AUDud8tvyVZa67p3QY7XPRUTjRGnWQQ9Xv";
  const testPublicKey = "021d03bace0687a1a5e797f884b13fb46f817ec32de1374a7f223f24404401d220";
  const testDelegateAddress = "ALgvTAoz5Vi9easHqBK6aEMKatHb4beCXm";
  const testDelegatePublicKey = "03aa4863c93d170d89675a6e381d08a451c1067fc0f6fed479571d9ecb178963b3";

  const delegates = [{ username: "TestDelegate", address: testDelegateAddress, publicKey: testDelegatePublicKey }];

  const mountComponent = config => {
    return mount(
      LinkWallet,
      merge(
        {
          stubs: {
            RouterLink: RouterLinkStub,
            'SvgIcon': "<svg></svg>",
            'LinkAddress': "<a>LinkAddress</a>"
          },
          i18n,
          localVue,
          mixins: [StringsMixin, TransactionTypesMixin],
          store,
        },
        config,
      ),
    );
  };

  it("should use LinkAddress for a transfer", () => {
    wrapper = mountComponent({
      propsData: {
        address: testAddress,
        publicKey: testPublicKey,
        type: 0,
        trunc: false,
      },
    });

    expect(wrapper.contains("a")).toBe(true);
    expect(wrapper.findAll("a")).toHaveLength(1);
  });

  describe("When given a transaction type > 0", () => {
    it("should display 2nd Signature Registration for type 1", () => {
      wrapper = mountComponent({
        propsData: { type: 1 },
      });

      expect(wrapper.contains("a")).toBe(false);
      expect(wrapper.text()).toEqual(expect.stringContaining("2nd Signature Registration"));
    });

    it("should display Delegate Registration for type 2", () => {
      wrapper = mountComponent({
        propsData: { type: 2 },
      });

      expect(wrapper.contains("a")).toBe(false);
      expect(wrapper.text()).toEqual(expect.stringContaining("Delegate Registration"));
    });

    it("should display Vote for type 3", () => {
      store.dispatch("delegates/setDelegates", { delegates });

      wrapper = mountComponent({
        propsData: {
          type: 3,
          asset: {
            votes: ["+testDelegatePublicKey"],
          },
        },
      });

      setTimeout(() => {
        expect(wrapper.text()).toEqual(expect.stringContaining("Vote"));
      }, 500);
    });

    it("should display Multi Signature for type 4", () => {
      wrapper = mountComponent({
        propsData: { type: 4 },
      });

      expect(wrapper.contains("a")).toBe(false);
      expect(wrapper.text()).toEqual(expect.stringContaining("Multisignature Registration"));
    });

    it("should display IPFS for type 5", () => {
      wrapper = mountComponent({
        propsData: { type: 5 },
      });

      expect(wrapper.contains("a")).toBe(false);
      expect(wrapper.text()).toEqual(expect.stringContaining("IPFS"));
    });

    it("should display Multipayment for type 6", () => {
      wrapper = mountComponent({
        propsData: { type: 6 },
      });

      expect(wrapper.contains("a")).toBe(false);
      expect(wrapper.text()).toEqual(expect.stringContaining("Multipayment"));
    });

    it("should display Delegate Resignation for type 7", () => {
      wrapper = mountComponent({
        propsData: { type: 7 },
      });

      expect(wrapper.contains("a")).toBe(false);
      expect(wrapper.text()).toEqual(expect.stringContaining("Delegate Resignation"));
    });

    it("should use LinkAddress and icon for Timelock recipient for type 8 when instructed", () => {
      wrapper = mountComponent({
        propsData: {
          address: testAddress,
          type: 8,
          showTimelockIcon: true,
        },
      });

      expect(wrapper.contains("a")).toBe(true);
      expect(wrapper.findAll("a")).toHaveLength(1);
      expect(wrapper.findAll("svg")).toHaveLength(1);
    });

    it("should use LinkAddress without icon for Timelock recipient for type 8 otherwise", () => {
      wrapper = mountComponent({
        propsData: {
          address: testAddress,
          type: 8,
        },
      });

      expect(wrapper.contains("a")).toBe(true);
      expect(wrapper.findAll("a")).toHaveLength(1);
      expect(wrapper.findAll("svg")).toHaveLength(0);
    });

    it("should display Timelock Claim for type 9", () => {
      wrapper = mountComponent({
        propsData: {
          address: testAddress,
          type: 9
        },
      });

      expect(wrapper.contains("a")).toBe(false);
      expect(wrapper.text()).toEqual(expect.stringContaining("Timelock Claim"));
    });

    it("should display Timelock Refund for type 10", () => {
      wrapper = mountComponent({
        propsData: {
          address: testAddress,
          type: 10
        },
      });

      expect(wrapper.contains("a")).toBe(false);
      expect(wrapper.text()).toEqual(expect.stringContaining("Timelock Refund"));
    });

    it("should use LinkAddress as fallback if unknown type is used", () => {
      wrapper = mountComponent({
        propsData: {
          address: testAddress,
          type: 12345,
        },
      });

      expect(wrapper.contains("a")).toBe(true);
      expect(wrapper.findAll("a")).toHaveLength(1);
    });
  });
});
