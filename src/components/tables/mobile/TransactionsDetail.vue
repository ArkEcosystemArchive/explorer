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

        <div class="list-row-border-b">
          <div>{{ $t("Amount") }}</div>
          <div>
            <transaction-amount :transaction="transaction" :type="transaction.type"></transaction-amount>
          </div>
        </div>

        <div class="list-row-border-b">
          <div>{{ $t("Fee") }}</div>
          <div>{{ readableCrypto(transaction.fee) }}</div>
        </div>

        <div class="list-row">
          <div>{{ $t("Confirmations") }}</div>
          <div>
            <div class="flex items-center justify-end">
              <div v-if="transaction.confirmations <= 52" class="flex items-center justify-end whitespace-no-wrap">
                <span class="text-green inline-block mr-2">{{ transaction.confirmations }}</span>
                <img class="icon flex-none" src="@/assets/images/icons/clock.svg" />
              </div>
              <div v-else>
                {{ $t("Well Confirmed") }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </loader>
  </div>
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
.row-mobile:nth-child(even) {
  background-color: var(--color-theme-table-row);
}
</style>
