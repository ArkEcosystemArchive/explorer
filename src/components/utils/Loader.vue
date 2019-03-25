<template>
  <span>
    <div class="text-center" v-if="data === null">
      <pulse-loader color="#037cff" />
    </div>

    <slot v-else />
  </span>
</template>

<script type="text/ecmascript-6">
import { PulseLoader } from 'vue-spinner/dist/vue-spinner.min.js'

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
