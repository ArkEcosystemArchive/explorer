<template>
  <div class="max-w-2xl mx-auto md:pt-5">
    <ContentHeader>{{ $t("PAGES.ADVANCED_SEARCH.TITLE") }}</ContentHeader>

    <TransactionSearchForm
      v-if="selectedType === 'transaction'"
      @formChange="onFormChange"
      :selectedType="selectedType"
      :searchTypes="searchTypes"
      :search="search"
      :onSearchTypeChange="onSearchTypeChange"
    />
    <BlockSearchForm
      v-if="selectedType === 'block'"
      @formChange="onFormChange"
      :selectedType="selectedType"
      :searchTypes="searchTypes"
      :search="search"
      :onSearchTypeChange="onSearchTypeChange"
    />
    <WalletSearchForm
      v-if="selectedType === 'wallet'"
      @formChange="onFormChange"
      :selectedType="selectedType"
      :searchTypes="searchTypes"
      :search="search"
      :onSearchTypeChange="onSearchTypeChange"
    />

    <section class="page-section py-5 md:py-10" v-if="submitted">
      <div v-if="selectedType === 'transaction'" class="hidden sm:block">
        <TableTransactionsDesktop :transactions="data" :sort-query="sortParams" @on-sort-change="onSortChange" />
      </div>
      <div v-if="selectedType === 'transaction'" class="sm:hidden">
        <TableTransactionsMobile :transactions="data" />
      </div>

      <div class="hidden sm:block" v-if="selectedType === 'block'">
        <TableBlocksDesktop :blocks="data" :sort-query="sortParams" @on-sort-change="onSortChange" />
      </div>
      <div class="sm:hidden" v-if="selectedType === 'block'">
        <TableBlocksMobile :blocks="data" />
      </div>

      <div class="hidden sm:block" v-if="selectedType === 'wallet'">
        <TableWalletsSearchDesktop
          :wallets="data"
          :total="supply"
          :sort-query="sortParams"
          @on-sort-change="onSortChange"
        />
      </div>
      <div class="sm:hidden">
        <TableWalletsSearchMobile :wallets="data" :total="supply" />
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
import { BlockService, TransactionService, WalletService } from "@/services";
import {
  ISortParameters,
  IBlock,
  IWallet,
  ITransaction,
  IMeta,
  ITransactionSearchParams,
  IWalletSearchParams,
  IBlockSearchParams,
} from "@/interfaces";
import { inputProcessor } from "@/utils";
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
    ...mapGetters("network", ["supply"]),
  },
})
export default class AdvancedSearchPage extends Vue {
  private types: object = {
    transaction: {
      searchService: TransactionService.search,
      sortParams: "ui/transactionSortParams",
      setSortParams: "ui/setTransactionSortParams",
    },
    block: {
      searchService: BlockService.search,
      sortParams: "ui/blockSortParams",
      setSortParams: "ui/setBlockSortParams",
    },
    wallet: {
      searchService: WalletService.search,
      sortParams: "ui/walletSortParams",
      setSortParams: "ui/setWalletSortParams",
    },
  };

  get sortParams() {
    return this.$store.getters[this.types[this.selectedType].sortParams];
  }

  set sortParams(params: ISortParameters) {
    this.$store.dispatch(this.types[this.selectedType].setSortParams, {
      field: params.field,
      type: params.type,
    });
  }

  get showPagination(): boolean {
    return this.meta && this.meta.pageCount > 1;
  }

  get searchService() {
    return this.types[this.selectedType].searchService;
  }

  private data: any[] | null = null;
  private meta: any | null = null;
  private currentPage: number = 1;
  private searchTypes: string[] = Object.keys(this.types);
  private selectedType: string = "wallet";
  private searchParams: ITransactionSearchParams | IBlockSearchParams | IWalletSearchParams = {};
  private submitted: boolean = false;
  private supply: number;

  @Watch("currentPage")
  public onCurrentPageChanged() {
    this.changePage();
  }

  public async beforeRouteUpdate(to: Route, from: Route, next: (vm?: any) => void) {
    this.data = null;
    this.meta = null;

    try {
      const { meta, data } = await this.searchService(this.searchParams, Number(to.params.page));

      this.currentPage = Number(to.params.page);
      this.setData(data);
      this.setMeta(meta);
      next();
    } catch (e) {
      next({ name: "404" });
    }
  }

  public setMeta(meta: IMeta) {
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
  private onFormChange({ name, value }) {
    let processedVal = inputProcessor(name, value);

    // Remove field from search params when input is empty
    if (!processedVal) {
      this.removeFromSearchParams(name);
      return;
    }

    // Create nested object value for to/from type params
    if (name.includes("-")) {
      const [parent, child] = name.split("-");
      name = parent;
      processedVal = { ...this.searchParams[parent], [child]: processedVal };
    }

    this.searchParams = { ...this.searchParams, [name]: processedVal };
  }

  private removeFromSearchParams(name: string): void {
    if (name.includes("-")) {
      const [parent, child] = name.split("-");

      delete this.searchParams[parent][child];
    }

    delete this.searchParams[name];
  }

  private async search(): Promise<void> {
    this.setMeta(null);
    this.setData(null);
    this.submitted = true;

    try {
      const { meta, data } = await this.searchService(this.searchParams);
      this.setMeta(meta);
      this.setData(data);
    } catch {
      this.setData([]);
    }
  }

  private onSearchTypeChange(selectedType: string): void {
    this.setMeta(null);
    this.setData(null);
    this.searchParams = {};
    this.submitted = false;
    this.selectedType = selectedType;
  }

  private setData(data: ITransaction[] | IBlock[] | IWallet[]) {
    this.data = data;
  }

  private onSortChange(params: ISortParameters) {
    this.sortParams = params;
  }
}
</script>
