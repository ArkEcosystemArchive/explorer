<template>
  <div class="max-w-2xl mx-auto md:pt-5" v-if="block">
    <content-header>{{ $t("Blocks") }}</content-header>

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

  data: () => ({ block: {} }),

  beforeRouteEnter (to, from, next) {
    BlockService
      .find(to.params.id)
      .then(response => next(vm => vm.setBlock(response)))
      .catch(() => next({ name: '404' }))
  },

  beforeRouteUpdate (to, from, next) {
    this.block = {}

    BlockService
      .find(to.params.id)
      .then(response => this.setBlock(response))
      .then(() => next())
      .catch(() => next({ name: '404' }))
  },

  methods: {
    setBlock (block) {
      this.block = block
    },

    prevBlock() {
      BlockService
        .findPrevious(this.block.height)
        .then(response => this.$router.push({ name: 'block', params: { id: response.id } }))
        .catch(e => console.log(e.message || e.data.error))
    },

    nextBlock() {
      BlockService
        .findNext(this.block.height)
        .then(response => this.$router.push({ name: 'block', params: { id: response.id } }))
        .catch(e => console.log(e.message || e.data.error))
    }
  }
}
</script>
