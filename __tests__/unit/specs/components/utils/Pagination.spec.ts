import "../../../__mocks__/matchMediaMock.js";
import clickOutside from "../../../../../src/directives/click-outside";

import { mount, createLocalVue } from "@vue/test-utils";
import mixins from "@/mixins";
import store from "@/store";

import Pagination from "@/components/utils/pagination/Pagination";
import { useI18n } from "../../../__utils__/i18n";
import Vuex from "vuex";

describe("Components > Utils > Pagination", () => {
  const localVue = createLocalVue();
  localVue.directive("click-outside", clickOutside);

  localVue.use(Vuex);

  const i18n = useI18n(localVue);

  it("should display a pagination component", () => {
    const wrapper = mount(Pagination, {
      propsData: {
        meta: {
          pageCount: 2,
          self: "1",
          first: "1",
          last: "2",
          previous: null,
          next: "2",
        },
        currentPage: 1,
      },
      i18n,
      localVue,
      mixins,
      store,
    });

    expect(wrapper.find(".Pagination").exists()).toBe(true);
  });

  it("should hide the previous and first buttons if no previous page", () => {
    const wrapper = mount(Pagination, {
      propsData: {
        meta: {
          pageCount: 2,
          self: "1",
          first: "1",
          last: "2",
          previous: null,
          next: "2",
        },
        currentPage: 1,
      },
      i18n,
      localVue,
      mixins,
      store,
    });

    expect(wrapper.find("Pagination__Button--first").exists()).toBe(false);
    expect(wrapper.find("Pagination__Button--previous").exists()).toBe(false);
  });

  it("should hide the next and last buttons if no next page", () => {
    const wrapper = mount(Pagination, {
      propsData: {
        meta: {
          pageCount: 2,
          self: "2",
          first: "1",
          last: "2",
          previous: "1",
          next: null,
        },
        currentPage: 2,
      },
      i18n,
      localVue,
      mixins,
      store,
    });

    expect(wrapper.find("Pagination__Button--next").exists()).toBe(false);
    expect(wrapper.find("Pagination__Button--last").exists()).toBe(false);
  });
});
