<template>
  <table-component :data="delegates" sort-by="rate" sort-order="desc" :show-filter="false" :show-caption="false" table-class="w-full text-xs md:text-base">
    <table-column show="rate" label="Rank" header-class="p-4 pl-5 sm:pl-10 text-left" cell-class="p-4 pl-5 sm:pl-10 text-left border-none w-32">
      <template slot-scope="row">
        {{ row.rate }}
      </template>
    </table-column>

    <table-column show="address" label="Name" header-class="p-4 text-left" cell-class="p-4 text-left border-none">
      <template slot-scope="row">
        <link-wallet :address="row.address"></link-wallet>
      </template>
    </table-column>

    <table-column show="productivity" label="Productivity" header-class="p-4 text-right hidden md:table-cell" cell-class="p-4 text-right border-none hidden md:table-cell">
      <template slot-scope="row">
        {{ row.productivity }}%
      </template>
    </table-column>

    <table-column show="approval" label="Approval" header-class="p-4 pr-5 sm:pr-10 text-right hidden md:table-cell" cell-class="p-4 pr-10 text-right border-none hidden md:table-cell w-40">
      <template slot-scope="row">
        {{ row.approval }}%
      </template>
    </table-column>
  </table-component>
</template>

<script type="text/ecmascript-6">
import DelegateService from '@/services/delegate'
import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
  data: () => ({ delegates: [] }),

  computed: {
    ...mapGetters('network', ['activeDelegates']),
  },

  mounted() {
    this.getDelegates()
  },

  methods: {
    getDelegates() {
      DelegateService.standby().then(response => (this.delegates = response))
    },
  },
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
