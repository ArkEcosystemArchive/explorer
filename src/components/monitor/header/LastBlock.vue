<template>
  <div class="flex justify-between flex-auto lg:ml-10">
    <div>
      <div class="min-w-0 mb-2 text-grey">
        {{ $t("PAGES.DELEGATE_MONITOR.HEADER.LAST_BLOCK") }}
      </div>
      <div v-if="block && block.id" class="text-lg truncate">
        <LinkBlock :id="block.id" :length="20" />
      </div>
    </div>

    <div class="hidden md:block">
      <div class="min-w-0 mb-2 text-grey">
        {{ $t("PAGES.DELEGATE_MONITOR.HEADER.FORGED") }}
      </div>
      <div class="text-lg text-white truncate">
        <span v-if="block && block.forged">
          {{ readableCrypto(block.forged.total) }}
          {{ $tc("PAGES.DELEGATE_MONITOR.HEADER.TX_COUNT", block.transactions, { count: block.transactions }) }}
        </span>
      </div>
    </div>

    <div class="w-32">
      <div class="min-w-0 mb-2 text-grey">
        {{ $t("COMMON.DELEGATE") }}
      </div>
      <div class="text-lg text-white truncate semibold">
        <LinkWallet v-if="block && block.generator" :address="block.generator.address">
          {{ block.generator.username }}
        </LinkWallet>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { IBlock } from "@/interfaces";
import BlockService from "@/services/block";

@Component
export default class LastBlock extends Vue {
  private block: IBlock | null = null;

  public async mounted() {
    await this.prepareComponent();
  }

  private async prepareComponent() {
    await this.getBlock();

    this.$store.watch(
      (state) => state.network.height,
      (value) => this.getBlock(),
    );
  }

  private async getBlock() {
    const response = await BlockService.last();
    this.block = response;
  }
}
</script>
