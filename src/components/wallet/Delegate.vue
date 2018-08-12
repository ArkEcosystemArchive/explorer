<template>
  <div v-show="Object.keys(delegate).length">
    <div class="list-row-border-b">
      <div>{{ $t("Delegate") }}</div>
      <div>{{ delegate.username }}</div>
    </div>

    <div class="list-row-border-b">
      <div>{{ $t("Uptime") }}</div>
      <div>{{ percentageString(delegate.productivity) }}</div>
    </div>

    <div class="list-row-border-b">
      <div>{{ $t("Rank/Status") }}</div>
      <div>{{ delegate.rate }}</div>
    </div>

    <div class="list-row-border-b">
      <div>{{ $t("Approval") }}</div>
      <div v-tooltip="{ content: readableCrypto(this.delegate.vote, true, 2), placement: 'left' }">
        {{ percentageString(delegate.approval) }}
      </div>
    </div>

    <div class="list-row-border-b">
      <div>{{ $t("Forged") }}</div>
      <div>{{ readableCrypto(delegate.forged) }}</div>
    </div>

    <div class="list-row">
      <div>{{ $t("Blocks") }}</div>
      <div>
        <span :class="[ !delegate.missedblocks && delegate.producedblocks ? 'mr-2' : '' ]">{{ delegate.producedblocks }}</span>
        <span v-if="!!delegate.missedblocks" class="text-grey mr-2">({{ delegate.missedblocks }} {{ $t("missed") }})</span>
        <router-link v-if="delegate.producedblocks > 0" :to="{ name: 'wallet-blocks', params: { address: delegate.address, username: delegate.username, page: 1 } }">{{ $t("See all") }}</router-link>
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

  data: () => ({ delegate: {} }),

  watch: {
    async wallet(wallet) {
      if (wallet.publicKey) await this.getDelegate(wallet)
    }
  },

  methods: {
    async getDelegate(wallet) {
      try {
        const response = await DelegateService.find(wallet.publicKey)
        this.delegate = response

        this.$emit('username', response.username)
      } catch(e) { console.log(e.message || e.data.error) }
    }
  }
}
</script>
