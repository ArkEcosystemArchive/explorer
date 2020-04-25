import { mount, createLocalVue, RouterLinkStub, Wrapper } from "@vue/test-utils";
import mixins from "@/mixins";
import merge from "lodash/merge";

import WalletDetails from "@/components/wallet/details/Details";
import { useI18n } from "../../../../__utils__/i18n";

describe("Components > Wallet > Details > Details", () => {
  let wrapper: Wrapper<Vue>;

  const localVue = createLocalVue();

  const i18n = useI18n(localVue);

  const mocks = {
    $store: {
      getters: {
        "delegates/byPublicKey": publicKey => {
          return { username: "" };
        },
      },
    },
  };

  const mountComponent = config => {
    return mount(
      WalletDetails,
      merge(
        {
          i18n,
          localVue,
          mixins,
          mocks,
          stubs: {
            RouterLinkStub,
            WalletVoters: "<div></div>",
          },
        },
        config,
      ),
    );
  };

  it.each([
    ["delegate", { isDelegate: true }],
    ["business", { attributes: { business: {} } }],
  ])("should render WalletDetails if wallet is a %s", (type, wallet) => {
    wrapper = mountComponent({
      propsData: { wallet },
    });

    wrapper.vm.$nextTick(() => {
      expect(wrapper.find("section").exists()).toBeTruthy();
    });
  });

  it("should not render WalletDetails if wallet is not a delegate or business", () => {
    wrapper = mountComponent({
      propsData: { wallet: {} },
    });

    wrapper.vm.$nextTick(() => {
      expect(wrapper.find("section").exists()).toBeFalsy();
    });
  });

  it("should show the bridgechains navigation item", () => {
    wrapper = mountComponent({
      propsData: {
        wallet: {
          attributes: {
            business: {
              bridgechains: [
                "bridgechainDummy1",
                "bridgechainDummy2",
              ],
            },
          },
        },
      },
    });

    wrapper.vm.$nextTick(() => {
      expect(wrapper.findAll(".TabsNavigationItem").at(1).text()).toContain("Bridgechains");
    });
  });
});
