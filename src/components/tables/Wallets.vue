<template>
  <table-component :data="wallets" :show-filter="false" :show-caption="false" table-class="w-full">
    <table-column :sortable="false" show="index" :label="$t('Rank')" header-class="left-header-start-cell" cell-class="left-start-cell w-24">
      <template slot-scope="row">
        {{ getRank(row.vueTableComponentInternalRowId) }}
      </template>
    </table-column>

    <table-column show="address" :label="$t('Address')" header-class="left-header-cell" cell-class="left-cell">
      <template slot-scope="row">
        <link-wallet :address="row.address"></link-wallet>
      </template>
    </table-column>

    <table-column show="balance" :label="$t('Balance')" header-class="right-header-cell" cell-class="right-cell">
      <template slot-scope="row">
        {{ readableCrypto(row.balance) }}
      </template>
    </table-column>

    <table-column :sortable="false" show="supply" :label="$t('Supply')" header-class="right-header-end-cell" cell-class="right-end-cell w-24">
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
