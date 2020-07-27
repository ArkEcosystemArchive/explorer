<template>
  <div>
    <Loader :data="blocks">
      <div class="hidden sm:block">
        <TableBlocksDesktop :blocks="blocks" :sort-query="sortParams" @on-sort-change="onSortChange" />
      </div>
      <div class="sm:hidden">
        <TableBlocksMobile :blocks="blocks" />
      </div>
      <div class="flex flex-wrap mx-5 mt-5 sm:mx-10 md:mt-10">
        <RouterLink :to="{ name: 'blocks', params: { page: 2 } }" tag="button" class="button-lg">
          {{ $t("PAGINATION.SHOW_MORE") }}
        </RouterLink>
      </div>
    </Loader>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { IBlock, ISortParameters } from "@/interfaces";
import BlockService from "@/services/block";

@Component
export default class LatestBlocks extends Vue {
  private blocks: IBlock[] | null = null;

  get sortParams() {
    return this.$store.getters["ui/blockSortParams"];
  }

  set sortParams(params: ISortParameters) {
    this.$store.dispatch("ui/setBlockSortParams", {
      field: params.field,
      type: params.type,
    });
  }

  public async mounted() {
    await this.prepareComponent();
  }

  private async prepareComponent() {
    await this.getBlocks();

    this.$store.watch(
      (state) => state.network.height,
      (value) => this.getBlocks(),
    );
  }

  private async getBlocks(): Promise<void> {
    const data = await BlockService.latest();
    this.blocks = data!.map((block: IBlock) => ({ ...block, price: null }));
  }

  private onSortChange(params: ISortParameters) {
    this.sortParams = params;
  }
}
</script>
