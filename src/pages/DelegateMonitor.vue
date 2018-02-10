<template>
  <div class="max-w-2xl mx-auto md:pt-5">
    <content-header>Delegate Monitor</content-header>

    <delegate-detail></delegate-detail>

    <section class="page-section py-8">
      <nav class="mx-5 sm:mx-10 mb-4 border-b flex items-end">
        <div
          @click="activeTab = 'active'"
          :class="[
            activeTab === 'active' ? 'text-lg sm:text-2xl border-blue text-theme-text-primary' : 'sm:text-lg text-theme-text-secondary border-transparent',
            'mr-4 py-4 px-2 cursor-pointer border-b-3 hover:text-theme-primary hover:border-blue'
          ]">
          Active
        </div>
        <div
          @click="activeTab = 'standby'"
          :class="[
            activeTab === 'standby' ? 'text-lg sm:text-2xl border-blue text-theme-text-primary' : 'sm:text-lg text-theme-text-secondary border-transparent',
            'mr-4 py-4 px-2 cursor-pointer border-b-3 hover:text-theme-text-primary hover:border-blue'
          ]">
          Standby
        </div>
      </nav>

      <forging :delegates="delegates" v-show="activeTab === 'active'"></forging>

      <active-delegates v-if="activeTab === 'active'" :delegates="delegates"></active-delegates>

      <standby-delegates v-if="activeTab === 'standby'"></standby-delegates>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
import DelegateDetail from '@/components/monitor/Details'
import ActiveDelegates from '@/components/monitor/ActiveDelegates'
import StandbyDelegates from '@/components/monitor/StandbyDelegates'
import Forging from '@/components/monitor/Forging'
import DelegateService from '@/services/delegate'

export default {
  components: {
    DelegateDetail,
    Forging,
    ActiveDelegates,
    StandbyDelegates,
  },

  data: () => ({
    delegates: [],
    activeTab: 'active',
    timer: null,
  }),

  mounted() {
    this.getDelegates().then(() => this.initialiseTimer())
  },

  methods: {
    getDelegates() {
      return DelegateService.activeDelegates().then(
        response => (this.delegates = response)
      )
    },

    initialiseTimer() {
      this.timer = setInterval(this.getDelegates, 8 * 1000)
    },
  },

  beforeDestroy() {
    clearInterval(this.timer)
  },
}
</script>

<style>
.meter {
  width: 50px;
  height: 50px;
}
</style>
