<template>
  <div v-if="delegate">
    <div class="list-row-border-b">
      <div>{{ $t("Delegate") }}</div>
      <div>{{ delegate.username }}</div>
    </div>

    <div class="list-row-border-b">
      <div>{{ $t("Uptime") }}</div>
      <div v-if="delegate.production">
        {{ percentageString(delegate.production.productivity) }}
      </div>
    </div>

    <div class="list-row-border-b">
      <div>{{ $t("Rank/Status") }}</div>
      <div>{{ delegate.rank }}</div>
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
        <span :class="{ 'mr-2': !delegate.blocks.missed && delegate.blocks.produced }">{{ delegate.blocks.produced }}</span>
        <span
          v-if="delegate.blocks.missed"
          class="text-grey"
          :class="{ 'mr-2': delegate.blocks.produced }"
        >({{ delegate.blocks.missed }} {{ $t("missed") }})</span>
        <RouterLink
          v-if="delegate.blocks.produced"
          :to="{ name: 'wallet-blocks', params: { address: delegate.address, username: delegate.username, page: 1 } }"
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
