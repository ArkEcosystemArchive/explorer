<template>
  <span class="block md:inline-block">
    <template v-if="typeGroup === typeGroupTransaction.CORE">
      <template v-if="type === coreTransaction.TRANSFER">
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

      <span v-else-if="type === coreTransaction.SECOND_SIGNATURE">{{ $t("TRANSACTION.TYPES.SECOND_SIGNATURE") }}</span>
      <span v-else-if="type === coreTransaction.DELEGATE_REGISTRATION">{{
        $t("TRANSACTION.TYPES.DELEGATE_REGISTRATION")
      }}</span>
      <span v-else-if="type === coreTransaction.VOTE">
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
      <span v-else-if="type === coreTransaction.MULTI_SIGNATURE">{{ $t("TRANSACTION.TYPES.MULTI_SIGNATURE") }}</span>
      <span v-else-if="type === coreTransaction.IPFS">{{ $t("TRANSACTION.TYPES.IPFS") }}</span>
      <span v-else-if="type === coreTransaction.MULTI_PAYMENT"
        >{{ $t("TRANSACTION.TYPES.MULTI_PAYMENT") }} ({{ multiPaymentRecipientsCount }})</span
      >
      <span v-else-if="type === coreTransaction.DELEGATE_RESIGNATION">{{
        $t("TRANSACTION.TYPES.DELEGATE_RESIGNATION")
      }}</span>
      <span v-else-if="type === coreTransaction.TIMELOCK">{{ $t("TRANSACTION.TYPES.TIMELOCK") }}</span>
      <span v-else-if="type === coreTransaction.TIMELOCK_CLAIM">{{ $t("TRANSACTION.TYPES.TIMELOCK_CLAIM") }}</span>
      <span v-else-if="type === coreTransaction.TIMELOCK_REFUND">{{ $t("TRANSACTION.TYPES.TIMELOCK_REFUND") }}</span>
    </template>
    <template v-else-if="typeGroup === typeGroupTransaction.MAGISTRATE">
      <span v-if="type === magistrateTransaction.BUSINESS_REGISTRATION">{{
        $t("TRANSACTION.TYPES.BUSINESS_REGISTRATION")
      }}</span>
      <span v-else-if="type === magistrateTransaction.BUSINESS_RESIGNATION">{{
        $t("TRANSACTION.TYPES.BUSINESS_RESIGNATION")
      }}</span>
      <span v-else-if="type === magistrateTransaction.BUSINESS_UPDATE">{{
        $t("TRANSACTION.TYPES.BUSINESS_UPDATE")
      }}</span>
      <span v-else-if="type === magistrateTransaction.BRIDGECHAIN_REGISTRATION">{{
        $t("TRANSACTION.TYPES.BRIDGECHAIN_REGISTRATION")
      }}</span>
      <span v-else-if="type === magistrateTransaction.BRIDGECHAIN_RESIGNATION">{{
        $t("TRANSACTION.TYPES.BRIDGECHAIN_RESIGNATION")
      }}</span>
      <span v-else-if="type === magistrateTransaction.BRIDGECHAIN_UPDATE">{{
        $t("TRANSACTION.TYPES.BRIDGECHAIN_UPDATE")
      }}</span>
    </template>
  </span>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { mapGetters } from "vuex";
import { IDelegate } from "@/interfaces";
import { CoreTransaction, MagistrateTransaction, TypeGroupTransaction } from "@/enums";

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

  get coreTransaction() {
    return CoreTransaction;
  }

  get magistrateTransaction() {
    return MagistrateTransaction;
  }

  get typeGroupTransaction() {
    return TypeGroupTransaction;
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
