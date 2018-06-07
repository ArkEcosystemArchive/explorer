<template>
  <span>
    <div class="text-center" v-if="data === null">
      <pulse-loader color="#037cff"></pulse-loader>
    </div>

    <slot v-else></slot>
  </span>
</template>

<script type="text/ecmascript-6">
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

export default {
  components: {
    PulseLoader
  },

  props: {
    data: {
      required: true
    }
  }
}
</script>
