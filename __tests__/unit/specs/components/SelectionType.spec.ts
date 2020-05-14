import { mount, createLocalVue } from "@vue/test-utils";

import SelectionType from "@/components/SelectionType";
import clickOutside from "@/directives/click-outside";
import { useI18n } from "../../__utils__/i18n";

describe("Components > SelectionType", () => {
  const localVue = createLocalVue();
  const i18n = useI18n(localVue);

  const mocks = {
    $store: {
      getters: {
        "network/enabledTransactionTypes": [
          { key: "TIMELOCK_REFUND", type: 10, typeGroup: 1 },
        ],
      },
    },
  };

  localVue.directive("click-outside", clickOutside);

  it("should be possible to open and close the dropdown", async () => {
    const wrapper = mount(SelectionType, {
      i18n,
      localVue,
      clickOutside,
      mocks,
    });

    await wrapper.find(".mr-1").trigger("click");
    expect(
      wrapper
        .findAll("ul")
        .at(1)
        .isVisible(),
    ).toBeTruthy();

    await wrapper.find(".mr-1").trigger("click");
    expect(
      wrapper
        .findAll("ul")
        .at(1)
        .isVisible(),
    ).toBeFalsy();
  });

  it("should close the dropdown after selecting a type", () => {
    const wrapper = mount(SelectionType, {
      i18n,
      localVue,
      clickOutside,
      mocks,
    });

    wrapper.setData({ selectOpen: true });
    wrapper
      .findAll(".dropdown-button")
      .at(1)
      .trigger("click");
    expect(wrapper.vm.selectOpen).toBeFalsy();
  });

  it("should save the selected type to localStorage", () => {
    const wrapper = mount(SelectionType, {
      i18n,
      localVue,
      clickOutside,
      mocks,
    });

    wrapper
      .findAll(".dropdown-button")
      .at(1)
      .trigger("click");
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "transactionType",
      '{"key":"TIMELOCK_REFUND","type":10,"typeGroup":1}',
    );
    expect(localStorage.__STORE__.transactionType).toBe('{"key":"TIMELOCK_REFUND","type":10,"typeGroup":1}');
  });
});
