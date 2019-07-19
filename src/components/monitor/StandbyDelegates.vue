<template>
  <Loader :data="delegates">
    <TableWrapper
      v-bind="$attrs"
      :has-pagination="false"
      :columns="columns"
      :rows="delegates"
      :sort-query="{ field: 'rank', type: 'asc' }"
      :no-data-message="$t('COMMON.NO_RESULTS')"
    >
      <template
        slot-scope="data"
      >
        <div v-if="data.column.field === 'username'">
          <LinkWallet :address="data.row.address">
            {{ data.row.username }}
          </LinkWallet>
        </div>

        <div v-else-if="data.column.field === 'votes'">
          <span
            v-tooltip="$t('COMMON.SUPPLY_PERCENTAGE')"
            class="text-grey text-2xs mr-1"
          >
            {{ percentageString(data.row.production.approval) }}
          </span>
          {{ readableCrypto(data.row.votes, true, 2) }}
        </div>

        <span v-else>
          {{ data.formattedRow[data.column.field] }}
        </span>
      </template>
    </TableWrapper>
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
    ...mapGetters('network', ['activeDelegates']),

    columns () {
      const columns = [
        {
          label: this.$t('COMMON.RANK'),
          field: 'rank',
          type: 'number',
          thClass: 'start-cell w-32',
          tdClass: 'start-cell w-32'
        },
        {
          label: this.$t('WALLET.DELEGATE.USERNAME'),
          field: 'username',
          thClass: 'end-cell sm:base-cell text-left',
          tdClass: 'end-cell sm:base-cell text-left'
        },
        {
          label: this.$t('PAGES.DELEGATE_MONITOR.VOTES'),
          field: 'votes',
          type: 'number',
          thClass: 'end-cell hidden sm:table-cell',
          tdClass: 'end-cell hidden sm:table-cell'
        }
      ]

      return columns
    }
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
