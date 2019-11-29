<template>
  <span class="block md:inline-block">
    <template v-if="isTransfer(type, typeGroup)">
      <RouterLink
        v-if="isKnown"
        :to="{ name: 'wallet', params: { address: walletAddress } }"
        class="flex items-center"
      >
        <span
          v-tooltip="{
            content: getAddress(),
            placement: tooltipPlacement,
          }"
        >
          {{ knownWallets[address] }}
        </span>
        <SvgIcon
          v-tooltip="{
            content: $t('WALLET.VERIFIED'),
            placement: tooltipPlacement,
          }"
          class="flex flex-none ml-2"
          name="verified"
          view-box="0 0 16 17"
        />
      </RouterLink>
      <RouterLink
        v-else
        v-tooltip="{
          content: getAddress(),
          placement: tooltipPlacement,
        }"
        :to="{ name: 'wallet', params: { address: walletAddress } }"
      >
        <span v-if="hasDefaultSlot">
          <slot />
        </span>
        <span v-else-if="delegate">{{ delegate.username }}</span>
        <span v-else-if="address">
          <span class="hidden md:inline-block">{{ trunc ? truncate(address) : address }}</span>
          <span class="md:hidden">{{ truncate(address) }}</span>
        </span>
      </RouterLink>
    </template>

    <span v-else-if="isSecondSignature(type, typeGroup)">{{ $t("TRANSACTION.TYPES.SECOND_SIGNATURE") }}</span>
    <span v-else-if="isDelegateRegistration(type, typeGroup)">{{ $t("TRANSACTION.TYPES.DELEGATE_REGISTRATION") }}</span>
    <span v-else-if="isVote(type, typeGroup)">
      <RouterLink
        v-if="votedDelegateAddress"
        v-tooltip="{
          content: votedDelegateAddress,
          placement: tooltipPlacement,
        }"
        :to="{ name: 'wallet', params: { address: votedDelegateAddress } }"
      >
        <span :class="getVoteColor"
          >{{ isUnvote ? $t("TRANSACTION.TYPES.UNVOTE") : $t("TRANSACTION.TYPES.VOTE") }}
          <span class="italic">({{ votedDelegateUsername }})</span></span
        >
      </RouterLink>
    </span>
    <span v-else-if="isMultiSignature(type, typeGroup)">{{ $t("TRANSACTION.TYPES.MULTI_SIGNATURE") }}</span>
    <span v-else-if="isIpfs(type, typeGroup)">{{ $t("TRANSACTION.TYPES.IPFS") }}</span>
    <span v-else-if="isMultiPayment(type, typeGroup)"
      >{{ $t("TRANSACTION.TYPES.MULTI_PAYMENT") }} ({{ multiPaymentRecipientsCount }})</span
    >
    <span v-else-if="isDelegateResignation(type, typeGroup)">{{
      $t("TRANSACTION.TYPES.DELEGATE_RESIGNATION")
    }}</span>
    <span v-else-if="isTimelock(type, typeGroup)">{{ $t("TRANSACTION.TYPES.TIMELOCK") }}</span>
    <span v-else-if="isTimelockClaim(type, typeGroup)">{{ $t("TRANSACTION.TYPES.TIMELOCK_CLAIM") }}</span>
    <span v-else-if="isTimelockRefund(type, typeGroup)">{{ $t("TRANSACTION.TYPES.TIMELOCK_REFUND") }}</span>

    <span v-else-if="isBusinessRegistration(type, typeGroup)">{{ $t("TRANSACTION.TYPES.BUSINESS_REGISTRATION") }}</span>
    <span v-else-if="isBusinessResignation(type, typeGroup)">{{ $t("TRANSACTION.TYPES.BUSINESS_RESIGNATION") }}</span>
    <span v-else-if="isBusinessUpdate(type, typeGroup)">{{ $t("TRANSACTION.TYPES.BUSINESS_UPDATE") }}</span>
    <span v-else-if="isBridgechainRegistration(type, typeGroup)">{{ $t("TRANSACTION.TYPES.BRIDGECHAIN_REGISTRATION") }}</span>
    <span v-else-if="isBridgechainResignation(type, typeGroup)">{{ $t("TRANSACTION.TYPES.BRIDGECHAIN_RESIGNATION") }}</span>
    <span v-else-if="isBridgechainUpdate(type, typeGroup)">{{ $t("TRANSACTION.TYPES.BRIDGECHAIN_UPDATE") }}</span>

    <span v-else-if="isNftTransfer(type, typeGroup)">
      <RouterLink v-tooltip="asset.nft.unik.tokenId" :to="{ name: 'unik', params: { id: asset.nft.unik.tokenId } }"
        >{{ $t("UNIK.TRANSFER") }}
      </RouterLink>
    </span>
    <span v-else-if="isNftUpdate(type, typeGroup)">
      <RouterLink v-tooltip="asset.nft.unik.tokenId" :to="{ name: 'unik', params: { id: asset.nft.unik.tokenId } }"
        >{{ $t("UNIK.UPDATE") }}
      </RouterLink>
    </span>
    <span v-else-if="isNftMint(type, typeGroup)">
      <RouterLink v-tooltip="asset.nft.unik.tokenId" :to="{ name: 'unik', params: { id: asset.nft.unik.tokenId } }"
        >{{ $t("UNIK.CREATION") }}
      </RouterLink>
    </span>
    <span v-else-if="isUnsDiscloseExplicit(type, typeGroup)">
      <RouterLink
        v-tooltip="asset['disclose-demand'].payload.sub"
        :to="{ name: 'unik', params: { id: asset['disclose-demand'].payload.sub } }"
        >{{ $t("UNIK.DISCLOSE") }}
      </RouterLink>
    </span>
  </span>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { mapGetters } from "vuex";
import { IDelegate } from "@/interfaces";

@Component({
  computed: {
    ...mapGetters("delegates", ["delegates"]),
    ...mapGetters("network", ["knownWallets"]),
  },
})
export default class LinkWallet extends Vue {
  @Prop({ required: false, default: "" }) public address: string;
  @Prop({ required: false, default: null }) public asset: { [key: string]: [any] } | null;
  @Prop({ required: false, default: "" }) public publicKey: string;
  @Prop({ required: false, default: 0 }) public type: number;
  @Prop({ required: false, default: 1 }) public typeGroup: number;
  @Prop({ required: false, default: true }) public trunc: boolean;
  @Prop({ required: false, default: "top" }) public tooltipPlacement: string;

  private delegate: IDelegate | null | undefined = null;
  private votedDelegate: IDelegate | null | undefined = null;
  private delegates: [IDelegate];
  private knownWallets: { [key: string]: string };

  get isKnown(): string {
    return this.knownWallets[this.address];
  }

  get walletAddress(): string {
    return this.delegate ? this.delegate.address : this.address;
  }

  get hasDefaultSlot(): boolean {
    return !!this.$slots.default;
  }

  get getVoteColor(): string {
    return this.isUnvote ? "text-red" : "text-green";
  }

  get isUnvote(): boolean {
    if (this.asset && this.asset.votes) {
      const vote = this.asset.votes[0];
      return vote.charAt(0) === "-";
    }
    return false;
  }

  get votePublicKey(): string {
    if (this.asset && this.asset.votes) {
      const vote = this.asset.votes[0];
      return vote.substr(1);
    }
    return "";
  }

  get votedDelegateAddress(): string {
    return this.votedDelegate ? this.votedDelegate.address : "";
  }

  get votedDelegateUsername(): string {
    return this.votedDelegate ? this.votedDelegate.username : "";
  }

  get multiPaymentRecipientsCount() {
    if (this.asset && this.asset.payments) {
      return this.asset.payments.length;
    }
    return 0;
  }

  @Watch("delegates")
  public onDelegateChanged() {
    this.determine();
  }

  @Watch("address")
  public onAddressChanged() {
    this.determine();
  }

  @Watch("publicKey")
  public onPublicKeyChanged() {
    this.determine();
  }

  public mounted(): void {
    this.determine();
  }

  private determine(): void {
    this.address ? this.findByAddress() : this.findByPublicKey();
    if (this.votePublicKey) {
      this.determineVote();
    }
  }

  private determineVote(): void {
    this.votedDelegate = this.delegates.find(d => d.publicKey === this.votePublicKey);
  }

  private findByAddress(): void {
    this.delegate = this.delegates.find(d => d.address === this.address);
  }

  private findByPublicKey(): void {
    this.delegate = this.delegates.find(d => d.publicKey === this.publicKey);
  }

  private getAddress(): string | false {
    const knownOrDelegate = this.isKnown || this.delegate;
    const truncated = !this.hasDefaultSlot && this.trunc;

    if (knownOrDelegate || truncated) {
      return this.walletAddress;
    }

    return false;
  }
}
</script>
