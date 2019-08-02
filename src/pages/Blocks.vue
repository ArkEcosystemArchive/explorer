<template>
  <div class="max-w-2xl mx-auto md:pt-5">
    <ContentHeader>{{ $t('COMMON.BLOCKS') }}</ContentHeader>

    <section class="page-section py-5 md:py-10">
      <div class="hidden sm:block">
        <TableBlocksDesktop :blocks="blocks" />
      </div>
      <div class="sm:hidden">
        <TableBlocksMobile :blocks="blocks" />
      </div>
      <Pagination
        v-if="showPagination"
        :meta="meta"
        :current-page="currentPage"
        @page-change="onPageChange"
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
    showPagination () {
      return this.meta && this.meta.pageCount
    }
  },

  watch: {
    currentPage () {
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
    } catch (e) { next({ name: '404' }) }
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
    } catch (e) { next({ name: '404' }) }
  },

  methods: {
    setBlocks (blocks) {
      if (!blocks) {
        return
      }

      this.blocks = blocks
    },

    setMeta (meta) {
      this.meta = meta
    },

    onPageChange (page) {
      this.currentPage = page
    },

    changePage () {
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
