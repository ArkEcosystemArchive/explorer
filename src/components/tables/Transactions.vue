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
        header-class="left-header-cell hidden md:table-cell"
        cell-class="left-cell hidden md:table-cell wrap-timestamp"
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
        show="vendorField"
        :label="$t('Smartbridge')"
        header-class="right-header-cell hidden lg:table-cell"
        cell-class="right-cell hidden lg:table-cell"
      >
        <template slot-scope="row">
          {{ truncate(emojify(row.vendorField) || '', 20, 'right') }}
        </template>
      </table-column>

      <table-column
        show="amount"
        :label="$t('Amount (token)', { token: networkToken() })"
        header-class="right-header-end-cell lg:pr-4"
        cell-class="right-end-cell lg:pr-4"
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
        header-class="right-header-end-cell hidden lg:table-cell"
        cell-class="right-end-cell hidden lg:table-cell"
      >
        <template slot-scope="row">
          <span class="whitespace-no-wrap">
            {{ readableCrypto(row.fee) }}
          </span>
        </template>
      </table-column>
    </table-component>

    <div v-else class="px-5 md:px-10">
      <span>{{ $t("No results") }}</span>
    </div>
  </loader>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    transactions: {
      // type: Array or null
      required: true,
    }
  },

  computed: {
    showSmartBridgeIcon() {
      return this.transactions.some(transaction => {
        return !!transaction.vendorField
      })
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
