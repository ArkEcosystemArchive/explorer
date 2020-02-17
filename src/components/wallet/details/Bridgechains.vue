<template>
  <div class="WalletBridgechains">
    <div class="list-row-border-b">
      <div>{{ $t("TRANSACTION.ASSET.NAME") }}</div>
      <div>{{ bridgechain.name }}</div>
    </div>
    <div v-if="bridgechain.isResigned" class="list-row-border-b">
      <div>{{ $t("WALLET.BRIDGECHAINS.STATUS.TITLE") }}</div>
      <div class="text-status-not-forging">{{ $t("WALLET.BRIDGECHAINS.STATUS.RESIGNED") }}</div>
    </div>
    <div class="list-row-border-b">
      <div>{{ $t("TRANSACTION.ASSET.SEEDNODES") }}</div>
      <div>{{ bridgechain.seedNodes }}</div>
    </div>
    <div class="list-row-border-b">
      <div>{{ $t("TRANSACTION.ASSET.GENESISHASH") }}</div>
      <div>{{ bridgechain.genesisHash }}</div>
    </div>
    <div v-if="bridgechain.bridgechainRepository" class="list-row-border-b">
      <div>{{ $t("TRANSACTION.ASSET.BRIDGECHAINREPOSITORY") }}</div>
      <div>{{ bridgechain.bridgechainRepository }}</div>
    </div>
    <div class="list-row">
      <div>{{ $t("TRANSACTION.ASSET.PORTS") }}</div>
      <div>{{ bridgechain.ports }}</div>
    </div>

    <Pagination
      v-if="showPagination"
      :meta="meta"
      :current-page="currentPage"
      :always-show-previous="true"
      :always-show-next="true"
      @page-change="onPageChange"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { IMeta, IWallet } from "@/interfaces";

@Component
export default class WalletBusiness extends Vue {
  @Prop({ required: true }) public wallet: IWallet;

  private view = "business";

  private currentPage = 1;

  get meta() {
    return {
      count: this.bridgechains.length,
      pageCount: this.bridgechains.length,
      totalCount: this.bridgechains.length,
      next: this.currentPage + 1,
      previous: this.currentPage > 1 ? this.currentPage - 1 : null,
      self: this.currentPage,
      last: this.bridgechains.length,
    };
  }

  get showPagination() {
    return this.bridgechains.length > 1;
  }

  get bridgechains() {
    if (this.wallet?.attributes?.business?.bridgechains) {
      return Object.values(this.wallet?.attributes?.business?.bridgechains).map((bridgechain) => ({
        ...bridgechain.bridgechainAsset,
        isResigned: bridgechain.resigned,
      }));
    }

    return [];
  }

  get bridgechain() {
    return this.bridgechains[this.currentPage - 1];
  }

  public onPageChange(page: number) {
    this.currentPage = page;
  }
}
</script>
