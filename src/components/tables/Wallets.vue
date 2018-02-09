<template>
  <table-component :data="wallets" :show-filter="false" :show-caption="false" table-class="w-full">
    <table-column :sortable="false" show="index" label="Rank" header-class="p-4 pl-10 text-left" cell-class="p-4 pl-10 text-left border-none w-24">
      <template slot-scope="row">
        {{ getRank(row.vueTableComponentInternalRowId) }}
      </template>
    </table-column>

    <table-column show="address" label="Address" header-class="p-4 text-left" cell-class="p-4 text-left border-none">
      <template slot-scope="row">
        <link-wallet :address="row.address"></link-wallet>
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
