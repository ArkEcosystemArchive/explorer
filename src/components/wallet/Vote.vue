<template>
  <div v-if="isVoting" class="WalletVote mt-2">
    <div class="flex">
      <span class="text-grey mr-1">{{ $t("WALLET.VOTING_FOR") }}</span>
      <LinkWallet v-if="votedDelegate.address" :address="votedDelegate.address">
        <span class="truncate">{{ votedDelegate.username }}</span>
      </LinkWallet>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { IWallet } from "@/interfaces";

@Component
export default class WalletVote extends Vue {
  @Prop({ required: true }) public wallet: IWallet;

  get votedDelegate() {
    return this.$store.getters["delegates/byPublicKey"](this.wallet.vote) || {};
  }

  get isVoting() {
    return !!this.wallet.vote;
  }
}
</script>
