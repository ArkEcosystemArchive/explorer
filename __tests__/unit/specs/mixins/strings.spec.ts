import { createLocalVue, shallowMount, Wrapper } from "@vue/test-utils";
import StringsMixin from "@/mixins/strings";
import Vue from "vue";

describe("Mixins > Strings", () => {
  let wrapper: Wrapper<Vue>;

  beforeEach(() => {
    const localVue = createLocalVue();

    const TestComponent = {
      name: "TestComponent",
      template: "<div />",
    };

    wrapper = shallowMount(TestComponent, {
      localVue,
      mixins: [StringsMixin],
    });
  });

  describe("capitalize", () => {
    it("should capitalize the first letter of the string", () => {
      expect(wrapper.vm.capitalize("hello world")).toEqual("Hello world");
      expect(wrapper.vm.capitalize("hELLO WORLD")).toEqual("HELLO WORLD");
    });

    it("should keep the first letter capitalized", () => {
      expect(wrapper.vm.capitalize("Hello world")).toEqual("Hello world");
    });

    it("should do nothing when empty string passed", () => {
      expect(wrapper.vm.capitalize("")).toEqual("");
    });
  });

  describe("truncate", () => {
    it("should properly truncate the given data, if given length is smaller than value", () => {
      expect(wrapper.vm.truncate("Hello World", 1)).toEqual("Hello Worl...");
      expect(wrapper.vm.truncate("Hello World", 10)).toEqual("Hell...rld");
      expect(wrapper.vm.truncate("Hello Beautiful World", 13)).toEqual("Hello...World");
    });

    it("should properly truncate the given data if no length is given", () => {
      expect(wrapper.vm.truncate("Hello World")).toEqual("Hello World");
      expect(wrapper.vm.truncate("Hello Beatiful World")).toEqual("Hello...World");
    });

    it("should properly truncate the given data, when applicable", () => {
      expect(wrapper.vm.truncate("Hello World", 5)).toEqual("H...d");
      expect(wrapper.vm.truncate("Hello World", 100)).toEqual("Hello World");
    });

    it("should properly format the given data", () => {
      expect(wrapper.vm.truncate("Hello World", 8)).toEqual("Hel...ld");
      expect(wrapper.vm.truncate("Hello World", 8, "left")).toEqual("...World");
      expect(wrapper.vm.truncate("Hello World", 8, "middle")).toEqual("Hel...ld");
      expect(wrapper.vm.truncate("Hello World", 8, "right")).toEqual("Hello...");
      expect(wrapper.vm.truncate("ThisIsA24CharacterString", 24)).toEqual("ThisIsA24CharacterString");
      expect(wrapper.vm.truncate("ThisIsA24CharacterString", 23)).toEqual("ThisIsA24C...cterString");
      expect(wrapper.vm.truncate("&ThisIsA25CharacterString", 24)).toEqual("&ThisIsA25C...cterString");
    });

    it('should return original value if incorrect "where" is specified', () => {
      expect(wrapper.vm.truncate("Hello World", 8, "something")).toEqual("Hello World");
    });
  });

  describe("percentageString", () => {
    it("should return dash when value is undefined", () => {
      expect(wrapper.vm.percentageString(undefined)).toEqual("-");
      expect(wrapper.vm.percentageString(undefined, 0)).toEqual("-");
    });

    it("should return value with percentage sign", () => {
      expect(wrapper.vm.percentageString(10)).toEqual(
        Number(10).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "%",
      );
      expect(wrapper.vm.percentageString(10.1234)).toEqual(
        Number(10.12).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "%",
      );
      expect(wrapper.vm.percentageString(10, 3)).toEqual(
        Number(10).toLocaleString(undefined, { minimumFractionDigits: 3, maximumFractionDigits: 3 }) + "%",
      );
      expect(wrapper.vm.percentageString(101.2345, 5)).toEqual(
        Number(101.2345).toLocaleString(undefined, { minimumFractionDigits: 5, maximumFractionDigits: 5 }) + "%",
      );
    });
  });

  // describe("emojify", () => {
  //   it("should return emoji", () => {
  //     expect(wrapper.vm.emojify(":smile:")).toEqual("😄");
  //   });
  // });

  // describe("sanitize", () => {
  //   it("should sanitize the vendorfield", () => {
  //     expect(wrapper.vm.sanitizeVendorfield("https://www.google.com/ Don't be an ash0le :smile:")).toEqual("*********************** Don't be an ****** 😄");
  //   });
  // });
});
