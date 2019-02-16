<template>
  <div class="max-w-2xl mx-auto md:pt-5">
    <content-header>{{ $t("Transactions") }}</content-header>
    <section class="page-section py-5 md:py-10">
      <div class="hidden sm:block">
        <table-transactions :transactions="transactions" />
      </div>
      <div class="sm:hidden">
        <table-transactions-mobile :transactions="transactions" />
      </div>
      <paginator v-if="transactions && transactions.length" :start="+this.page" :count="totalTransactions" />
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
import BlockService from '@/services/block'

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
      const transactions = await BlockService.transactionsByBlock(block.id, to.params.page)
      next(vm => vm.setTransactions(transactions))
    } catch(e) { next({ name: '404' }) }
  },

  async beforeRouteUpdate (to, from, next) {
    this.transactions = null

    try {
      const block = await BlockService.find(to.params.id)
      const transactions = await BlockService.transactionsByBlock(block.id, to.params.page)
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
      this.totalTransactions += Number(block.transactions)
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
