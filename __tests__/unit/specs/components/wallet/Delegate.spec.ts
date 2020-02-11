import { mount, createLocalVue, RouterLinkStub } from "@vue/test-utils";
import mixins from "@/mixins";

import WalletDelegate from "@/components/wallet/Delegate";
import { useI18n } from "../../../__utils__/i18n";
import Vuex from "vuex";

describe("Components > Wallet > Delegate", () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);

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

  it("should show the delegate info", () => {
    const wrapper = mount(WalletDelegate, {
      i18n,
      localVue,
      mixins,
      mocks,
      stubs: {
        RouterLinkStub,
        WalletVoters: "<div></div>",
      },
      propsData: {
        wallet: { publicKey: "02b1d2ea7c265db66087789f571fceb8cc2b2d89e296ad966efb8ed51855f2ae0b" },
      },
    });

    let divs = wrapper.findAll("div.list-row-border-b");
    expect(divs).toHaveLength(5);
    expect(divs.at(0).text()).toBe("Username");
    expect(divs.at(1).text()).toContain("Status");
    expect(divs.at(2).text()).toContain("Rank");
    expect(divs.at(3).text()).toContain("Votes");
    expect(divs.at(4).text()).toBe("Total forged");

    divs = wrapper.findAll("div.list-row");
    expect(divs).toHaveLength(1);
    expect(divs.at(0).text()).toBe("Forged blocks");
  });
});
