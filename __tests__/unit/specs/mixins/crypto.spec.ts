import { createLocalVue, shallowMount, Wrapper } from "@vue/test-utils";
import CryptoMixin from "@/mixins/crypto";
import store from "@/store";
import Vue from "vue";

describe("Mixins > Crypto", () => {
  let wrapper: Wrapper<Vue>;

  beforeEach(() => {
    const localVue = createLocalVue();

    const TestComponent = {
      name: "TestComponent",
      template: "<div />",
    };

    wrapper = shallowMount(TestComponent, {
      localVue,
      store,
      mixins: [CryptoMixin],
    });
  });

  describe("stringToHex", () => {
    it("should change a string into its hex representation", () => {
      expect(wrapper.vm.stringToHex("abcdefghijklmnopqrstuvwxyz")).toEqual("6162636465666768696a6b6c6d6e6f707172737475767778797a");
      expect(wrapper.vm.stringToHex("this is some string")).toEqual("7468697320697320736f6d6520737472696e67");
      expect(wrapper.vm.stringToHex("\u0011unicode\u0011works")).toEqual("11756e69636f646511776f726b73");
      expect(wrapper.vm.stringToHex("18470234asdfa{}[];',./")).toEqual("313834373032333461736466617b7d5b5d3b272c2e2f");
    });
  });

});