<template>
  <div v-show="Object.keys(delegate).length">
    <div class="list-row-border-b">
      <div>{{ $t("Delegate") }}</div>
      <div>{{ delegate.username }}</div>
    </div>

    <div class="list-row-border-b">
      <div>{{ $t("Uptime") }}</div>
      <div v-if="delegate.production">{{ percentageString(delegate.production.productivity) }}</div>
    </div>

    <div class="list-row-border-b">
      <div>{{ $t("Rank/Status") }}</div>
      <div>{{ delegate.rank }}</div>
    </div>

    <div class="list-row-border-b">
      <div>{{ $t("Approval") }}</div>
      <div v-if="delegate.production" v-tooltip="delegate.votes ? { trigger: 'hover click', content: readableCrypto(delegate.votes, true, 2), placement: 'left' } : {}">
        {{ percentageString(delegate.production.approval) }}
      </div>
    </div>

    <div class="list-row-border-b">
      <div>{{ $t("Forged") }}</div>
      <div v-if="delegate.forged">{{ readableCrypto(delegate.forged.total) }}</div>
    </div>

    <div class="list-row">
      <div>{{ $t("Blocks") }}</div>
      <div v-if="delegate.blocks">
        <span :class="{ 'mr-2': !delegate.blocks.missed && delegate.blocks.produced }">{{ delegate.blocks.produced }}</span>
        <span v-if="delegate.blocks.missed" class="text-grey" :class="{ 'mr-2': delegate.blocks.produced }">({{ delegate.blocks.missed }} {{ $t("missed") }})</span>
        <router-link v-if="delegate.blocks.produced" :to="{ name: 'wallet-blocks', params: { address: delegate.address, username: delegate.username, page: 1 } }">{{ $t("See all") }}</router-link>
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
      if (wallet.username) await this.getDelegate(wallet.username)
    }
  },

  methods: {
    async getDelegate(username) {
      try {
        const response = await DelegateService.find(username)
        this.delegate = response

        this.$emit('username', response.username)
      } catch(e) { console.log(e.message || e.data.error) }
    }
  }
}
</script>
