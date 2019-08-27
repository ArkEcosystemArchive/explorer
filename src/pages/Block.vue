<template>
  <div
    v-if="block"
    class="max-w-2xl mx-auto md:pt-5"
  >
    <ContentHeader>{{ $t('COMMON.BLOCK') }}</ContentHeader>

    <template v-if="blockNotFound">
      <section class="page-section py-5 md:py-10 px-6">
        <div class="my-10 text-center">
          <NotFound
            :is-loading="isLoading"
            :data-id="block.id"
            data-type="block"
            @reload="onReload"
          />
        </div>
      </section>
    </template>

    <template v-else>
      <BlockIdentity
        :block="block"
        :prev-handler="prevBlock"
        :next-handler="nextBlock"
      />

      <BlockDetails :block="block" />

      <BlockTransactions :block="block" />
    </template>
  </div>
</template>

<script type="text/ecmascript-6">
import { BlockDetails, BlockIdentity, BlockTransactions } from '@/components/block'
import NotFound from '@/components/utils/NotFound'
import BlockService from '@/services/block'

export default {
  components: {
    BlockDetails,
    BlockIdentity,
    BlockTransactions,
    NotFound
  },

  data: () => ({
    block: {},
    blockNotFound: false,
    isLoading: false
  }),

  async beforeRouteEnter (to, from, next) {
    try {
      const response = await BlockService.find(to.params.id)
      next(vm => vm.setBlock(response))
    } catch (e) {
      next(vm => {
        console.log(e.message || e.data.error)

        vm.blockNotFound = true
        vm.block = { id: to.params.id }
      })
    }
  },

  async beforeRouteUpdate (to, from, next) {
    this.block = {}

    try {
      const response = await BlockService.find(to.params.id)
      this.setBlock(response)
      next()
    } catch (e) {
      console.log(e.message || e.data.error)

      this.blockNotFound = true
      this.block = { id: to.params.id }
    }
  },

  methods: {
    async prepareComponent () {
      this.$store.watch(state => state.network.height, value => this.updateBlock())
    },

    async updateBlock () {
      try {
        const response = await BlockService.find(this.block.id)
        this.setBlock(response)
      } catch (e) {
        console.log(e.message || e.data.error)
      }
    },

    async fetchBlock () {
      this.isLoading = true

      try {
        const block = await BlockService.find(this.block.id)
        this.setBlock(block)
        this.blockNotFound = false
      } catch (e) {
        console.log(e.message || e.data.error)
      } finally {
        setTimeout(() => (this.isLoading = false), 750)
      }
    },

    setBlock (block) {
      this.block = block
    },

    async prevBlock () {
      try {
        const response = await BlockService.findPrevious(this.block.height)
        this.$router.push({ name: 'block', params: { id: response.id } })
      } catch (e) { console.log(e.message || e.data.error) }
    },

    async nextBlock () {
      try {
        const response = await BlockService.findNext(this.block.height)
        this.$router.push({ name: 'block', params: { id: response.id } })
      } catch (e) { console.log(e.message || e.data.error) }
    },

    onReload () {
      this.fetchBlock()
    }
  }
}
</script>
