<template>
  <div class="max-w-2xl mx-auto md:pt-5">
    <ContentHeader>{{ $t("Wallet summary") }}</ContentHeader>

    <WalletDetails :wallet="wallet" />

    <section
      v-show="isDelegate"
      :class="{ 'py-5 md:py-10': isDelegate }"
      class="page-section mb-5"
    >
      <div class="px-5 sm:px-10">
        <WalletDelegate
          v-show="isDelegate"
          :wallet="wallet"
          @username="username = $event"
        />
        <WalletVoters
          v-show="isDelegate"
          :wallet="wallet"
          :username="username"
        />
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
  WalletTransactions,
  WalletVoters
} from '@/components/wallet'
import WalletService from '@/services/wallet'

export default {
  components: {
    WalletDelegate,
    WalletDetails,
    WalletTransactions,
    WalletVoters
  },

  data: () => ({
    wallet: {},
    activeTab: 'all',
    username: ''
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
    async setWallet (wallet) {
      this.wallet = wallet
    }
  }
}
</script>
