<template>
  <div class="max-w-2xl mx-auto md:pt-5">
    <ContentHeader>{{ $t("COMMON.BLOCKS") }}</ContentHeader>

    <section class="mb-5">
      <div class="flex items-center justify-between px-5 py-8 sm:px-10 bg-theme-feature-background xl:rounded-lg">
        <div class="flex-none mr-6">
          <SvgIcon class="block" name="block" view-box="0 0 35 38" />
        </div>
        <div class="flex-auto min-w-0">
          <div class="mb-2 text-grey">
            {{ $t("BLOCK.GENERATED_BY") }}
          </div>
          <div class="flex">
            <div class="text-lg text-white truncate semibold">
              <span class="mr-2">{{ username }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-5 page-section md:py-10">
      <div class="hidden sm:block">
        <TableBlocksDesktop
          :blocks="blocks"
          :hide-generated-by="true"
          :sort-query="sortParams"
          @on-sort-change="onSortChange"
        />
      </div>
      <div class="sm:hidden">
        <TableBlocksMobile :blocks="blocks" :hide-generated-by="true" />
      </div>
      <Pagination v-if="showPagination" :meta="meta" :current-page="currentPage" @page-change="onPageChange" />
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Route } from "vue-router";
import { IBlock, ISortParameters, ITransaction } from "@/interfaces";
import { BlockService, WalletService } from "@/services";

Component.registerHooks(["beforeRouteEnter", "beforeRouteUpdate"]);

@Component
export default class WalletBlocks extends Vue {
  private username: string | null = null;
  private blocks: IBlock[] | null = null;
  private meta: any | null = null;
  private currentPage = 0;

  get showPagination() {
    return this.meta && this.meta.pageCount > 1;
  }

  get address() {
    return this.$route.params.address;
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
      const { meta, data } = await BlockService.byAddress(to.params.address, Number(to.params.page));

      next((vm: WalletBlocks) => {
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
      const { meta, data } = await BlockService.byAddress(to.params.address, Number(to.params.page));

      this.currentPage = Number(to.params.page);
      this.setBlocks(data);
      this.setMeta(meta);
      next();
    } catch (e) {
      next({ name: "404" });
    }
  }

  public mounted() {
    this.getUsername();
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

  private async getUsername() {
    if (this.$route.params.username === undefined) {
      const wallet = await WalletService.find(this.address);
      this.username = wallet.username;
    } else {
      this.username = this.$route.params.username;
    }
  }

  private onPageChange(page: number) {
    this.currentPage = page;
  }

  private changePage() {
    if (
      this.currentPage !== Number(this.$route.params.page) ||
      this.address !== this.$route.params.address ||
      this.username !== this.$route.params.username
    ) {
      // @ts-ignore
      this.$router.push({
        name: "wallet-blocks",
        params: {
          address: this.address,
          username: this.username,
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
