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
        v-if="delegate.address && voterCount"
        :to="{ name: 'wallet-voters', params: { address: delegate.address, username: delegate.username, page: 1 } }"
      >
        {{ $t("COMMON.SEE_ALL") }}
      </RouterLink>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { IDelegate } from "@/interfaces";
import DelegateService from "@/services/delegate";

@Component({
  components: {
    WalletVoters,
  },
})
export default class WalletVoters extends Vue {
  @Prop({ required: true }) public delegate: IDelegate;

  private voterCount = 0;

  @Watch("delegate")
  public async onDelegateChange(delegate: IDelegate) {
    if (delegate.username) {
      await this.getVoterCount();
    }
  }

  public async mounted() {
    await this.getVoterCount();
  }

  private async getVoterCount() {
    this.voterCount = await DelegateService.voterCount(this.delegate.publicKey);
  }
}
</script>
