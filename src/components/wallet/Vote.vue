<template>
  <div class="py-4 flex justify-between flex-wrap" v-show="Object.keys(delegate).length">
    <div>Votes</div>
    <div><wallet-link :address="delegate.address">{{ delegate.username }}</wallet-link></div>
  </div>
</template>

<script type="text/ecmascript-6">
import WalletLink from '@/components/links/Wallet'
import WalletService from '@/services/wallet'

export default {
  components: {WalletLink},

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
