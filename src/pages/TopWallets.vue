<template>
  <div class="max-w-2xl mx-auto md:pt-5">
    <ContentHeader>{{ $t("PAGES.TOP_WALLETS.TITLE") }}</ContentHeader>
    <section class="py-5 page-section md:py-10">
      <div class="hidden sm:block">
        <TableWalletsDesktop
          :wallets="wallets"
          :total="supply"
          :sort-query="sortParams"
          @on-sort-change="onSortChange"
        />
      </div>
      <div class="sm:hidden">
        <TableWalletsMobile :wallets="wallets" :total="supply" />
      </div>
      <Pagination v-if="showPagination" :meta="meta" :current-page="currentPage" @page-change="onPageChange" />
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { mapGetters } from "vuex";
import { Route } from "vue-router";
import { ISortParameters, IWallet } from "@/interfaces";
import WalletService from "@/services/wallet";

Component.registerHooks(["beforeRouteEnter", "beforeRouteUpdate"]);

@Component({
  computed: {
    ...mapGetters("network", ["supply"]),
  },
})
export default class TopWallets extends Vue {
  get showPagination() {
    return this.meta && this.meta.pageCount > 1;
  }

  get sortParams() {
    return this.$store.getters["ui/walletSortParams"];
  }

  set sortParams(params: ISortParameters) {
    this.$store.dispatch("ui/setWalletSortParams", {
      field: params.field,
      type: params.type,
    });
  }
  private wallets: IWallet[] | null = null;
  private meta: any | null = null;
  private currentPage = 0;
  private supply: string;

  @Watch("currentPage")
  public onCurrentPageChanged() {
    this.changePage();
  }

  public async beforeRouteEnter(to: Route, from: Route, next: (vm?: any) => void) {
    try {
      const { meta, data } = await WalletService.top(Number(to.params.page));

      next((vm: TopWallets) => {
        vm.currentPage = Number(to.params.page);
        vm.setWallets(data);
        vm.setMeta(meta);
      });
    } catch (e) {
      next({ name: "404" });
    }
  }

  public async beforeRouteUpdate(to: Route, from: Route, next: (vm?: any) => void) {
    this.wallets = null;
    this.meta = null;

    try {
      const { meta, data } = await WalletService.top(Number(to.params.page));

      this.currentPage = Number(to.params.page);
      this.setWallets(data);
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
        name: "top-wallets",
        params: {
          page: this.currentPage.toString(),
        },
      });
    }
  }

  private setWallets(wallets: IWallet[]) {
    this.wallets = wallets;
  }

  private onSortChange(params: ISortParameters) {
    this.sortParams = params;
  }
}
</script>
