<template>
  <div v-if="wallet" class="max-w-2xl mx-auto md:pt-5">
    <ContentHeader>{{ $t("WALLET.SUMMARY") }}</ContentHeader>

    <WalletDetails :wallet="wallet" />

    <section v-show="isDelegate || wallet.vote" :class="{ 'py-5 md:py-10': isDelegate }" class="mb-5 page-section">
      <div class="px-5 sm:px-10">
        <WalletDelegate v-if="isDelegate" :wallet="wallet" />
        <WalletVote v-if="wallet.vote" :wallet="wallet" />
      </div>
    </section>

    <WalletTransactions v-if="wallet" :wallet="wallet" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Route } from "vue-router";
import { IWallet } from "@/interfaces";
import { WalletDelegate, WalletDetails, WalletTransactions, WalletVote } from "@/components/wallet";
import WalletService from "@/services/wallet";

Component.registerHooks(["beforeRouteEnter", "beforeRouteUpdate"]);

@Component({
  components: {
    WalletDelegate,
    WalletDetails,
    WalletTransactions,
    WalletVote,
  },
})
export default class WalletPage extends Vue {
  private wallet: IWallet | null = null;
  private activeTab = "all";

  get isDelegate() {
    if (this.wallet) {
      return this.wallet.isDelegate;
    }
  }

  public async beforeRouteEnter(to: Route, from: Route, next: (vm: any) => void) {
    try {
      const response = await WalletService.find(to.params.address);
      next((vm: WalletPage) => vm.setWallet(response));
    } catch (e) {
      next({ name: "404" });
    }
  }

  public async beforeRouteUpdate(to: Route, from: Route, next: (vm?: any) => void) {
    this.wallet = null;

    try {
      const response = await WalletService.find(to.params.address);
      this.setWallet(response);
      next();
    } catch (e) {
      next({ name: "404" });
    }
  }

  private setWallet(wallet: IWallet) {
    this.wallet = wallet;
  }
}
</script>
