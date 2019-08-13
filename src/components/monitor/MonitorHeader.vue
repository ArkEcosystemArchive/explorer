<template>
  <section class="mb-5">
    <div class="MonitorHeader px-5 sm:px-10 py-8 xl:rounded-lg">
      <DelegateCount />

      <TotalForged />

      <LastBlock />
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
import { DelegateCount, LastBlock, TotalForged } from '@/components/monitor/header'

export default {
  name: 'MonitorHeader',

  components: {
    DelegateCount,
    LastBlock,
    TotalForged
  }
}
</script>

<style>
.MonitorHeader {
  @apply .bg-theme-feature-background .flex .items-center .justify-between
}
</style>
