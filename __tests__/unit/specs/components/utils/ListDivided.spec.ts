import { mount } from "@vue/test-utils";
import { ListDivided, ListDividedItem } from "@/components/utils/listDivided";

describe("Components > Utils > ListDivided", () => {
  it("should render ListDivided", () => {
    const wrapper = mount(ListDivided);

    expect(wrapper.isVueInstance()).toBe(true);
  });

  describe("Components > Utils > ListDivided > ListDividedItem", () => {
    it("should render item", () => {
      const wrapper = mount(ListDividedItem, {
        propsData: {
          label: "test",
        },
      });

      expect(wrapper.isVueInstance()).toBe(true);
    });

    it("should show the label", () => {
      const label = "test";
      const wrapper = mount(ListDividedItem, {
        propsData: {
          label,
        },
      });
      const div = wrapper.find(".ListDividedItem__label");

      expect(div.text()).toBe(label);
      expect(div.isVisible()).toBeTrue();
    });

    it("should show the label description", () => {
      const description = "Lorem ipsum dolor sit amet";
      const wrapper = mount(ListDividedItem, {
        propsData: {
          label: "test",
          labelDescription: description,
        },
      });
      const div = wrapper.find(".ListDividedItem__label__description");

      expect(div.text()).toBe(description);
      expect(div.isVisible()).toBeTrue();
    });

    it("should accept default slot", () => {
      const wrapper = mount(ListDividedItem, {
        propsData: {
          label: "test",
        },
        slots: {
          default: "<strong>test</strong>",
        },
      });
      const div = wrapper.find(".ListDividedItem__value");

      expect(div.isVisible()).toBeTrue();
    });
  });
});
