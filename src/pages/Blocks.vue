<template>
  <div class="max-w-2xl mx-auto md:pt-5">
    <ContentHeader>{{ $t("COMMON.BLOCKS") }}</ContentHeader>

    <section class="py-5 page-section md:py-10">
      <div class="hidden sm:block">
        <TableBlocksDesktop :blocks="blocks" :sort-query="sortParams" @on-sort-change="onSortChange" />
      </div>
      <div class="sm:hidden">
        <TableBlocksMobile :blocks="blocks" />
      </div>
      <Pagination v-if="showPagination" :meta="meta" :current-page="currentPage" @page-change="onPageChange" />
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { IBlock, ISortParameters } from "@/interfaces";
import { Route } from "vue-router";
import BlockService from "@/services/block";

Component.registerHooks(["beforeRouteEnter", "beforeRouteUpdate"]);

@Component
export default class BlockPage extends Vue {
  private blocks: IBlock[] | null = null;
  private meta: any | null = null;
  private currentPage = 0;

  get showPagination() {
    return this.meta && this.meta.pageCount > 1;
  }

  get sortParams() {
    return this.$store.getters["ui/blockSortParams"];
  }

  set sortParams(params: ISortParameters) {
    this.$store.dispatch("ui/setBlockSortParams", {
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
      const { meta, data } = await BlockService.paginate(Number(to.params.page));

      next((vm: BlockPage) => {
        vm.currentPage = Number(to.params.page);
        vm.setBlocks(data);
        vm.setMeta(meta);
      });
    } catch (e) {
      next({ name: "404" });
    }
  }

  public async beforeRouteUpdate(to: Route, from: Route, next: (vm?: any) => void) {
    this.blocks = null;
    this.meta = null;

    try {
      const { meta, data } = await BlockService.paginate(Number(to.params.page));

      this.currentPage = Number(to.params.page);
      this.setBlocks(data);
      this.setMeta(meta);
      next();
    } catch (e) {
      next({ name: "404" });
    }
  }

  private setBlocks(blocks: IBlock[]) {
    if (!blocks) {
      return;
    }

    this.blocks = blocks.map((block) => ({ ...block, price: null }));
  }

  private setMeta(meta: any) {
    this.meta = meta;
  }

  private onPageChange(page: number) {
    this.currentPage = page;
  }

  private changePage() {
    if (this.currentPage !== Number(this.$route.params.page)) {
      // @ts-ignore
      this.$router.push({
        name: "blocks",
        params: {
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
