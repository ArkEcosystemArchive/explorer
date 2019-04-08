<template>
  <Loader :data="delegates">
    <table-component
      v-if="delegates && delegates.length > 0"
      :data="delegates"
      :show-filter="false"
      :show-caption="false"
      sort-by="rank"
      sort-order="asc"
      table-class="w-full text-xs md:text-base"
    >
      <table-column
        :label="$t('Rank')"
        show="rank"
        header-class="p-4 pl-8 sm:pl-10 text-left w-32"
        cell-class="p-3 pl-8 sm:pl-10 text-left border-none"
      >
        <template slot-scope="row">
          {{ row.rank }}
        </template>
      </table-column>

      <table-column
        :label="$t('Name')"
        show="username"
        header-class="left-header-cell"
        cell-class="left-cell"
      >
        <template slot-scope="row">
          <LinkWallet :address="row.address">
            {{ row.username }}
          </LinkWallet>
        </template>
      </table-column>

      <table-column
        :label="$t('Productivity')"
        show="production.productivity"
        header-class="right-header-cell hidden md:table-cell"
        cell-class="right-cell hidden md:table-cell"
      >
        <template slot-scope="row">
          {{ percentageString(row.production.productivity) }}
        </template>
      </table-column>

      <table-column
        :label="$t('Votes')"
        show="production.approval"
        header-class="right-header-cell sm:pr-10 hidden md:table-cell"
        cell-class="right-end-cell hidden md:table-cell w-40 whitespace-no-wrap"
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
import DelegateService from '@/services/delegate'
import { mapGetters } from 'vuex'

export default {
  name: 'StandbyDelegates',

  data: () => ({
    delegates: null
  }),

  computed: {
    ...mapGetters('network', ['activeDelegates'])
  },

  async mounted () {
    await this.getDelegates()
  },

  methods: {
    async getDelegates () {
      const response = await DelegateService.standby()
      this.delegates = response
    }
  }
}
</script>
