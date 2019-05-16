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
        header-class="left-header-cell hidden lg:table-cell"
        cell-class="left-cell hidden lg:table-cell"
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
        :label="$t('Amount (token)', { token: networkToken() })"
        show="amount"
        header-class="right-header-cell"
        cell-class="right-cell"
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
        header-class="right-header-cell hidden md:table-cell"
        cell-class="right-cell hidden md:table-cell"
      >
        <template slot-scope="row">
          <span
            v-tooltip="{
              trigger: 'hover click',
              content: `${readableCurrency(row.fee, row.price)}`,
              placement: 'top'
            }"
            class="whitespace-no-wrap"
          >
            {{ readableCrypto(row.fee) }}
          </span>
        </template>
      </table-column>

      <table-column
        :label="$t('Confirmations')"
        show="confirmations"
        header-class="right-header-end-cell"
        cell-class="right-end-cell"
      >
        <template slot-scope="row">
          <div class="flex items-center justify-end whitespace-no-wrap">
            <div
              v-if="row.confirmations <= activeDelegates"
              class="flex items-center justify-end whitespace-no-wrap"
            >
              <span class="text-green inline-block mr-2">{{ row.confirmations }}</span>
              <img
                class="icon flex-none"
                src="@/assets/images/icons/clock.svg"
              >
            </div>
            <div v-else>
              <div v-tooltip="row.confirmations + ' ' + $t('Confirmations')">
                {{ $t("Well confirmed") }}
              </div>
            </div>
          </div>
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
