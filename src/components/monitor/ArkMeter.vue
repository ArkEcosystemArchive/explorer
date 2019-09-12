<template>
  <svg :viewBox="`0 0 ${width} ${width}`" style="transform: rotate(-90deg);">
    <circle :cx="width / 2" :cy="width / 2" :r="radius" :stroke-width="stroke" fill="none" stroke="var(--ark-meter)" />
    <circle
      v-if="percentage"
      :style="{ strokeDashoffset: dashoffset, strokeDasharray: circumference }"
      :cx="width / 2"
      :cy="width / 2"
      :r="radius"
      :stroke-width="stroke"
      stroke-linecap="round"
      fill="none"
      stroke="currentColor"
    />
  </svg>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class ArkMeter extends Vue {
  @Prop({ required: false, default: 0 }) public percentage: number;
  @Prop({ required: false, default: 25 }) public radius: number;
  @Prop({ required: false, default: 8 }) public stroke: number;

  get circumference(): number {
    return 2 * Math.PI * this.radius;
  }

  get width(): number {
    return this.radius * 2 + this.stroke * 2;
  }

  get dashoffset(): number {
    const progress = this.percentage / 100;

    return this.circumference * (1 - progress);
  }
}
</script>
