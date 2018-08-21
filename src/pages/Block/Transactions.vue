<template>
  <div class="max-w-2xl mx-auto md:pt-5">
    <content-header>{{ $t("Transactions") }}</content-header>
    <section class="page-section py-5 md:py-10">
      <div class="hidden sm:block">
        <table-transactions :transactions="transactions"></table-transactions>
      </div>
      <div class="sm:hidden">
        <table-transactions-mobile :transactions="transactions"></table-transactions-mobile>
      </div>
      <paginator v-if="transactions && transactions.length" :start="+this.page" :count="totalTransactions"></paginator>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
import BlockService from '@/services/block'
import TransactionService from '@/services/transaction'

export default {
  data: () => ({
    totalTransactions: 0,
    transactions: null
  }),

  created() {
    this.$on('paginatorChanged', page => this.changePage(page))
    this.getTotalTransactions()
  },

  async beforeRouteEnter (to, from, next) {
    try {
      const block = await BlockService.find(to.params.id)
      const transactions = await TransactionService.findByBlock(block.id, to.params.page)
      next(vm => vm.setTransactions(transactions))
    } catch(e) { next({ name: '404' }) }
  },

  async beforeRouteUpdate (to, from, next) {
    this.transactions = null

    try {
      const block = await BlockService.find(to.params.id)
      const transactions = await TransactionService.findByBlock(block.id, to.params.page)
      this.setTransactions(transactions)
      next()
    } catch(e) { next({ name: '404' }) }
  },

  computed: {
    id() {
      return this.$route.params.id
    },
    page() {
      return this.$route.params.page
    },
  },

  methods: {
    setTransactions (transactions) {
      if (!transactions) return

      this.transactions = transactions
    },

    async getTotalTransactions() {
      const block = await BlockService.find(this.id)
      const response = await TransactionService.findByBlockCount(block.id)
      this.totalTransactions += Number(response)
    },

    changePage(page) {
      this.$router.push({
        name: 'block-transactions',
        params: {
          id: this.id,
          page,
        }
      })
    }
  }
}
</script>
