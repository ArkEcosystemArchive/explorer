import { shallowMount } from "@vue/test-utils";
import Loader from "@/components/utils/Loader";

describe("Components > Utils > Loader", () => {
  it("should render Loader", () => {
    const wrapper = shallowMount(Loader, {
      propsData: {
        data: null,
      },
    });

    expect(wrapper.isVueInstance()).toBe(true);
  });
});
