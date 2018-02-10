<template>
  <div>
    <div v-for="(row, index) in wallets" :key="row.address" class="row-mobile">
      <div class="list-row-border-b">
        <div>Rank</div>
        <div>{{ getRank(index) }}</div>
      </div>

      <div class="list-row-border-b">
        <div>Address</div>
        <link-wallet :address="row.address"></link-wallet>
      </div>

      <div class="list-row-border-b">
        <div>Balance</div>
        <div>{{ readableCrypto(row.balance) }}</div>
      </div>

      <div class="list-row">
        <div>Supply</div>
        <div>{{ readableNumber((row.balance / supply) * 100) }}%</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'

export default {
  props: {
    wallets: {
      type: Array,
      required: true,
    },
  },

  computed: {
    ...mapGetters('network', ['supply'])
  },

  methods: {
    getRank(index) {
      const page = this.$route.params.page > 1 ? this.$route.params.page - 1 : 0

      return page * 25 + (index + 1)
    }
  }
}
</script>

<style scoped>
.row-mobile:nth-child(even) {
  background-color: var(--color-theme-table-row);
}
</style>
