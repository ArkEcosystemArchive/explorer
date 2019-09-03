<template>
  <svg
    :viewBox="`0 0 ${width} ${width}`"
    style="transform: rotate(-90deg);"
  >
    <circle
      :cx="width / 2"
      :cy="width / 2"
      :r="radius"
      :stroke-width="stroke"
      fill="none"
      stroke="var(--ark-meter)"
    />
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

<script type="text/ecmascript-6">
export default {
  name: 'ArkMeter',

  props: {
    percentage: {
      type: Number,
      default: 0
    },
    radius: {
      type: Number,
      default: 25
    },
    stroke: {
      type: Number,
      default: 8
    }
  },

  computed: {
    circumference () {
      return 2 * Math.PI * this.radius
    },

    width () {
      return this.radius * 2 + this.stroke * 2
    },

    dashoffset () {
      const progress = this.percentage / 100

      return this.circumference * (1 - progress)
    }
  }
}
</script>
