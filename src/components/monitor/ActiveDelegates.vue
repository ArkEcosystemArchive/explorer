<template>
  <Loader :data="delegates">
    <table-component
      v-if="delegates && delegates.length"
      :data="delegates"
      sort-by="rank"
      sort-order="asc"
      :show-filter="false"
      :show-caption="false"
      table-class="w-full text-xs md:text-base"
    >
      <table-column
        show="rank"
        :label="$t('Rank')"
        header-class="p-4 pl-8 sm:pl-10 text-left w-32"
        cell-class="p-3 pl-8 sm:pl-10 text-left border-none"
      >
        <template slot-scope="row">
          {{ row.rank }}
        </template>
      </table-column>

      <table-column
        show="username"
        :label="$t('Name')"
        header-class="left-header-cell"
        cell-class="py-3 px-4 text-left border-none"
      >
        <template slot-scope="row">
          <LinkWallet :address="row.address">
            {{ row.username }}
          </LinkWallet>
        </template>
      </table-column>

      <table-column
        show="blocks.produced"
        :label="$t('Forged blocks')"
        header-class="left-header-cell hidden xl:table-cell"
        cell-class="py-3 px-4 text-left border-none hidden xl:table-cell"
      >
        <template slot-scope="row">
          {{ readableNumber(row.blocks.produced, 0, true) }}
        </template>
      </table-column>

      <table-column
        show="blocks.last.timestamp.unix"
        :label="$t('Last forged')"
        header-class="left-header-cell hidden sm:table-cell"
        cell-class="py-3 px-4 text-left border-none hidden sm:table-cell"
      >
        <template slot-scope="row">
          {{ lastForgingTime(row) }}
        </template>
      </table-column>

      <table-column
        show="forgingStatus"
        :label="$t('Status')"
        header-class="base-header-cell pr-5 sm:pr-10 md:pr-4 w-24 md:w-auto"
        cell-class="py-3 px-4 pr-5 sm:pr-10 md:pr-4 text-center border-none"
      >
        <template slot-scope="row">
          <svg
            v-tooltip="statusMessage(row)"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="19px"
            height="19px"
          >
            <path
              fill-rule="evenodd"
              :fill="statusColor(row)"
              d="M9.500,-0.000 C14.746,-0.000 18.999,4.253 18.999,9.500 C18.999,14.747 14.746,19.000 9.500,19.000 C4.253,19.000 -0.001,14.747 -0.001,9.500 C-0.001,4.253 4.253,-0.000 9.500,-0.000 Z"
            />
          </svg>
        </template>
      </table-column>

      <table-column
        show="production.approval"
        :label="$t('Votes')"
        header-class="right-header-cell pr-5 md:pr-10 hidden md:table-cell"
        cell-class="py-3 px-4 md:pr-10 text-right border-none hidden md:table-cell"
      >
        <template slot-scope="row">
          <span
            v-tooltip="$t('Percentage of the total supply')"
            class="text-grey text-2xs mr-1"
          >
            {{ percentageString(row.production.approval) }}
          </span>
          {{ readableCrypto(row.votes, true, 2) }}
        </template>
      </table-column>
    </table-component>

    <div
      v-else
      class="px-5 md:px-10"
    >
      <span>{{ $t("No results") }}</span>
    </div>
  </Loader>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'ActiveDelegates',

  props: {
    delegates: {
      validator: value => {
        return Array.isArray(value) || value === null
      },
      required: true
    }
  },

  methods: {
    lastForgingTime (delegate) {
      return delegate.blocks.last ? this.readableTimestampAgo(delegate.blocks.last.timestamp.unix) : this.$i18n.t('Never')
    },

    statusMessage (row) {
      const status = {
        0: this.$i18n.t('Forging'),
        1: this.$i18n.t('Missing'),
        2: this.$i18n.t('Not forging'),
        3: this.$i18n.t('Never forged')
      }[row.forgingStatus]

      const lastBlock = row.blocks.last

      return {
        trigger: 'hover click',
        content: lastBlock ? `[${status}] ${
          this.$i18n.t('Last block at height on', { height: lastBlock.height })
        } ${this.readableTimestamp(lastBlock.timestamp.unix)}`
          : status,
        classes: [`tooltip-bg-${row.forgingStatus}`, 'font-sans']
      }
    },

    statusColor (row) {
      return {
        0: '#46b02e', // Forging
        1: '#f6993f', // Missing
        2: '#ef192d', // Not forging
        3: '#ef192d' // Never forged
      }[row.forgingStatus]
    }
  }
}
</script>
