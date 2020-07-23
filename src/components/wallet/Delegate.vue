<template>
  <div v-if="delegate" class="WalletDelegate">
    <div class="list-row-border-b">
      <div>{{ $t("WALLET.DELEGATE.USERNAME") }}</div>
      <div>{{ delegate.username }}</div>
    </div>

    <div class="list-row-border-b">
      <div>{{ $t("WALLET.DELEGATE.STATUS.TITLE") }}</div>
      <div :class="delegateStatus.class">{{ delegateStatus.text }}</div>
    </div>

    <div class="list-row-border-b">
      <div>{{ $t("WALLET.DELEGATE.RANK") }}</div>
      <div>
        <span v-if="delegate.rank === undefined && delegate.isResigned">
          {{ $t("WALLET.DELEGATE.RANK_NOT_APPLICABLE") }}
        </span>
        <span v-else-if="delegate.rank === undefined">
          {{ $t("WALLET.DELEGATE.RANK_NOT_AVAILABLE") }}
        </span>
        <span v-else>
          {{ delegate.rank }}
        </span>
      </div>
    </div>

    <div class="list-row-border-b">
      <div>{{ $t("WALLET.DELEGATE.VOTES") }}</div>
      <div v-if="delegate.production">
        <span
          v-tooltip="
            delegate.votes
              ? {
                  trigger: 'hover click',
                  content: $t('COMMON.SUPPLY_PERCENTAGE'),
                  placement: 'left',
                }
              : {}
          "
          class="mr-1 text-xs text-grey"
        >
          {{ percentageString(delegate.production.approval) }}
        </span>
        {{ readableCrypto(delegate.votes, true, 2) }}
      </div>
    </div>

    <div class="list-row-border-b">
      <div>{{ $t("WALLET.DELEGATE.TOTAL_FORGED") }}</div>
      <div v-if="delegate.forged">
        {{ readableCrypto(delegate.forged.total) }}
      </div>
    </div>

    <div class="list-row">
      <div>{{ $t("WALLET.DELEGATE.FORGED_BLOCKS") }}</div>
      <div v-if="delegate.blocks">
        <span>
          {{ readableNumber(delegate.blocks.produced) }}
        </span>
        <RouterLink
          v-if="delegate.blocks.produced"
          :to="{ name: 'wallet-blocks', params: { address: delegate.address, username: delegate.username, page: 1 } }"
          class="ml-2"
        >
          {{ $t("COMMON.SEE_ALL") }}
        </RouterLink>
      </div>
    </div>

    <WalletVoters :wallet="wallet" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { IWallet } from "@/interfaces";
import WalletVoters from "@/components/wallet/Voters.vue";

@Component({
  components: {
    WalletVoters,
  },
})
export default class WalletDelegate extends Vue {
  @Prop({ required: true }) public wallet: IWallet;

  get delegate() {
    return this.$store.getters["delegates/byPublicKey"](this.wallet.publicKey);
  }

  get delegateStatus() {
    const activeThreshold = this.$store.getters["network/activeDelegates"];
    if (this.wallet.isResigned) {
      return { text: this.$t("WALLET.DELEGATE.STATUS.RESIGNED"), class: "text-status-not-forging" };
    }
    if (this.delegate.rank && this.delegate.rank <= activeThreshold) {
      return { text: this.$t("WALLET.DELEGATE.STATUS.ACTIVE"), class: "text-status-forging" };
    }
    return { text: this.$t("WALLET.DELEGATE.STATUS.STANDBY"), class: "text-status-missed-round" };
  }
}
</script>
