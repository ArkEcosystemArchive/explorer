<template>
  <Loader :data="transactions">
    <TableWrapper
      v-bind="$attrs"
      :has-pagination="false"
      :columns="columns"
      :rows="transactions"
      :sort-query="{ field: 'timestamp', type: 'desc' }"
      :no-data-message="$t('No results')"
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

        <div v-else-if="data.column.field === 'timestamp'">
          <span>
            {{ data.formattedRow['timestamp'] }}
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
          <span class="whitespace-no-wrap">
            <TransactionAmount
              :transaction="data.row"
              :type="data.row.type"
            />
          </span>
        </div>

        <div v-else-if="data.column.field === 'fee'">
          <span
            v-tooltip="{
              trigger: 'hover click',
              content: data.row.price ? readableCurrency(data.row.fee, data.row.price) : '',
              placement: 'top'
            }"
            class="whitespace-no-wrap"
          >
            {{ readableCrypto(data.row.fee) }}
          </span>
        </div>
      </template>
    </TableWrapper>
  </Loader>
</template>

<script type="text/ecmascript-6">
import CryptoCompareService from '@/services/crypto-compare'

export default {
  name: 'TableTransactionsDesktop',

  props: {
    transactions: {
      validator: value => {
        return Array.isArray(value) || value === null
      },
      required: true
    }
  },

  computed: {
    columns () {
      const columns = [
        {
          label: this.$t('ID'),
          field: 'id',
          thClass: 'start-cell',
          tdClass: 'start-cell'
        },
        {
          label: this.$t('Timestamp'),
          field: 'timestamp',
          type: 'date',
          formatFn: this.formatDate,
          thClass: 'text-left hidden md:table-cell',
          tdClass: 'text-left hidden md:table-cell wrap-timestamp'
        },
        {
          label: this.$t('Sender'),
          field: 'sender'
        },
        {
          label: this.$t('Recipient'),
          field: 'recipient'
        },
        {
          label: this.$t('Smartbridge'),
          field: 'vendorField',
          thClass: 'text-right cell-smartbridge',
          tdClass: 'text-right cell-smartbridge'
        },
        {
          label: this.$t('Amount (token)', { token: this.networkToken() }),
          field: 'amount',
          type: 'number',
          thClass: 'end-cell lg:base-cell lg:pr-4',
          tdClass: 'end-cell lg:base-cell lg:pr-4'
        },
        {
          label: this.$t('Fee (token)', { token: this.networkToken() }),
          field: 'fee',
          type: 'number',
          thClass: 'end-cell hidden lg:table-cell',
          tdClass: 'end-cell hidden lg:table-cell'
        }
      ]

      return columns
    },

    showSmartBridgeIcon () {
      return this.transactions.some(transaction => {
        return !!transaction.vendorField
      })
    }
  },

  watch: {
    transactions () {
      this.updatePrices()
    }
  },

  created () {
    this.updatePrices()
  },

  methods: {
    formatDate (timestamp) {
      return this.readableTimestamp(timestamp.unix)
    },

    async updatePrices () {
      if (!this.transactions) {
        return
      }

      for (const transaction of this.transactions) {
        transaction.price = await CryptoCompareService.dailyAverage(transaction.timestamp.unix)
      }
    }
  }
}
</script>

<style>
  .wrap-timestamp {
    white-space: normal;
  }

  @media(min-width: 870px) {
    .wrap-timestamp {
      white-space: nowrap;
    }
  }
</style>
