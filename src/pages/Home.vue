<template>
  <div class="max-w-2xl mx-auto md:pt-5">
    <content-header>{{ $t("Latest transactions and blocks") }}</content-header>

    <section v-if="priceChart" class="hidden md:block mb-5 bg-theme-feature-background xl:rounded-lg">
      <chart-wrapper></chart-wrapper>
    </section>

    <section class="page-section py-5 md:py-10">
      <div class="flex flex-col sm:flex-row items-center mx-5 sm:mx-0 mb-4 sm:mb-8">
        <nav class="flex items-end w-full border-b mb-4 sm:mb-0 mx-5 sm:mx-10">
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
          class="flex flex-col w-full sm:w-auto mb-4 sm:mb-0 mr-auto sm:mr-10"
        >
          <span class="text-theme-text-secondary mb-2 text-theme-text-thead text-xs">{{ $t("Type") }}</span>
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
