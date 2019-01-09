<template>
  <div class="max-w-2xl mx-auto md:pt-5">
    <content-header>{{ $t("Latest transactions and blocks") }}</content-header>

    <section v-if="priceChart" class="hidden md:block mb-5 bg-theme-feature-background xl:rounded-lg">
      <chart-wrapper></chart-wrapper>
    </section>

    <section class="page-section py-5 md:py-10">
      <div class="border-b mb-8 mx-5 sm:mx-10 flex items-center justify-between">
        <nav class="flex items-end">
          <div
            :class="dataView === 'transactions' ? 'active-tab' : 'inactive-tab'"
            @click="dataView = 'transactions'"
          >
            {{ $t("Latest transactions") }}
          </div>
          <div
            :class="dataView === 'blocks' ? 'active-tab' : 'inactive-tab'"
            @click="dataView = 'blocks'"
          >
            {{ $t("Latest blocks") }}
          </div>
        </nav>

        <div
          v-if="dataView === 'transactions'"
          class="flex"
        >
          <span class="text-theme-text-secondary mr-2">{{ $t("Type") }}:</span>
          <selection-type @change="onTypeChange"></selection-type>
        </div>
      </div>

      <latest-transactions v-if="dataView === 'transactions'" :transaction-type="transactionType"></latest-transactions>

      <latest-blocks v-if="dataView === 'blocks'"></latest-blocks>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
import ChartWrapper from '@/components/ChartWrapper'
import LatestTransactions from '@/components/home/LatestTransactions'
import SelectionType from '@/components/SelectionType'
import LatestBlocks from '@/components/home/LatestBlocks'
import { mapGetters } from 'vuex'

export default {
  components: {
    ChartWrapper,
    LatestTransactions,
    LatestBlocks,
    SelectionType
  },

  data: () => ({
    dataView: 'transactions',
    transactionType: -1
  }),

  created () {
    this.transactionType = Number(localStorage.getItem('transactionType') || -1)
  },

  computed: {
    ...mapGetters('ui', ['priceChart']),
  },

  methods: {
    onTypeChange(type) {
      this.transactionType = type
    }
  }
}
</script>
