<template>
  <div>
    <loader :data="transactions">
      <div v-for="transaction in transactions" :key="transaction.id" class="row-mobile">
        <div class="list-row-border-b">
          <div>{{ $t("ID") }}</div>
          <link-transaction :id="transaction.id" :smart-bridge="transaction.vendorField" />
        </div>

        <div class="list-row-border-b">
          <div>{{ $t("Timestamp") }}</div>
          <div v-if="transaction.timestamp">{{ readableTimestamp(transaction.timestamp.unix) }}</div>
        </div>

        <div class="list-row-border-b">
          <div>{{ $t("Sender") }}</div>
          <link-wallet :address="transaction.sender" />
        </div>

        <div class="list-row-border-b">
          <div>{{ $t("Recipient") }}</div>
          <link-wallet :address="transaction.recipient" :type="transaction.type" :asset="transaction.asset" />
        </div>

        <div class="list-row-border-b-no-wrap" v-if="truncate(transaction.vendorField || '')">
          <div class="mr-4">{{ $t("Smartbridge") }}</div>
          <div class="truncate">{{ emojify(transaction.vendorField) }}</div>
        </div>

        <div class="list-row-border-b">
          <div>{{ $t("Amount (token)", { token: networkToken() }) }}</div>
          <div>
            <transaction-amount :transaction="transaction" :type="transaction.type" />
          </div>
        </div>

        <div class="list-row">
          <div>{{ $t("Fee (token)", { token: networkToken() }) }}</div>
          <div>{{ readableCrypto(transaction.fee) }}</div>
        </div>
      </div>
      <div v-if="transactions && !transactions.length" class="px-5 md:px-10">
        <span>{{ $t("No results") }}</span>
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
