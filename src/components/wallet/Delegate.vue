<template>
  <div v-if="delegate">
    <div class="list-row-border-b">
      <div>{{ $t("Delegate") }}</div>
      <div>{{ delegate.username }}</div>
    </div>

    <div class="list-row-border-b">
      <div>{{ $t("Rank/Status") }}</div>
      <div>{{ delegate.rank }}</div>
    </div>

    <div class="list-row-border-b">
      <div>{{ $t("Vote %") }}</div>
      <div
        v-if="delegate.production"
        v-tooltip="delegate.votes ? { trigger: 'hover click', content: readableCrypto(delegate.votes, true, 2), placement: 'left' } : {}"
      >
        {{ percentageString(delegate.production.approval) }}
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
        <span :class="{ 'mr-2': delegate.blocks.produced }">
          {{ delegate.blocks.produced }}
        </span>
        <router-link
          v-if="delegate.blocks.produced"
          :to="{ name: 'wallet-blocks', params: { address: delegate.address, username: delegate.username, page: 1 } }"
        >
          {{ $t("See all") }}
        </router-link>
      </div>
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

  computed: {
    delegate() {
      return this.$store.getters['delegates/byPublicKey'](this.wallet.publicKey)
    }
  }
}
</script>
