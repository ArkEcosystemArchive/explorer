<template>
  <table class="w-full">
    <thead>
      <tr class="opacity-25 text-xs">
        <th class="p-4 pl-10 text-left">ID</th>
        <th class="p-4 text-left hidden md:table-cell">Timestamp</th>
        <th class="p-4 text-left">Sender</th>
        <th class="p-4 text-left">Recipient</th>
        <th class="p-4 text-right hidden lg:table-cell">Smartbridge</th>
        <th class="p-4 pr-10 md:pr-4 text-right">Amount (ARK)</th>
        <th class="p-4 pr-10 text-right hidden md:table-cell">Fee (ARK)</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="transaction in transactions" :key="transaction.id">
        <td class="p-4 pl-10 text-left border-none">
          <transaction-link :id="transaction.id" :smart-bridge="transaction.vendorField"></transaction-link>
        </td>
        <td class="p-4 text-left border-none hidden md:table-cell">
          {{ readableTimestamp(transaction.timestamp) }}
        </td>
        <td class="p-4 text-left border-none">
          <wallet-link :address="transaction.senderId"></wallet-link>
        </td>
        <td class="p-4 text-left border-none">
          <wallet-link :address="transaction.recipientId"></wallet-link>
        </td>
        <td class="p-4 text-right border-none hidden lg:table-cell">
          {{ truncate(transaction.vendorField || '') }}
        </td>
        <td class="p-4 pr-10 md:pr-4 text-right border-none">
          {{ readableCrypto(transaction.amount) }}
        </td>
        <td class="p-4 pr-10 text-right border-none hidden md:table-cell">
          {{ readableCrypto(transaction.fee) }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script type="text/ecmascript-6">
import Currency from '@/components/utils/Currency'
import WalletLink from '@/components/links/Wallet'
import TransactionLink from '@/components/links/Transaction'

export default {
  components: { Currency, TransactionLink, WalletLink },

  props: {
    transactions: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style scoped>
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
