<template>
  <table-component :data="transactions" sort-by="timestamp" sort-order="desc" :show-filter="false" :show-caption="false" table-class="w-full">
    <table-column show="id" label="ID" header-class="p-4 pl-10 text-left" cell-class="p-4 pl-10 text-left border-none">
      <template slot-scope="row">
        <link-transaction :id="row.id" :smart-bridge="row.vendorField"></link-transaction>
      </template>
    </table-column>

    <table-column show="timestamp" label="Timestamp" header-class="p-4 text-left hidden md:table-cell" cell-class="p-4 text-left border-none hidden md:table-cell">
      <template slot-scope="row">
        {{ readableTimestamp(row.timestamp) }}
      </template>
    </table-column>

    <table-column show="senderId" label="Sender" header-class="p-4 text-left" cell-class="p-4 text-left border-none">
      <template slot-scope="row">
        <link-wallet :address="row.senderId"></link-wallet>
      </template>
    </table-column>

    <table-column show="recipientId" label="Recipient" header-class="p-4 text-left" cell-class="p-4 text-left border-none">
      <template slot-scope="row">
        <link-wallet :address="row.recipientId"></link-wallet>
      </template>
    </table-column>

    <table-column show="vendorField" label="Smartbridge" header-class="p-4 text-right hidden lg:table-cell" cell-class="p-4 text-right border-none hidden lg:table-cell">
      <template slot-scope="row">
        {{ truncate(row.vendorField || '', 35) }}
      </template>
    </table-column>

    <table-column show="amount" label="Amount (ARK)" header-class="p-4 pr-10 md:pr-4 text-right" cell-class="p-4 pr-10 md:pr-4 text-right border-none">
      <template slot-scope="row">
        {{ readableCrypto(row.amount) }}
      </template>
    </table-column>

    <table-column show="fee" label="Fee (ARK)" header-class="p-4 pr-10 text-right" cell-class="p-4 pr-10 text-right border-none hidden md:table-cell">
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
