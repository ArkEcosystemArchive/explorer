<template>
  <div class="max-w-2xl mx-auto md:pt-5" v-if="block">
    <content-header>{{ $t("Block") }}</content-header>

    <identity :block="block" :prev-handler="prevBlock" :next-handler="nextBlock"></identity>

    <block-details :block="block"></block-details>

    <transactions :block="block"></transactions>
  </div>
</template>

<script type="text/ecmascript-6">
import Identity from '@/components/block/Identity'
import BlockDetails from '@/components/block/Details'
import Transactions from '@/components/block/Transactions'
import BlockService from '@/services/block'

export default {
  components: {Identity, BlockDetails, Transactions},

  data: () => ({
    block: {},
    timer: null
  }),

  async beforeRouteEnter (to, from, next) {
    try {
      const response = await BlockService.find(to.params.id)
      next(vm => vm.setBlock(response))
    } catch (error) {
      next({ name: '404' })
    }
  },

  async beforeRouteUpdate (to, from, next) {
    this.block = {}

    try {
      const response = await BlockService.find(to.params.id)
      this.setBlock(response)
      next()
    } catch (error) {
      next({ name: '404' })
    }
  },

  mounted() {
    this.initialiseTimer()
  },

  methods: {
    initialiseTimer() {
      this.timer = setInterval(this.updateBlock, 8 * 1000)
    },

    async updateBlock() {
      const response = await BlockService.find(this.block.id)
      this.setBlock(response)
    },

    setBlock (block) {
      this.block = block
    },

    async prevBlock() {
      try {
        const response = await BlockService.findPrevious(this.block.height)
        this.$router.push({ name: 'block', params: { id: response.id } })
      } catch (error) {
        console.log(error.message || error.data.error)
      }
    },

    async nextBlock() {
      try {
        const response = await BlockService.findNext(this.block.height)
        this.$router.push({ name: 'block', params: { id: response.id } })
      } catch (error) {
        console.log(error.message || error.data.error)
      }
    }
  }
}
</script>
