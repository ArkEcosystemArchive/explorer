<template>
  <span :class="{
    'text-red': transaction.sender === $route.params.address,
    'text-green': transaction.recipient === $route.params.address && isTransfer,
  }">
    <div v-if="price" v-tooltip="{ trigger: 'hover click', content: `${readableCurrency(transaction.amount, price)}`, placement: 'top' }">{{ readableCrypto(transaction.amount) }}</div>
    <div v-else>{{ readableCrypto(transaction.amount) }}</div>
  </span>
</template>

<script type="text/ecmascript-6">
import CryptoCompareService from '@/services/crypto-compare'

export default {
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

  computed: {
    isTransfer() {
      if (this.type !== undefined) {
        // 0 = transfer, 6 = timelock transfer, 7 = multipayment
        return this.type === 0 || this.type === 6 || this.type === 7
      }
      return false
    }
  },

  data: () => ({
    price: null
  }),

  created() {
    this.updatePrice()
  },

  watch: {
    transaction() {
      this.updatePrice()
    }
  },

  methods: {
    async updatePrice() {
      this.price = await CryptoCompareService.dailyAverage(this.transaction.timestamp.unix)
    }
  }

}
</script>
