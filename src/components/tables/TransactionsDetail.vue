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

        <div v-else-if="data.column.field === 'confirmations'">
          <div class="flex items-center justify-end whitespace-no-wrap">
            <div
              v-if="row.confirmations <= activeDelegates"
              class="flex items-center justify-end whitespace-no-wrap"
            >
              <span class="text-green inline-block mr-2">{{ data.row.confirmations }}</span>
              <img
                class="icon flex-none"
                src="@/assets/images/icons/clock.svg"
              >
            </div>
            <div v-else>
              <div v-tooltip="data.row.confirmations + ' ' + $t('Confirmations')">
                {{ $t("Well confirmed") }}
              </div>
            </div>
          </div>
        </div>
      </template>
    </TableWrapper>
  </Loader>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
import CryptoCompareService from '@/services/crypto-compare'

export default {
  name: 'TableTransactionsDetailDesktop',

  props: {
    transactions: {
      validator: value => {
        return Array.isArray(value) || value === null
      },
      required: true
    }
  },

  computed: {
    ...mapGetters('network', ['activeDelegates']),

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
      if (this.transactions) {
        return this.transactions.some(transaction => {
          return !!transaction.vendorField
        })
      }

      return false
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

<style scoped>
.icon {
  width: 16px;
  height: 16px;
}
</style>
