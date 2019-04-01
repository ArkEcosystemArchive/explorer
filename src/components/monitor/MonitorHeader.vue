<template>
  <section class="mb-5">
    <div class="px-5 sm:px-10 py-8 bg-theme-feature-background flex xl:rounded-lg items-center justify-between">
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
