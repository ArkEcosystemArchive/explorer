<template>
  <div class="hidden xl:block border-l border-r border-grey-dark px-10 ml-10">
    <div class="text-grey mb-2 min-w-0">{{ $t("Total Forged (token)", {token: networkToken()}) }}</div>
    <div class="text-lg text-white truncate">{{ readableCrypto(forged, false) }}</div>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'

export default {
  data: () => ({ forged: 0 }),

  computed: {
    ...mapGetters('network', ['height', 'rewardOffset']),
  },

  mounted() {
    this.prepareComponent()
  },

  methods: {
    prepareComponent() {
      this.getTotal()

      this.$store.watch(state => state.network.height, value => this.getTotal())
    },

    getTotal() {
      if(this.height < this.rewardOffset) {
        this.forged = 0
      } else {
        this.forged = (this.height - this.rewardOffset) * 2 * Math.pow(10, 8)
      }
    },
  },
}
</script>
