<template>
  <svg
    v-if="name"
    v-bind="styles"
    :viewBox="viewBox"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    class="SvgIcon fill-current"
  >
    <use :xlink:href="iconPath" />
  </svg>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class SvgIcon extends Vue {
  @Prop({ required: true }) public name: string | null;
  @Prop({ required: false, default: "0 0 25 25" }) public viewBox: [string] | string;

  get styles() {
    const size = Array.isArray(this.viewBox) ? this.viewBox : this.viewBox.split(" ");
    const [x, y, width, height] = size.map(i => i + "px");
    return { x, y, width, height };
  }

  get iconPath() {
    let icon = require(`@/assets/images/svg/${this.name}.svg`);
    if (Object.prototype.hasOwnProperty.call(icon, "default")) {
      icon = icon.default;
    }

    return icon.url;
  }
}
</script>
