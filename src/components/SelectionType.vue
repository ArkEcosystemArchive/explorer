<template>
  <span
    v-click-outside="closeDropdown"
    :class="{ 'sm:mb-4': !inBanner }"
    class="SelectionType w-full sm:w-auto sm:mr-10"
  >
    <div class="flex sm:hidden w-full">
      <span
        :class="`bg-${backgroundColor} text-${secondaryTextColor}`"
        class="flex items-center rounded-l py-4 px-6 text-xs"
      >
        {{ $t("COMMON.TYPE") }}
      </span>

      <span
        :class="`border-${backgroundColor} text-${primaryTextColor}`"
        class="flex flex-1 items-center justify-between border rounded-r cursor-pointer p-4"
        @click="toggleDropdown"
      >
        <span class="font-bold">
          {{ $t(`TRANSACTION.TYPES.${transactionType.key}`) }}
        </span>

        <SvgIcon :class="{ 'rotate-180': isOpen }" name="caret" view-box="0 0 16 16" />
      </span>

      <ul v-show="isOpen" class="SelectionType--options inset-x-0 mt-10">
        <li v-for="type in types" :key="type.key">
          <div class="dropdown-button" @click="filterTransactions(type)">
            {{ $t(`TRANSACTION.TYPES.${type.key}`) }}
          </div>
        </li>
      </ul>
    </div>

    <div class="hidden sm:block">
      <span :class="[inBanner ? bannerClasses : 'text-theme-text-thead']" class="block mb-2 text-xs">
        {{ $t("COMMON.TYPE") }}
      </span>

      <span
        :class="`border-${backgroundColor} text-${primaryTextColor}`"
        class="flex items-center cursor-pointer"
        @click="toggleDropdown"
      >
        <span class="mr-1 md:whitespace-no-wrap">{{ $t(`TRANSACTION.TYPES.${transactionType.key}`) }}</span>

        <SvgIcon :class="{ 'rotate-180': isOpen }" name="caret" view-box="0 0 16 16" />
      </span>

      <ul v-show="isOpen" class="SelectionType--options right-0 mt-2">
        <li v-for="type in types" :key="type.key">
          <div class="dropdown-button" @click="filterTransactions(type)">
            {{ $t(`TRANSACTION.TYPES.${type.key}`) }}
          </div>
        </li>
      </ul>
    </div>
  </span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { CoreTransaction, MagistrateTransaction, TypeGroupTransaction, NftTransaction, UNSTransaction } from "@/enums";
import { ITransactionType } from "@/interfaces";

@Component
export default class SelectionType extends Vue {
  @Prop({ required: false, default: false }) public inBanner: boolean;
  private types: ITransactionType[] = [
    { key: "ALL", type: -1 },
    { key: "TRANSFER", type: CoreTransaction.TRANSFER, typeGroup: TypeGroupTransaction.CORE },
    { key: "SECOND_SIGNATURE", type: CoreTransaction.SECOND_SIGNATURE, typeGroup: TypeGroupTransaction.CORE },
    { key: "DELEGATE_REGISTRATION", type: CoreTransaction.DELEGATE_REGISTRATION, typeGroup: TypeGroupTransaction.CORE },
    { key: "VOTE", type: CoreTransaction.VOTE, typeGroup: TypeGroupTransaction.CORE },
    { key: "MULTI_SIGNATURE", type: CoreTransaction.MULTI_SIGNATURE, typeGroup: TypeGroupTransaction.CORE },
    { key: "IPFS", type: CoreTransaction.IPFS, typeGroup: TypeGroupTransaction.CORE },
    { key: "MULTI_PAYMENT", type: CoreTransaction.MULTI_PAYMENT, typeGroup: TypeGroupTransaction.CORE },
    { key: "DELEGATE_RESIGNATION", type: CoreTransaction.DELEGATE_RESIGNATION, typeGroup: TypeGroupTransaction.CORE },
    { key: "TIMELOCK", type: CoreTransaction.TIMELOCK, typeGroup: TypeGroupTransaction.CORE },
    { key: "TIMELOCK_CLAIM", type: CoreTransaction.TIMELOCK_CLAIM, typeGroup: TypeGroupTransaction.CORE },
    { key: "TIMELOCK_REFUND", type: CoreTransaction.TIMELOCK_REFUND, typeGroup: TypeGroupTransaction.CORE },
    {
      key: "BUSINESS_REGISTRATION",
      type: MagistrateTransaction.BUSINESS_REGISTRATION,
      typeGroup: TypeGroupTransaction.MAGISTRATE,
    },
    {
      key: "BUSINESS_RESIGNATION",
      type: MagistrateTransaction.BUSINESS_RESIGNATION,
      typeGroup: TypeGroupTransaction.MAGISTRATE,
    },
    { key: "BUSINESS_UPDATE", type: MagistrateTransaction.BUSINESS_UPDATE, typeGroup: TypeGroupTransaction.MAGISTRATE },
    {
      key: "BRIDGECHAIN_REGISTRATION",
      type: MagistrateTransaction.BRIDGECHAIN_REGISTRATION,
      typeGroup: TypeGroupTransaction.MAGISTRATE,
    },
    {
      key: "BRIDGECHAIN_RESIGNATION",
      type: MagistrateTransaction.BRIDGECHAIN_RESIGNATION,
      typeGroup: TypeGroupTransaction.MAGISTRATE,
    },
    {
      key: "BRIDGECHAIN_UPDATE",
      type: MagistrateTransaction.BRIDGECHAIN_UPDATE,
      typeGroup: TypeGroupTransaction.MAGISTRATE,
    },
    {
      key: "UNIK_CREATION",
      type: NftTransaction.NFT_MINT,
      typeGroup: TypeGroupTransaction.NFT,
    },
    {
      key: "UNIK_UPDATE",
      type: NftTransaction.NFT_UPDATE,
      typeGroup: TypeGroupTransaction.NFT,
    },
    {
      key: "UNIK_TRANSFER",
      type: NftTransaction.NFT_TRANSFER,
      typeGroup: TypeGroupTransaction.NFT,
    },
    {
      key: "UNS_DISCLOSE",
      type: UNSTransaction.DISCLOSE_EXPLICIT,
      typeGroup: TypeGroupTransaction.UNS,
    },
  ];
  private transactionType: ITransactionType = { key: "ALL", type: -1 };
  private selectOpen: boolean = false;

  get isOpen() {
    return this.selectOpen;
  }

  get backgroundColor() {
    return this.inBanner ? "none" : "theme-page-background";
  }

  get primaryTextColor() {
    return this.inBanner ? "white" : "theme-text-primary";
  }

  get secondaryTextColor() {
    return this.inBanner ? "grey" : "theme-content-background";
  }

  get bannerClasses() {
    return `bg-${this.backgroundColor} text-${this.secondaryTextColor}`;
  }

  public created() {
    const savedType = localStorage.getItem("transactionType");
    this.transactionType = savedType ? JSON.parse(savedType) : { key: "ALL", type: -1 };
  }

  private filterTransactions(type: ITransactionType) {
    this.closeDropdown();
    this.setTransactionType(type);
    this.$emit("change", type);
  }

  private setTransactionType(type: ITransactionType) {
    localStorage.setItem("transactionType", JSON.stringify(type));
    this.transactionType = type;
  }

  private closeDropdown() {
    this.selectOpen = false;
  }

  private toggleDropdown() {
    this.selectOpen = !this.selectOpen;
  }
}
</script>

<style scoped>
.SelectionType {
  @apply .flex .relative .z-20;
}

.SelectionType--options {
  max-height: 15rem;
  @apply .absolute .bg-theme-content-background .shadow-theme .rounded .border .overflow-hidden .text-sm .overflow-y-auto;
}
</style>
