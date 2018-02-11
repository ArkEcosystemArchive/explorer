<template>
  <div class="max-w-2xl mx-auto md:pt-5">
    <content-header>Latest transactions and blocks</content-header>

    <section v-if="priceChart" class="hidden md:block mb-5 bg-theme-feature-background xl:rounded-lg">
      <chart-wrapper></chart-wrapper>
    </section>

    <section class="page-section py-5 md:py-10">
      <nav class="mx-5 sm:mx-10 mb-8 border-b flex items-end">
        <router-link :to="{ name: 'home-active-type', params: { activeType: 'txView', disableScroll: true } }"
          :class="dataView === 'txView' ? 'active-tab' : 'inactive-tab'">
          Latest Transactions
        </router-link>
        <router-link :to="{ name: 'home-active-type', params: { activeType: 'bkView', disableScroll: true } }"
          :class="dataView === 'bkView' ? 'active-tab' : 'inactive-tab'">
          Latest Blocks
        </router-link>
      </nav>

      <latest-transactions v-if="dataView === 'txView'"></latest-transactions>

      <latest-blocks v-if="dataView === 'bkView'"></latest-blocks>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
import ChartWrapper from '@/components/ChartWrapper'
import LatestTransactions from '@/components/home/LatestTransactions'
import LatestBlocks from '@/components/home/LatestBlocks'
import { mapGetters } from 'vuex'

export default {
  components: {
    ChartWrapper,
    LatestTransactions,
    LatestBlocks,
  },

  data: () => ({
    dataView: 'txView',
  }),

  beforeRouteEnter(to, from, next) {
    next(vm => vm.setDataView(to))
  },

  beforeRouteUpdate(to, from, next) {
    this.setDataView(to)
    next()
  },

  computed: {
    ...mapGetters('ui', ['priceChart']),
  },

  methods: {
    setDataView(to) {
      this.dataView = to.params.activeType === 'bkView' ? 'bkView' : 'txView'
    }
  }
}
</script>
