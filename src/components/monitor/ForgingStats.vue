<template>
  <div class="flex flex-wrap p-5">
    <div class="w-1/2 lg:w-1/4 flex items-center px-6 my-6 border-r border-theme-border-secondary flex-col sm:flex-row text-center sm:text-left">
      <div class="meter flex-none text-green mb-4 sm:mb-0">
        <ArkMeter :percentage="percentage(totals.forging)" />
      </div>
      <div class="p-0 sm:pl-4">
        <div class="text-3xl semibold">
          {{ totals.forging }}
        </div>
        <div class="text-grey">
          {{ $t("Forged block recently") }}
        </div>
      </div>
    </div>

    <div class="w-1/2 lg:w-1/4 flex items-center px-6 my-6 lg:border-r border-theme-border-secondary flex-col sm:flex-row text-center sm:text-left">
      <div class="meter flex-none text-yellow mb-4 sm:mb-0">
        <ArkMeter :percentage="percentage(totals.missedBlock)" />
      </div>
      <div class="p-0 sm:pl-4">
        <div class="text-3xl semibold">
          {{ totals.missedBlock }}
        </div>
        <div class="text-grey">
          {{ $t("Missed block") }}
        </div>
      </div>
    </div>

    <hr class="block lg:hidden">

    <div class="w-1/2 lg:w-1/4 flex items-center px-6 my-6 border-r border-theme-border-secondary flex-col sm:flex-row text-center sm:text-left">
      <div class="meter flex-none text-red mb-4 sm:mb-0">
        <ArkMeter :percentage="percentage(totals.notForging)" />
      </div>
      <div class="p-0 sm:pl-4">
        <div class="text-3xl semibold">
          {{ totals.notForging + totals.neverForged }}
        </div>
        <div class="text-grey">
          {{ $t("Not forging") }}
        </div>
      </div>
    </div>

    <div class="w-1/2 lg:w-1/4 flex items-center px-6 my-6 flex-col sm:flex-row text-center sm:text-left">
      <div class="meter flex-none text-blue mb-4 sm:mb-0">
        <ArkMeter :percentage="percentage(totals.remainingBlocks)" />
      </div>
      <div class="p-0 sm:pl-4">
        <div class="text-3xl semibold">
          {{ totals.remainingBlocks }}
        </div>
        <div class="text-grey">
          {{ $t("In queue for forging") }}
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import ForgingService from '@/services/forging'

export default {
  name: 'ForgingStats',

  props: {
    delegates: {
      type: Array,
      required: true
    }
  },

  data: () => ({
    totals: {}
  }),

  computed: {
    activeDelegates () {
      return this.$store.getters['network/activeDelegates']
    }
  },

  watch: {
    delegates () {
      this.getTotals()
    }
  },

  created () {
    this.getTotals()
  },

  methods: {
    getTotals () {
      if (!this.delegates) {
        return
      }

      this.totals = ForgingService.totals(this.delegates)
    },

    percentage (value) {
      return value / this.activeDelegates * 100
    }
  }
}
</script>
