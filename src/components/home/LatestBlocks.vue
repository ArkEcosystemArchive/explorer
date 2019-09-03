<template>
  <div>
    <Loader :data="blocks">
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
      <div class="mx-5 sm:mx-10 mt-5 md:mt-10 flex flex-wrap">
        <RouterLink
          :to="{ name: 'blocks', params: { page: 2 } }"
          tag="button"
          class="button-lg"
        >
          {{ $t('PAGINATION.SHOW_MORE') }}
        </RouterLink>
      </div>
    </Loader>
  </div>
</template>

<script type="text/ecmascript-6">
import BlockService from '@/services/block'

export default {
  name: 'LatestBlocks',

  data: () => ({
    blocks: null
  }),

  computed: {
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

  async mounted () {
    await this.prepareComponent()
  },

  methods: {
    async prepareComponent () {
      await this.getBlocks()

      this.$store.watch(state => state.network.height, value => this.getBlocks())
    },

    async getBlocks () {
      const data = await BlockService.latest()
      this.blocks = data.map(block => ({ ...block, price: null }))
    },

    onSortChange (params) {
      this.sortParams = params
    }
  }
}
</script>
