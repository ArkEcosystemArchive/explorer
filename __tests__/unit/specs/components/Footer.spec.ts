import { shallowMount, createLocalVue } from "@vue/test-utils";
import sinon from "sinon";
import AppFooter from "@/components/AppFooter";
import { useI18n } from "../../__utils__/i18n";

global.VUE_APP_GIT_VERSION = "43496685190e3e768c3f5b1bc322ff8b7ed4c696";
global.VUE_APP_GIT_DATE = "2018-01-01";

describe("Components > Footer", () => {
  const localVue = createLocalVue();
  const i18n = useI18n(localVue);

  it("uses the current year always", () => {
    const year = 1984;

    // Sandboxing the global Date object avoids problems with other tests
    const sandbox = sinon.createSandbox({
      useFakeTimers: new Date(year, 1),
    });

    const cmp = shallowMount(AppFooter, {
      localVue,
      i18n,
    });

    expect(cmp.vm.year).toEqual(year.toString());
    sandbox.restore();
  });
});
