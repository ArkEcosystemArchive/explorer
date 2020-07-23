<template>
  <div v-if="block" class="max-w-2xl mx-auto md:pt-5">
    <ContentHeader>{{ $t("COMMON.BLOCK") }}</ContentHeader>

    <template v-if="blockNotFound">
      <section class="px-6 py-5 page-section md:py-10">
        <div class="my-10 text-center">
          <NotFound :is-loading="isLoading" :data-id="block.id" data-type="block" @reload="onReload" />
        </div>
      </section>
    </template>

    <template v-else>
      <BlockIdentity :block="block" :prev-handler="prevBlock" :next-handler="nextBlock" />

      <BlockDetails :block="block" />

      <BlockTransactions :block="block" />
    </template>
  </div>
</template>

<script lang="ts">
/* tslint:disable:no-console */
import { Component, Vue } from "vue-property-decorator";
import { IBlock } from "@/interfaces";
import { Route } from "vue-router";
import { BlockDetails, BlockIdentity, BlockTransactions } from "@/components/block";
import NotFound from "@/components/utils/NotFound.vue";
import BlockService from "@/services/block";

Component.registerHooks(["beforeRouteEnter", "beforeRouteUpdate"]);

@Component({
  components: {
    BlockDetails,
    BlockIdentity,
    BlockTransactions,
    NotFound,
  },
})
export default class BlockPage extends Vue {
  private block: IBlock | null = null;
  private blockNotFound = false;
  private isLoading = false;

  public async beforeRouteEnter(to: Route, from: Route, next: (vm: any) => void) {
    try {
      const response = await BlockService.find(to.params.id);
      next((vm: BlockPage) => vm.setBlock(response));
    } catch (e) {
      next((vm: BlockPage) => {
        console.log(e.message || e.data.error);

        vm.blockNotFound = true;
        // @ts-ignore
        vm.block = { id: to.params.id };
      });
    }
  }

  public async beforeRouteUpdate(to: Route, from: Route, next: () => void) {
    this.block = null;

    try {
      const response = await BlockService.find(to.params.id);
      this.setBlock(response);
      next();
    } catch (e) {
      console.log(e.message || e.data.error);

      this.blockNotFound = true;
      // @ts-ignore
      this.block = { id: to.params.id };
    }
  }

  private async prepareComponent() {
    this.$store.watch(
      (state) => state.network.height,
      (value) => this.updateBlock(),
    );
  }

  private async updateBlock() {
    try {
      const response = await BlockService.find(this.block!.id);
      this.setBlock(response);
    } catch (e) {
      console.log(e.message || e.data.error);
    }
  }

  private async fetchBlock() {
    this.isLoading = true;

    try {
      const block = await BlockService.find(this.block!.id);
      this.setBlock(block);
      this.blockNotFound = false;
    } catch (e) {
      console.log(e.message || e.data.error);
    } finally {
      setTimeout(() => (this.isLoading = false), 750);
    }
  }

  private setBlock(block: IBlock) {
    this.block = block;
  }

  private async prevBlock() {
    try {
      const response = await BlockService.findPrevious(this.block!.height);
      this.$router.push({ name: "block", params: { id: response.id } });
    } catch (e) {
      console.log(e.message || e.data.error);
    }
  }

  private async nextBlock() {
    try {
      const response = await BlockService.findNext(this.block!.height);
      this.$router.push({ name: "block", params: { id: response.id } });
    } catch (e) {
      console.log(e.message || e.data.error);
    }
  }

  private onReload() {
    this.fetchBlock();
  }
}
</script>
