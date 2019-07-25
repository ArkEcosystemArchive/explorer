<template>
  <div
    v-show="voterCount"
    class="list-row-border-t"
  >
    <div>{{ $t("Voters") }}</div>
    <div class="whitespace-no-wrap">
      <span
        v-tooltip="{ content: $t('Only voters with more than 0.1 token', { token: networkToken() }), placement: 'left' }"
        :class="voterCount ? 'mr-2' : ''"
      >{{ readableNumber(voterCount, 0) }}</span>
      <RouterLink
        v-if="wallet.address && voterCount"
        :to="{ name: 'wallet-voters', params: { address: wallet.address, username: wallet.username, page: 1 } }"
      >
        {{ $t("See all") }}
      </RouterLink>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import DelegateService from '@/services/delegate'

export default {
  name: 'WalletVoters',

  props: {
    wallet: {
      type: Object,
      required: true
    }
  },

  data: () => ({
    voterCount: 0
  }),

  watch: {
    async wallet (wallet) {
      if (wallet.username) {
        await this.getVoterCount()
      }
    }
  },

  methods: {
    async getVoterCount () {
      const count = await DelegateService.voterCount(this.wallet.publicKey)
      this.voterCount = count
    }
  }
}
</script>
