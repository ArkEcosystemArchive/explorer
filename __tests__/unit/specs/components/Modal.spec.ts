import { mount } from "@vue/test-utils";
import Modal from "@/components/Modal";

describe("Components > Modal", () => {
  describe("when instantiated", () => {
    it("should show a modal with a mask overlay", () => {
      const wrapper = mount(Modal);
      expect(wrapper.contains(".modal-mask")).toBe(true);
    });
  });

  describe("when closed by button", () => {
    it("should emit a close event", () => {
      const wrapper = mount(Modal);
      const button = wrapper.find("button");
      button.trigger("click");
      expect(wrapper.emitted("close")).toBeTruthy();
    });
  });

  describe("when closed by esc button", () => {
    it("should emit a close event", () => {
      const wrapper = mount(Modal, { attachToDocument: true });
      wrapper.trigger("keyup.esc");
      expect(wrapper.emitted("close")).toBeTruthy();
    });
  });

  describe("when closed by clicking mask overlay", () => {
    it("should emit a close event", () => {
      const wrapper = mount(Modal);
      const mask = wrapper.find(".modal-mask");
      mask.trigger("click");
      expect(wrapper.emitted("close")).toBeTruthy();
    });
  });

  it("should not close when pressing inside the modal", () => {
    const wrapper = mount(Modal);
    const modal = wrapper.find(".modal-container");
    modal.trigger("click");
    expect(wrapper.emitted("close")).toBeFalsy();
  });
});
