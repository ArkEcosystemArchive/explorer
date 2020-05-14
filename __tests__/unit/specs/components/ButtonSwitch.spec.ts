import { mount } from "@vue/test-utils";
import ButtonSwitch from "@/components/ButtonSwitch";

describe("Components > ButtonSwitch", () => {
  it("should render ButtonSwitch", () => {
    const wrapper = mount(ButtonSwitch);

    expect(wrapper.isVueInstance()).toBe(true);
  });

  it("should toggle when user clicks", () => {
    const wrapper = mount(ButtonSwitch);
    wrapper.trigger("click");

    expect(wrapper.emitted("change")).toBeTruthy();
  });

  it("should toggle by method", () => {
    const wrapper = mount(ButtonSwitch);
    wrapper.vm.toggle();

    expect(wrapper.emitted("change")).toBeTruthy();
  });

  it("should be active", () => {
    const wrapper = mount(ButtonSwitch, {
      propsData: {
        isActive: true,
      },
    });

    expect(wrapper.contains(".ButtonSwitch--active")).toBeTruthy();
  });

  it("should be disabled", () => {
    const wrapper = mount(ButtonSwitch, {
      propsData: {
        isDisabled: true,
      },
    });
    wrapper.trigger("click");

    expect(wrapper.emitted("change")).toBeFalsy();
  });
});
