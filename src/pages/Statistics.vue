<template>
  <div class="max-w-2xl mx-auto md:pt-5">
    <content-header>Statistics</content-header>
    <section class="bg-theme-content-background shadow-theme xl:rounded-t-lg pt-10 pb-8">
      <nav class="mx-5 sm:mx-10 border-b flex items-end">
        <div
          @click="activeTab = 'transactions'"
          :class="[
            activeTab === 'transactions' ? 'text-lg sm:text-2xl border-blue text-theme-text-primary' : 'sm:text-lg text-theme-text-secondary border-transparent',
            'mr-4 py-4 px-2 cursor-pointer border-b-3 hover:text-theme-primary hover:border-blue'
          ]">
          Transactions
        </div>
        <div
          @click="activeTab = 'sent'"
          :class="[
            activeTab === 'sent' ? 'text-lg sm:text-2xl border-blue text-theme-text-primary' : 'sm:text-lg text-theme-text-secondary border-transparent',
            'mr-4 py-4 px-2 cursor-pointer border-b-3 hover:text-theme-text-primary hover:border-blue'
          ]">
          ARK sent
        </div>
        <div
          @click="activeTab = 'fees'"
          :class="[
            activeTab === 'fees' ? 'text-lg sm:text-2xl border-blue text-theme-text-primary' : 'sm:text-lg text-theme-text-secondary border-transparent',
            'mr-4 py-4 px-2 cursor-pointer border-b-3 hover:text-theme-text-primary hover:border-blue'
          ]">
          ARK fees
        </div>
      </nav>
      <div class="px-5 sm:px-10 pt-8 flex flex-wrap flex-col sm:flex-row">
        <div class="mr-4 mb-4 flex flex-row justify-between sm:flex-col">
          <div class="text-grey mb-1">Day</div>
          <div class="sm:text-xl semibold">4 894</div>
        </div>
        <span class="border-r mx-4 lg:mx-6 mb-4"></span>
        <div class="mr-4 mb-4 flex flex-row justify-between sm:flex-col">
          <div class="text-grey mb-1">Week</div>
          <div class="sm:text-xl semibold">82 312</div>
        </div>
        <span class="border-r mx-4 lg:mx-6 mb-4"></span>
        <div class="mr-4 mb-4 flex flex-row justify-between sm:flex-col">
          <div class="text-grey mb-1">Month</div>
          <div class="sm:text-xl semibold">614 312</div>
        </div>
        <span class="border-r mx-4 lg:mx-6 mb-4"></span>
        <div class="mr-4 mb-4 flex flex-row justify-between sm:flex-col">
          <div class="text-grey mb-1">Year</div>
          <div class="sm:text-xl semibold">15 489 513</div>
        </div>
        <span class="border-r mx-4 lg:mx-6 mb-4"></span>
        <div class="mr-4 mb-4 flex flex-row justify-between sm:flex-col">
          <div class="text-grey mb-1">All time</div>
          <div class="sm:text-xl semibold">312 985 235</div>
        </div>
      </div>
    </section>

    <section class="bg-theme-feature-background xl:rounded-b-lg mb-8">
      <chart-wrapper></chart-wrapper>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
// Components
import ContentHeader from '@/components/ContentHeader'
import ChartWrapper from '@/components/ChartWrapper'
import TableTransactions from '@/components/tables/Transactions'
import TableTransactionsMobile from '@/components/tables/mobile/Transactions'
import TableBlocks from '@/components/tables/Blocks'
import TableBlocksMobile from '@/components/tables/mobile/Blocks'

// Mock data
import lastTransactions from '@/assets/lastTransactions'
import lastBlocks from '@/assets/lastBlocks'

export default {
  components: {
    ContentHeader,
    ChartWrapper,
    TableTransactions,
    TableTransactionsMobile,
    TableBlocks,
    TableBlocksMobile,
  },

  data: () => ({
    lastTransactions,
    lastBlocks,
    activeTab: 'transactions',
  }),
}
</script>
