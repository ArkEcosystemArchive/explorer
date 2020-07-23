<template>
  <div class="max-w-2xl mx-auto md:pt-5">
    <DisclaimerModal />
    <ContentHeader>{{ $t("PAGES.BRIDGECHAINS.TITLE") }}</ContentHeader>
    <section class="py-5 page-section md:py-10">
      <div class="hidden sm:block">
        <TableBridgechainsDesktop
          :bridgechains="bridgechains"
          :sort-query="sortParams"
          @on-sort-change="onSortChange"
        />
      </div>
      <div class="sm:hidden">
        <TableBridgechainsMobile :bridgechains="bridgechains" />
      </div>
      <Pagination v-if="showPagination" :meta="meta" :current-page="currentPage" @page-change="onPageChange" />
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { mapGetters } from "vuex";
import { Route } from "vue-router";
import { ISortParameters, IBridgechain } from "@/interfaces";
import BridgechainService from "@/services/bridgechain";

Component.registerHooks(["beforeRouteEnter", "beforeRouteUpdate"]);

@Component
export default class Bridgechains extends Vue {
  get showPagination() {
    return this.meta && this.meta.pageCount > 1;
  }

  get sortParams() {
    return this.$store.getters["ui/bridgechainSortParams"];
  }

  set sortParams(params: ISortParameters) {
    this.$store.dispatch("ui/setBridgechainSortParams", {
      field: params.field,
      type: params.type,
    });
  }
  private bridgechains: IBridgechain[] | null = null;
  private meta: any | null = null;
  private currentPage = 0;

  @Watch("currentPage")
  public onCurrentPageChanged() {
    this.changePage();
  }

  public async beforeRouteEnter(to: Route, from: Route, next: (vm?: any) => void) {
    try {
      const { meta, data } = await BridgechainService.all(Number(to.params.page));

      next((vm: Bridgechains) => {
        vm.currentPage = Number(to.params.page);
        vm.setBridgechains(data);
        vm.setMeta(meta);
      });
    } catch (e) {
      next({ name: "404" });
    }
  }

  public async beforeRouteUpdate(to: Route, from: Route, next: (vm?: any) => void) {
    this.bridgechains = null;
    this.meta = null;

    try {
      const { meta, data } = await BridgechainService.all(Number(to.params.page));

      this.currentPage = Number(to.params.page);
      this.setBridgechains(data);
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
        name: "bridgechains",
        params: {
          page: this.currentPage.toString(),
        },
      });
    }
  }

  private setBridgechains(wallets: IBridgechain[]) {
    this.bridgechains = wallets;
  }

  private onSortChange(params: ISortParameters) {
    this.sortParams = params;
  }
}
</script>
