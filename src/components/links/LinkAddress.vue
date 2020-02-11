<template>
  <div :class="containerClass">
    <RouterLink v-if="isKnown" :to="{ name: 'wallet', params: { address: walletAddress } }" class="flex items-center">
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
  </div>
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
export default class LinkAddress extends Vue {
  @Prop({ required: false, default: "" }) public address: string;
  @Prop({ required: false, default: "" }) public publicKey: string;
  @Prop({ required: false, default: true }) public trunc: boolean;
  @Prop({ required: false, default: "top" }) public tooltipPlacement: string;
  @Prop({ required: false, default: "" }) public containerClass: string;

  private delegate: IDelegate | null | undefined = null;
  private delegates: IDelegate[];
  private knownWallets: { [key: string]: string };

  get isKnown(): string {
    return this.knownWallets[this.address];
  }

  get hasDefaultSlot(): boolean {
    return !!this.$slots.default;
  }

  get walletAddress(): string {
    return this.delegate ? this.delegate.address : this.address;
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
  }

  private findByAddress(): void {
    this.delegate = this.delegates.find((d) => d.address === this.address);
  }

  private findByPublicKey(): void {
    this.delegate = this.delegates.find((d) => d.publicKey === this.publicKey);
  }

  private getAddress(): string | boolean {
    const knownOrDelegate = this.isKnown || this.delegate;
    const truncated = !this.hasDefaultSlot && this.trunc;

    if (knownOrDelegate || truncated) {
      return this.walletAddress;
    }

    return false;
  }
}
</script>
