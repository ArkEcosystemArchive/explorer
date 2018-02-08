<template>
  <table class="w-full">
    <table-header :fields="[
        {
          label: 'Transaction ID',
          sortBy: 'id',
          class: 'p-4 pl-10 text-left'
        }, {
          label: 'Date',
          sortBy: 'timestamp',
          class: 'p-4 text-left hidden lg:table-cell'
        }, {
          label: 'Sender',
          sortBy: 'senderId',
          class: 'p-4 text-left'
        }, {
          label: 'Recipient',
          sortBy: 'recipientId',
          class: 'p-4 text-left'
        }, {
          label: 'Amount (ARK)',
          sortBy: 'amount',
          class: 'p-4 pr-4 text-right'
        }, {
          label: 'Fee (ARK)',
          sortBy: 'fee',
          class: 'p-4 text-right hidden md:table-cell'
        }, {
          label: 'Confirmations',
          sortBy: 'confirmations',
          class: 'p-4 pr-10 text-right',
          spanClass: 'hidden md:inline-block'
        },
    ]" :sort-key="sortKey" :sort-direction="sortDirection" :sort-symbol="sortSymbol" :handler="sortBy"></table-header>
    <tbody>
      <tr v-for="transaction in sortedTransactions" :key="transaction.id">
        <td class="p-4 pl-10 text-left border-none">
          <transaction-link :id="transaction.id" :smart-bridge="transaction.vendorField"></transaction-link>
        </td>

        <td class="p-4 text-left border-none hidden lg:table-cell">
          {{ readableTimestamp(transaction.timestamp) }}
        </td>

        <td class="p-4 text-left border-none">
          <wallet-link :address="transaction.senderId"></wallet-link>
        </td>

        <td class="p-4 text-left border-none">
          <wallet-link :address="transaction.recipientId"></wallet-link>
        </td>

        <td class="p-4 pr-4 text-right border-none" :class="{
          'text-red': transaction.senderId === $route.params.address,
          'text-green': transaction.recipientId === $route.params.address,
        }">
          {{ readableCrypto(transaction.amount) }}
        </td>

        <td class="p-4 text-right border-none hidden md:table-cell">
          {{ readableCrypto(transaction.fee) }}
        </td>

        <td class="p-4 pr-10 text-right border-none">
          <div class="flex items-center justify-end whitespace-no-wrap">
            <div v-if="transaction.confirmations <= 52">
              <span class="text-green hidden md:inline-block mr-2">{{ transaction.confirmations }}</span>
              <img class="icon flex-none" src="@/assets/images/icons/clock.svg" />
            </div>
            <div v-else>
              Well Confirmed
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script type="text/ecmascript-6">
import Currency from '@/components/utils/Currency'
import WalletLink from '@/components/links/Wallet'
import TransactionLink from '@/components/links/Transaction'
import TableHeader from '@/components/table/TableHeader'
import SortableTable from '@/mixins/sortable-table'

export default {
  mixins: [SortableTable],

  components: { Currency, TransactionLink, WalletLink, TableHeader },

  props: {
    transactions: {
      type: Array,
      required: true,
    }
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
