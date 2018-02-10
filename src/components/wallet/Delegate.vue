<template>
  <div v-show="Object.keys(delegate).length">
    <div class="list-row-border-b">
      <div>Delegate</div>
      <div>{{ delegate.username }}</div>
    </div>

    <div class="list-row-border-b">
      <div>Uptime</div>
      <div>{{ delegate.productivity }}%</div>
    </div>

    <div class="list-row-border-b">
      <div>Rank/Status</div>
      <div>{{ delegate.rate }}</div>
    </div>

    <div class="list-row-border-b">
      <div>Approval</div>
      <div>{{ delegate.approval }}%</div>
    </div>

    <div class="list-row-border-b">
      <div>Forged</div>
      <div>{{ readableCrypto(delegate.forged) }}</div>
    </div>

    <div class="list-row-border-b">
      <div>Blocks</div>
      <div>
        <span>{{ delegate.producedblocks }}</span>
        <span class="text-grey">({{ delegate.missedblocks }} missed)</span>
        <router-link v-if="delegate.producedblocks > 0" :to="{ name: 'wallet-blocks', params: { address: delegate.address, page: 1 } }">See all</router-link>
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
    wallet(wallet) {
      if (wallet.publicKey) this.getDelegate(wallet)
    }
  },

  methods: {
    getDelegate(wallet) {
      DelegateService
        .find(wallet.publicKey)
        .then(response => this.delegate = response)
        .catch(e => console.log(e.message || e.data.error))
    }
  }
}
</script>
