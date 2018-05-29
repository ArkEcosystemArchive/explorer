<template>
  <section class="mb-5">
    <div class="px-5 sm:px-10 py-8 bg-theme-feature-background flex xl:rounded-lg items-center justify-between">
      <delegate-count :delegateCount="delegateCount"></delegate-count>

      <total-forged></total-forged>

      <last-block></last-block>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
import DelegateCount from '@/components/monitor/DelegateCount'
import LastBlock from '@/components/monitor/LastBlock'
import TotalForged from '@/components/monitor/TotalForged'

export default {
  components: { DelegateCount, LastBlock, TotalForged },

  props: ['delegateCount']
}
</script>
