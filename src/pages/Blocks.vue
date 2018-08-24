<template>
  <div class="max-w-2xl mx-auto md:pt-5">
    <content-header>{{ $t("Blocks") }}</content-header>
    <section class="page-section py-5 md:py-10">
      <div class="hidden sm:block">
        <table-blocks :blocks="blocks"></table-blocks>
      </div>
      <div class="sm:hidden">
        <table-blocks-mobile :blocks="blocks"></table-blocks-mobile>
      </div>
      <paginator v-if="blocks && blocks.length" :start="+this.$route.params.page"></paginator>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
import BlockService from '@/services/block'

export default {
  data: () => ({ blocks: null }),

  created() {
    this.$on('paginatorChanged', page => this.changePage(page))
  },

  async beforeRouteEnter (to, from, next) {
    const response = await BlockService.paginate(to.params.page)
    next(vm => vm.setBlocks(response))
  },

  async beforeRouteUpdate (to, from, next) {
    this.blocks = null

    const response = await BlockService.paginate(to.params.page)
    this.setBlocks(response)
    next()
  },

  methods: {
    setBlocks (blocks) {
      if (!blocks) return

      this.blocks = blocks
    },

    changePage(page) {
      this.$router.push({ name: 'blocks', params: { page } })
    }
  }
}
</script>
