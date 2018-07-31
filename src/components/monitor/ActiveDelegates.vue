<template>
  <!-- <th @click="sortBy('rate')" class="p-4 pl-5 sm:pl-10 text-left">
    <span class="hidden sm:inline-block">Rank</span>
    <span class="sm:hidden">#</span>
  </th> -->
  <loader :data="delegates">
    <table-component v-if="delegates && delegates.length > 0" :data="delegates" sort-by="rate" sort-order="asc" :show-filter="false" :show-caption="false" table-class="w-full text-xs md:text-base">
      <table-column show="rate" :label="$t('Rank')" header-class="p-4 pl-5 sm:pl-10 text-left w-32" cell-class="p-3 pl-5 sm:pl-10 text-left border-none">
        <template slot-scope="row">
          {{ row.rate }}
        </template>
      </table-column>

      <table-column show="username" :label="$t('Name')" header-class="left-header-cell" cell-class="py-3 px-4 text-left border-none">
        <template slot-scope="row">
          <link-wallet :address="row.address"></link-wallet>
        </template>
      </table-column>

      <table-column show="producedblocks" :label="$t('Forged blocks')" header-class="left-header-cell hidden xl:table-cell" cell-class="py-3 px-4 text-left border-none hidden xl:table-cell">
        <template slot-scope="row">
          {{ readableNumber(row.producedblocks, 0, true) }}
        </template>
      </table-column>

      <table-column show="blocksAt" :label="$t('Last Forged')" header-class="left-header-cell hidden sm:table-cell" cell-class="py-3 px-4 text-left border-none hidden sm:table-cell">
        <template slot-scope="row">
          {{ lastForgingTime(row) }}
        </template>
      </table-column>

      <table-column sort-by="status" show="forgingStatus" :label="$t('Status')" header-class="base-header-cell pr-5 sm:pr-10 md:pr-4 w-24 md:w-auto" cell-class="py-3 px-4 pr-5 sm:pr-10 md:pr-4 text-center border-none">
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

      <table-column show="productivity" :label="$t('Productivity')" header-class="right-header-cell hidden md:table-cell" cell-class="py-3 px-4 text-right border-none hidden md:table-cell">
        <template slot-scope="row">
          {{ percentageString(row.productivity) }}
        </template>
      </table-column>

      <table-column show="approval" :label="$t('Approval')" header-class="right-header-cell pr-5 md:pr-10 hidden md:table-cell" cell-class="py-3 px-4 md:pr-10 text-right border-none hidden md:table-cell">
        <template slot-scope="row">
          <span v-tooltip="{ content: readableCrypto(row.vote, true, 2), placement: 'top' }">
            {{ percentageString(row.approval) }}
          </span>
        </template>
      </table-column>
    </table-component>
    <div v-else class="px-5 md:px-10">
      <span>{{ $t("No Results") }}</span>
    </div>
  </loader>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
  props: {
    delegates: {
      // type: Array, or null
      required: true,
    },
  },

  methods: {
    lastForgingTime(delegate) {
      const lastBlock = delegate.forgingStatus.lastBlock

      return lastBlock ? this.readableTimestampAgo(lastBlock.timestamp) : this.$i18n.t('Never')
    },

    statusMessage(row) {
      const status = {
        '0': this.$i18n.t('Forging'),
        '1': this.$i18n.t('Missing'),
        '2': this.$i18n.t('Not Forging'),
        '3': this.$i18n.t('Awaiting Slot'),
        '4': this.$i18n.t('Missed block, Awaiting Slot'),
        '5': this.$i18n.t('Not Forging'),
      }[row.forgingStatus.code]

      const lastBlock = row.forgingStatus.lastBlock

      return lastBlock ? {
        content: `[${status}] Last Block @ ${
            lastBlock.height
          } on ${this.readableTimestamp(lastBlock.timestamp)}`,
        classes: [`tooltip-bg-${row.forgingStatus.code}`, 'font-sans']
      } : status
    },

    statusColor(row) {
      return {
        '0': '#46b02e', // Forging
        '1': '#f6993f', // Missing
        '2': '#ef192d', // Not Forging
        '3': '#838a9b', // Awaiting Slot
        '4': '#f6993f', // Missed in previous round, now awaiting Slot
        '5': '#ef192d', // Not Forging
      }[row.forgingStatus.code]
    }
  },
}
</script>
