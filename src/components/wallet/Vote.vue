<template>
  <div class="list-row" v-show="Object.keys(delegate).length">
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

  watch: {
    wallet(wallet) {
      if (wallet.address) this.getVotes()
    }
  },

  methods: {
    getVotes() {
      WalletService
        .vote(this.wallet.address)
        .then(response => this.delegate = response)
    }
  }
}
</script>
