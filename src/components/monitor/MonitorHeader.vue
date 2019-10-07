<template>
  <section class="mb-5">
    <div class="MonitorHeader px-5 sm:px-10 py-8 xl:rounded-lg">
      <DelegateCount />

      <TotalForged />

      <LastBlock />
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { DelegateCount, LastBlock, TotalForged } from "@/components/monitor/header";

@Component({
  components: {
    DelegateCount,
    LastBlock,
    TotalForged,
  },
})
export default class MonitorHeader extends Vue {}
</script>

<style>
.MonitorHeader {
  @apply .bg-theme-feature-background .flex .items-center .justify-between;
}
</style>
