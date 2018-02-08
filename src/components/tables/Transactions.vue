<template>
  <table class="w-full">
    <table-header :fields="[
        {
          label: 'ID',
          sortBy: 'id',
          class: 'p-4 pl-10 text-left'
        }, {
          label: 'Timestamp',
          sortBy: 'timestamp',
          class: 'p-4 text-left hidden md:table-cell'
        }, {
          label: 'Sender',
          sortBy: 'senderId',
          class: 'p-4 text-left'
        }, {
          label: 'Recipient',
          sortBy: 'recipientId',
          class: 'p-4 text-left'
        }, {
          label: 'Smartbridge',
          sortBy: 'vendorField',
          class: 'p-4 text-right hidden lg:table-cell'
        }, {
          label: 'Amount (ARK)',
          sortBy: 'amount',
          class: 'p-4 pr-10 md:pr-4 text-right'
        }, {
          label: 'Fee (ARK)',
          sortBy: 'fee',
          class: 'p-4 pr-10 text-right'
        },
    ]" :sort-key="sortKey" :sort-direction="sortDirection" :sort-symbol="sortSymbol" :handler="sortBy"></table-header>
    <tbody>
      <tr v-for="transaction in sortedTransactions" :key="transaction.id">
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
          {{ truncate(transaction.vendorField || '', 35) }}
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
import SortableTable from '@/mixins/sortable-table'
import TableHeader from '@/components/table/TableHeader'

export default {
  mixins: [SortableTable],

  components: { Currency, TransactionLink, WalletLink, TableHeader },

  props: {
    transactions: {
      type: Array,
      required: true,
    },
  },

  data: () => ({ sortKey: 'timestamp' }),

  computed: {
    sortedTransactions() {
      return _.orderBy(this.transactions, this.sortKey, this.sortDirection)
    }
  }
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
