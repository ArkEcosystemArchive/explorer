<template>
  <svg style="transform: rotate(-90deg);" :viewBox="`0 0 ${width} ${width}`">
    <circle
      fill="none"
      stroke="var(--ark-meter)"
      :cx="width / 2" :cy="width / 2" :r="radius" :stroke-width="stroke" />
    <circle v-if="percentage"
      :style="{strokeDashoffset: dashoffset, strokeDasharray: circumference }"
      stroke-linecap="round"
      fill="none"
      :cx="width / 2" :cy="width / 2" :r="radius" :stroke-width="stroke" stroke="currentColor"
    />
  </svg>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    percentage: {
      type: Number,
      default: 0,
    },
    radius: {
      type: Number,
      default: 25,
    },
    stroke: {
      type: Number,
      default: 8,
    },
  },

  computed: {
    circumference() {
      return 2 * Math.PI * this.radius
    },

    width() {
      return this.radius * 2 + this.stroke * 2
    },

    dashoffset() {
      const progress = this.percentage / 100

      return this.circumference * (1 - progress)
    }
  },
}
</script>
