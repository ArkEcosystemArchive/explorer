<template>
  <div class="max-w-2xl mx-auto pt-5">
    <content-header>{{ $t("Blocks") }}</content-header>
    <section class="page-section py-10">
      <div class="hidden sm:block">
        <table-blocks :blocks="blocks"></table-blocks>
      </div>
      <div class="sm:hidden">
        <table-blocks-mobile :blocks="blocks"></table-blocks-mobile>
      </div>
      <paginator v-if="blocks" :start="+this.page" :count="totalBlocks"></paginator>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
import WalletService from '@/services/wallet'
import BlockService from '@/services/block'

export default {
  data: () => ({
    totalBlocks: 0,
    blocks: null
  }),

  created() {
    this.$on('paginatorChanged', page => this.changePage(page))
    this.getTotalBlocks()
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

    changePage(page) {
      this.$router.push({
        name: 'wallet-blocks',
        params: { address: this.address, page }
      })
    }
  }
}
</script>
