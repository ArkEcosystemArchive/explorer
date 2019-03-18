<template>
  <div class="max-w-2xl mx-auto md:pt-5">
    <content-header>{{ $t("Voters") }} <span v-if="delegate">- {{ delegate.username }}</span></content-header>
    <section class="page-section py-5 md:py-10">
      <div class="hidden sm:block">
        <table-wallets :wallets="wallets" :total="delegate ? delegate.votes : 0" />
      </div>
      <div class="sm:hidden">
        <table-wallets-mobile :wallets="wallets" :total="delegate ? delegate.votes : 0" />
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
import DelegateService from '@/services/delegate'

export default {
  data: () => ({
    delegate: null,
    wallets: null,
    meta: null,
    currentPage: 0
  }),

  computed: {
    showPaginator() {
      return this.meta && (this.meta.previous || this.meta.next)
    },
    address() {
      return this.$route.params.address
    }
  },

  watch: {
    currentPage() {
      this.changePage()
    }
  },

  async beforeRouteEnter(to, from, next) {
    try {
      const delegate = await DelegateService.find(to.params.address)
      const { meta, data } = await DelegateService.voters(to.params.address, to.params.page)

      next(vm => {
        vm.currentPage = to.params.page
        vm.setDelegate(delegate)
        vm.setWallets(data)
        vm.setMeta(meta)
      })
    } catch(e) { next({ name: '404' }) }
  },

  async beforeRouteUpdate(to, from, next) {
    this.wallets = null
    this.meta = null

    try {
      const delegate = await DelegateService.find(to.params.address)
      const { meta, data } = await DelegateService.voters(to.params.address, to.params.page)

      this.currentPage = to.params.page
      this.setDelegate(delegate)
      this.setWallets(data)
      this.setMeta(meta)
      next()
    } catch(e) { next({ name: '404' }) }
  },

  methods: {
    setDelegate(delegate) {
      this.delegate = delegate
    },

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

    changePage(page) {
      this.$router.push({
        name: 'wallet-voters',
        params: {
          address: this.address,
          page: this.currentPage
        }
      })
    }
  }
}
</script>
