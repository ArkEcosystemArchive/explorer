<template>
  <div class="ForgingStats">
    <div class="w-1/2 lg:w-1/4 flex items-center px-6 my-6 border-r border-theme-border-secondary flex-col sm:flex-row text-center sm:text-left">
      <div class="Meter mb-4 sm:mb-0 text-status-forging">
        <ArkMeter :percentage="percentage(totals.forging)" />
        <img
          class="MeterIcon"
          src="@/assets/images/icons/forging.svg"
        >
      </div>
      <div class="p-0 sm:pl-4">
        <div class="text-3xl semibold">
          {{ totals.forging }}
        </div>
        <div class="text-grey">
          {{ $t('PAGES.DELEGATE_MONITOR.STATS.FORGED') }}
        </div>
      </div>
    </div>

    <div class="w-1/2 lg:w-1/4 flex items-center px-6 my-6 lg:border-r border-theme-border-secondary flex-col sm:flex-row text-center sm:text-left">
      <div class="Meter mb-4 sm:mb-0 text-status-missed-block">
        <ArkMeter :percentage="percentage(totals.missedBlock)" />
        <img
          class="MeterIcon"
          src="@/assets/images/icons/missed-block.svg"
        >
      </div>
      <div class="p-0 sm:pl-4">
        <div class="text-3xl semibold">
          {{ totals.missedBlock }}
        </div>
        <div class="text-grey">
          {{ $t('PAGES.DELEGATE_MONITOR.STATS.MISSED') }}
        </div>
      </div>
    </div>

    <hr class="block lg:hidden">

    <div class="w-1/2 lg:w-1/4 flex items-center px-6 my-6 border-r border-theme-border-secondary flex-col sm:flex-row text-center sm:text-left">
      <div class="Meter mb-4 sm:mb-0 text-status-not-forging">
        <ArkMeter :percentage="percentage(totals.notForging + totals.neverForged)" />
        <img
          class="MeterIcon"
          src="@/assets/images/icons/not-forging.svg"
        >
      </div>
      <div class="p-0 sm:pl-4">
        <div class="text-3xl semibold">
          {{ totals.notForging + totals.neverForged }}
        </div>
        <div class="text-grey">
          {{ $t('PAGES.DELEGATE_MONITOR.STATS.NOT_FORGING') }}
        </div>
      </div>
    </div>

    <div class="w-1/2 lg:w-1/4 flex items-center px-6 my-6 flex-col sm:flex-row text-center sm:text-left">
      <div class="Meter mb-4 sm:mb-0 text-blue">
        <ArkMeter :percentage="percentage(totals.remainingBlocks)" />
      </div>
      <div class="p-0 sm:pl-4">
        <div class="text-3xl semibold">
          {{ totals.remainingBlocks }}
        </div>
        <div class="text-grey">
          {{ $t('PAGES.DELEGATE_MONITOR.STATS.IN_QUEUE') }}
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

<style>
.ForgingStats {
  @apply .flex .flex-wrap .p-5;
}

.Meter {
  height: 50px;
  width: 50px;
  @apply .relative .flex-none;
}

.MeterIcon {
  @apply .absolute .inset-0 .m-auto;
  width: 16px;
}
</style>
