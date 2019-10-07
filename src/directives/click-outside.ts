export default {
  // TODO: can be improved upon with actual types
  bind(el: any, binding: any, vnode: any): void {
    el.clickOutsideEvent = (ev: any) => {
      const path = ev.path || (ev.composedPath ? ev.composedPath() : undefined);

      if (path ? path.indexOf(el) < 0 : !el.contains(ev.target)) {
        return binding.value.call(vnode.context, ev);
      }
    };

    document.documentElement.addEventListener("click", el.clickOutsideEvent, false);
  },
  unbind(el: any) {
    document.documentElement.removeEventListener("click", el.clickOutsideEvent, false);
  },
};
