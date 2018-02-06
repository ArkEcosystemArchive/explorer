<template>
  <span>
    {{ readableCurrency(amount) }} <span>{{ currencySymbol }}</span>
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
