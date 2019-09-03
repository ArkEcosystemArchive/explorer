<template>
  <Loader :data="transactions">
    <TableWrapper
      v-bind="$attrs"
      :columns="columns"
      :rows="transactions"
      :no-data-message="$t('COMMON.NO_RESULTS')"
      @on-sort-change="emitSortChange"
    >
      <template
        slot-scope="data"
      >
        <div v-if="data.column.field === 'id'">
          <LinkTransaction
            :id="data.row.id"
            :smart-bridge="data.row.vendorField"
            :show-smart-bridge-icon="showSmartBridgeIcon"
          />
        </div>

        <div v-else-if="data.column.field === 'timestamp.unix'">
          <span>
            {{ readableTimestamp(data.row.timestamp.unix) }}
          </span>
        </div>

        <div v-else-if="data.column.field === 'sender'">
          <LinkWallet :address="data.row.sender" />
        </div>

        <div v-else-if="data.column.field === 'recipient'">
          <LinkWallet
            :address="data.row.recipient"
            :type="data.row.type"
            :asset="data.row.asset"
          />
        </div>

        <div v-else-if="data.column.field === 'vendorField'">
          <div class="cell-smartbridge-truncate">
            {{ emojify(data.row.vendorField) }}
          </div>
        </div>

        <div v-else-if="data.column.field === 'amount'">
          <TransactionAmount
            :transaction="data.row"
            :type="data.row.type"
          />
        </div>

        <div v-else-if="data.column.field === 'fee'">
          <TransactionAmount
            :transaction="data.row"
            :is-fee="true"
          />
        </div>

        <div v-else-if="data.column.field === 'confirmations'">
          <div class="flex items-center justify-end whitespace-no-wrap">
            <div
              v-if="data.row.confirmations <= activeDelegates"
              class="flex items-center justify-end whitespace-no-wrap"
            >
              <span class="text-green inline-block mr-2">{{ data.row.confirmations }}</span>
              <img
                class="icon flex-none"
                src="@/assets/images/icons/clock.svg"
              >
            </div>
            <div v-else>
              <div v-tooltip="data.row.confirmations + ' ' + $t('COMMON.CONFIRMATIONS')">
                {{ $t('TRANSACTION.WELL_CONFIRMED') }}
              </div>
            </div>
          </div>
        </div>
      </template>
    </TableWrapper>
  </Loader>
</template>

<script type="text/ecmascript-6">
import CryptoCompareService from '@/services/crypto-compare'
import { mapGetters } from 'vuex'

export default {
  name: 'TableTransactionsDesktop',

  props: {
    transactions: {
      validator: value => {
        return Array.isArray(value) || value === null
      },
      required: true
    },
    showConfirmations: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  computed: {
    ...mapGetters('network', ['activeDelegates']),
    ...mapGetters('currency', { currencySymbol: 'symbol' }),

    columns () {
      const feeClasses = ['hidden', 'lg:table-cell']

      feeClasses.push(this.showConfirmations ? 'pr-10 xl:pr-4' : 'end-cell')

      let columns = [
        {
          label: this.$t('COMMON.ID'),
          field: 'id',
          thClass: 'start-cell',
          tdClass: 'start-cell'
        },
        {
          label: this.$t('COMMON.TIMESTAMP'),
          field: 'timestamp.unix',
          type: 'number',
          thClass: 'text-left hidden md:table-cell',
          tdClass: 'text-left hidden md:table-cell wrap-timestamp'
        },
        {
          label: this.$t('TRANSACTION.SENDER'),
          field: 'sender',
          tdClass: 'break-all'
        },
        {
          label: this.$t('TRANSACTION.RECIPIENT'),
          field: 'recipient',
          tdClass: 'break-all'
        },
        {
          label: this.$t('TRANSACTION.SMARTBRIDGE'),
          field: 'vendorField',
          thClass: 'text-right cell-smartbridge',
          tdClass: 'text-right cell-smartbridge'
        },
        {
          label: this.$t('TRANSACTION.AMOUNT'),
          field: 'amount',
          type: 'number',
          thClass: 'end-cell lg:base-cell',
          tdClass: 'end-cell lg:base-cell'
        },
        {
          label: this.$t('TRANSACTION.FEE'),
          field: 'fee',
          type: 'number',
          thClass: feeClasses.join(' '),
          tdClass: feeClasses.join(' ')
        }
      ]

      if (this.showConfirmations) {
        columns = columns.filter(column => column.field !== 'vendorField')

        columns.push({
          label: this.$t('COMMON.CONFIRMATIONS'),
          field: 'confirmations',
          type: 'number',
          sortable: false,
          thClass: 'end-cell hidden xl:table-cell not-sortable',
          tdClass: 'end-cell hidden xl:table-cell'
        })
      }

      return columns
    },

    showSmartBridgeIcon () {
      return this.transactions.some(transaction => {
        return !!transaction.vendorField
      })
    }
  },

  watch: {
    async transactions () {
      await this.prepareTransactions()
    },

    async currencySymbol () {
      await this.updatePrices()
    }
  },

  async created () {
    this.prepareTransactions()
  },

  methods: {
    async prepareTransactions () {
      await this.updatePrices()
    },

    async fetchPrice (transaction) {
      transaction.price = await CryptoCompareService.dailyAverage(transaction.timestamp.unix)
    },

    async updatePrices () {
      if (!this.transactions) {
        return
      }

      const promises = this.transactions.map(this.fetchPrice)
      await Promise.all(promises)
    },

    emitSortChange (params) {
      this.$emit('on-sort-change', params[0])
    }
  }
}
</script>

<style scoped>
  .icon {
    width: 16px;
    height: 16px;
  }

  .wrap-timestamp {
    white-space: normal;
  }

  @media(min-width: 870px) {
    .wrap-timestamp {
      white-space: nowrap;
    }
  }
</style>
