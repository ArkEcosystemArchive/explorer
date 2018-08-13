<template>
  <div :class="[ isDelegate ? 'list-row-border-t' : 'list-row' ]" v-show="Object.keys(delegate).length">
    <div>{{ $t("Votes") }}</div>
    <div><link-wallet v-if="delegate.address" :address="delegate.address">{{ delegate.username }}</link-wallet></div>
  </div>
</template>

<script type="text/ecmascript-6">
import WalletService from '@/services/wallet'

export default {
  props: {
    wallet: {
      type: Object,
      required: true
    }
  },

  data: () => ({ delegate: {} }),

  computed: {
    isDelegate() {
      return this.isDelegateByAddress(this.wallet.address)
    }
  },

  watch: {
    wallet(wallet) {
      if (wallet.address) this.getVotes()
    }
  },

  methods: {
    async getVotes() {
      const response = await WalletService.vote(this.wallet.address)
      this.delegate = response
    }
  }
}
</script>
