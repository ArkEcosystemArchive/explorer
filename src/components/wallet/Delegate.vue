<template>
  <div
    v-if="delegate"
    class="WalletDelegate"
  >
    <div class="list-row-border-b">
      <div>{{ $t('WALLET.DELEGATE.USERNAME') }}</div>
      <div>{{ delegate.username }}</div>
    </div>

    <div class="list-row-border-b">
      <div>{{ $t('WALLET.DELEGATE.RANK') }}</div>
      <div>
        <span v-if="delegate.rank === undefined">
          {{ $t('WALLET.DELEGATE.RANK_NOT_AVAILABLE') }}
        </span>
        <span v-else>
          {{ delegate.rank }}
        </span>
      </div>
    </div>

    <div class="list-row-border-b">
      <div>{{ $t('WALLET.DELEGATE.VOTES') }}</div>
      <div
        v-if="delegate.production"
      >
        <span
          v-tooltip="delegate.votes ? {
            trigger: 'hover click',
            content: $t('COMMON.SUPPLY_PERCENTAGE'),
            placement: 'left'
          } : {}"
          class="text-grey text-2xs mr-1"
        >
          {{ percentageString(delegate.production.approval) }}
        </span>
        {{ readableCrypto(delegate.votes, true, 2) }}
      </div>
    </div>

    <div class="list-row-border-b">
      <div>{{ $t('WALLET.DELEGATE.TOTAL_FORGED') }}</div>
      <div v-if="delegate.forged">
        {{ readableCrypto(delegate.forged.total) }}
      </div>
    </div>

    <div class="list-row">
      <div>{{ $t('WALLET.DELEGATE.FORGED_BLOCKS') }}</div>
      <div v-if="delegate.blocks">
        <span>
          {{ readableNumber(delegate.blocks.produced, 0) }}
        </span>
        <RouterLink
          v-if="delegate.blocks.produced"
          :to="{ name: 'wallet-blocks', params: { address: delegate.address, username: delegate.username, page: 1 } }"
          class="ml-2"
        >
          {{ $t('COMMON.SEE_ALL') }}
        </RouterLink>
      </div>
    </div>

    <WalletVoters :wallet="wallet" />
  </div>
</template>

<script type="text/ecmascript-6">
import WalletVoters from '@/components/wallet/Voters'

export default {
  name: 'WalletDelegate',

  components: {
    WalletVoters
  },

  props: {
    wallet: {
      type: Object,
      required: true
    }
  },

  computed: {
    delegate () {
      return this.$store.getters['delegates/byPublicKey'](this.wallet.publicKey)
    }
  }
}
</script>
