<template>
  <div class="max-w-2xl mx-auto pt-5">
    <content-header>{{ $t("Transactions") }}</content-header>
    <section class="page-section py-10">
      <div class="hidden sm:block">
        <table-transactions :transactions="transactions"></table-transactions>
      </div>
      <div class="sm:hidden">
        <table-transactions-mobile :transactions="transactions"></table-transactions-mobile>
      </div>
      <paginator :start="+this.page" :count="totalTransactions"></paginator>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
import WalletService from '@/services/wallet'
import TransactionService from '@/services/transaction'

export default {
  data: () => ({
    totalTransactions: 0,
    transactions: []
  }),

  created() {
    this.$on('paginatorChanged', page => this.changePage(page))
    this.getTotalTransactions()
  },

  beforeRouteEnter (to, from, next) {
    WalletService
      .find(to.params.address)
      .then(wallet => TransactionService[`${to.params.type}ByAddress`](wallet.address, to.params.page))
      .then(transactions => next(vm => vm.setTransactions(transactions)))
      .catch(() => next({ name: '404' }))
  },

  beforeRouteUpdate (to, from, next) {
    this.transactions = []

    WalletService
      .find(to.params.address)
      .then(wallet => TransactionService[`${to.params.type}ByAddress`](wallet.address, to.params.page))
      .then(transactions => this.setTransactions(transactions))
      .then(() => next())
      .catch(() => next({ name: '404' }))
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

    getSentCount() {
      WalletService
        .find(this.address)
        .then(wallet => TransactionService.sendByAddressCount(wallet.address))
        .then(response => (this.totalTransactions += Number(response)))
    },

    getReceivedCount() {
      WalletService
        .find(this.address)
        .then(wallet => TransactionService.receivedByAddressCount(wallet.address))
        .then(response => (this.totalTransactions += Number(response)))
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
