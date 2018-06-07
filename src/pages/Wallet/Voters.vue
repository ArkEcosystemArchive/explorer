<template>
  <div class="max-w-2xl mx-auto pt-5">
    <content-header>{{ $t("Voters") }} <span v-show="username">- {{ username }}</span></content-header>
    <section class="page-section py-10">
      <div class="hidden sm:block">
        <table-wallets :wallets="filteredWallets" :total="votes"></table-wallets>
      </div>
      <div class="sm:hidden">
        <table-wallets-mobile :wallets="filteredWallets" :total="votes"></table-wallets-mobile>
      </div>
      <paginator v-if="wallets" :start="+this.page" :count="count"></paginator>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
import WalletService from '@/services/wallet'
import DelegateService from '@/services/delegate'
import sumBy from 'lodash/sumBy'

export default {
  data: () => ({
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
    username() {
      return this.$route.params.username
    },
    count() {
      return this.wallets.length
    }
  },

  mounted() {
    this.getVoters()
  },

  methods: {
    async getVoters() {
      try {
        const wallet = await WalletService.find(this.$route.params.address)
        const voters = await DelegateService.voters(wallet.publicKey)
        this.wallets = voters
      } catch(e) { next({ name: '404' }) }
    },

    changePage(page) {
      this.$router.push({
        name: 'wallet-voters',
        params: { address: this.$route.params.address, username: this.$route.params.username, page }
      })
    }
  }
}
</script>
