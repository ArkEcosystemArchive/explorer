<template>
  <div>
    <loader :data="transactions">
      <div v-for="transaction in transactions" :key="transaction.id" class="row-mobile">
        <div class="list-row-border-b">
          <div>{{ $t("ID") }}</div>
          <link-transaction :id="transaction.id" :smart-bridge="transaction.vendorField"></link-transaction>
        </div>

        <div class="list-row-border-b">
          <div>{{ $t("Timestamp") }}</div>
          <div>{{ readableTimestamp(transaction.timestamp) }}</div>
        </div>

        <div class="list-row-border-b">
          <div>{{ $t("Sender") }}</div>
          <link-wallet :address="transaction.senderId"></link-wallet>
        </div>

        <div class="list-row-border-b">
          <div>{{ $t("Recipient") }}</div>
          <link-wallet :address="transaction.recipientId" :type="transaction.type"></link-wallet>
        </div>

        <div class="list-row-border-b-no-wrap" v-if="truncate(transaction.vendorField || '')">
          <div class="mr-4">{{ $t("Smartbridge") }}</div>
          <div class="truncate">{{ transaction.vendorField }}</div>
        </div>

        <div class="list-row-border-b">
          <div>{{ $t("Amount (token)", {token: networkToken()}) }}</div>
          <div>
            <transaction-amount :transaction="transaction" :type="transaction.type"></transaction-amount>
          </div>
        </div>

        <div class="list-row">
          <div>{{ $t("Fee (token)", {token: networkToken()}) }}</div>
          <div>{{ readableCrypto(transaction.fee) }}</div>
        </div>
      </div>
      <div v-if="transactions && !transactions.length" class="px-5 md:px-10">
        <span>{{ $t("No Results") }}</span>
      </div>
    </loader>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    transactions: {
      // type: Array or null
      required: true,
    }
  }
}
</script>

<style scoped>
.row-mobile:nth-child(even) {
  background-color: var(--color-theme-table-row);
}
</style>
