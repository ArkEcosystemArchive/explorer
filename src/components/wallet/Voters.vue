<template>
  <div class="border-t py-4 flex justify-between flex-wrap" v-show="Object.keys(voters).length">
    <div>Voters</div>
    <div>
      <span class="mr-2">{{ voters.length }}</span>
      <router-link :to="{ name: 'wallet-voters', params: { address: wallet.address, page: 1 } }">See all</router-link>
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
    }
  },

  data: () => ({ voters: {} }),

  watch: {
    wallet(wallet) {
      if (wallet.publicKey) this.getVoters()
    }
  },

  methods: {
    getVoters() {
      DelegateService
        .voters(this.wallet.publicKey)
        .then(response => this.voters = response)
    }
  }
}
</script>
