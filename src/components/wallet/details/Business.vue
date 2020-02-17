<template>
  <div class="WalletBusiness">
    <div class="list-row-border-b">
      <div>{{ $t("TRANSACTION.ASSET.NAME") }}</div>
      <div>{{ business.name }}</div>
    </div>
    <div v-if="business.isResigned" class="list-row-border-b">
      <div>{{ $t("WALLET.BUSINESS.STATUS.TITLE") }}</div>
      <div class="text-status-not-forging">{{ $t("WALLET.BUSINESS.STATUS.RESIGNED") }}</div>
    </div>
    <div class="list-row-border-b">
      <div>{{ $t("TRANSACTION.ASSET.WEBSITE") }}</div>
      <div>{{ business.website }}</div>
    </div>
    <div v-if="business.vat" class="list-row-border-b">
      <div>{{ $t("TRANSACTION.ASSET.VAT") }}</div>
      <div>{{ business.vat }}</div>
    </div>
    <div class="list-row">
      <div>{{ $t("TRANSACTION.ASSET.REPOSITORY") }}</div>
      <div>{{ business.repository }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { IWallet } from "@/interfaces";

@Component
export default class WalletBusiness extends Vue {
  @Prop({ required: true }) public wallet: IWallet;

  private view = "business";

  get business() {
    return this.wallet.attributes?.business
      ? {
          ...this.wallet.attributes.business.businessAsset,
          isResigned: this.wallet.attributes.business.resigned,
        }
      : {};
  }
}
</script>
