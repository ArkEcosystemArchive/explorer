<template>
  <div>
    <div v-for="transaction in transactions" :key="transaction.id" class="tx-row-mobile px-5 py-4">
      <div class="border-b py-4 flex justify-between flex-wrap">
        <div>ID</div>
        <link-transaction :id="transaction.id" :smart-bridge="transaction.vendorField"></link-transaction>
      </div>

      <div class="border-b py-4 flex justify-between flex-wrap">
        <div>Date</div>
        <div>{{ readableTimestamp(transaction.timestamp) }}</div>
      </div>

      <div class="border-b py-4 flex justify-between flex-wrap">
        <div>Sender</div>
        <link-wallet :address="transaction.senderId"></link-wallet>
      </div>

      <div class="border-b py-4 flex justify-between flex-wrap">
        <div>Recipient</div>
        <link-wallet :address="transaction.recipientId" :type="transaction.type"></link-wallet>
      </div>

      <div class="border-b py-4 flex justify-between flex-wrap">
        <div>Amount</div>
        <div>{{ readableCrypto(transaction.amount) }}</div>
      </div>

      <div class="border-b py-4 flex justify-between flex-wrap">
        <div>Fee</div>
        <div>{{ readableCrypto(transaction.fee) }}</div>
      </div>

      <div class="py-4 flex justify-between flex-wrap">
        <div>Confirmations</div>
        <div>
          <div class="flex items-center justify-end">
            <div v-if="transaction.confirmations <= 52">
              <span class="text-green hidden md:inline-block mr-2">{{ transaction.confirmations }}</span>
              <img class="icon flex-none" src="@/assets/images/icons/clock.svg" />
            </div>
            <div v-else>
              Well Confirmed
            </div>
          </div>
        </div>
      </div>
    </div>
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
.tx-row-mobile:nth-child(even) {
  background-color: var(--color-theme-table-row);
}
</style>
