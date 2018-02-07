<template>
  <table class="w-full">
    <thead>
      <tr class="text-xs text-theme-text-thead">
        <th class="p-4 pl-10 text-left">Rank</th>
        <th @click="sortBy('address')" class="p-4 text-left">Address</th>
        <th @click="sortBy('balance')" class="p-4 text-right">Balance</th>
        <th class="p-4 pr-10 text-right">Supply</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, index) in sortedWallets" :key="row.address">
        <td class="p-4 pl-10 text-left border-none w-24">
          {{ getRank(index) }}
        </td>

        <td class="p-4 text-left border-none">
          <wallet-link :address="row.address"></wallet-link>
        </td>

        <td class="p-4 text-right border-none">
          {{ readableCrypto(row.balance) }}
        </td>

        <td class="p-4 pr-10 text-right border-none w-24">
          {{ readableNumber((row.balance / supply) * 100) }}%
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script type="text/ecmascript-6">
import Currency from '@/components/utils/Currency'
import WalletLink from '@/components/links/Wallet'
import SortableTable from '@/mixins/sortable-table'
import { mapGetters } from 'vuex'

export default {
  mixins: [SortableTable],

  components: { WalletLink, Currency },

  props: {
    wallets: {
      type: Array,
      required: true,
    },
  },

  computed: {
    ...mapGetters('network', ['supply']),

    sortedWallets() {
      return _.orderBy(this.wallets, this.sortKey, this.sortDirection)
    }
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
tbody tr:nth-child(even) {
  background-color: var(--color-theme-table-row);
}

tbody tr:hover {
  background-color: rgba(0, 0, 0, 0);
  transform: scale(1.015);
  box-shadow: var(--theme-table-hover-shadow);
  z-index: 999;
  border-radius: 7px;
}

tr:hover,
tr:hover td {
  background-color: var(--color-theme-table-row-hover);
}
tr:hover td:first-child {
  border-top-left-radius: 7px;
  border-bottom-left-radius: 7px;
}
tr:hover td:last-child {
  border-top-right-radius: 7px;
  border-bottom-right-radius: 7px;
}
</style>
