<template>
  <div class="flex-auto flex justify-between lg:ml-10">
    <div>
      <div class="text-grey mb-2 min-w-0">{{ $t("Last block") }}</div>
      <div class="text-lg truncate" v-if="block.id">
        <link-block :id="block.id" :length="20" />
      </div>
    </div>

    <div class="hidden md:block">
      <div class="text-grey mb-2 min-w-0">{{ $t("Forged") }}</div>
      <div class="text-lg text-white truncate">
        <span v-if="block.forged">
          {{ readableCrypto(block.forged.total) }} {{ $tc("from transactions", block.transactions, { count: block.transactions }) }}
        </span>
      </div>
    </div>

    <div class="w-32">
      <div class="text-grey mb-2 min-w-0">{{ $t("Delegate") }}</div>
      <div class="text-lg text-white truncate semibold">
        <link-wallet v-if="block.generator" :address="block.generator.address">
          {{ block.generator.username }}
        </link-wallet>
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
