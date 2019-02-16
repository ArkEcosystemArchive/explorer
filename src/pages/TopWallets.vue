<template>
  <div class="max-w-2xl mx-auto md:pt-5">
    <content-header>{{ $t("Top Wallets") }}</content-header>
    <section class="page-section py-5 md:py-10">
      <div class="hidden sm:block">
        <table-wallets :wallets="wallets" :total="supply" />
      </div>
      <div class="sm:hidden">
        <table-wallets-mobile :wallets="wallets" :total="supply" />
      </div>
      <paginator v-if="wallets && wallets.length" :start="+this.$route.params.page" />
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
import WalletService from '@/services/wallet'

export default {
  data: () => ({ wallets: null }),

  async beforeRouteEnter (to, from, next) {
    const response = await WalletService.top(to.params.page)
    next(vm => vm.setWallets(response))
  },

  async beforeRouteUpdate (to, from, next) {
    this.wallets = null

    const response = await WalletService.top(to.params.page)
    this.setWallets(response)
    next()
  },

  computed: {
    ...mapGetters('network', ['supply'])
  },

  created() {
    this.$on('paginatorChanged', page => this.changePage(page))
  },

  methods: {
    setWallets (wallets) {
      this.wallets = wallets
    },

    changePage(page) {
      this.$router.push({ name: 'top-wallets', params: { page } })
    }
  }
}
</script>
