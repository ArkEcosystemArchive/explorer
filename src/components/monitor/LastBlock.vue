<template>
  <div class="flex-auto flex justify-between sm:ml-10">
    <div>
      <div class="text-grey mb-2 min-w-0">Last block</div>
      <div class="text-lg truncate" v-if="block.id">
        <block-link :id="block.id">{{ block.id }}</block-link>
      </div>
    </div>

    <div class="hidden md:block">
      <div class="text-grey mb-2 min-w-0">Forged</div>
      <div class="text-lg text-white truncate">
        {{ readableCrypto(block.totalForged) }} from {{ block.numberOfTransactions }} transactions
      </div>
    </div>

    <div class="w-32">
      <div class="text-grey mb-2 min-w-0">Delegate</div>
      <div class="text-lg text-white truncate semibold">
        <wallet-link :public-key="block.generatorPublicKey"></wallet-link>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import WalletLink from '@/components/links/Wallet'
import BlockLink from '@/components/links/Block'
import Currency from '@/components/utils/Currency'

import BlockService from '@/services/block'
import { mapGetters } from 'vuex'

export default {
  components: { WalletLink, BlockLink, Currency },

  data: () => ({
    block: {},
    timer: null,
  }),

  mounted() {
    this.getBlock().then(() => this.initialiseTimer())
  },

  methods: {
    getBlock() {
      return BlockService.last().then(response => (this.block = response))
    },

    initialiseTimer() {
      this.timer = setInterval(this.getBlock, 8 * 1000)
    },
  },

  beforeDestroy() {
    clearInterval(this.timer)
  },
}
</script>
