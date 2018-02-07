<template>
  <table class="w-full text-xs md:text-base">
    <thead>
      <tr class="opacity-25 md:text-xs">
        <th class="p-4 pl-5 sm:pl-10 text-left">Rank</th>
        <th class="p-4 text-left">Name</th>
        <th class="p-4 text-right hidden md:table-cell">Productivity</th>
        <th class="p-4 pr-5 sm:pr-10 text-right hidden md:table-cell">Approval</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, index) in delegates" :key="row.address">
        <td class="p-4 pl-5 sm:pl-10 text-left border-none w-24">{{ row.rate }}</td>

        <td class="p-4 text-left border-none">
          <wallet-link :address="row.address"></wallet-link>
        </td>

        <td class="p-4 text-right border-none hidden md:table-cell">{{ row.productivity }}%</td>

        <td class="p-4 pr-10 text-right border-none hidden md:table-cell w-24">{{ row.approval }}%</td>
      </tr>
    </tbody>
  </table>
</template>

<script type="text/ecmascript-6">
import Currency from '@/components/utils/Currency'
import WalletLink from '@/components/links/Wallet'
import DelegateService from '@/services/delegate'
import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
  components: { Currency, WalletLink },

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
