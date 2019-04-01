<template>
  <span>
    <div
      v-if="data === null"
      class="text-center"
    >
      <PulseLoader color="#037cff" />
    </div>

    <slot v-else />
  </span>
</template>

<script type="text/ecmascript-6">
import { PulseLoader } from 'vue-spinner/dist/vue-spinner.min.js'

export default {
  name: 'Loader',

  components: {
    PulseLoader
  },

  props: {
    data: {
      validator: value => {
        return Array.isArray(value) || value === null
      },
      required: true
    }
  }
}
</script>
