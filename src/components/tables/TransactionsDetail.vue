<template>
  <table-component :data="transactions" sort-by="timestamp" sort-order="desc" :show-filter="false" :show-caption="false" table-class="w-full">
    <table-column show="id" label="ID" header-class="left-header-start-cell" cell-class="left-start-cell">
      <template slot-scope="row">
        <link-transaction :id="row.id" :smart-bridge="row.vendorField"></link-transaction>
      </template>
    </table-column>

    <table-column show="timestamp" label="Timestamp" header-class="left-header-cell hidden lg:table-cell" cell-class="left-cell hidden lg:table-cell">
      <template slot-scope="row">
        {{ readableTimestamp(row.timestamp) }}
      </template>
    </table-column>

    <table-column show="senderId" label="Sender" header-class="left-header-cell" cell-class="left-cell">
      <template slot-scope="row">
        <link-wallet :address="row.senderId"></link-wallet>
      </template>
    </table-column>

    <table-column show="recipientId" label="Recipient" header-class="left-header-cell" cell-class="left-cell">
      <template slot-scope="row">
        <link-wallet :address="row.recipientId" :type="row.type"></link-wallet>
      </template>
    </table-column>

    <table-column show="amount" label="Amount (ARK)" header-class="right-header-cell" cell-class="right-cell">
      <template slot-scope="row">
        <span :class="{
          'text-red': row.senderId === $route.params.address,
          'text-green': row.recipientId === $route.params.address,
        }">{{ readableCrypto(row.amount) }}</span>
      </template>
    </table-column>

    <table-column show="fee" label="Fee (ARK)" header-class="right-header-cell hidden md:table-cell" cell-class="right-cell hidden md:table-cell">
      <template slot-scope="row">
        {{ readableCrypto(row.fee) }}
      </template>
    </table-column>

    <table-column show="confirmations" label="Confirmations" header-class="right-header-end-cell" cell-class="right-end-cell">
      <template slot-scope="row">
        <div class="flex items-center justify-end whitespace-no-wrap">
          <div v-if="row.confirmations <= 52">
            <span class="text-green hidden md:inline-block mr-2">{{ row.confirmations }}</span>
            <img class="icon flex-none" src="@/assets/images/icons/clock.svg" />
          </div>
          <div v-else>
            Well Confirmed
          </div>
        </div>
      </template>
    </table-column>
  </table-component>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    transactions: {
      type: Array,
      required: true,
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
