<template>
  <table-component :data="transactions" sort-by="timestamp" sort-order="desc" :show-filter="false" :show-caption="false" table-class="w-full">
    <table-column show="id" label="Transaction ID" header-class="p-4 pl-10 text-left" cell-class="p-4 pl-10 text-left border-none">
      <template slot-scope="row">
        <link-transaction :id="row.id" :smart-bridge="row.vendorField"></link-transaction>
      </template>
    </table-column>

    <table-column show="timestamp" label="Date" header-class="p-4 text-left hidden lg:table-cell" cell-class="p-4 text-left border-none hidden lg:table-cell">
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

    <table-column show="amount" label="Amount (ARK)" header-class="p-4 pr-4 text-right" cell-class="p-4 pr-4 text-right border-none">
      <template slot-scope="row">
        <span :class="{
          'text-red': row.senderId === $route.params.address,
          'text-green': row.recipientId === $route.params.address,
        }">{{ readableCrypto(row.amount) }}</span>
      </template>
    </table-column>

    <table-column show="fee" label="Fee (ARK)" header-class="p-4 text-right hidden md:table-cell" cell-class="p-4 text-right border-none hidden md:table-cell">
      <template slot-scope="row">
        {{ readableCrypto(row.fee) }}
      </template>
    </table-column>

    <table-column show="confirmations" label="Confirmations (ARK)" header-class="p-4 pr-10 text-right" cell-class="p-4 pr-10 text-right border-none">
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
tbody tr:nth-child(even) {
  background-color: var(--color-theme-table-row);
}

tbody tr:hover {
  background-color: rgba(0, 0, 0, 0);
  transform: scale(1.015);
  box-shadow: var(--theme-table-hover-shadow);
  z-index: 999;
  border-radius: 7px;
}

tr:hover,
tr:hover td {
  background-color: var(--color-theme-table-row-hover);
}
tr:hover td:first-child {
  border-top-left-radius: 7px;
  border-bottom-left-radius: 7px;
}
tr:hover td:last-child {
  border-top-right-radius: 7px;
  border-bottom-right-radius: 7px;
}
</style>
