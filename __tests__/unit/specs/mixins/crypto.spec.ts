import { Managers } from "@arkecosystem/crypto";
import { createLocalVue, shallowMount, Wrapper } from "@vue/test-utils";
import CryptoMixin from "@/mixins/crypto";
import store from "@/store";
import Vue from "vue";

describe("Mixins > Crypto", () => {
  let wrapper: Wrapper<Vue>;

  beforeEach(() => {
    Managers.configManager.setFromPreset("mainnet");

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

  // TODO: enable once the Buffer issue is solved
  describe("addressFromPublicKey", () => {
    it("should generate a correct address from a public key", () => {
      expect(
        wrapper.vm.addressFromPublicKey("02dff0fdf2ca1ac13a08627e6ca1821b72fb07b50e6b4f73042ca1ac6c26108e82"),
      ).toEqual("ANkHGk5uZqNrKFNY5jtd4A88zzFR3LnJbe");
    });
  });

  // TODO: enable once the Buffer issue is solved
  describe("addressFromMultiSignatureAsset", () => {
    it("should generate a correct address from a multisignature asset", () => {
      expect(
        wrapper.vm.addressFromMultiSignatureAsset({
          publicKeys: [
            "02fb3def2593a00c5b84620addf28ff21bac452bd71a37d4d8e24f301683a81b56",
            "021b358bdb2ff2fe20fd0b3ff2d1806e99c45864a1bff2adc200c407405dad6ee6",
            "02bc9f661fcc8abca65fe9aff4614036867b7fdcc5730085ccc5cb854664d0194b",
            "03b050073621b9b5caec9461d44d6bcf21a858c47dd88230ce723e25c1bc75c219",
            "03c44c6b6cc9893ae21ca606712fd0f6f03c41ce81c4f6ce5a640f4b0b82ec1ce0",
          ],
          min: 3,
        }),
      ).toEqual("AXxNbmaKspf9UqgKhfTRDdn89NidP2gXWh");
    });
  });
});
