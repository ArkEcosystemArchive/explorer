<template>
  <div class="max-w-2xl mx-auto md:pt-5">
    <ContentHeader>{{ $t('WALLET.SUMMARY') }}</ContentHeader>

    <WalletDetails :wallet="wallet" />

    <section
      v-show="isDelegate"
      :class="{ 'py-5 md:py-10': isDelegate }"
      class="page-section mb-5"
    >
      <div
        v-show="isDelegate"
        class="px-5 sm:px-10"
      >
        <WalletDelegate :wallet="wallet" />
      </div>
    </section>

    <WalletTransactions
      v-if="wallet"
      :wallet="wallet"
    />
  </div>
</template>

<script type="text/ecmascript-6">
import {
  WalletDelegate,
  WalletDetails,
  WalletTransactions
} from '@/components/wallet'
import WalletService from '@/services/wallet'

export default {
  components: {
    WalletDelegate,
    WalletDetails,
    WalletTransactions
  },

  data: () => ({
    wallet: {},
    activeTab: 'all'
  }),

  computed: {
    isDelegate () {
      return this.wallet.isDelegate
    }
  },

  async beforeRouteEnter (to, from, next) {
    try {
      const response = await WalletService.find(to.params.address)
      next(vm => vm.setWallet(response))
    } catch (e) { next({ name: '404' }) }
  },

  async beforeRouteUpdate (to, from, next) {
    this.wallet = {}

    try {
      const response = await WalletService.find(to.params.address)
      this.setWallet(response)
      next()
    } catch (e) { next({ name: '404' }) }
  },

  methods: {
    setWallet (wallet) {
      this.wallet = wallet
    }
  }
}
</script>
