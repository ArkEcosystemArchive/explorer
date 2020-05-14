import { shallowMount, createLocalVue, RouterLinkStub } from "@vue/test-utils";
import mixins from "@/mixins";
import merge from "lodash/merge";

import QrModal from "@/components/modals/QrModal";
import { useI18n } from "../../../__utils__/i18n";

describe("Components > Modals > QrModal", () => {
  const localVue = createLocalVue();

  const i18n = useI18n(localVue);

  const mountComponent = config => {
    return shallowMount(
      QrModal,
      merge(
        {
          stubs: {
            InputNumber: "<input></input>",
            InputText: "<input></input>",
          },
          propsData: {
            address: "address",
          },
          i18n,
          localVue,
        },
        config,
      ),
    );
  };

  it("should render QrModal", () => {
    const wrapper = mountComponent();

    expect(wrapper.isVueInstance()).toBe(true);
  });

  it("should not show any inputs modal is collapsed", () => {
    const wrapper = mountComponent();

    expect(wrapper.findAll("input")).toHaveLength(0);
  });

  it("should show inputs when the modal is expanded", () => {
    const wrapper = mountComponent();
    wrapper.vm.isCollapsed = false;

    wrapper.vm.$nextTick(() => {
      expect(wrapper.findAll("input")).toHaveLength(2);
      done();
    });
  });

  describe("formattedParams", () => {
    it("should format and return the given params", () => {
      const wrapper = mountComponent();

      wrapper.vm.amount = 1;
      wrapper.vm.vendorField = "vendorField";

      expect(wrapper.vm.formattedParams).toEqual("?amount=1&vendorField=vendorField");
    });

    it("should an empty string when there are no params", () => {
      const wrapper = mountComponent();

      expect(wrapper.vm.formattedParams).toEqual("");
    });
  });

  describe("qrValue", () => {
    it("should return the full uri if the modal is expanded", () => {
      const wrapper = mountComponent();

      wrapper.vm.isCollapsed = false
      wrapper.vm.amount = 1;
      wrapper.vm.vendorField = "vendorField";

      expect(wrapper.vm.qrValue).toEqual("ark:address?amount=1&vendorField=vendorField");
    });

    it("should return the address when the modal is collapsed", () => {
      const wrapper = mountComponent();

      expect(wrapper.vm.qrValue).toEqual(wrapper.vm.address);
    });
  })
});
