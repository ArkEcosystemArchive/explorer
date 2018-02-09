<template>
  <table-component :data="wallets" :show-filter="false" :show-caption="false" table-class="w-full">
    <table-column :sortable="false" show="index" label="Rank" header-class="p-4 pl-10 text-left" cell-class="p-4 pl-10 text-left border-none w-24">
      <template slot-scope="row">
        {{ getRank(row.vueTableComponentInternalRowId) }}
      </template>
    </table-column>

    <table-column show="address" label="Address" header-class="p-4 text-left" cell-class="p-4 text-left border-none">
      <template slot-scope="row">
        <wallet-link :address="row.address"></wallet-link>
      </template>
    </table-column>

    <table-column show="balance" label="Balance" header-class="p-4 text-right" cell-class="p-4 text-right border-none">
      <template slot-scope="row">
        {{ readableCrypto(row.balance) }}
      </template>
    </table-column>

    <table-column :sortable="false" show="supply" label="Supply" header-class="p-4 pr-10 text-right" cell-class="p-4 pr-10 text-right border-none w-24">
      <template slot-scope="row">
        {{ readableNumber((row.balance / supply) * 100) }}%
      </template>
    </table-column>
  </table-component>
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
