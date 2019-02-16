<template>
  <div class="max-w-2xl mx-auto md:pt-5" v-if="block">
    <content-header>{{ $t("Block") }}</content-header>

    <template v-if="blockNotFound">
      <section class="page-section py-5 md:py-10 px-6">
        <div class="my-10 text-center">
          <not-found data-type="block" :data-id="block.id" />

          <button @click="fetchBlock" :disabled="isFetching" class="mt-4 pager-button items-center">
            <span>{{ !isFetching ? $t('Reload this page') : $t('Loading...') }}</span>
          </button>
        </div>
      </section>
    </template>

    <template v-else>
      <identity :block="block" :prev-handler="prevBlock" :next-handler="nextBlock" />

      <block-details :block="block" />

      <transactions :block="block" />
    </template>
  </div>
</template>

<script type="text/ecmascript-6">
import Identity from '@/components/block/Identity'
import NotFound from '@/components/utils/NotFound'
import BlockDetails from '@/components/block/Details'
import Transactions from '@/components/block/Transactions'
import BlockService from '@/services/block'

export default {
  components: {NotFound, Identity, BlockDetails, Transactions},

  data: () => ({
    block: {},
    blockNotFound: false,
    isFetching: false
  }),

  async beforeRouteEnter (to, from, next) {
    try {
      const response = await BlockService.find(to.params.id)
      next(vm => vm.setBlock(response))
    } catch(e) {
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
    } catch(e) {
      console.log(e.message || e.data.error)

      this.blockNotFound = true
      this.block = { id: to.params.id }
    }
  },

  methods: {
    async prepareComponent() {
      this.$store.watch(state => state.network.height, value => this.updateBlock())
    },

    async updateBlock() {
      try {
        const response = await BlockService.find(this.block.id)
        this.setBlock(response)
      } catch(e) {
        console.log(e.message || e.data.error)
      }
    },

    async fetchBlock() {
      this.isFetching = true

      try {
        const block = await BlockService.find(this.block.id)
        this.setBlock(block)
        this.blockNotFound = false
      } catch(e) {
        console.log(e.message || e.data.error)
      } finally {
        this.isFetching = false
      }
    },

    setBlock(block) {
      this.block = block
    },

    async prevBlock() {
      try {
        const response = await BlockService.findPrevious(this.block.height)
        this.$router.push({ name: 'block', params: { id: response.id } })
      } catch(e) { console.log(e.message || e.data.error) }
    },

    async nextBlock() {
      try {
        const response = await BlockService.findNext(this.block.height)
        this.$router.push({ name: 'block', params: { id: response.id } })
      } catch(e) { console.log(e.message || e.data.error) }
    }
  }
}
</script>
