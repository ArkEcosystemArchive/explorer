<template>
  <div class="max-w-2xl mx-auto md:pt-5">
    <content-header>{{ $t("Transactions") }}</content-header>
      <div class="text-grey mb-2">Dropdown</div>
      <div class="relative text-white z-20">
        <span @click="selectOpen = !selectOpen" class="cursor-pointer flex items-center">
          <span class="mr-1">All</span>
          <svg :class="{ 'rotate-180': selectOpen }" class="fill-current" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            width="16px" height="16px">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </span>
        <select v-model="transactionType" v-show="selectOpen" @change="filterTransactions" class="absolute pin-r mt-px bg-white shadow rounded border overflow-hidden list-reset text-sm">
          <option v-for="(item, index) in transactionsChoices" :value="index">
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
    selectOpen: false,
    transactionsChoices: ['Transfer', 'Second Signature', 'Delegate Registration', 'Vote', 'MultiSignature'],
    transactionType: 0
  }),
  created() {
    this.$on('paginatorChanged', page => this.changePage(page))
  },
  async beforeRouteEnter (to, from, next) {
    const response = await TransactionService.filterByType(to.params.page, 0) // TODO: set type based on what tx type we were looking for, might have to do this in the url as is done with transaction filtering on sent / received / all in a wallet
    next(vm => vm.setTransactions(response))
  },
  async beforeRouteUpdate (to, from, next) {
    this.transactions = null
    const response = await TransactionService.filterByType(to.params.page, 0) // TODO: set type based on what tx type we were looking for, might have to do this in the url as is done with transaction filtering on sent / received / all in a wallet
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
      const response = await TransactionService.filterByType(1, this.transactionType) // TODO: fix hardcoded '1' parameter
      this.setTransactions(response)
    }
  }
}
</script>
