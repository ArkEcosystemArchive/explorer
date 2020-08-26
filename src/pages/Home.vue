<template>
  <div class="max-w-2xl mx-auto md:pt-5">
    <ContentHeader>{{ $t("PAGES.HOME.HEADER") }}</ContentHeader>

    <section v-if="isChartEnabled" class="hidden mb-5 md:block bg-theme-feature-background xl:rounded-lg">
      <ChartWrapper />
    </section>

    <section class="py-5 page-section md:py-10">
      <div class="flex flex-col items-center mx-5 mb-4 sm:flex-row sm:mx-0 sm:mb-8">
        <nav
          :class="dataView === 'transactions' ? 'mb-8 sm:mb-4' : 'mb-4'"
          class="flex items-end w-full mx-5 border-b sm:mx-10"
        >
          <div :class="dataView === 'transactions' ? 'active-tab' : 'inactive-tab'" @click="dataView = 'transactions'">
            {{ $t("PAGES.HOME.LATEST_TRANSACTIONS") }}
          </div>
          <div :class="dataView === 'blocks' ? 'active-tab' : 'inactive-tab'" @click="dataView = 'blocks'">
            {{ $t("PAGES.HOME.LATEST_BLOCKS") }}
          </div>
        </nav>

        <SelectionType v-if="dataView === 'transactions'" @change="onTypeChange" />
      </div>

      <LatestTransactions
        v-if="dataView === 'transactions'"
        :transaction-type="transactionType.type"
        :transaction-group="transactionType.typeGroup"
        :transaction-asset="transactionType.asset"
      />

      <LatestBlocks v-if="dataView === 'blocks'" />
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ChartWrapper from "@/components/ChartWrapper.vue";
import { LatestBlocks, LatestTransactions } from "@/components/home";
import SelectionType from "@/components/SelectionType.vue";
import { ITransactionType } from "@/interfaces";

@Component({
  components: {
    ChartWrapper,
    LatestBlocks,
    LatestTransactions,
    SelectionType,
  },
})
export default class HomePage extends Vue {
  private dataView = "transactions";
  private transactionType: ITransactionType = { key: "ALL", type: -1 };

  get isChartEnabled() {
    return this.$store.getters["ui/priceChartOptions"].enabled;
  }

  public created() {
    const savedType = localStorage.getItem("transactionType");
    this.transactionType = savedType ? JSON.parse(savedType) : { key: "ALL", type: -1 };
  }

  private onTypeChange(type: ITransactionType) {
    this.transactionType = type;
  }
}
</script>
