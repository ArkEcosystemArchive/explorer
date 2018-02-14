<template>
  <div class="max-w-2xl mx-auto md:pt-5">
    <content-header>{{ $t("Latest transactions and blocks") }}</content-header>

    <section v-if="priceChart" class="hidden md:block mb-5 bg-theme-feature-background xl:rounded-lg">
      <chart-wrapper></chart-wrapper>
    </section>

    <section class="page-section py-5 md:py-10">
      <nav class="mx-5 sm:mx-10 mb-8 border-b flex items-end">
        <div @click="dataView = 'transactions'"
             :class="dataView === 'transactions' ? 'active-tab' : 'inactive-tab'">
          {{ $t("Latest Transactions") }}
        </div>
        <div @click="dataView = 'blocks'"
             :class="dataView === 'blocks' ? 'active-tab' : 'inactive-tab'">
          {{ $t("Latest Blocks") }}
        </div>
      </nav>

      <latest-transactions v-if="dataView === 'transactions'"></latest-transactions>

      <latest-blocks v-if="dataView === 'blocks'"></latest-blocks>
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
    dataView: 'transactions',
  }),

  computed: {
    ...mapGetters('ui', ['priceChart']),
  },
}
</script>
