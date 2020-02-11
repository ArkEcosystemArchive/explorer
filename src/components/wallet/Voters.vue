<template>
  <div v-show="voterCount" class="list-row-border-t">
    <div>{{ $t("WALLET.DELEGATE.VOTERS") }}</div>
    <div class="whitespace-no-wrap">
      <span
        v-tooltip="{ content: $t('WALLET.DELEGATE.VOTER_THRESHOLD', { token: networkToken() }), placement: 'left' }"
        :class="voterCount ? 'mr-2' : ''"
        >{{ readableNumber(voterCount) }}</span
      >
      <RouterLink
        v-if="wallet.address && voterCount"
        :to="{ name: 'wallet-voters', params: { address: wallet.address, username: wallet.username, page: 1 } }"
      >
        {{ $t("COMMON.SEE_ALL") }}
      </RouterLink>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { IWallet } from "@/interfaces";
import DelegateService from "@/services/delegate";

@Component({
  components: {
    WalletVoters,
  },
})
export default class WalletVoters extends Vue {
  @Prop({ required: true }) public wallet: IWallet;

  private voterCount = 0;

  get delegate() {
    return this.$store.getters["delegates/byPublicKey"](this.wallet.publicKey);
  }

  @Watch("wallet")
  public async onWalletChange(wallet: IWallet) {
    if (wallet.username) {
      await this.getVoterCount();
    }
  }

  public async mounted() {
    await this.getVoterCount();
  }

  private async getVoterCount() {
    const count = await DelegateService.voterCount(this.wallet.publicKey);
    this.voterCount = count;
  }
}
</script>
