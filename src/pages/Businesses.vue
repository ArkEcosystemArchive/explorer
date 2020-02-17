<template>
  <div class="max-w-2xl mx-auto md:pt-5">
    <DisclaimerModal />
    <ContentHeader>{{ $t("PAGES.BUSINESSES.TITLE") }}</ContentHeader>
    <section class="page-section py-5 md:py-10">
      <div class="hidden sm:block">
        <TableBusinessesDesktop :businesses="businesses" :sort-query="sortParams" @on-sort-change="onSortChange" />
      </div>
      <div class="sm:hidden">
        <TableBusinessesMobile :businesses="businesses" />
      </div>
      <Pagination v-if="showPagination" :meta="meta" :current-page="currentPage" @page-change="onPageChange" />
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { mapGetters } from "vuex";
import { Route } from "vue-router";
import { ISortParameters, IBusiness } from "@/interfaces";
import BusinessService from "@/services/business";

Component.registerHooks(["beforeRouteEnter", "beforeRouteUpdate"]);

@Component
export default class Businesses extends Vue {
  get showPagination() {
    return this.meta && this.meta.pageCount > 1;
  }

  get sortParams() {
    return this.$store.getters["ui/businessSortParams"];
  }

  set sortParams(params: ISortParameters) {
    this.$store.dispatch("ui/setBusinessSortParams", {
      field: params.field,
      type: params.type,
    });
  }
  private businesses: IBusiness[] | null = null;
  private meta: any | null = null;
  private currentPage = 0;

  @Watch("currentPage")
  public onCurrentPageChanged() {
    this.changePage();
  }

  public async beforeRouteEnter(to: Route, from: Route, next: (vm?: any) => void) {
    try {
      const { meta, data } = await BusinessService.all(Number(to.params.page));

      next((vm: Businesses) => {
        vm.currentPage = Number(to.params.page);
        vm.setBusinesses(data);
        vm.setMeta(meta);
      });
    } catch (e) {
      next({ name: "404" });
    }
  }

  public async beforeRouteUpdate(to: Route, from: Route, next: (vm?: any) => void) {
    this.businesses = null;
    this.meta = null;

    try {
      const { meta, data } = await BusinessService.all(Number(to.params.page));

      this.currentPage = Number(to.params.page);
      this.setBusinesses(data);
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
        name: "businesses",
        params: {
          page: this.currentPage,
        },
      });
    }
  }

  private setBusinesses(wallets: IBusiness[]) {
    this.businesses = wallets;
  }

  private onSortChange(params: ISortParameters) {
    this.sortParams = params;
  }
}
</script>
