<template>
  <div class="max-w-2xl mx-auto md:pt-5">
    <ContentHeader>{{ $t("PAGES.ADVANCED_SEARCH.TITLE") }}</ContentHeader>

    <TransactionSearchForm
      v-if="searchType === 'transaction'"
      @formChange="onFormChange"
      :searchType="searchType"
      :searchTypes="searchTypes"
      :search="search"
      :onSearchTypeChange="onSearchTypeChange"
    />
    <BlockSearchForm v-if="searchType === 'block'" />
    <WalletSearchForm v-if="searchType === 'wallet'" />

    <section class="page-section py-5 md:py-10" v-if="submitted">
      <div class="hidden sm:block">
        <TableTransactionsDesktop :transactions="data" :sort-query="sortParams" @on-sort-change="onSortChange" />
      </div>
      <div class="sm:hidden">
        <TableTransactionsMobile :transactions="data" />
      </div>
      <Pagination v-if="showPagination" :meta="meta" :current-page="currentPage" @page-change="onPageChange" />
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { mapGetters } from "vuex";
import { Route } from "vue-router";
import { BlockSearchForm, TransactionSearchForm, WalletSearchForm } from "@/components/search";
import { TransactionService } from "@/services";
import {
  ISortParameters,
  ITransaction,
  ITransactionSearchParams,
  IWalletSearchParams,
  IBlockSearchParams,
} from "@/interfaces";
import store from "@/store";

Component.registerHooks(["beforeRouteEnter", "beforeRouteUpdate"]);

@Component({
  components: {
    BlockSearchForm,
    TransactionSearchForm,
    WalletSearchForm,
  },
  computed: {
    ...mapGetters("ui", ["nightMode"]),
  },
})
export default class AdvancedSearchPage extends Vue {
  get sortParams() {
    return this.$store.getters["ui/transactionSortParams"];
  }

  set sortParams(params: ISortParameters) {
    this.$store.dispatch("ui/setTransactionSortParams", {
      field: params.field,
      type: params.type,
    });
  }

  get showPagination() {
    return this.meta && this.meta.pageCount > 1;
  }
  private data: any[] | null = null;
  private meta: any | null = null;
  private currentPage: number = 1;
  private searchTypes: string[] = ["transaction", "block", "wallet"];
  private searchType: string = "transaction";
  private searchParams: ITransactionSearchParams = {};
  private submitted: boolean = false;

  @Watch("currentPage")
  public onCurrentPageChanged() {
    this.changePage();
  }

  public async beforeRouteUpdate(to: Route, from: Route, next: (vm?: any) => void) {
    this.data = null;
    this.meta = null;

    try {
      const { meta, data } = await TransactionService.search(this.searchParams, Number(to.params.page));

      this.currentPage = Number(to.params.page);
      this.setData(data);
      this.setMeta(meta);
      next();
    } catch (e) {
      next({ name: "404" });
    }
  }

  public setMeta(meta: any) {
    this.meta = meta;
  }

  public onPageChange(page: number) {
    this.currentPage = page;
  }

  public changePage() {
    if (this.currentPage !== Number(this.$route.params.page)) {
      // @ts-ignore
      this.$router.push({
        name: "advanced-search",
        params: {
          page: this.currentPage,
        },
      });
    }
  }

  private getNetworkTimestamp(date: string): number {
    // @ts-ignore
    const epochTimestamp = this.timestampFromDate(store.getters["network/epoch"]);
    // @ts-ignore
    return this.timestampFromDate(value) - epochTimestamp;
  }

  private onFormChange({ name, value }) {
    if (!value) {
      this.removeFromSearchParams(name);
      return;
    }

    if (name.includes("amount") || name.includes("fee")) {
      const [parent, child] = name.split("-");

      name = parent;
      value = { ...this.searchParams[parent], [child]: Number(value) };
    }

    if (name.includes("timestamp")) {
      const timestamp = this.getNetworkTimestamp(value);

      const [parent, child] = name.split("-");

      name = parent;
      value = { ...this.searchParams[parent], [child]: timestamp };
    }

    this.searchParams = { ...this.searchParams, [name]: value };
  }

  private removeFromSearchParams(name: string): void {
    if (name.includes("-")) {
      const [parent, child] = name.split("-");

      delete this.searchParams[parent][child];
    }

    delete this.searchParams[name];
  }

  private async search() {
    this.setMeta(null);
    this.setData(null);
    this.submitted = true;

    try {
      const { meta, data } = await TransactionService.search(this.searchParams);
      this.setMeta(meta);
      this.setData(data);
    } catch {
      this.setData([]);
    }
  }

  private onSearchTypeChange(searchType: string): void {
    this.setMeta(null);
    this.setData(null);
    this.submitted = false;
    this.searchType = searchType;
  }

  private setData(data: any[]) {
    this.data = data;
  }

  private onSortChange(params: ISortParameters) {
    this.sortParams = params;
  }
}
</script>
