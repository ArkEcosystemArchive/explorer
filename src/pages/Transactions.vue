<template>
  <div class="max-w-2xl mx-auto md:pt-5">
    <content-header>
      <span>{{ $t("Transactions") }}</span>
    </content-header>

    <section class="mb-5">
      <div class="px-5 sm:px-10 py-8 bg-theme-feature-background flex xl:rounded-lg items-center justify-between">
        <div class="flex-auto min-w-0">
          <div class="text-grey mb-2">{{ $t("Transaction type") }}</div>
          <div class="flex">
            <div class="text-lg text-white semibold truncate">
              <span class="mr-2">{{ types[transactionType + 1] }}</span>
            </div>
          </div>
        </div>
        <div class="flex flex-col ml-4">
          <div class="text-grey mb-2">{{ $t("Type") }}</div>
          <selection-type
            color="text-white"
            @change="onTypeChange"
          ></selection-type>
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
import SelectionType from '@/components/SelectionType'
import TransactionService from '@/services/transaction'

export default {
  components: {
    SelectionType
  },

  data: () => ({
    transactions: null,
    currentPage: 0,
    types: [
      'All', 'Transfer', 'Second Signature', 'Delegate Registration', 'Vote', 'Multisignature Registration'
    ]
  }),

  created() {
    this.transactionType = Number(localStorage.getItem('transactionType')) || -1
    this.$on('paginatorChanged', page => this.changePage(page))
  },

  async beforeRouteEnter (to, from, next) {
    const response = await TransactionService.filterByType(to.params.page, Number(localStorage.getItem('transactionType')) || -1)
    next(vm => {
      vm.currentPage = to.params.page
      vm.setTransactions(response)
    })
  },

  async beforeRouteUpdate (to, from, next) {
    this.transactions = null
    const response = await TransactionService.filterByType(to.params.page, Number(localStorage.getItem('transactionType')) || -1)
    this.currentPage = to.params.page
    this.setTransactions(response)
    next()
  },

  methods: {
    setTransactions(transactions) {
      if (!transactions) return
      this.transactions = transactions
    },

    changePage(page) {
      this.$router.push({ name: 'transactions', params: { page } })
    },

    async onTypeChange(type) {
      this.transactions = null

      const response = await TransactionService.filterByType(this.currentPage, type)
      this.setTransactions(response)
    }
  }
}
</script>
