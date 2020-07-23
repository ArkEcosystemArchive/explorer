<template>
  <div class="max-w-2xl mx-auto md:pt-5">
    <ContentHeader>{{ $t("COMMON.TRANSACTIONS") }}</ContentHeader>
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
      <Pagination v-if="showPagination" :meta="meta" :current-page="currentPage" @page-change="onPageChange" />
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Route } from "vue-router";
import { ISortParameters, ITransaction } from "@/interfaces";
import TransactionService from "@/services/transaction";

Component.registerHooks(["beforeRouteEnter", "beforeRouteUpdate"]);

@Component
export default class BlockTransactions extends Vue {
  private transactions: ITransaction[] | null = null;
  private meta: any | null = null;
  private currentPage = 0;

  get showPagination() {
    return this.meta && this.meta.pageCount > 1;
  }

  get id() {
    return this.$route.params.id;
  }

  get sortParams() {
    return this.$store.getters["ui/transactionSortParams"];
  }

  set sortParams(params: ISortParameters) {
    this.$store.dispatch("ui/setTransactionSortParams", {
      field: params.field,
      type: params.type,
    });
  }

  @Watch("currentPage")
  public onCurrentPageChanged() {
    this.changePage();
  }

  public async beforeRouteEnter(to: Route, from: Route, next: (vm: any) => void) {
    try {
      const { meta, data } = await TransactionService.byBlock(to.params.id, Number(to.params.page));

      next((vm: BlockTransactions) => {
        vm.currentPage = Number(to.params.page);
        vm.setTransactions(data);
        vm.setMeta(meta);
      });
    } catch (e) {
      next({ name: "404" });
    }
  }

  public async beforeRouteUpdate(to: Route, from: Route, next: (vm?: any) => void) {
    this.transactions = null;
    this.meta = null;

    try {
      const { meta, data } = await TransactionService.byBlock(to.params.id, Number(to.params.page));

      this.currentPage = Number(to.params.page);
      this.setTransactions(data);
      this.setMeta(meta);
      next();
    } catch (e) {
      next({ name: "404" });
    }
  }

  private setTransactions(transactions: ITransaction[]) {
    if (!transactions) {
      return;
    }

    this.transactions = transactions.map((transaction) => ({ ...transaction, price: null }));
  }

  private setMeta(meta: any) {
    this.meta = meta;
  }

  private onPageChange(page: number) {
    this.currentPage = page;
  }

  private changePage() {
    if (this.currentPage !== Number(this.$route.params.page) || this.id !== this.$route.params.id) {
      // @ts-ignore
      this.$router.push({
        name: "block-transactions",
        params: {
          id: this.id,
          page: this.currentPage.toString(),
        },
      });
    }
  }

  private onSortChange(params: ISortParameters) {
    this.sortParams = params;
  }
}
</script>
