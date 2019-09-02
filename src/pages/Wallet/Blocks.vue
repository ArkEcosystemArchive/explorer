<template>
  <div class="max-w-2xl mx-auto md:pt-5">
    <ContentHeader>{{ $t('COMMON.BLOCKS') }}</ContentHeader>

    <section class="mb-5">
      <div class="px-5 sm:px-10 py-8 bg-theme-feature-background flex xl:rounded-lg items-center justify-between">
        <div class="mr-6 flex-none">
          <img
            class="block"
            src="@/assets/images/icons/block.svg"
          >
        </div>
        <div class="flex-auto min-w-0">
          <div class="text-grey mb-2">
            {{ $t('BLOCK.GENERATED_BY') }}
          </div>
          <div class="flex">
            <div class="text-lg text-white semibold truncate">
              <span class="mr-2">{{ username }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="page-section py-5 md:py-10">
      <div class="hidden sm:block">
        <TableBlocksDesktop
          :blocks="blocks"
          :sort-query="sortParams"
          @on-sort-change="onSortChange"
        />
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
import { BlockService, WalletService } from '@/services'

export default {
  data: () => ({
    username: null,
    blocks: null,
    meta: null,
    currentPage: 0
  }),

  computed: {
    showPagination () {
      return this.meta && this.meta.pageCount > 1
    },

    address () {
      return this.$route.params.address
    },

    sortParams: {
      get () {
        return this.$store.getters['ui/blockSortParams']
      },

      set (params) {
        this.$store.dispatch('ui/setBlockSortParams', {
          field: params.field,
          type: params.type
        })
      }
    }
  },

  watch: {
    currentPage () {
      this.changePage()
    }
  },

  async beforeRouteEnter (to, from, next) {
    try {
      const { meta, data } = await BlockService.byAddress(to.params.address, to.params.page)

      next(vm => {
        vm.currentPage = Number(to.params.page)
        vm.setBlocks(data)
        vm.setMeta(meta)
      })
    } catch (e) { next({ name: '404' }) }
  },

  async beforeRouteUpdate (to, from, next) {
    this.blocks = null
    this.meta = null

    try {
      const { meta, data } = await BlockService.byAddress(to.params.address, to.params.page)

      this.currentPage = Number(to.params.page)
      this.setBlocks(data)
      this.setMeta(meta)
      next()
    } catch (e) { next({ name: '404' }) }
  },

  mounted () {
    this.getUsername()
  },

  methods: {
    setBlocks (blocks) {
      if (!blocks) {
        return
      }

      this.blocks = blocks.map(block => ({ ...block, price: null }))
    },

    setMeta (meta) {
      this.meta = meta
    },

    async getUsername () {
      if (this.$route.params.username === undefined) {
        const wallet = await WalletService.find(this.address)
        this.username = wallet.username
      } else {
        this.username = this.$route.params.username
      }
    },

    onPageChange (page) {
      this.currentPage = page
    },

    changePage (page) {
      this.$router.push({
        name: 'wallet-blocks',
        params: {
          address: this.address,
          username: this.username,
          page: this.currentPage
        }
      })
    },

    onSortChange (params) {
      this.sortParams = params
    }
  }
}
</script>
