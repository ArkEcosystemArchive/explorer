<template>
  <div class="max-w-2xl mx-auto md:pt-5">
    <ContentHeader>{{ $t("PAGES.HOME.HEADER") }}</ContentHeader>

    <section v-if="isChartEnabled" class="hidden md:block mb-5 bg-theme-feature-background xl:rounded-lg">
      <ChartWrapper />
    </section>

    <section class="page-section py-5 md:py-10">
      <div class="flex flex-col sm:flex-row items-center justify-between">
        <TabsNavigation v-if="dataView">
          <TabsNavigationItem
            id="transactions"
            :title="$t('PAGES.HOME.LATEST_TRANSACTIONS')"
            :is-active="dataView === 'transactions'"
            @click="dataView = 'transactions'"
          />

          <TabsNavigationItem
            id="blocks"
            :title="$t('PAGES.HOME.LATEST_BLOCKS')"
            :is-active="dataView === 'blocks'"
            @click="dataView = 'blocks'"
          />
        </TabsNavigation>

        <SelectionType v-if="dataView === 'transactions'" @change="onTypeChange" />
      </div>

      <LatestTransactions
        v-if="dataView === 'transactions'"
        :transaction-type="transactionType.type"
        :transaction-group="transactionType.typeGroup"
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
import { TabsNavigation, TabsNavigationItem } from "@/components/utils/tabs";
import { ITransactionType } from "@/interfaces";

@Component({
  components: {
    ChartWrapper,
    LatestBlocks,
    LatestTransactions,
    SelectionType,
    TabsNavigation,
    TabsNavigationItem,
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
