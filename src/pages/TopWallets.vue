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
      <paginator
        v-if="showPaginator"
        :previous="this.meta.previous"
        :next="this.meta.next"
        @previous="onPrevious"
        @next="onNext"
      />
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
import WalletService from '@/services/wallet'
import { mapGetters } from 'vuex'

export default {
  data: () => ({
    wallets: null,
    meta: null,
    currentPage: 0
  }),

  computed: {
    ...mapGetters('network', ['supply']),

    showPaginator() {
      return this.meta && (this.meta.previous || this.meta.next)
    }
  },

  created() {
    this.$on('paginatorChanged', page => this.changePage(page))
  },

  watch: {
    currentPage() {
      this.changePage()
    }
  },

  async beforeRouteEnter (to, from, next) {
    try {
      const { meta, data } = await WalletService.top(to.params.page)

      next(vm => {
        vm.currentPage = to.params.page
        vm.setWallets(data)
        vm.setMeta(meta)
      })
    } catch(e) { next({ name: '404' }) }
  },

  async beforeRouteUpdate (to, from, next) {
    this.wallets = null
    this.meta = null

    try {
      const { meta, data } = await WalletService.top(to.params.page)

      this.currentPage = to.params.page
      this.setWallets(data)
      this.setMeta(meta)
      next()
    } catch(e) { next({ name: '404' }) }
  },

  methods: {
    setWallets(wallets) {
      this.wallets = wallets
    },

    setMeta(meta) {
      this.meta = meta
    },

    onPrevious() {
      this.currentPage = Number(this.currentPage) - 1
    },

    onNext() {
      this.currentPage = Number(this.currentPage) + 1
    },

    changePage() {
      this.$router.push({
        name: 'top-wallets',
        params: {
          page: this.currentPage
        }
      })
    }
  }
}
</script>
