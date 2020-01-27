import { mount, createLocalVue, RouterLinkStub, Wrapper } from "@vue/test-utils";
import StringsMixin from "@/mixins/strings";
import TransactionTypesMixin from "@/mixins/transaction-types";
import store from "@/store";
import merge from "lodash/merge";

import { LinkAddress } from "@/components/links";
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
      LinkAddress,
      merge(
        {
          stubs: {
            RouterLink: RouterLinkStub,
            SvgIcon: "<svg></svg>",
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

  it("should display a full link to a wallet", () => {
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
    expect(wrapper.text()).toEqual(expect.stringContaining(testAddress));
    expect(wrapper.text()).toEqual(expect.stringContaining(wrapper.vm.truncate(testAddress)));
  });

  it("should display a truncated link to a wallet", () => {
    wrapper = mountComponent({
      propsData: {
        address: testAddress,
        publicKey: testPublicKey,
        type: 0,
      },
    });

    expect(wrapper.contains("a")).toBe(true);
    expect(wrapper.findAll("a")).toHaveLength(1);
    expect(wrapper.text()).not.toEqual(expect.stringContaining(testAddress));
    expect(wrapper.text()).toEqual(expect.stringContaining(wrapper.vm.truncate(testAddress)));
  });

  it("should display the name of a known address", () => {
    store.dispatch("network/setKnownWallets", { AUDud8tvyVZa67p3QY7XPRUTjRGnWQQ9Xv: "TestKnownWallet" });
    wrapper = mountComponent({
      propsData: {
        address: testAddress,
        publicKey: testPublicKey,
        type: 0,
      },
    });

    expect(wrapper.contains("a")).toBe(true);
    expect(wrapper.findAll("a")).toHaveLength(1);
    expect(wrapper.findAll("svg")).toHaveLength(1);
    expect(wrapper.text()).not.toEqual(expect.stringContaining(testAddress));
    expect(wrapper.text()).not.toEqual(expect.stringContaining(wrapper.vm.truncate(testAddress)));
    expect(wrapper.text()).toEqual(expect.stringContaining("TestKnownWallet"));
  });

  it("should display the name of a delegate", done => {
    store.dispatch("delegates/setDelegates", { delegates });
    wrapper = mountComponent({
      propsData: {
        address: testDelegateAddress,
        type: 0,
      },
    });

    // Delegate name is set after function call in mounted(), so we need to wait a little while
    expect(wrapper.contains("a")).toBe(true);
    expect(wrapper.findAll("a")).toHaveLength(1);
    setTimeout(() => {
      expect(wrapper.text()).not.toEqual(expect.stringContaining(testDelegateAddress));
      expect(wrapper.text()).not.toEqual(expect.stringContaining(wrapper.vm.truncate(testDelegateAddress)));
      expect(wrapper.text()).toEqual(expect.stringContaining("TestDelegate"));
      done();
    }, 500);
  });

  it("should also find the delegate by public key", done => {
    store.dispatch("delegates/setDelegates", { delegates });
    wrapper = mountComponent({
      propsData: {
        publicKey: testDelegatePublicKey,
        type: 0,
      },
    });

    // Delegate name is set after function call in mounted(), so we need to wait a little while
    expect(wrapper.contains("a")).toBe(true);
    expect(wrapper.findAll("a")).toHaveLength(1);
    setTimeout(() => {
      expect(wrapper.text()).not.toEqual(expect.stringContaining(testDelegateAddress));
      expect(wrapper.text()).not.toEqual(expect.stringContaining(wrapper.vm.truncate(testDelegateAddress)));
      expect(wrapper.text()).toEqual(expect.stringContaining("TestDelegate"));
      done();
    }, 500);
  });

  it("should display Timelock recipient for type 8", () => {
    wrapper = mountComponent({
      propsData: {
        address: testAddress,
        type: 8
      },
    });

    expect(wrapper.contains("a")).toBe(true);
    expect(wrapper.findAll("a")).toHaveLength(1);
    expect(wrapper.findAll("svg")).toHaveLength(1);
    expect(wrapper.text()).not.toEqual(expect.stringContaining(testAddress));
    expect(wrapper.text()).not.toEqual(expect.stringContaining(wrapper.vm.truncate(testAddress)));
    expect(wrapper.text()).toEqual(expect.stringContaining("TestKnownWallet"));
  });
});
