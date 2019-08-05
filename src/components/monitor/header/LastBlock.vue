<template>
  <div class="flex-auto flex justify-between lg:ml-10">
    <div>
      <div class="text-grey mb-2 min-w-0">
        {{ $t('PAGES.DELEGATE_MONITOR.HEADER.LAST_BLOCK') }}
      </div>
      <div
        v-if="block.id"
        class="text-lg truncate"
      >
        <LinkBlock
          :id="block.id"
          :length="20"
        />
      </div>
    </div>

    <div class="hidden md:block">
      <div class="text-grey mb-2 min-w-0">
        {{ $t('PAGES.DELEGATE_MONITOR.HEADER.FORGED') }}
      </div>
      <div class="text-lg text-white truncate">
        <span v-if="block.forged">
          {{ readableCrypto(block.forged.total) }} {{ $tc('PAGES.DELEGATE_MONITOR.HEADER.TX_COUNT', block.transactions, { count: block.transactions }) }}
        </span>
      </div>
    </div>

    <div class="w-32">
      <div class="text-grey mb-2 min-w-0">
        {{ $t('COMMON.DELEGATE') }}
      </div>
      <div class="text-lg text-white truncate semibold">
        <LinkWallet
          v-if="block.generator"
          :address="block.generator.address"
        >
          {{ block.generator.username }}
        </LinkWallet>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import BlockService from '@/services/block'

export default {
  name: 'LastBlock',

  data: () => ({
    block: {}
  }),

  async mounted () {
    await this.prepareComponent()
  },

  methods: {
    async prepareComponent () {
      await this.getBlock()

      this.$store.watch(state => state.network.height, value => this.getBlock())
    },

    async getBlock () {
      const response = await BlockService.last()
      this.block = response
    }
  }
}
</script>
