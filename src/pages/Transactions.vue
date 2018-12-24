<template>
  <div class="max-w-2xl mx-auto md:pt-5">
    <section class="mb-5">
      <div class="px-5 sm:px-10 py-8 bg-theme-feature-background flex xl:rounded-lg items-center justify-between">
        <div class="mr-6 flex-none">
          <img class="block" src="@/assets/images/icons/transaction.svg" />
        </div>
        <div class="flex-auto min-w-0">
          <div class="text-grey mb-2">Transactions Type</div>
          <div class="flex">
            <div class="text-lg text-white semibold truncate">
              <span class="mr-2">{{ transactionsChoices[transactionType+1] }}</span>
            </div>
          </div>
        </div>
        <div class="flex flex-col ml-4">
          <div class="text-grey mb-2">{{ $t("Type") }}</div>
          <div class="relative text-white z-20">
            <span @click="selectOpen = !selectOpen" class="cursor-pointer flex items-center">
              <span class="mr-1">{{ $t(transactionsChoices[transactionType + 1]) }}</span>
              <svg :class="{ 'rotate-180': selectOpen }" class="fill-current" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                width="16px" height="16px">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </span>
            <ul v-show="selectOpen" class="absolute pin-r mt-px bg-white shadow rounded border overflow-hidden list-reset text-sm">
              <li v-for="(txType, index) in transactionsChoices">
              <div @click="filterTransactions(index - 1)" class="dropdown-button">{{ $t(txType) }}</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
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
    transactionType: -1,
    currentPage: 0,
    selectOpen: false,
  }),

  created() {
    this.transactionType = Number(localStorage.getItem('transactionType')) || -1
    this.$on('paginatorChanged', page => this.changePage(page))
  },

  async beforeRouteEnter (to, from, next) {
    const response = await TransactionService.filterByType(to.params.page, localStorage.getItem('transactionType'))
    next(vm => {
      vm.currentPage = to.params.page
      vm.setTransactions(response)
    })
  },

  async beforeRouteUpdate (to, from, next) {
    this.transactions = null
    const response = await TransactionService.filterByType(to.params.page, localStorage.getItem('transactionType'))
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

    async filterTransactions(index) {
      this.transactions = null
      this.selectOpen = false
      this.transactionType = index
      const response = await TransactionService.filterByType(this.currentPage, index)
      this.setTransactions(response)
      localStorage.setItem('transactionType', index)
    }
  }
}
</script>
