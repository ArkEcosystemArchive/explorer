<template>
  <div class="max-w-2xl mx-auto md:pt-5">
    <ContentHeader>{{ $t('PAGES.DELEGATE_MONITOR.TITLE') }}</ContentHeader>

    <MonitorHeader />

    <section class="page-section py-5 md:py-10">
      <nav class="mx-5 sm:mx-10 mb-4 border-b flex items-end">
        <div
          :class="activeTab === 'active' ? 'active-tab' : 'inactive-tab'"
          @click="activeTab = 'active'"
        >
          {{ $t('PAGES.DELEGATE_MONITOR.ACTIVE') }}
        </div>
        <div
          :class="activeTab === 'standby' ? 'active-tab' : 'inactive-tab'"
          @click="activeTab = 'standby'"
        >
          {{ $t('PAGES.DELEGATE_MONITOR.STANDBY') }}
        </div>
      </nav>

      <ForgingStats
        v-show="activeTab === 'active'"
        :delegates="delegates || []"
      />

      <TableDelegates
        :delegates="delegates"
        :show-standby="activeTab === 'standby'"
        :sort-query="sortParams[activeTab]"
        @on-sort-change="onSortChange"
      />
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
import { MonitorHeader, ForgingStats } from '@/components/monitor'
import DelegateService from '@/services/delegate'
import { mapGetters } from 'vuex'

export default {
  components: {
    MonitorHeader,
    ForgingStats
  },

  data: () => ({
    delegates: null,
    activeTab: 'active'
  }),

  computed: {
    ...mapGetters('network', ['height']),

    sortParams: {
      get () {
        return this.$store.getters['ui/delegateSortParams']
      },

      set (params) {
        this.$store.dispatch('ui/setDelegateSortParams', {
          ...this.sortParams,
          [this.activeTab]: {
            field: params.field,
            type: params.type
          }
        })
      }
    }
  },

  watch: {
    async height () {
      await this.setDelegates()
    },

    async activeTab () {
      this.delegates = null
      await this.setDelegates()
    }
  },

  async created () {
    await this.setDelegates()
  },

  methods: {
    async setDelegates () {
      if (this.height) {
        this.delegates = await DelegateService[this.activeTab]()
      }
    },

    onSortChange (params) {
      this.sortParams = params
    }
  }
}
</script>
