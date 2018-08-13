<template>
  <div class="list-row-border-t" v-show="Object.keys(voters).length">
    <div>{{ $t("Voters") }}</div>
    <div>
      <span v-tooltip="{ content: $t('Only voters with more than 0.1 Ark'), placement: 'left' }" :class="voters.length ? 'mr-2' : ''">{{ voters.length }}</span>
      <router-link v-if="wallet.address && voters.length" :to="{ name: 'wallet-voters', params: { address: wallet.address, username: username, page: 1 } }">{{ $t("See all") }}</router-link>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import DelegateService from '@/services/delegate'

export default {
  props: {
    wallet: {
      type: Object,
      required: true
    },
    username: {}
  },

  data: () => ({ voters: {} }),

  watch: {
    wallet(wallet) {
      if (wallet.publicKey) this.getVoters()
    }
  },

  methods: {
    async getVoters() {
      const response = await DelegateService.voters(this.wallet.publicKey)
      this.voters = response
    }
  }
}
</script>
