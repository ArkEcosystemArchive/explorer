<template>
  <div class="max-w-2xl mx-auto md:pt-5">
    <content-header>{{ $t("Blocks") }}</content-header>
    <section class="page-section py-5 md:py-10">
      <div class="hidden sm:block">
        <table-blocks :blocks="blocks" />
      </div>
      <div class="sm:hidden">
        <table-blocks-mobile :blocks="blocks" />
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
import BlockService from '@/services/block'

export default {
  data: () => ({
    blocks: null,
    meta: null,
    currentPage: 0
  }),

  computed: {
    showPaginator() {
      return this.meta && (this.meta.previous || this.meta.next)
    }
  },

  watch: {
    currentPage() {
      this.changePage()
    }
  },

  async beforeRouteEnter (to, from, next) {
    try {
      const { meta, data } = await BlockService.paginate(to.params.page)

      next(vm => {
        vm.currentPage = to.params.page
        vm.setBlocks(data)
        vm.setMeta(meta)
      })
    } catch(e) { next({ name: '404' }) }
  },

  async beforeRouteUpdate (to, from, next) {
    this.blocks = null
    this.meta = null

    try {
      const { meta, data } = await BlockService.paginate(to.params.page)

      this.currentPage = to.params.page
      this.setBlocks(data)
      this.setMeta(meta)
      next()
    } catch(e) { next({ name: '404' }) }
  },

  methods: {
    setBlocks (blocks) {
      if (!blocks) {
        return
      }

      this.blocks = blocks
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
        name: 'blocks',
        params: {
          page: this.currentPage
        }
      })
    }
  }
}
</script>
