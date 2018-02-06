<template>
  <div v-show="Object.keys(delegate).length">
    <div class="border-b py-4 flex justify-between flex-wrap">
      <div>Delegate</div>
      <div>{{ delegate.username }}</div>
    </div>

    <div class="border-b py-4 flex justify-between flex-wrap">
      <div>Uptime</div>
      <div>{{ delegate.productivity }}%</div>
    </div>

    <div class="border-b py-4 flex justify-between flex-wrap">
      <div>Rank/Status</div>
      <div>{{ delegate.rate }}</div>
    </div>

    <div class="border-b py-4 flex justify-between flex-wrap">
      <div>Approval</div>
      <div>{{ delegate.approval }}%</div>
    </div>

    <div class="border-b py-4 flex justify-between flex-wrap">
      <div>Forged</div>
      <div>{{ readableCrypto(delegate.forged) }}</div>
    </div>

    <div class="border-b py-4 flex justify-between flex-wrap">
      <div>Blocks</div>
      <div>
        <span>{{ delegate.producedblocks }}</span>
        <span class="text-grey">({{ delegate.missedblocks }} missed)</span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import DelegateService from '@/services/delegate'
import Currency from '@/components/utils/Currency'

export default {
  components: {Currency},

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
