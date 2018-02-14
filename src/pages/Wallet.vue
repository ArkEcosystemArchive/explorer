<template>
  <div class="max-w-2xl mx-auto md:pt-5">
    <content-header>{{ $t("Wallet Summary") }}</content-header>

    <wallet-details :wallet="wallet"></wallet-details>

    <section class="page-section mb-5" :class="{ 'py-8': isDelegate }" v-show="isDelegate || isVoting">
      <div class="px-5 sm:px-10" :class="{ 'py-4': !isDelegate }">
        <delegate :wallet="wallet" v-show="isDelegate"></delegate>
        <vote :wallet="wallet" v-show="isVoting"></vote>
        <voters :wallet="wallet" v-show="isDelegate"></voters>
      </div>
    </section>

    <transactions :wallet="wallet" v-if="wallet"></transactions>
  </div>
</template>

<script type="text/ecmascript-6">
import WalletDetails from '@/components/wallet/Details'
import Delegate from '@/components/wallet/Delegate'
import Vote from '@/components/wallet/Vote'
import Voters from '@/components/wallet/Voters'
import Transactions from '@/components/wallet/Transactions'
import WalletService from '@/services/wallet'

export default {
  components: {
    WalletDetails,
    Delegate,
    Vote,
    Voters,
    Transactions,
  },

  data: () => ({
    wallet: {},
    activeTab: 'all',
    isVoting: false,
  }),

  computed: {
    isDelegate() {
      return this.isDelegateByAddress(this.$route.params.address)
    },
  },

  beforeRouteEnter(to, from, next) {
    WalletService.find(to.params.address)
      .then(response => next(vm => vm.setWallet(response)))
      .catch(() => next({ name: '404' }))
  },

  beforeRouteUpdate(to, from, next) {
    this.wallet = {}

    WalletService.find(to.params.address)
      .then(response => this.setWallet(response))
      .then(() => next())
      .catch(() => next({ name: '404' }))
  },

  methods: {
    setWallet(wallet) {
      this.wallet = wallet

      WalletService.vote(wallet.address).then(
        vote => (this.isVoting = vote ? true : false)
      )
    },
  },
}
</script>
