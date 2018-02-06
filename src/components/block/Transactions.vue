<template>
  <div v-if="transactions.length > 0">
    <h2 class="text-2xl mb-5 md:mb-6 px-10 sm:hidden text-theme-text-primary">Transactions</h2>
    <section class="bg-theme-content-background shadow-theme xl:rounded-lg py-8">
      <div class="hidden sm:block">
        <table-transactions :transactions="transactions"></table-transactions>
      </div>
      <div class="sm:hidden">
        <table-transactions-mobile :transactions="transactions"></table-transactions-mobile>
      </div>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
import TableTransactions from '@/components/tables/TransactionsDetail'
import TableTransactionsMobile from '@/components//tables/mobile/TransactionsDetail'
import TransactionService from '@/services/transaction'

export default {
  components: {TableTransactions, TableTransactionsMobile},

  props: {
    block: {
      type: Object,
      required: true
    }
  },

  data: () => ({ transactions: [] }),

  watch: {
    block() {
      this.getTransactions()
    }
  },

  methods: {
    getTransactions () {
      if (!this.block.id) return

      TransactionService
        .findByBlock(this.block.id)
        .then(response => this.transactions = response)
    }
  }
}
</script>
