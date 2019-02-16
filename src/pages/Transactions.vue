<template>
  <div class="max-w-2xl mx-auto md:pt-5">
    <content-header>{{ $t("Transactions") }}</content-header>

    <section class="hidden sm:block mb-5">
      <div class="px-5 sm:px-10 py-8 bg-theme-feature-background flex xl:rounded-lg items-center justify-between">
        <div class="flex-auto min-w-0">
          <div class="text-grey mb-2">{{ $t("Transaction type") }}</div>
          <div class="flex">
            <div class="text-lg text-white semibold truncate">
              <span class="mr-2">{{ types[transactionType + 1] }}</span>
            </div>
          </div>
        </div>
        <div class="flex flex-col w-full sm:w-auto sm:ml-4 sm:-mr-10">
          <selection-type :in-banner="true" @change="onTypeChange" />
        </div>
      </div>
    </section>

    <section class="page-section py-5 md:py-10">
      <div class="hidden sm:block">
        <table-transactions :transactions="transactions" />
      </div>
      <div class="sm:hidden">
        <div class="mx-5 mb-4">
          <selection-type @change="onTypeChange" />
        </div>

        <table-transactions-mobile :transactions="transactions" />
      </div>
      <paginator v-if="transactions && transactions.length" :start="+this.$route.params.page" />
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
    ],
    transactionType: -1
  }),

  created() {
    this.transactionType = Number(localStorage.getItem('transactionType') || -1)
    this.$on('paginatorChanged', page => this.changePage(page))
  },

  async beforeRouteEnter (to, from, next) {
    const response = await TransactionService.filterByType(to.params.page, Number(localStorage.getItem('transactionType') || -1))
    next(vm => {
      vm.currentPage = to.params.page
      vm.setTransactions(response)
    })
  },

  async beforeRouteUpdate (to, from, next) {
    this.transactions = null
    const response = await TransactionService.filterByType(to.params.page, Number(localStorage.getItem('transactionType') || -1))
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
      this.transactionType = type

      const response = await TransactionService.filterByType(this.currentPage, type)
      this.setTransactions(response)
    }
  }
}
</script>
