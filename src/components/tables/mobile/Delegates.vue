<template>
  <div>
    <Loader :data="delegates">
      <div v-for="delegate in delegates" :key="delegate.address" class="row-mobile">
        <div v-if="delegate.rank" class="list-row-border-b">
          <div class="mr-4">
            {{ $t("COMMON.RANK") }}
          </div>
          {{ delegate.rank }}
        </div>

        <div class="list-row-border-b">
          <div class="mr-4">
            {{ $t("WALLET.DELEGATE.USERNAME") }}
          </div>
          <div class="flex items-center">
            <LinkWallet :key="delegate.address" :address="delegate.address">
              {{ delegate.username }}
            </LinkWallet>
            <span v-if="delegate.isResigned" class="p-1 ml-2 text-sm text-white rounded bg-theme-resigned-label">{{
              $t("WALLET.DELEGATE.STATUS.RESIGNED")
            }}</span>
          </div>
        </div>

        <div class="list-row-border-b">
          <div class="mr-4">
            {{ $t("PAGES.DELEGATE_MONITOR.FORGED_BLOCKS") }}
          </div>
          <div>
            {{ readableNumber(delegate.blocks.produced) }}
          </div>
        </div>

        <div class="list-row-border-b-no-wrap">
          <div class="mr-4">
            {{ $t("WALLET.DELEGATE.TOTAL_FORGED") }}
          </div>
          <div>
            {{ readableCrypto(delegate.forged.total) }}
          </div>
        </div>

        <div class="list-row">
          <div class="mr-4">
            {{ $t("PAGES.DELEGATE_MONITOR.VOTES") }}
          </div>
          <div>
            <span v-tooltip="$t('COMMON.SUPPLY_PERCENTAGE')" class="mr-1 text-xs text-grey">
              {{ percentageString(delegate.production.approval) }}
            </span>
            {{ readableCrypto(delegate.votes, true, 2) }}
          </div>
        </div>
      </div>
      <div v-if="delegates && !delegates.length" class="px-5 md:px-10">
        <span>{{ $t("COMMON.NO_RESULTS") }}</span>
      </div>
    </Loader>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { IDelegate } from "@/interfaces";

@Component
export default class TableDelegatesMobile extends Vue {
  @Prop({
    required: true,
    validator: (value) => {
      return Array.isArray(value) || value === null;
    },
  })
  public delegates: IDelegate[] | null;
}
</script>

<style scoped>
.row-mobile:nth-child(even) {
  background-color: var(--color-theme-table-row);
}
</style>
