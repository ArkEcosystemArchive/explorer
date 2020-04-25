<template>
  <section v-if="!!view" class="page-section py-5 md:py-10 mb-5">
    <TabsNavigation v-if="showNavigation">
      <TabsNavigationItem
        v-if="isDelegate"
        id="delegate"
        :title="$t('COMMON.DELEGATE')"
        :is-active="view === 'delegate'"
        @click="setView"
      />

      <TabsNavigationItem
        v-if="isBusiness"
        id="business"
        :title="$t('WALLET.BUSINESS.TITLE')"
        :is-active="view === 'business'"
        @click="setView"
      />

      <TabsNavigationItem
        v-if="bridgechainCount"
        id="bridgechains"
        :title="$t('WALLET.BRIDGECHAINS.TITLE')"
        :sub-title="bridgechainCount"
        :is-active="view === 'bridgechains'"
        @click="setView"
      />
    </TabsNavigation>

    <div class="px-5 sm:px-10">
      <Transition name="component-fade" mode="out-in">
        <Component :is="view" :wallet="wallet" />
      </Transition>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { TabsNavigation, TabsNavigationItem } from "@/components/utils/tabs";
import { WalletBusiness, WalletBridgechains, WalletDelegate } from "@/components/wallet";
import { IWallet } from "@/interfaces";

@Component({
  components: {
    TabsNavigation,
    TabsNavigationItem,
    business: WalletBusiness,
    bridgechains: WalletBridgechains,
    delegate: WalletDelegate,
  },
})
export default class WalletDetails extends Vue {
  @Prop({ required: true }) public wallet: IWallet;

  private view: string = null;

  get showNavigation() {
    return (this.isDelegate && this.isBusiness) || this.bridgechainCount;
  }

  get isDelegate() {
    return this.wallet?.isDelegate;
  }

  get isBusiness() {
    return !!this.wallet?.attributes?.business;
  }

  get bridgechainCount() {
    return Object.keys(this.wallet?.attributes?.business?.bridgechains || {}).length;
  }

  public mounted() {
    this.setView(this.isDelegate ? "delegate" : this.isBusiness ? "business" : null);
  }

  private setView(view) {
    this.view = view;
  }
}
</script>

<style scoped>
.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.3s ease;
}
.component-fade-enter,
.component-fade-leave-to {
  opacity: 0;
}
</style>
