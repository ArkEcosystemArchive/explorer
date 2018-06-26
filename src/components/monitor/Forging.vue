<template>
  <div class="flex flex-wrap p-5">
    <div class="w-1/2 lg:w-1/4 flex items-center px-6 my-6 border-r border-theme-border-secondary flex-col sm:flex-row text-center sm:text-left">
      <div class="meter flex-none text-green mb-4 sm:mb-0">
        <ark-meter :percentage="percentage(totals.forging)"></ark-meter>
      </div>
      <div class="p-0 sm:pl-4">
        <div class="text-3xl semibold">{{ totals.forging }}</div>
        <div class="text-grey">{{ $t("Forged block recently") }}</div>
      </div>
    </div>

    <div class="w-1/2 lg:w-1/4 flex items-center px-6 my-6 lg:border-r border-theme-border-secondary flex-col sm:flex-row text-center sm:text-left">
      <div class="meter flex-none text-yellow mb-4 sm:mb-0">
        <ark-meter :percentage="percentage(totals.missedBlock)"></ark-meter>
      </div>
      <div class="p-0 sm:pl-4">
        <div class="text-3xl semibold">{{ totals.missedBlock }}</div>
        <div class="text-grey">{{ $t("Missed block") }}</div>
      </div>
    </div>

    <hr class="block lg:hidden" />

    <div class="w-1/2 lg:w-1/4 flex items-center px-6 my-6 border-r border-theme-border-secondary flex-col sm:flex-row text-center sm:text-left">
      <div class="meter flex-none text-red mb-4 sm:mb-0">
        <ark-meter :percentage="percentage(totals.notForging)"></ark-meter>
      </div>
      <div class="p-0 sm:pl-4">
        <div class="text-3xl semibold">{{ totals.notForging }}</div>
        <div class="text-grey">{{ $t("Not forging") }}</div>
      </div>
    </div>

    <div class="w-1/2 lg:w-1/4 flex items-center px-6 my-6 flex-col sm:flex-row text-center sm:text-left">
      <div class="meter flex-none text-blue mb-4 sm:mb-0">
        <ark-meter :percentage="percentage(totals.awaitingSlot)"></ark-meter>
      </div>
      <div class="p-0 sm:pl-4">
        <div class="text-3xl semibold">{{ totals.awaitingSlot }}</div>
        <div class="text-grey">{{ $t("In queue for forging") }}</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import ForgingService from '@/services/forging'

export default {
  props: {
    delegates: {
      // type: Array or null
      required: true,
    },
  },

  data: () => ({ totals: {} }),

  watch: {
    delegates() {
      this.getTotals()
    },
  },

  methods: {
    getTotals() {
      this.totals = ForgingService.totals(this.delegates)
    },

    percentage(value) {
      const activeDelegates = this.$store.getters['network/activeDelegates']

      return value / activeDelegates * 100
    },
  },
}
</script>
