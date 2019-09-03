<template>
  <Loader :data="wallets">
    <TableWrapper
      v-bind="$attrs"
      :columns="columns"
      :rows="wallets"
      :no-data-message="$t('COMMON.NO_RESULTS')"
      @on-sort-change="emitSortChange"
    >
      <template
        slot-scope="data"
      >
        <div v-if="data.column.field === 'originalIndex'">
          {{ getRank(data.row.originalIndex) }}
        </div>

        <div v-else-if="data.column.field === 'address'">
          <LinkWallet
            :address="data.row.address"
            :trunc="false"
          />
        </div>

        <div v-else-if="data.column.field === 'balance'">
          <span>
            {{ readableCrypto(data.row.balance, true, truncateBalance ? 2 : 8) }}
          </span>
        </div>

        <div v-else-if="data.column.field === 'supply'">
          {{ percentageString((data.row.balance / total) * 100) }}
        </div>
      </template>
    </TableWrapper>
  </Loader>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'

export default {
  name: 'TableWalletsDesktop',

  props: {
    wallets: {
      validator: value => {
        return Array.isArray(value) || value === null
      },
      required: true
    },

    total: {
      type: Number,
      required: true
    }
  },

  data: () => ({
    windowWidth: 0
  }),

  computed: {
    ...mapGetters('network', ['supply']),

    truncateBalance () {
      return this.windowWidth < 700
    },

    columns () {
      const columns = [
        {
          label: this.$t('COMMON.RANK'),
          field: 'originalIndex',
          type: 'number',
          thClass: 'start-cell w-32',
          tdClass: 'start-cell w-32'
        },
        {
          label: this.$t('WALLET.ADDRESS'),
          field: 'address'
        },
        {
          label: this.$t('COMMON.BALANCE'),
          field: 'balance',
          type: 'number',
          tdClass: 'whitespace-no-wrap'
        },
        {
          label: this.$t('COMMON.SUPPLY'),
          field: 'supply',
          type: 'number',
          sortable: false,
          thClass: 'end-cell w-24 not-sortable',
          tdClass: 'end-cell w-24'
        }
      ]

      return columns
    }
  },

  mounted () {
    this.windowWidth = window.innerWidth

    this.$nextTick(() => {
      window.addEventListener('resize', () => {
        this.windowWidth = window.innerWidth
      })
    })
  },

  methods: {
    getRank (value) {
      const page = this.$route.params.page > 1 ? this.$route.params.page - 1 : 0

      return page * 25 + (value + 1)
    },

    emitSortChange (params) {
      this.$emit('on-sort-change', params[0])
    }
  }
}
</script>
