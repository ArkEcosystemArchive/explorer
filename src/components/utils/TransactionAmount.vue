<template>
  <span
    v-tooltip="{
      trigger: 'hover click',
      content: transaction.amount && price ? readableCurrency(transaction.amount, price) : '',
      placement: 'top'
    }"
    :class="{
      'text-red': transaction.sender === $route.params.address,
      'text-green': transaction.recipient === $route.params.address && isTransfer,
    }"
  >
    {{ readableCrypto(transaction.amount) }}
  </span>
</template>

<script type="text/ecmascript-6">
import CryptoCompareService from '@/services/crypto-compare'

export default {
  name: 'TransactionAmount',

  props: {
    transaction: {
      type: Object,
      required: true
    },
    type: {
      type: Number,
      required: true
    }
  },

  data: () => ({
    price: null
  }),

  computed: {
    isTransfer () {
      if (this.type !== undefined) {
        // 0 = transfer, 6 = timelock transfer, 7 = multipayment
        return this.type === 0 || this.type === 6 || this.type === 7
      }
      return false
    }
  },

  watch: {
    transaction () {
      this.updatePrice()
    }
  },

  created () {
    this.updatePrice()
  },

  methods: {
    async updatePrice () {
      this.price = await CryptoCompareService.dailyAverage(this.transaction.timestamp.unix)
    }
  }

}
</script>
