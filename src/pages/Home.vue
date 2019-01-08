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
          {{ $t("Latest transactions") }}
        </div>
        <div @click="dataView = 'blocks'"
             :class="dataView === 'blocks' ? 'active-tab' : 'inactive-tab'">
          {{ $t("Latest blocks") }}
        </div>
      </nav>

      <section class="mb-5" v-if="dataView === 'transactions'">
        <div class="px-5 sm:px-10 py-8 bg-theme-feature-background flex xl:rounded-lg items-center justify-between">
          <div class="flex-auto min-w-0">
            <div class="text-grey mb-2">Transactions Type</div>
            <div class="flex">
              <div class="text-lg text-white semibold truncate">
                <span class="mr-2">{{ transactionsChoices[transactionType+1] }}</span>
              </div>
            </div>
          </div>
          <div class="flex flex-col ml-4">
            <div class="text-grey mb-2">{{ $t("Type") }}</div>
            <div class="relative text-white z-20">
              <span @click="selectOpen = !selectOpen" class="cursor-pointer flex items-center">
                <span class="mr-1">{{ $t(transactionsChoices[transactionType + 1]) }}</span>
                <svg :class="{ 'rotate-180': selectOpen }" class="fill-current" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                width="16px" height="16px">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </span>
              <ul v-show="selectOpen" class="absolute pin-r mt-px bg-white shadow rounded border overflow-hidden list-reset text-sm">
                <li v-for="(txType, index) in transactionsChoices">
                  <div @click="filterTransactions(index - 1)" class="dropdown-button">{{ $t(txType) }}</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <latest-transactions v-if="dataView === 'transactions'" v-bind:testTransactionType="transactionType"></latest-transactions>

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
    transactionsChoices: [
      'All', 'Transfer', 'Second Signature', 'Delegate Registration', 'Vote', 'MultiSignature'
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
    async filterTransactions(index) {
       this.transactions = null
       this.selectOpen = false
       this.transactionType = index
       const response = await TransactionService.filterByType(0, index)
       this.setTransactions(response)
       localStorage.setItem('transactionType', index)
     }
  }
}
</script>
