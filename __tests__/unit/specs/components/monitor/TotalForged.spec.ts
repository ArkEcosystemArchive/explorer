import { mount, createLocalVue } from "@vue/test-utils";
import CurrencyMixin from "@/mixins/currency";
import NetworkMixin from "@/mixins/network";
import TotalForged from "@/components/monitor/header/TotalForged";
import { useI18n } from "../../../__utils__/i18n";
import Vuex from "vuex";
import { BigNumber } from "@/utils";

const getTotalForged = (supply, initialSupply) => {
  return BigNumber.make(supply).minus(initialSupply).dividedBy(1e8).toString();
};

describe("Components > Monitor > TotalForged", () => {
  let wrapper;
  let store;

  beforeEach(() => {
    const localVue = createLocalVue();
    localVue.use(Vuex);

    const i18n = useI18n(localVue);

    const networkState = {
      supply: "1500",
      initialSupply: "1000",
    };

    store = new Vuex.Store({
      modules: {
        network: {
          namespaced: true,
          state: networkState,
          getters: {
            supply: () => networkState.supply,
            initialSupply: () => networkState.initialSupply,
          },
          mutations: {
            setSupply(state, payload) {
              state.supply = payload.value;
            },
          },
          actions: {
            setSupply: ({ commit }, value) => {
              commit({
                type: "setSupply",
                value,
              });
            },
          },
        },
      },
      strict: true,
    });

    wrapper = mount(TotalForged, {
      i18n,
      localVue,
      mixins: [CurrencyMixin, NetworkMixin],
      store,
    });
  });

  it("should display calculated result", done => {
    expect.assertions(1);

    wrapper.vm.$nextTick(() => {
      expect(wrapper.find("div > div.text-lg").text()).toBe(
        getTotalForged(store.getters["network/supply"], store.getters["network/initialSupply"]),
      );
      done();
    });
  });

  it("should change calculated result when supply changes", done => {
    expect.assertions(2);

    wrapper.vm.$nextTick(() => {
      const textBeforeChange = wrapper.find("div > div.text-lg").text();
      store.dispatch("network/setSupply", "2000");

      wrapper.vm.$nextTick(() => {
        const textAfterChange = wrapper.find("div > div.text-lg").text();
        expect(textAfterChange).toBe(
          getTotalForged(store.getters["network/supply"], store.getters["network/initialSupply"]),
        );
        expect(textBeforeChange).not.toBe(textAfterChange);

        done();
      });
    });
  });

  // TODO: figure out why this results in a timeout
  // it('should handle offsets greater than heights', (done) => {
  //   expect.assertions(1)

  //   store.dispatch('network/setHeight', 1)

  //   wrapper.vm.$nextTick(() => {
  //     expect(wrapper.find('div > div.text-lg').text())
  //       .toBe((0).toLocaleString())

  //     done()
  //   })
  // })
});
