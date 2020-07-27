<template>
  <div class="max-w-2xl mx-auto md:pt-5">
    <ContentHeader>{{ $t("PAGES.DELEGATES.TITLE") }}</ContentHeader>
    <section class="py-5 page-section md:py-10">
      <div class="hidden sm:block">
        <TableDelegatesDesktop
          :delegates="delegates"
          :sort-query="sortParams[resignedOnly ? 'tableResigned' : 'table']"
          :hide-ranks="resignedOnly"
          @on-sort-change="onSortChange"
        />
      </div>
      <div class="sm:hidden">
        <TableDelegatesMobile :delegates="delegates" />
      </div>
      <Pagination v-if="showPagination" :meta="meta" :current-page="currentPage" @page-change="onPageChange" />
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { mapGetters } from "vuex";
import { Route } from "vue-router";
import { ISortParameters, IDelegate } from "@/interfaces";
import DelegateService from "@/services/delegate";

Component.registerHooks(["beforeRouteEnter", "beforeRouteUpdate"]);

@Component
export default class Delegates extends Vue {
  get showPagination() {
    return this.meta && this.meta.pageCount > 1;
  }

  get sortParams() {
    return this.$store.getters["ui/delegateSortParams"];
  }

  set sortParams(params: ISortParameters) {
    this.$store.dispatch("ui/setDelegateSortParams", {
      ...this.sortParams,
      [this.resignedOnly ? "tableResigned" : "table"]: {
        field: params.field,
        type: params.type,
      },
    });
  }
  private delegates: IDelegate[] | null = null;
  private meta: any | null = null;
  private currentPage = 0;
  private resignedOnly = false;

  @Watch("currentPage")
  public onCurrentPageChanged() {
    this.changePage();
  }

  public async beforeRouteEnter(to: Route, from: Route, next: (vm?: any) => void) {
    try {
      const { meta, data } =
        to.name === "delegates-resigned"
          ? await DelegateService.allResigned(Number(to.params.page))
          : await DelegateService.all(Number(to.params.page));

      next((vm: Delegates) => {
        vm.resignedOnly = to.name === "delegates-resigned";
        vm.currentPage = Number(to.params.page);
        vm.setDelegates(data);
        vm.setMeta(meta);
      });
    } catch (e) {
      next({ name: "404" });
    }
  }

  public async beforeRouteUpdate(to: Route, from: Route, next: (vm?: any) => void) {
    this.delegates = null;
    this.meta = null;

    try {
      const { meta, data } =
        to.name === "delegates-resigned"
          ? await DelegateService.allResigned(Number(to.params.page))
          : await DelegateService.all(Number(to.params.page));

      this.resignedOnly = to.name === "delegates-resigned";
      this.currentPage = Number(to.params.page);
      this.setDelegates(data);
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
        name: this.resignedOnly ? "delegates-resigned" : "delegates",
        params: {
          page: this.currentPage.toString(),
        },
      });
    }
  }

  private setDelegates(delegates: IDelegate[]) {
    this.delegates = delegates;
  }

  private onSortChange(params: ISortParameters) {
    this.sortParams = params;
  }
}
</script>
