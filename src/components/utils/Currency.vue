<template>
  <span class="whitespace-no-wrap">
    {{ readableCurrency(amount) }}
  </span>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'

export default {
  props: {
    amount: {
      type: Number,
      required: true
    }
  },

  computed: {
    ...mapGetters('currency', { currencySymbol: 'symbol' }),
  }
}
</script>
