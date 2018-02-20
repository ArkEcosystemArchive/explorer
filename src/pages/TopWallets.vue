<template>
  <div class="max-w-2xl mx-auto md:pt-5">
    <content-header>{{ $t("Top Accounts") }}</content-header>
    <section class="page-section py-5 md:py-10">
      <div class="hidden sm:block">
        <table-wallets :wallets="wallets" :total="supply"></table-wallets>
      </div>
      <div class="sm:hidden">
        <table-wallets-mobile :wallets="wallets" :total="supply"></table-wallets-mobile>
      </div>
      <paginator :start="+this.$route.params.page"></paginator>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
import WalletService from '@/services/wallet'

export default {
  data: () => ({ wallets: [] }),

  beforeRouteEnter (to, from, next) {
    WalletService
      .top(to.params.page)
      .then(response => next(vm => vm.setWallets(response)))
  },

  beforeRouteUpdate (to, from, next) {
    this.wallets = []

    WalletService
      .top(to.params.page)
      .then(response => this.setWallets(response))
      .then(() => next())
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
