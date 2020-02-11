<template>
  <div v-if="isVoting" class="WalletVote">
    <div class="list-row-border-t">
      <div>{{ $t("WALLET.VOTING_FOR") }}</div>
      <div>
        <LinkWallet v-if="votedDelegate.address" :address="votedDelegate.address">
          <span class="truncate">{{ votedDelegate.username }}</span>
        </LinkWallet>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { IWallet } from "@/interfaces";

@Component
export default class WalletVote extends Vue {
  @Prop({ required: true }) public wallet: IWallet;

  private view = "public";
  private knownWallets: { [key: string]: string };

  get votedDelegate() {
    return this.$store.getters["delegates/byPublicKey"](this.wallet.vote) || {};
  }

  get isVoting() {
    return !!this.wallet.vote;
  }
}
</script>

<style scoped></style>
