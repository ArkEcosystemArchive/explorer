<template>
  <div class="max-w-2xl mx-auto md:pt-5">
    <content-header>
      <span>{{ $t("Transactions") }} - </span>
      <div class="inline relative z-20">
        <span @click="selectOpen = !selectOpen" class="cursor-pointer">
          <span class="mr-1">{{ $t(capitalize(type)) }}</span>
          <svg :class="{ 'rotate-180': selectOpen }" class="fill-current" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            width="16px" height="16px">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </span>
        <ul v-show="selectOpen" class="absolute pin-l mt-px bg-white shadow rounded border overflow-hidden list-reset text-sm">
          <li v-for="txType in ['all', 'sent', 'received']">
            <router-link :to="{ name: 'wallet-transactions', params: { address: address, type: txType, page: 1 } }" class="dropdown-button">{{ $t(capitalize(txType)) }}</router-link>
          </li>
        </ul>
      </div>
    </content-header>
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
import WalletService from '@/services/wallet'
import TransactionService from '@/services/transaction'

export default {
  data: () => ({
    totalTransactions: 0,
    transactions: null,
    selectOpen: false
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
    this.selectOpen = false
    this.transactions = null

    try {
      const wallet = await WalletService.find(to.params.address)
      const transactions = await TransactionService[`${to.params.type}ByAddress`](wallet.address, to.params.page)
      this.getTotalTransactions(to.params.type)
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

    getTotalTransactions(type = this.type) {
      this.totalTransactions = 0

      if (type === 'sent' || type === 'all') {
        this.getSentCount()
      }

      if (type === 'received' || type === 'all') {
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
