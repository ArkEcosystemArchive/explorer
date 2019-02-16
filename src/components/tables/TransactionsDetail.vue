<template>
  <loader :data="transactions">
    <table-component
      v-if="transactions && transactions.length > 0"
      :data="transactions"
      sort-by="timestamp.unix"
      sort-order="desc"
      :show-filter="false"
      :show-caption="false"
      table-class="w-full"
    >
      <table-column
        show="id"
        :label="$t('ID')"
        header-class="left-header-start-cell"
        cell-class="left-start-cell"
      >
        <template slot-scope="row">
          <link-transaction :id="row.id" :smart-bridge="row.vendorField" :show-smart-bridge-icon="showSmartBridgeIcon" />
        </template>
      </table-column>

      <table-column
        show="timestamp.unix"
        :label="$t('Timestamp')"
        header-class="left-header-cell hidden lg:table-cell"
        cell-class="left-cell hidden lg:table-cell"
      >
        <template slot-scope="row">
          {{ readableTimestamp(row.timestamp.unix) }}
        </template>
      </table-column>

      <table-column
        show="sender"
        :label="$t('Sender')"
        header-class="left-header-cell"
        cell-class="left-cell"
      >
        <template slot-scope="row">
          <link-wallet :address="row.sender" />
        </template>
      </table-column>

      <table-column
        show="recipient"
        :label="$t('Recipient')"
        header-class="left-header-cell"
        cell-class="left-cell"
      >
        <template slot-scope="row">
          <link-wallet :address="row.recipient" :type="row.type" :asset="row.asset" />
        </template>
      </table-column>

      <table-column
        show="amount"
        :label="$t('Amount (token)', { token: networkToken() })"
        header-class="right-header-cell"
        cell-class="right-cell"
      >
        <template slot-scope="row">
          <span class="whitespace-no-wrap">
            <transaction-amount :transaction="row" :type="row.type" />
          </span>
        </template>
      </table-column>

      <table-column
        show="fee"
        :label="$t('Fee (token)', { token: networkToken() })"
        header-class="right-header-cell hidden md:table-cell"
        cell-class="right-cell hidden md:table-cell"
      >
        <template slot-scope="row">
          <span class="whitespace-no-wrap">
            {{ readableCrypto(row.fee) }}
          </span>
        </template>
      </table-column>

      <table-column
        show="confirmations"
        :label="$t('Confirmations')"
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
              <img class="icon flex-none" src="@/assets/images/icons/clock.svg" />
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

    <div v-else class="px-5 md:px-10">
      <span>{{ $t("No results") }}</span>
    </div>
  </loader>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'

export default {
  props: {
    transactions: {
      // type: Array or null
      required: true,
    }
  },

  computed: {
    ...mapGetters('network', ['activeDelegates']),

    showSmartBridgeIcon() {
      if (this.transactions) {
        return this.transactions.some(transaction => {
          return !!transaction.vendorField
        })
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
