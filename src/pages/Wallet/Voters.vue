<template>
  <div class="max-w-2xl mx-auto md:pt-5">
    <content-header>{{ $t("Voters") }} <span v-show="username">- {{ username }}</span></content-header>
    <section class="page-section py-5 md:py-10">
      <div class="hidden sm:block">
        <table-wallets :wallets="filteredWallets" :total="votes"></table-wallets>
      </div>
      <div class="sm:hidden">
        <table-wallets-mobile :wallets="filteredWallets" :total="votes"></table-wallets-mobile>
      </div>
      <paginator v-if="wallets && wallets.length" :start="+this.page" :count="count"></paginator>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
import WalletService from '@/services/wallet'
import DelegateService from '@/services/delegate'
import sumBy from 'lodash/sumBy'

export default {
  data: () => ({
    username: null,
    wallets: null,
    perPage: 25,
  }),

  created() {
    this.$on('paginatorChanged', page => this.changePage(page))
  },

  computed: {
    filteredWallets() {
      if (!this.wallets) return null

      let page = this.page - 1

      return this.wallets.slice(page * this.perPage, (page + 1) * this.perPage)
    },
    page() {
      return this.$route.params.page
    },
    votes() {
      return sumBy(this.wallets, 'balance')
    },
    count() {
      return this.wallets.length
    }
  },

  async beforeRouteEnter(to, from, next) {
    try {
      const wallet = await WalletService.find(to.params.address)
      const voters = await DelegateService.voters(wallet.publicKey)
      next(vm => {
        vm.setWallets(voters),
        vm.setUsername(to.params.username)
      })
    } catch(e) { next({ name: '404' }) }
  },

  async beforeRouteUpdate(to, from, next) {
    this.wallets = null

    try {
      const wallet = await WalletService.find(to.params.address)
      const voters = await DelegateService.voters(wallet.publicKey)
      this.setWallets(voters)
      this.setUsername(to.params.username)
      next()
    } catch(e) { next({ name: '404' }) }
  },

  methods: {
    setWallets(wallets) {
      this.wallets = wallets
    },

    async setUsername(username) {
      if (username === undefined) {
        const wallet = await WalletService.find(this.$route.params.address)
        const delegate = await DelegateService.find(wallet.publicKey)
        this.username = delegate.username
      } else {
        this.username = username
      }
    },

    changePage(page) {
      this.$router.push({
        name: 'wallet-voters',
        params: { address: this.$route.params.address, username: this.username, page }
      })
    }
  }
}
</script>
