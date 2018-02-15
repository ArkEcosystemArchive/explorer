<template>
  <span>
    <div class="text-center" v-if="!keys.length">
      <pulse-loader color="#037cff"></pulse-loader>
    </div>

    <slot v-if="keys.length"></slot>
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
  },

  computed: {
    keys() { return Object.keys(this.data) }
  }
}
</script>
