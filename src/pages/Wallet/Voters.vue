<template>
  <div class="max-w-2xl mx-auto pt-5">
    <content-header>Voters</content-header>
    <section class="bg-theme-content-background shadow-theme xl:rounded-lg py-10">
      <div class="hidden sm:block">
        <table-wallets :wallets="filteredWallets"></table-wallets>
      </div>
      <div class="sm:hidden">
        <table-wallets-mobile :wallets="filteredWallets"></table-wallets-mobile>
      </div>
      <paginator :start="+this.page"></paginator>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
import WalletService from '@/services/wallet'
import DelegateService from '@/services/delegate'

export default {
  data: () => ({
    wallets: [],
    perPage: 25,
  }),

  created() {
    this.$on('paginatorChanged', page => this.changePage(page))
  },

  computed: {
    filteredWallets() {
      let page = this.page - 1

      return this.wallets.slice(page * this.perPage, (page + 1) * this.perPage)
    },
    page() {
      return this.$route.params.page
    },
  },

  mounted() {
    this.getVoters()
  },

  methods: {
    getVoters() {
      WalletService
        .find(this.$route.params.address)
        .then(response => DelegateService.voters(response.publicKey))
        .then(response => this.wallets = response)
        .catch(() => next({ name: '404' }))
    },

    changePage(page) {
      this.$router.push({
        name: 'wallet-voters',
        params: { address: this.$route.params.address, page }
      })
    }
  }
}
</script>
