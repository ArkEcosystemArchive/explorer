<template>
  <div class="max-w-2xl mx-auto md:pt-5">
    <content-header>Statistics</content-header>
    <section class="page-section pt-10 pb-8">
      <nav class="mx-5 sm:mx-10 border-b flex items-end">
        <div
          @click="activeTab = 'transactions'"
          :class="activeTab === 'transactions' ? 'active-tab' : 'inactive-tab'">
          Transactions
        </div>
        <div
          @click="activeTab = 'sent'"
          :class="activeTab === 'sent' ? 'active-tab' : 'inactive-tab'">
          ARK sent
        </div>
        <div
          @click="activeTab = 'fees'"
          :class="activeTab === 'fees' ? 'active-tab' : 'inactive-tab'">
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
import lastTransactions from '@/assets/lastTransactions'
import lastBlocks from '@/assets/lastBlocks'

export default {
  data: () => ({
    lastTransactions,
    lastBlocks,
    activeTab: 'transactions',
  }),
}
</script>
