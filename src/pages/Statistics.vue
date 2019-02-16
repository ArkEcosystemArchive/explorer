<template>
  <div class="max-w-2xl mx-auto md:pt-5">
    <content-header>{{ $t("Statistics") }}</content-header>
    <section class="page-section py-5 md:py-10">
      <nav class="mx-5 sm:mx-10 border-b flex items-end">
        <div
          @click="activeTab = 'transactions'"
          :class="activeTab === 'transactions' ? 'active-tab' : 'inactive-tab'">
          {{ $t("Transactions") }}
        </div>
        <div
          @click="activeTab = 'sent'"
          :class="activeTab === 'sent' ? 'active-tab' : 'inactive-tab'">
          {{ $t("Token sent", {token: networkToken()}) }}
        </div>
        <div
          @click="activeTab = 'fees'"
          :class="activeTab === 'fees' ? 'active-tab' : 'inactive-tab'">
          {{ $t("Token fees", {token: networkToken()}) }}
        </div>
      </nav>
      <div class="px-5 sm:px-10 pt-8 flex flex-wrap flex-col sm:flex-row">
        <div class="mr-4 mb-4 flex flex-row justify-between sm:flex-col">
          <div class="text-grey mb-1">{{ $t("Day") }}</div>
          <div class="sm:text-xl semibold">4 894</div>
        </div>
        <span class="border-r mx-4 lg:mx-6 mb-4" />
        <div class="mr-4 mb-4 flex flex-row justify-between sm:flex-col">
          <div class="text-grey mb-1">{{ $t("Week") }}</div>
          <div class="sm:text-xl semibold">82 312</div>
        </div>
        <span class="border-r mx-4 lg:mx-6 mb-4" />
        <div class="mr-4 mb-4 flex flex-row justify-between sm:flex-col">
          <div class="text-grey mb-1">{{ $t("Month") }}</div>
          <div class="sm:text-xl semibold">614 312</div>
        </div>
        <span class="border-r mx-4 lg:mx-6 mb-4" />
        <div class="mr-4 mb-4 flex flex-row justify-between sm:flex-col">
          <div class="text-grey mb-1">{{ $t("Year") }}</div>
          <div class="sm:text-xl semibold">15 489 513</div>
        </div>
        <span class="border-r mx-4 lg:mx-6 mb-4" />
        <div class="mr-4 mb-4 flex flex-row justify-between sm:flex-col">
          <div class="text-grey mb-1">{{ $t("All time") }}</div>
          <div class="sm:text-xl semibold">312 985 235</div>
        </div>
      </div>
    </section>

    <section class="bg-theme-feature-background xl:rounded-b-lg mb-8">
      <chart-wrapper />
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
