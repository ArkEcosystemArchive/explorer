<template>
  <div class="max-w-2xl mx-auto pt-5">
    <content-header>Transactions</content-header>
    <section class="bg-theme-content-background shadow-theme xl:rounded-lg py-10">
      <div class="hidden sm:block">
        <table-transactions :transactions="transactions"></table-transactions>
      </div>
      <div class="sm:hidden">
        <table-transactions-mobile :transactions="transactions"></table-transactions-mobile>
      </div>
      <paginator :start="+this.page"></paginator>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
import ContentHeader from '@/components/ContentHeader'
import TableTransactions from '@/components/tables/TransactionsDetail'
import TableTransactionsMobile from '@/components/tables/mobile/TransactionsDetail'
import Paginator from '@/components/utils/Paginator'
import WalletService from '@/services/wallet'
import TransactionService from '@/services/transaction'

export default {
  components: {
    ContentHeader,
    TableTransactions,
    TableTransactionsMobile,
    Paginator,
  },

  data: () => ({ transactions: [] }),

  created() {
    this.$on('paginatorChanged', page => this.changePage(page))
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
