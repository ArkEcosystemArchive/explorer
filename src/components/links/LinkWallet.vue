<template>
  <span class="flex items-center">
    <template v-if="isTransfer(type, typeGroup, asset) || isTimelock(type, typeGroup, asset)">
      <span v-if="showAsType">
        {{ $t(`TRANSACTION.TYPES.${isTransfer(type, typeGroup, asset) ? "TRANSFER" : "TIMELOCK"}`) }}
        {{ asset }}
      </span>
      <div v-else class="flex items-center w-full">
        <LinkAddress
          :address="addressResolved"
          :public-key="publicKey"
          :trunc="trunc"
          :tooltip-placement="tooltipPlacement"
          container-class="w-full"
        />
        <div v-if="isTimelock(type, typeGroup, asset) && showTimelockIcon">
          <SvgIcon
            v-tooltip="{
              content: $t('WALLET.TIMELOCK_TRANSACTION'),
              placement: tooltipPlacement,
            }"
            class="ml-1"
            name="became-active"
            view-box="0 0 14 15"
          />
        </div>
      </div>
    </template>

    <span v-else-if="isSecondSignature(type, typeGroup, asset)">{{ $t("TRANSACTION.TYPES.SECOND_SIGNATURE") }}</span>
    <span v-else-if="isDelegateRegistration(type, typeGroup, asset)">{{
      $t("TRANSACTION.TYPES.DELEGATE_REGISTRATION")
    }}</span>
    <span v-else-if="isVote(type, typeGroup, asset)">
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
    <span v-else-if="isMultiSignature(type, typeGroup, asset)">{{ $t("TRANSACTION.TYPES.MULTI_SIGNATURE") }}</span>
    <span v-else-if="isIpfs(type, typeGroup, asset)">{{ $t("TRANSACTION.TYPES.IPFS") }}</span>
    <span v-else-if="isMultiPayment(type, typeGroup, asset)"
      >{{ $t("TRANSACTION.TYPES.MULTI_PAYMENT") }} ({{ multiPaymentRecipientsCount }})</span
    >
    <span v-else-if="isDelegateResignation(type, typeGroup, asset)">{{
      $t("TRANSACTION.TYPES.DELEGATE_RESIGNATION")
    }}</span>
    <span v-else-if="isTimelockClaim(type, typeGroup, asset)">{{ $t("TRANSACTION.TYPES.TIMELOCK_CLAIM") }}</span>
    <span v-else-if="isTimelockRefund(type, typeGroup, asset)">{{ $t("TRANSACTION.TYPES.TIMELOCK_REFUND") }}</span>
    <span v-else-if="isBusinessEntityRegistration(type, typeGroup, asset)">{{
      $t("TRANSACTION.TYPES.BUSINESS_ENTITY_REGISTRATION")
    }}</span>
    <span v-else-if="isBusinessEntityResignation(type, typeGroup, asset)">{{
      $t("TRANSACTION.TYPES.BUSINESS_ENTITY_RESIGNATION")
    }}</span>
    <span v-else-if="isBusinessEntityUpdate(type, typeGroup, asset)">{{
      $t("TRANSACTION.TYPES.BUSINESS_ENTITY_UPDATE")
    }}</span>
    <span v-else-if="isProductEntityRegistration(type, typeGroup, asset)">{{
      $t("TRANSACTION.TYPES.PRODUCT_ENTITY_REGISTRATION")
    }}</span>
    <span v-else-if="isProductEntityResignation(type, typeGroup, asset)">{{
      $t("TRANSACTION.TYPES.PRODUCT_ENTITY_RESIGNATION")
    }}</span>
    <span v-else-if="isProductEntityUpdate(type, typeGroup, asset)">{{
      $t("TRANSACTION.TYPES.PRODUCT_ENTITY_UPDATE")
    }}</span>
    <span v-else-if="isPluginEntityRegistration(type, typeGroup, asset)">{{
      $t("TRANSACTION.TYPES.PLUGIN_ENTITY_REGISTRATION")
    }}</span>
    <span v-else-if="isPluginEntityResignation(type, typeGroup, asset)">{{
      $t("TRANSACTION.TYPES.PLUGIN_ENTITY_RESIGNATION")
    }}</span>
    <span v-else-if="isPluginEntityUpdate(type, typeGroup, asset)">{{
      $t("TRANSACTION.TYPES.PLUGIN_ENTITY_UPDATE")
    }}</span>
    <span v-else-if="isModuleEntityRegistration(type, typeGroup, asset)">{{
      $t("TRANSACTION.TYPES.MODULE_ENTITY_REGISTRATION")
    }}</span>
    <span v-else-if="isModuleEntityResignation(type, typeGroup, asset)">{{
      $t("TRANSACTION.TYPES.MODULE_ENTITY_RESIGNATION")
    }}</span>
    <span v-else-if="isModuleEntityUpdate(type, typeGroup, asset)">{{
      $t("TRANSACTION.TYPES.MODULE_ENTITY_UPDATE")
    }}</span>
    <span v-else-if="isDelegateEntityRegistration(type, typeGroup, asset)">{{
      $t("TRANSACTION.TYPES.DELEGATE_ENTITY_REGISTRATION")
    }}</span>
    <span v-else-if="isDelegateEntityResignation(type, typeGroup, asset)">{{
      $t("TRANSACTION.TYPES.DELEGATE_ENTITY_RESIGNATION")
    }}</span>
    <span v-else-if="isDelegateEntityUpdate(type, typeGroup, asset)">{{
      $t("TRANSACTION.TYPES.DELEGATE_ENTITY_UPDATE")
    }}</span>
    <span v-else-if="isLegacyBusinessRegistration(type, typeGroup, asset)">{{
      $t("TRANSACTION.TYPES.LEGACY_BUSINESS_REGISTRATION")
    }}</span>
    <span v-else-if="isLegacyBusinessResignation(type, typeGroup, asset)">{{
      $t("TRANSACTION.TYPES.LEGACY_BUSINESS_RESIGNATION")
    }}</span>
    <span v-else-if="isLegacyBusinessUpdate(type, typeGroup, asset)">{{
      $t("TRANSACTION.TYPES.LEGACY_BUSINESS_UPDATE")
    }}</span>
    <span v-else-if="isLegacyBridgechainRegistration(type, typeGroup, asset)">{{
      $t("TRANSACTION.TYPES.LEGACY_BRIDGECHAIN_REGISTRATION")
    }}</span>
    <span v-else-if="isLegacyBridgechainResignation(type, typeGroup, asset)">{{
      $t("TRANSACTION.TYPES.LEGACY_BRIDGECHAIN_RESIGNATION")
    }}</span>
    <span v-else-if="isLegacyBridgechainUpdate(type, typeGroup, asset)">{{
      $t("TRANSACTION.TYPES.LEGACY_BRIDGECHAIN_UPDATE")
    }}</span>
    <span v-else-if="isUndefinedRegistration(type, typeGroup, asset)">{{
      $t("TRANSACTION.TYPES.UNDEFINED_REGISTRATION")
    }}</span>
    <span v-else-if="isUndefinedResignation(type, typeGroup, asset)">{{
      $t("TRANSACTION.TYPES.UNDEFINED_RESIGNATION")
    }}</span>
    <span v-else-if="isUndefinedUpdate(type, typeGroup, asset)">{{ $t("TRANSACTION.TYPES.UNDEFINED_UPDATE") }}</span>
    <!-- By default we simply link to a recipient as we don't know this type / typegroup combination -->
    <div v-else>
      <span v-if="showAsType">{{ $t("TRANSACTION.TYPES.UNDEFINED") }}</span>
      <LinkAddress
        v-else
        :address="addressResolved"
        :public-key="publicKey"
        :trunc="trunc"
        :tooltip-placement="tooltipPlacement"
      />
    </div>
  </span>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { mapGetters } from "vuex";
import { IDelegate } from "@/interfaces";
import LinkAddress from "./LinkAddress.vue";

@Component({
  components: {
    LinkAddress,
  },
  computed: {
    ...mapGetters("delegates", ["delegates"]),
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
  @Prop({ required: false, default: false }) public showTimelockIcon: boolean;
  @Prop({ required: false, default: false }) public showAsType: boolean;

  public addressResolved: string | undefined;

  private delegates: IDelegate[];

  public async mounted() {
    this.addressResolved = await this.address;
  }

  public data() {
    return {
      addressResolved: undefined,
    };
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

  get votedDelegate(): IDelegate | null {
    return this.votePublicKey ? this.delegates.find((d) => d.publicKey === this.votePublicKey) : null;
  }

  get votedDelegateAddress(): string {
    return this.votedDelegate ? this.votedDelegate.address : "";
  }

  get votedDelegateUsername(): string {
    return this.votedDelegate ? this.votedDelegate.username : "";
  }

  get multiPaymentRecipientsCount(): number {
    if (this.asset && this.asset.payments) {
      return this.asset.payments.length;
    }
    return 0;
  }
}
</script>
