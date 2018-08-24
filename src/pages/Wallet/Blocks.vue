<template>
  <div class="max-w-2xl mx-auto md:pt-5">
    <content-header>{{ $t("Blocks") }} <span v-show="username">- {{ username }}</span></content-header>
    <section class="page-section py-5 md:py-10">
      <div class="hidden sm:block">
        <table-blocks :blocks="blocks"></table-blocks>
      </div>
      <div class="sm:hidden">
        <table-blocks-mobile :blocks="blocks"></table-blocks-mobile>
      </div>
      <paginator v-if="blocks && blocks.length" :start="+this.page" :count="totalBlocks"></paginator>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
import WalletService from '@/services/wallet'
import BlockService from '@/services/block'
import DelegateService from '@/services/delegate'

export default {
  data: () => ({
    username: null,
    totalBlocks: 0,
    blocks: null
  }),

  created() {
    this.$on('paginatorChanged', page => this.changePage(page))
  },

  async beforeRouteEnter (to, from, next) {
    try {
      const wallet = await WalletService.find(to.params.address)
      const blocks = await BlockService.getByPublicKey(wallet.publicKey, to.params.page)
      next(vm => vm.setBlocks(blocks))
    } catch(e) { next({ name: '404' }) }
  },

  async beforeRouteUpdate (to, from, next) {
    this.blocks = null

    try {
      const wallet = await WalletService.find(to.params.address)
      const blocks = await BlockService.getByPublicKey(wallet.publicKey, to.params.page)
      this.setBlocks(blocks)
      next()
    } catch(e) { next({ name: '404' }) }
  },

  computed: {
    address() {
      return this.$route.params.address
    },
    page() {
      return this.$route.params.page
    },
  },

  mounted() {
    this.getTotalBlocks()
    this.getUsername()
  },

  methods: {
    setBlocks (blocks) {
      if (!blocks) return

      this.blocks = blocks
    },

    async getTotalBlocks() {
      const wallet = await WalletService.find(this.address)
      const response = await BlockService.forgedByPublicKeyCount(wallet.publicKey)

      this.totalBlocks = Number(response)
    },

    async getUsername() {
      if (this.$route.params.username === undefined) {
        const wallet = await WalletService.find(this.$route.params.address)
        const delegate = await DelegateService.find(wallet.publicKey)
        this.username = delegate.username
      } else {
        this.username = this.$route.params.username
      }
    },

    changePage(page) {
      this.$router.push({
        name: 'wallet-blocks',
        params: { address: this.address, username: this.username, page }
      })
    }
  }
}
</script>
