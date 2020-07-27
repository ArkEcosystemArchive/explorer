<template>
  <div class="ForgingStats">
    <div
      class="flex flex-col items-center w-1/2 px-6 my-6 text-center border-r lg:w-1/4 border-theme-border-secondary sm:flex-row sm:text-left"
    >
      <div class="mb-4 Meter sm:mb-0 text-status-forging">
        <ArkMeter :percentage="percentage(totals.forging)" />
        <SvgIcon class="MeterIcon" name="forging" view-box="0 0 19 17" />
      </div>
      <div class="p-0 sm:pl-4">
        <div class="text-3xl semibold">
          {{ totals.forging }}
        </div>
        <div class="text-grey">
          {{ $t("PAGES.DELEGATE_MONITOR.STATS.FORGED") }}
        </div>
      </div>
    </div>

    <div
      class="flex flex-col items-center w-1/2 px-6 my-6 text-center lg:w-1/4 lg:border-r border-theme-border-secondary sm:flex-row sm:text-left"
    >
      <div class="mb-4 Meter sm:mb-0 text-status-missed-round">
        <ArkMeter :percentage="percentage(totals.missedRound)" />
        <SvgIcon class="MeterIcon" name="missed-round" view-box="0 0 19 17" />
      </div>
      <div class="p-0 sm:pl-4">
        <div class="text-3xl semibold">
          {{ totals.missedRound }}
        </div>
        <div class="text-grey">
          {{ $t("PAGES.DELEGATE_MONITOR.STATS.MISSED") }}
        </div>
      </div>
    </div>

    <hr class="block lg:hidden" />

    <div
      class="flex flex-col items-center w-1/2 px-6 my-6 text-center border-r lg:w-1/4 border-theme-border-secondary sm:flex-row sm:text-left"
    >
      <div class="mb-4 Meter sm:mb-0 text-status-not-forging">
        <ArkMeter :percentage="percentage(totals.notForging + totals.neverForged)" />
        <SvgIcon class="MeterIcon" name="not-forging" view-box="0 0 19 17" />
      </div>
      <div class="p-0 sm:pl-4">
        <div class="text-3xl semibold">
          {{ totals.notForging + totals.neverForged }}
        </div>
        <div class="text-grey">
          {{ $t("PAGES.DELEGATE_MONITOR.STATS.NOT_FORGING") }}
        </div>
      </div>
    </div>

    <div class="flex flex-col items-center w-1/2 px-6 my-6 text-center lg:w-1/4 sm:flex-row sm:text-left">
      <div class="mb-4 Meter sm:mb-0 text-blue">
        <ArkMeter :percentage="percentage(totals.remainingBlocks)" />
      </div>
      <div class="p-0 sm:pl-4">
        <div class="text-3xl semibold">
          {{ totals.remainingBlocks }}
        </div>
        <div class="text-grey">
          {{ $t("PAGES.DELEGATE_MONITOR.STATS.IN_QUEUE") }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { IDelegate } from "@/interfaces";
import ForgingService from "@/services/forging";

@Component
export default class ForgingStats extends Vue {
  @Prop({ required: true }) public delegates: IDelegate[];

  private totals: object = {};

  get activeDelegates() {
    return this.$store.getters["network/activeDelegates"];
  }

  @Watch("delegates")
  public onDelegatesChanged() {
    this.getTotals();
  }

  public created() {
    this.getTotals();
  }

  private getTotals(): void {
    if (!this.delegates) {
      return;
    }

    this.totals = ForgingService.totals(this.delegates);
  }

  private percentage(value: number): number {
    return (value / this.activeDelegates) * 100;
  }
}
</script>

<style>
.ForgingStats {
  @apply .flex .flex-wrap .p-5;
}

.Meter {
  height: 50px;
  width: 50px;
  @apply .relative .flex-none;
}

.MeterIcon {
  @apply .absolute .inset-0 .m-auto;
  width: 16px;
}
</style>
