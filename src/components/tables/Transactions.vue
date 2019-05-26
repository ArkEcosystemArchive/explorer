<template>
  <Loader :data="transactions">
    <table-component
      v-if="transactions && transactions.length > 0"
      :data="transactions"
      :show-filter="false"
      :show-caption="false"
      sort-by="timestamp.unix"
      sort-order="desc"
      table-class="w-full"
    >
      <table-column
        :label="$t('ID')"
        show="id"
        header-class="left-header-start-cell"
        cell-class="left-start-cell"
      >
        <template slot-scope="row">
          <LinkTransaction
            :id="row.id"
            :smart-bridge="row.vendorField"
            :show-smart-bridge-icon="showSmartBridgeIcon"
          />
        </template>
      </table-column>

      <table-column
        :label="$t('Timestamp')"
        show="timestamp.unix"
        header-class="left-header-cell hidden md:table-cell"
        cell-class="left-cell hidden md:table-cell wrap-timestamp"
      >
        <template slot-scope="row">
          {{ readableTimestamp(row.timestamp.unix) }}
        </template>
      </table-column>

      <table-column
        :label="$t('Sender')"
        show="sender"
        header-class="left-header-cell"
        cell-class="left-cell"
      >
        <template slot-scope="row">
          <LinkWallet :address="row.sender" />
        </template>
      </table-column>

      <table-column
        :label="$t('Recipient')"
        show="recipient"
        header-class="left-header-cell"
        cell-class="left-cell"
      >
        <template slot-scope="row">
          <LinkWallet
            :address="row.recipient"
            :type="row.type"
            :asset="row.asset"
          />
        </template>
      </table-column>

      <table-column
        :label="$t('Smartbridge')"
        show="vendorField"
        header-class="right-header-cell cell-smartbridge"
        cell-class="right-cell cell-smartbridge"
      >
        <template slot-scope="row">
          <div class="cell-smartbridge-truncate">
            {{ emojify(row.vendorField) }}
          </div>
        </template>
      </table-column>

      <table-column
        :label="$t('Amount (token)', { token: networkToken() })"
        show="amount"
        header-class="right-header-end-cell lg:pr-4"
        cell-class="right-end-cell lg:pr-4"
      >
        <template slot-scope="row">
          <span class="whitespace-no-wrap">
            <TransactionAmount
              :transaction="row"
              :type="row.type"
            />
          </span>
        </template>
      </table-column>

      <table-column
        :label="$t('Fee (token)', { token: networkToken() })"
        show="fee"
        header-class="right-header-end-cell hidden lg:table-cell"
        cell-class="right-end-cell hidden lg:table-cell"
      >
        <template slot-scope="row">
          <span
            v-tooltip="{
              trigger: 'hover click',
              content: row.price ? readableCurrency(row.fee, row.price) : '',
              placement: 'top'
            }"
            class="whitespace-no-wrap"
          >
            {{ readableCrypto(row.fee) }}
          </span>
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
