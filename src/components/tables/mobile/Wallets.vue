<template>
  <div>
    <div v-for="(row, index) in wallets" :key="row.address" class="tx-row-mobile px-5 py-4">
      <div class="border-b py-4 flex justify-between flex-wrap">
        <div>Rank</div>
        <div>{{ getRank(index) }}</div>
      </div>

      <div class="border-b py-4 flex justify-between flex-wrap">
        <div>Address</div>
        <wallet-link :address="row.address"></wallet-link>
      </div>

      <div class="border-b py-4 flex justify-between flex-wrap">
        <div>Balance</div>
        <div>{{ readableCrypto(row.balance) }}</div>
      </div>

      <div class="py-4 flex justify-between flex-wrap">
        <div>Supply</div>
        <div>{{ readableNumber((row.balance / supply) * 100) }}%</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Currency from '@/components/utils/Currency'
import WalletLink from '@/components/links/Wallet'
import { mapGetters } from 'vuex'

export default {
  components: { WalletLink, Currency },

  props: {
    wallets: {
      type: Array,
      required: true,
    },
  },

  computed: {
    ...mapGetters('network', ['supply']),
  },

  methods: {
    getRank(index) {
      const page = this.$route.params.page > 1 ? this.$route.params.page - 1 : 0

      return page * 25 + (index + 1)
    },
  },
}
</script>

<style scoped>
.tx-row-mobile:nth-child(even) {
  background-color: var(--color-theme-table-row);
}
</style>
