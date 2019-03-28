<template>
  <div class="max-w-2xl mx-auto md:pt-5">
    <ContentHeader>{{ $t("Delegate Monitor") }}</ContentHeader>

    <DelegateDetail />

    <section class="page-section py-5 md:py-10">
      <nav class="mx-5 sm:mx-10 mb-4 border-b flex items-end">
        <div
          :class="activeTab === 'active' ? 'active-tab' : 'inactive-tab'"
          @click="activeTab = 'active'"
        >
          {{ $t("Active") }}
        </div>
        <div
          :class="activeTab === 'standby' ? 'active-tab' : 'inactive-tab'"
          @click="activeTab = 'standby'"
        >
          {{ $t("Standby") }}
        </div>
      </nav>

      <Forging
        v-show="activeTab === 'active'"
        :delegates="delegates"
      />

      <ActiveDelegates
        v-if="activeTab === 'active'"
        :delegates="delegates"
      />

      <StandbyDelegates v-if="activeTab === 'standby'" />
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
import DelegateDetail from '@/components/monitor/Details'
import ActiveDelegates from '@/components/monitor/ActiveDelegates'
import StandbyDelegates from '@/components/monitor/StandbyDelegates'
import Forging from '@/components/monitor/Forging'
import DelegateService from '@/services/delegate'
import { mapGetters } from 'vuex'

export default {
  components: {
    DelegateDetail,
    Forging,
    ActiveDelegates,
    StandbyDelegates
  },

  data: () => ({
    delegates: null,
    activeTab: 'active'
  }),

  computed: {
    ...mapGetters('network', ['height'])
  },

  watch: {
    async height () {
      await this.setDelegates()
    }
  },

  async created () {
    await this.setDelegates()
  },

  methods: {
    async setDelegates () {
      if (this.height) {
        this.delegates = await DelegateService.active()
      }
    }
  }
}
</script>

<style>
.meter {
  width: 50px;
  height: 50px;
}
</style>
