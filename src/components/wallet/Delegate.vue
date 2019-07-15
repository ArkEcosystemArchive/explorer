<template>
  <div v-if="delegate">
    <div class="list-row-border-b">
      <div>{{ $t("Delegate") }}</div>
      <div>{{ delegate.username }}</div>
    </div>

    <div class="list-row-border-b">
      <div>{{ $t("Rank/Status") }}</div>
      <div>
        <span v-if="delegate.rank === undefined">
          {{ $t('Not yet available') }}
        </span>
        <span v-else>
          {{ delegate.rank }}
        </span>
      </div>
    </div>

    <div class="list-row-border-b">
      <div>{{ $t("Votes") }}</div>
      <div
        v-if="delegate.production"
      >
        <span
          v-tooltip="delegate.votes ? {
            trigger: 'hover click',
            content: $t('Percentage of the total supply'),
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
      <div>{{ $t("Forged") }}</div>
      <div v-if="delegate.forged">
        {{ readableCrypto(delegate.forged.total) }}
      </div>
    </div>

    <div class="list-row">
      <div>{{ $t("Blocks") }}</div>
      <div v-if="delegate.blocks">
        <span>
          {{ readableNumber(delegate.blocks.produced, 0) }}
        </span>
        <RouterLink
          v-if="delegate.blocks.produced"
          :to="{ name: 'wallet-blocks', params: { address: delegate.address, username: delegate.username, page: 1 } }"
          class="ml-2"
        >
          {{ $t("See all") }}
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'WalletDelegate',

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
