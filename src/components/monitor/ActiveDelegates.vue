<template>
  <table class="w-full text-xs md:text-base">
    <thead>
      <tr class="opacity-25 md:text-xs">
        <th @click="sortBy('rate')" class="p-4 pl-5 sm:pl-10 text-left">
          <span class="hidden sm:inline-block">Rank</span>
          <span class="sm:hidden">#</span>
        </th>
        <th @click="sortBy('username')" class="p-4 text-left">Name</th>
        <th @click="sortBy('producedblocks')" class="p-4 text-left hidden xl:table-cell">Forged</th>
        <th @click="sortBy('forgingStatus.lastBlock.timestamp')" class="p-4 text-left">Last Forged</th>
        <th class="p-4 pr-5 md:pr-4 text-right hidden md:inline-block">Status</th>
        <th @click="sortBy('productivity')" class="p-4 text-right hidden md:table-cell">Productivity</th>
        <th @click="sortBy('approval')" class="p-4 pr-5 sm:pr-10 text-right hidden md:table-cell">Approval</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, index) in sortedDelegates" :key="row.address">
        <td class="p-3 pl-5 sm:pl-10 text-left border-none">{{ row.rate }}</td>

        <td class="p-3 text-left border-none">
          <wallet-link :address="row.address"></wallet-link>
        </td>

        <td class="p-3 text-left border-none hidden xl:table-cell">
          {{ readableCrypto(totalForged(row)) }}
        </td>

        <td class="p-3 text-left border-none">
          {{ lastForgingTime(row) }}
        </td>

        <td class="p-3 pr-4 text-right border-none">
          <svg
           xmlns="http://www.w3.org/2000/svg"
           xmlns:xlink="http://www.w3.org/1999/xlink"
           width="19px" height="19px"
           v-tooltip="statusMessage(row)">
          <path fill-rule="evenodd" :fill="statusColor(row)"
           d="M9.500,-0.000 C14.746,-0.000 18.999,4.253 18.999,9.500 C18.999,14.747 14.746,19.000 9.500,19.000 C4.253,19.000 -0.001,14.747 -0.001,9.500 C-0.001,4.253 4.253,-0.000 9.500,-0.000 Z"/>
          </svg>
        </td>

        <td class="p-3 text-right border-none hidden md:table-cell">{{ row.productivity }}%</td>

        <td class="p-3 pr-10 text-right border-none hidden md:table-cell">{{ row.approval }}%</td>
      </tr>
    </tbody>
  </table>
</template>

<script type="text/ecmascript-6">
import Currency from '@/components/utils/Currency'
import WalletLink from '@/components/links/Wallet'
import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
  components: { Currency, WalletLink },

  props: {
    delegates: {
      type: Array,
      required: true,
    },
  },

  data: () => ({
    sortKey: 'rate',
    sortDirection: 'asc'
  }),

  computed: {
    ...mapGetters('delegates', ['forged']),

    sortedDelegates() {
      return _.orderBy(this.delegates, this.sortKey, this.sortDirection)
    }
  },

  methods: {
    totalForged(delegate) {
      delegate = this.forged.find(d => d.delegate === delegate.publicKey)

      return delegate ? delegate.forged : 0
    },

    lastForgingTime(delegate) {
      return this.readableTimestampAgo(
        delegate.forgingStatus.lastBlock.timestamp
      )
    },

    statusMessage(row) {
      const status = {
        '0': 'Forging',
        '1': 'Missing',
        '2': 'Not Forging',
        '3': 'Awaiting Slot',
        '4': 'Awaiting Slot',
        '5': 'Not Forging',
      }[row.forgingStatus.code]

      const lastBlock = row.forgingStatus.lastBlock

      return lastBlock
        ? `[${status}] Last Block @ ${
            lastBlock.height
          } on ${this.readableTimestamp(lastBlock.timestamp)}`
        : status
    },

    statusColor(row) {
      return {
        '0': '#46b02e', // Forging
        '1': '#f6993f', // Missing
        '2': '#ef192d', // Not Forging
        '3': '#838a9b', // Awaiting Slot
        '4': '#838a9b', // Awaiting Slot
        '5': '#ef192d', // Not Forging
      }[row.forgingStatus.code]
    },

    sortBy(sortKey) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc'
      this.sortKey = sortKey
    }
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
