<template>
  <!-- <th @click="sortBy('rate')" class="p-4 pl-5 sm:pl-10 text-left">
    <span class="hidden sm:inline-block">Rank</span>
    <span class="sm:hidden">#</span>
  </th> -->
  <table-component :data="delegates" sort-by="rate" sort-order="asc" :show-filter="false" :show-caption="false" table-class="w-full text-xs md:text-base">
    <table-column show="rate" label="Rank" header-class="p-4 pl-5 sm:pl-10 text-left" cell-class="p-3 pl-5 sm:pl-10 text-left border-none">
      <template slot-scope="row">
        {{ row.rate }}
      </template>
    </table-column>

    <table-column show="username" label="Name" header-class="left-header-cell" cell-class="p-3 text-left border-none">
      <template slot-scope="row">
        <link-wallet :address="row.address"></link-wallet>
      </template>
    </table-column>

    <table-column show="producedblocks" label="Forged" header-class="left-header-cell hidden xl:table-cell" cell-class="p-3 text-left border-none hidden xl:table-cell">
      <template slot-scope="row">
        {{ readableCrypto(totalForged(row)) }}
      </template>
    </table-column>

    <table-column show="forgingTime" label="Last Forged" header-class="left-header-cell" cell-class="p-3 text-left border-none">
      <template slot-scope="row">
        {{ lastForgingTime(row) }}
      </template>
    </table-column>

    <table-column :sortable="false" show="forgingStatus" label="Status" header-class="right-header-cell pr-5 md:pr-4 hidden md:block" cell-class="p-3 pr-4 text-right border-none">
      <template slot-scope="row">
        <svg
         xmlns="http://www.w3.org/2000/svg"
         xmlns:xlink="http://www.w3.org/1999/xlink"
         width="19px" height="19px"
         v-tooltip="statusMessage(row)">
        <path fill-rule="evenodd" :fill="statusColor(row)"
         d="M9.500,-0.000 C14.746,-0.000 18.999,4.253 18.999,9.500 C18.999,14.747 14.746,19.000 9.500,19.000 C4.253,19.000 -0.001,14.747 -0.001,9.500 C-0.001,4.253 4.253,-0.000 9.500,-0.000 Z"/>
        </svg>
      </template>
    </table-column>

    <table-column show="productivity" label="Productivity" header-class="right-header-cell hidden md:table-cell" cell-class="p-3 text-right border-none hidden md:table-cell">
      <template slot-scope="row">
        {{ row.productivity }}%
      </template>
    </table-column>

    <table-column show="approval" label="Approval" header-class="right-header-cell pr-5 sm:pr-10 hidden md:table-cell" cell-class="p-3 pr-10 text-right border-none hidden md:table-cell">
      <template slot-scope="row">
        {{ row.approval }}%
      </template>
    </table-column>
  </table-component>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
  props: {
    delegates: {
      type: Array,
      required: true,
    },
  },

  computed: {
    ...mapGetters('delegates', ['forged'])
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
    }
  },
}
</script>
