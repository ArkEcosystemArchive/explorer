<template>
  <div class="max-w-2xl mx-auto md:pt-5">
    <content-header>{{ $t("Voters") }} <span v-if="delegate">- {{ delegate.username }}</span></content-header>
    <section class="page-section py-5 md:py-10">
      <div class="hidden sm:block">
        <table-wallets :wallets="wallets" :total="delegate ? delegate.votes : 0"></table-wallets>
      </div>
      <div class="sm:hidden">
        <table-wallets-mobile :wallets="wallets" :total="delegate ? delegate.votes : 0"></table-wallets-mobile>
      </div>
      <paginator v-if="wallets && wallets.length" :start="+this.page" :count="voterCount"></paginator>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
import DelegateService from '@/services/delegate'
import sumBy from 'lodash/sumBy'

export default {
  data: () => ({
    delegate: null,
    wallets: null,
    voterCount: 0
  }),

  created() {
    this.$on('paginatorChanged', page => this.changePage(page))
  },

  computed: {
    page() {
      return this.$route.params.page
    }
  },

  watch: {
    async delegate(delegate) {
      if (delegate.username) {
        await this.getVoterCount()
      }
    }
  },

  async beforeRouteEnter(to, from, next) {
    try {
      const delegate = await DelegateService.find(to.params.address)
      const voters = await DelegateService.voters(delegate.username, to.params.page)
      next(vm => {
        vm.setWallets(voters)
        vm.setDelegate(delegate)
      })
    } catch(e) { next({ name: '404' }) }
  },

  async beforeRouteUpdate(to, from, next) {
    this.wallets = null

    try {
      const delegate = await DelegateService.find(to.params.address)
      const voters = await DelegateService.voters(delegate.username, to.params.page)
      this.setWallets(voters)
      this.setDelegate(delegate)
      next()
    } catch(e) { next({ name: '404' }) }
  },

  methods: {
    setWallets(wallets) {
      this.wallets = wallets
    },

    setDelegate(delegate) {
      this.delegate = delegate
    },

    changePage(page) {
      this.$router.push({
        name: 'wallet-voters',
        params: { address: this.$route.params.address, username: this.username, page }
      })
    },

    async getVoterCount() {
      const count = await DelegateService.voterCount(this.delegate.publicKey, false)
      this.voterCount = count
    }
  }
}
</script>
