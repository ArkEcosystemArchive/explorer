<template>
  <span class="block md:inline-block">
    <template v-if="typeGroup === 1">
      <template v-if="type === defaultTransaction.TRANSFER">
        <RouterLink v-if="isKnown" :to="{ name: 'wallet', params: { address: walletAddress } }" class="flex items-center">
          <span
            v-tooltip="{
              content: getAddress(),
              placement: tooltipPlacement,
            }"
          >
            {{ knownWallets[address] }}
          </span>
          <svg
            v-tooltip="{
              content: $t('WALLET.VERIFIED'),
              placement: tooltipPlacement,
            }"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="16px"
            height="17px"
            class="flex flex-none ml-2"
          >
            <path
              fill-rule="evenodd"
              fill="currentColor"
              d="M7.1,14.88c-0.37,0-1.94,0-3.93,0c-0.6,0-0.92-1.14-0.83-1.88c0.21-2.7,1.88-4.03,3.24-5.3 C6.05,7.9,6.56,8.01,7.1,8.01c0.63,0,1.22-0.16,1.75-0.43C8.87,7.59,8.88,7.6,8.9,7.62c0.5,0.47,1,0.95,1.46,1.49 c0.1,0.12,0.15,0.17,0.3,0.38c0.15,0.2,1.71-0.93,1.27-1.45c-0.16-0.16-0.22-0.26-0.33-0.38c-0.44-0.5-0.88-0.92-1.29-1.32 c0.45-0.64,0.72-1.42,0.72-2.26c0-2.17-1.76-3.93-3.93-3.93c-2.17,0-3.93,1.76-3.93,3.93c0,0.93,0.34,1.78,0.88,2.45 c-1.55,1.5-3.83,3.98-3.83,7.3c0,1.89,0.91,3.01,1.97,3.01c2.18,0,3.38,0,3.93,0C7.03,16.85,7.65,14.88,7.1,14.88z M7.1,2.12 c1.08,0,1.96,0.88,1.96,1.96c0,1.08-0.88,1.96-1.96,1.96c-1.08,0-1.96-0.88-1.96-1.96C5.14,3,6.02,2.12,7.1,2.12z M15.79,10.79 l-0.69-0.67c-0.09-0.09-0.21-0.14-0.34-0.14c-0.14,0-0.25,0.05-0.34,0.14l-3.32,3.26L9.6,11.91c-0.09-0.09-0.21-0.14-0.34-0.14 s-0.25,0.05-0.34,0.14l-0.69,0.67c-0.09,0.09-0.14,0.2-0.14,0.34c0,0.13,0.05,0.24,0.14,0.34l1.83,1.79l0.69,0.67 c0.09,0.09,0.21,0.14,0.34,0.14s0.25-0.05,0.34-0.14l0.69-0.67l3.67-3.59c0.09-0.09,0.14-0.2,0.14-0.34 C15.94,10.99,15.89,10.88,15.79,10.79z"
            />
          </svg>
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

      <span v-else-if="type === defaultTransaction.SECOND_SIGNATURE">{{ $t("TRANSACTION.TYPES.SECOND_SIGNATURE") }}</span>
      <span v-else-if="type === defaultTransaction.DELEGATE_REGISTRATION">{{ $t("TRANSACTION.TYPES.DELEGATE_REGISTRATION") }}</span>
      <span v-else-if="type === defaultTransaction.VOTE">
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
      <span v-else-if="type === defaultTransaction.MULTI_SIGNATURE">{{ $t("TRANSACTION.TYPES.MULTI_SIGNATURE") }}</span>
      <span v-else-if="type === defaultTransaction.IPFS">{{ $t("TRANSACTION.TYPES.IPFS") }}</span>
      <span v-else-if="type === defaultTransaction.MULTI_PAYMENT">{{ $t("TRANSACTION.TYPES.MULTI_PAYMENT") }} ({{ multiPaymentRecipientsCount }})</span>
      <span v-else-if="type === defaultTransaction.DELEGATE_RESIGNATION">{{ $t("TRANSACTION.TYPES.DELEGATE_RESIGNATION") }}</span>
      <span v-else-if="type === defaultTransaction.TIMELOCK">{{ $t("TRANSACTION.TYPES.TIMELOCK") }}</span>
      <span v-else-if="type === defaultTransaction.TIMELOCK_CLAIM">{{ $t("TRANSACTION.TYPES.TIMELOCK_CLAIM") }}</span>
      <span v-else-if="type === defaultTransaction.TIMELOCK_REFUND">{{ $t("TRANSACTION.TYPES.TIMELOCK_REFUND") }}</span>
    </template>
    <template v-else-if="typeGroup === 2">
      <span v-if="type === marketplaceTransaction.BUSINESS_REGISTRATION">{{ $t("TRANSACTION.TYPES.BUSINESS_REGISTRATION") }}</span>
      <span v-else-if="type === marketplaceTransaction.BUSINESS_RESIGNATION">{{ $t("TRANSACTION.TYPES.BUSINESS_RESIGNATION") }}</span>
      <span v-else-if="type === marketplaceTransaction.BUSINESS_UPDATE">{{ $t("TRANSACTION.TYPES.BUSINESS_UPDATE") }}</span>
      <span v-else-if="type === marketplaceTransaction.BRIDGECHAIN_REGISTRATION">{{ $t("TRANSACTION.TYPES.BRIDGECHAIN_REGISTRATION") }}</span>
      <span v-else-if="type === marketplaceTransaction.BRIDGECHAIN_RESIGNATION">{{ $t("TRANSACTION.TYPES.BRIDGECHAIN_RESIGNATION") }}</span>
      <span v-else-if="type === marketplaceTransaction.BRIDGECHAIN_UPDATE">{{ $t("TRANSACTION.TYPES.BRIDGECHAIN_UPDATE") }}</span>
    </template>
  </span>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { mapGetters } from "vuex";
import { IDelegate } from "@/interfaces";
import { DefaultTransaction, MarketplaceTransaction } from "@/enums";

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

  get defaultTransaction() {
    return DefaultTransaction;
  }

  get marketplaceTransaction() {
    return MarketplaceTransaction;
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
