<template>
  <div class="max-w-2xl mx-auto pt-5">
    <content-header>{{ $t("Transactions") }} - {{ $t(capitalize(type)) }}</content-header>
    <section class="page-section py-10">
      <div class="hidden sm:block">
        <table-transactions :transactions="transactions"></table-transactions>
      </div>
      <div class="sm:hidden">
        <table-transactions-mobile :transactions="transactions"></table-transactions-mobile>
      </div>
      <paginator v-if="transactions" :start="+this.page" :count="totalTransactions"></paginator>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
import WalletService from '@/services/wallet'
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
      const wallet = await WalletService.find(to.params.address)
      const transactions = await TransactionService[`${to.params.type}ByAddress`](wallet.address, to.params.page)
      next(vm => vm.setTransactions(transactions))
    } catch(e) { next({ name: '404' }) }
  },

  async beforeRouteUpdate (to, from, next) {
    this.transactions = null

    try {
      const wallet = await WalletService.find(to.params.address)
      const transactions = await TransactionService[`${to.params.type}ByAddress`](wallet.address, to.params.page)
      this.setTransactions(transactions)
      next()
    } catch(e) { next({ name: '404' }) }
  },

  computed: {
    address() {
      return this.$route.params.address
    },
    type() {
      return this.$route.params.type
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

    getTotalTransactions() {
      if (this.type === 'sent' || this.type === 'all') {
        this.getSentCount()
      }
      if (this.type === 'received' || this.type === 'all') {
        this.getReceivedCount()
      }
    },

    async getSentCount() {
      const wallet = await WalletService.find(this.address)
      const response = await TransactionService.sentByAddressCount(wallet.address)
      this.totalTransactions += Number(response)
    },

    async getReceivedCount() {
      const wallet = await WalletService.find(this.address)
      const received = await TransactionService.receivedByAddressCount(wallet.address)
      this.totalTransactions += Number(received)
    },

    changePage(page) {
      this.$router.push({
        name: 'wallet-transactions',
        params: {
          address: this.address,
          type: this.type,
          page,
        }
      })
    }
  }
}
</script>
