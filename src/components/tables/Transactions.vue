<template>
  <table-component :data="transactions" sort-by="timestamp" sort-order="desc" :show-filter="false" :show-caption="false" table-class="w-full">
    <table-column show="id" label="ID" header-class="left-header-start-cell" cell-class="left-start-cell">
      <template slot-scope="row">
        <link-transaction :id="row.id" :smart-bridge="row.vendorField"></link-transaction>
      </template>
    </table-column>

    <table-column show="timestamp" label="Timestamp" header-class="left-header-cell hidden md:table-cell" cell-class="left-cell hidden md:table-cell">
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

    <table-column show="vendorField" label="Smartbridge" header-class="right-header-cell hidden lg:table-cell" cell-class="right-cell hidden lg:table-cell">
      <template slot-scope="row">
        {{ truncate(row.vendorField || '', 35) }}
      </template>
    </table-column>

    <table-column show="amount" label="Amount (ARK)" header-class="right-header-end-cell md:pr-4" cell-class="right-end-cell md:pr-4">
      <template slot-scope="row">
        {{ readableCrypto(row.amount) }}
      </template>
    </table-column>

    <table-column show="fee" label="Fee (ARK)" header-class="right-header-end-cell" cell-class="right-end-cell hidden md:table-cell">
      <template slot-scope="row">
        {{ readableCrypto(row.fee) }}
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
