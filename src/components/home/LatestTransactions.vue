<template>
  <div>
    <div class="hidden sm:block">
      <table-transactions :transactions="transactions"></table-transactions>
    </div>
    <div class="sm:hidden">
      <table-transactions-mobile :transactions="transactions"></table-transactions-mobile>
    </div>
    <div class="mx-10 mt-10 flex flex-wrap">
      <router-link :to="{ name: 'transactions', params: { page: 1 } }" tag="button" class="mx-auto bg-theme-button hover:bg-blue text-theme-button-text semibold hover:text-white py-5 px-8 border-transparent rounded hover-button-shadow">
        Show more
      </router-link>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import TableTransactions from '@/components/tables/Transactions'
import TableTransactionsMobile from '@/components/tables/mobile/Transactions'
import TransactionService from '@/services/transaction'

export default {
  components: { TableTransactions, TableTransactionsMobile },

  data: () => ({ transactions: [] }),

  mounted() {
    TransactionService.latest().then(response => (this.transactions = response))
  },
}
</script>
