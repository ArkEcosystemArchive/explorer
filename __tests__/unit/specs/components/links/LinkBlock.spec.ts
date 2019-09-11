import { mount, createLocalVue, RouterLinkStub } from "@vue/test-utils";
import StringsMixin from "@/mixins/strings";
import store from "@/store";

import { LinkBlock } from "@/components/links";
import { useI18n } from "../../../__utils__/i18n";

describe("Components > Links > Block", () => {
  const localVue = createLocalVue();
  const i18n = useI18n(localVue);

  const testBlock = "8900581355787753944";

  it("should display a truncated link to a block", () => {
    const wrapper = mount(LinkBlock, {
      propsData: {
        id: testBlock,
      },
      stubs: {
        RouterLink: RouterLinkStub,
      },
      i18n,
      localVue,
      mixins: [StringsMixin],
      store,
    });
    expect(wrapper.contains("a")).toBe(true);
    expect(wrapper.findAll("a")).toHaveLength(2);
    expect(wrapper.text()).toEqual(expect.stringContaining(wrapper.vm.truncate(testBlock)));
  });
});
