<template>
  <div v-if="wallet" class="max-w-2xl mx-auto md:pt-5">
    <ContentHeader>{{ $t("WALLET.SUMMARY") }}</ContentHeader>

    <WalletDetails :wallet="wallet" />

    <section v-show="isDelegate" :class="{ 'py-5 md:py-10': isDelegate }" class="page-section mb-5">
      <div v-show="isDelegate" class="px-5 sm:px-10">
        <WalletDelegate :wallet="wallet" />
      </div>
    </section>

    <WalletTransactions v-if="wallet" :wallet="wallet" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Route } from "vue-router";
import { IWallet } from "@/interfaces";
import { WalletDelegate, WalletDetails, WalletTransactions } from "@/components/wallet";
// @ts-ignore
import WalletService from "@/services/wallet";

Component.registerHooks(["beforeRouteEnter", "beforeRouteUpdate"]);

@Component({
  components: {
    WalletDelegate,
    WalletDetails,
    WalletTransactions,
  },
})
export default class WalletPage extends Vue {
  private wallet: IWallet | null = null;
  private activeTab: string = "all";

  get isDelegate() {
    if (this.wallet) {
      return this.wallet.isDelegate;
    }
  }

  public async beforeRouteEnter(to: Route, from: Route, next: () => void) {
    try {
      const response = await WalletService.find(to.params.address);
      // @ts-ignore
      next(vm => vm.setWallet(response));
    } catch (e) {
      // @ts-ignore
      next({ name: "404" });
    }
  }

  public async beforeRouteUpdate(to: Route, from: Route, next: () => void) {
    this.wallet = null;

    try {
      const response = await WalletService.find(to.params.address);
      this.setWallet(response);
      next();
    } catch (e) {
      // @ts-ignore
      next({ name: "404" });
    }
  }

  private setWallet(wallet: IWallet) {
    this.wallet = wallet;
  }
}
</script>
