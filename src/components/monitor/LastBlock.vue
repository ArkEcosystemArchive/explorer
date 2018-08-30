<template>
  <div class="flex-auto flex justify-between lg:ml-10">
    <div>
      <div class="text-grey mb-2 min-w-0">{{ $t("Last block") }}</div>
      <div class="text-lg truncate" v-if="block.id">
        <link-block :id="block.id">{{ block.id }}</link-block>
      </div>
    </div>

    <div class="hidden md:block">
      <div class="text-grey mb-2 min-w-0">{{ $t("Forged") }}</div>
      <div class="text-lg text-white truncate">
        {{ readableCrypto(block.totalForged) }} {{ $tc("from transactions", block.numberOfTransactions, { count: block.numberOfTransactions }) }}
      </div>
    </div>

    <div class="w-32">
      <div class="text-grey mb-2 min-w-0">{{ $t("Delegate") }}</div>
      <div class="text-lg text-white truncate semibold">
        <link-wallet :public-key="block.generatorPublicKey"></link-wallet>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import BlockService from '@/services/block'
import { mapGetters } from 'vuex'

export default {
  data: () => ({
    block: {}
  }),

  async mounted() {
    await this.prepareComponent()
  },

  methods: {
    async prepareComponent() {
      await this.getBlock()

      this.$store.watch(state => state.network.height, value => this.getBlock())
    },

    async getBlock() {
      const response = await BlockService.last()
      this.block = response
    }
  }
}
</script>
