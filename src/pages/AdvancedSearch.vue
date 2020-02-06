<template>
  <div class="max-w-2xl mx-auto md:pt-5">
    <ContentHeader>{{ $t("PAGES.ADVANCED_SEARCH.TITLE") }}</ContentHeader>

    <section class="page-section mb-5 py-5 md:py-10">
      <GenericSearchForm
        @search="search"
        @formChange="onFormChange"
        :searchTypes="searchTypes"
        :selectedType="selectedType"
        :onSearchTypeChange="onSearchTypeChange"
      />

      <TransactionSearchForm
        v-if="selectedType === 'transaction'"
        @search="search"
        @formChange="onFormChange"
      />
      <BlockSearchForm v-if="selectedType === 'block'" @search="search" @formChange="onFormChange" />
      <WalletSearchForm
        v-if="selectedType === 'wallet'"
        @search="search"
        @formChange="onFormChange"
      />

      <button class="button-lg" @click="search">Search</button>
    </section>

    <section class="page-section py-5 md:py-10" v-if="submitted">
      <div v-if="selectedType === 'transaction'" class="hidden sm:block">
        <TableTransactionsDesktop
          :transactions="data"
          :sort-query="sortParams"
          @on-sort-change="onSortChange"
        />
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
      <div class="sm:hidden" v-if="selectedType === 'wallet'">
        <TableWalletsSearchMobile :wallets="data" :total="supply" />
      </div>

      <Pagination
        v-if="showPagination"
        :meta="meta"
        :current-page="currentPage"
        @page-change="onPageChange"
      />
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { mapGetters } from "vuex";
import { Route } from "vue-router";
import { GenericSearchForm, BlockSearchForm, TransactionSearchForm, WalletSearchForm } from "@/components/search";
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
    GenericSearchForm,
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
      sortParams: "ui/walletSearchSortParams",
      setSortParams: "ui/setWalletSearchSortParams",
    },
  };

  private data: any[] | null = null;
  private meta: any | null = null;
  private currentPage: number = 1;
  private searchTypes: string[] = Object.keys(this.types);
  private selectedType: string = "transaction";
  private searchParams: ITransactionSearchParams | IBlockSearchParams | IWalletSearchParams = {};
  private submitted: boolean = false;
  private supply: number;
  private lastFormChange: number = 0;

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

  @Watch("currentPage")
  public onCurrentPageChanged() {
    this.changePage();
  }

  public async beforeRouteUpdate(to: Route, from: Route, next: (vm?: any) => void) {
    this.setData(null);
    this.setMeta(null);

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

  private async onFormChange(input: { name: string; value: string }) {
    let processedName = input.name;
    const processedInput = await inputProcessor(input.name, input.value);

    if (this.lastFormChange > processedInput.ts) {
      return;
    }

    // Remove field from search params when input is empty
    if (processedInput.value !== 0 && !processedInput.value) {
      this.removeFromSearchParams(name);
      return;
    }

    // Create nested object value for to/from type params
    if (input.name.includes("-")) {
      const [parent, child] = input.name.split("-");
      processedName = parent;
      processedInput.value = { ...this.searchParams[parent], [child]: processedInput.value };
    }

    this.searchParams = { ...this.searchParams, [processedName]: processedInput.value };
    this.lastFormChange = processedInput.ts;
  }

  private removeFromSearchParams(name: string): void {
    if (name.includes("-")) {
      const [parent, child] = name.split("-");
      delete this.searchParams[parent][child];

      if (!Object.keys(this.searchParams[parent]).length) {
        delete this.searchParams[parent];
      }

      return;
    }

    delete this.searchParams[name];
  }

  private async search(): Promise<void> {
    this.setMeta(null);
    this.setData(null);
    this.currentPage = 1;
    this.submitted = true;

    try {
      const { meta, data } = await this.searchService(this.searchParams);
      this.setMeta(meta);
      this.setData(data);
    } catch {
      this.setData([]);
    }
  }

  private onSearchTypeChange(event: any): void {
    this.setMeta(null);
    this.setData(null);
    this.searchParams = {};
    this.submitted = false;
    this.selectedType = event.target.value;
  }

  private setData(data: ITransaction[] | IBlock[] | IWallet[]) {
    this.data = data;
  }

  private onSortChange(params: ISortParameters) {
    this.sortParams = params;
  }
}
</script>
