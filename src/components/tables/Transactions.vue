<template>
  <Loader :data="transactions">
    <TableWrapper
      v-bind="$attrs"
      :has-pagination="false"
      :columns="columns"
      :rows="transactions"
      :no-data-message="$t('No results')"
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

    columns () {
      const feeClasses = ['hidden', 'md:table-cell']

      feeClasses.push(this.showConfirmations ? 'pr-10 xl:pr-4' : 'end-cell')

      let columns = [
        {
          label: this.$t('ID'),
          field: 'id',
          thClass: 'start-cell',
          tdClass: 'start-cell'
        },
        {
          label: this.$t('Timestamp'),
          field: 'timestamp.unix',
          type: 'number',
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
          thClass: 'end-cell lg:base-cell',
          tdClass: 'end-cell lg:base-cell'
        },
        {
          label: this.$t('Fee (token)', { token: this.networkToken() }),
          field: 'fee',
          type: 'number',
          thClass: feeClasses.join(' '),
          tdClass: feeClasses.join(' ')
        }
      ]

      if (this.showConfirmations) {
        columns = columns.filter(column => column.field !== 'vendorField')

        columns.push({
          label: this.$t('Confirmations'),
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
    transactions () {
      this.updatePrices()
    }
  },

  created () {
    this.updatePrices()
  },

  methods: {
    async updatePrices () {
      if (!this.transactions) {
        return
      }

      for (const transaction of this.transactions) {
        transaction.price = await CryptoCompareService.dailyAverage(transaction.timestamp.unix)
      }
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
