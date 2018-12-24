<template>
  <div class="max-w-2xl mx-auto md:pt-5">
      <div class="relative text-white z-20">
        <select v-model="transactionType" @change="filterTransactions" class="absolute pin-r mt-px bg-white shadow rounded border overflow-hidden list-reset text-sm">
          <option v-for="(item, index) in transactionsChoices" :value="index - 1">
            {{ item }}
          </option>
        </select>
      </div>
    <section class="page-section py-5 md:py-10">
      <div class="hidden sm:block">
        <table-transactions :transactions="transactions"></table-transactions>
      </div>
      <div class="sm:hidden">
        <table-transactions-mobile :transactions="transactions"></table-transactions-mobile>
      </div>
      <paginator v-if="transactions && transactions.length" :start="+this.$route.params.page"></paginator>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
import TransactionService from '@/services/transaction'

export default {
  data: () => ({
    transactions: null,
    transactionsChoices: [
      'All', 'Transfer', 'Second Signature', 'Delegate Registration', 'Vote', 'MultiSignature'
    ],
    transactionType: '',
    currentPage: 2,
  }),

  created() {
    this.$on('paginatorChanged', page => this.changePage(page))
  },

  async beforeRouteEnter (to, from, next) {
    const response = await TransactionService.filterByType(to.params.page, localStorage.getItem('transactionType')) // TODO: set type based on what tx type we were looking for, might have to do this in the url as is done with transaction filtering on sent / received / all in a wallet
    next(vm => vm.setTransactions(response))
  },

  async beforeRouteUpdate (to, from, next) {
    this.transactions = null
    const response = await TransactionService.filterByType(to.params.page, localStorage.getItem('transactionType')) // TODO: set type based on what tx type we were looking for, might have to do this in the url as is done with transaction filtering on sent / received / all in a wallet
    this.currentPage = to.params.page
    this.setTransactions(response)
    next()
  },

  methods: {
    setTransactions (transactions) {
      if (!transactions) return
      this.transactions = transactions
    },

    changePage(page) {
      this.$router.push({ name: 'transactions', params: { page } })
    },

    async filterTransactions() {
      this.transactions = null // Used to show the loading indicator
      const response = await TransactionService.filterByType(this.currentPage, this.transactionType) // TODO: fix hardcoded '1' parameter
      this.setTransactions(response)
      localStorage.setItem('transactionType', this.transactionType)
    }
  }
}
</script>
