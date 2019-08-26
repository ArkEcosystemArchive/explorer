<template>
  <div class="max-w-2xl mx-auto md:pt-5">
    <ContentHeader>{{ $t('PAGES.HOME.HEADER') }}</ContentHeader>

    <section
      v-if="isChartEnabled"
      class="hidden md:block mb-5 bg-theme-feature-background xl:rounded-lg"
    >
      <ChartWrapper />
    </section>

    <section class="page-section py-5 md:py-10">
      <div class="flex flex-col sm:flex-row items-center mx-5 sm:mx-0 mb-4 sm:mb-8">
        <nav
          :class="dataView === 'transactions' ? 'mb-8 sm:mb-4' : 'mb-4'"
          class="flex items-end w-full border-b mx-5 sm:mx-10"
        >
          <div
            :class="dataView === 'transactions' ? 'active-tab' : 'inactive-tab'"
            @click="dataView = 'transactions'"
          >
            {{ $t('PAGES.HOME.LATEST_TRANSACTIONS') }}
          </div>
          <div
            :class="dataView === 'blocks' ? 'active-tab' : 'inactive-tab'"
            @click="dataView = 'blocks'"
          >
            {{ $t('PAGES.HOME.LATEST_BLOCKS') }}
          </div>
        </nav>

        <SelectionType
          v-if="dataView === 'transactions'"
          @change="onTypeChange"
        />
      </div>

      <LatestTransactions
        v-if="dataView === 'transactions'"
        :transaction-type="transactionType"
      />

      <LatestBlocks v-if="dataView === 'blocks'" />
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
import ChartWrapper from '@/components/ChartWrapper'
import { LatestBlocks, LatestTransactions } from '@/components/home'
import SelectionType from '@/components/SelectionType'

export default {
  components: {
    ChartWrapper,
    LatestBlocks,
    LatestTransactions,
    SelectionType
  },

  data: () => ({
    dataView: 'transactions',
    transactionType: -1
  }),

  computed: {
    isChartEnabled () {
      return this.$store.getters['ui/priceChartOptions'].enabled
    }
  },

  created () {
    this.transactionType = Number(localStorage.getItem('transactionType') || -1)
  },

  methods: {
    onTypeChange (type) {
      this.transactionType = type
    }
  }
}
</script>
