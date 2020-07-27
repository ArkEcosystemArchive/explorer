<template>
  <div v-if="transactions && transactions.length > 0">
    <h2 class="px-5 mb-5 text-2xl md:mb-6 sm:hidden text-theme-text-primary">
      {{ $t("COMMON.TRANSACTIONS") }}
    </h2>
    <section class="py-5 page-section md:py-10">
      <div class="hidden sm:block">
        <TableTransactionsDesktop
          :transactions="transactions"
          :sort-query="sortParams"
          @on-sort-change="onSortChange"
        />
      </div>
      <div class="sm:hidden">
        <TableTransactionsMobile :transactions="transactions" />
      </div>
      <div v-if="meta.next" class="flex flex-wrap mx-5 mt-5 sm:mx-10 md:mt-10">
        <RouterLink
          :to="{ name: 'block-transactions', params: { block: block.id, page: 2 } }"
          tag="button"
          class="button-lg"
        >
          {{ $t("PAGINATION.SHOW_MORE") }}
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { mapGetters } from "vuex";
import { IBlock, ISortParameters, ITransaction } from "../../interfaces";
import TransactionService from "@/services/transaction";

@Component({
  computed: {
    ...mapGetters("ui", ["smartbridgeFilter"]),
  },
})
export default class BlockTransactions extends Vue {
  @Prop({ required: true }) public block: IBlock;

  public transactions: ITransaction[] | null = null;
  private meta: any | null = null;
  private smartbridgeFilter: string;

  get sortParams(): ISortParameters {
    return this.$store.getters["ui/transactionSortParams"];
  }

  set sortParams(params: ISortParameters) {
    this.$store.dispatch("ui/setTransactionSortParams", {
      field: params.field,
      type: params.type,
    });
  }

  @Watch("block")
  public onBlockChanged() {
    this.resetTransactions();
    this.getTransactions();
  }

  @Watch("smartbridgeFilter")
  public onSmartbridgeFilterChanged() {
    if (this.smartbridgeFilter !== "hidden") {
      this.getTransactions();
    }
  }

  public mounted() {
    this.resetTransactions();
    this.getTransactions();
  }

  private resetTransactions(): void {
    this.transactions = null;
  }

  private async getTransactions(): Promise<void> {
    if (!this.block.id) {
      return;
    }

    if (this.block.transactions) {
      const { data, meta } = await TransactionService.byBlock(this.block.id);
      this.transactions = data.map((transaction: ITransaction) => ({ ...transaction, price: null }));
      this.meta = meta;
    }
  }

  private onSortChange(params: ISortParameters): void {
    this.sortParams = params;
  }
}
</script>
