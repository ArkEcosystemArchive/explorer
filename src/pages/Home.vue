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
          class="flex ml-4 relative z-20 cursor-pointer"
          @click="selectOpen = !selectOpen"
          v-click-outside="closeDropdown"
        >
          <span class="text-theme-text-secondary mr-2">{{ $t("Type") }}:</span>
          <span class="flex items-center text-theme-text-primary">
            <span class="mr-1">{{ $t(types[transactionType + 1]) }}</span>
            <svg :class="{ 'rotate-180': selectOpen }" class="fill-current" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            width="16px" height="16px">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </span>
          <ul v-show="selectOpen" class="absolute pin-r mt-6 bg-white shadow rounded border overflow-hidden list-reset text-sm">
            <li v-for="(type, index) in types">
              <div @click="filterTransactions(index - 1)" class="dropdown-button">{{ $t(type) }}</div>
            </li>
          </ul>
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
    types: [
      'All', 'Transfer', 'Second Signature', 'Delegate Registration', 'Vote', 'Multisignature Registration'
    ],
    transactionType: -1,
    currentPage: 0,
    selectOpen: false,
  }),

  created() {
    this.transactionType = Number(localStorage.getItem('transactionType')) || -1
  },

  computed: {
    ...mapGetters('ui', ['priceChart']),
  },

  methods: {
    async filterTransactions(type) {
      this.selectOpen = false
      this.setTransactionType(type)
    },

    setTransactionType(type) {
      localStorage.setItem('transactionType', type)
      this.transactionType = type
    },

    closeDropdown() {
      this.selectOpen = false
    }
  }
}
</script>
