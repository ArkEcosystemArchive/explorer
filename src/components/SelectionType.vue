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

        <svg
          :class="{ 'rotate-180': isOpen }"
          xmlns="http://www.w3.org/2000/svg"
          class="fill-current"
          viewBox="0 0 20 20"
          width="16px"
          height="16px"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
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
        <svg
          :class="{ 'rotate-180': isOpen }"
          class="fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          width="16px"
          height="16px"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
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
import { DefaultTransaction, MarketplaceTransaction } from "@/enums";
import { ITransactionType } from "@/interfaces";

@Component
export default class SelectionType extends Vue {
  @Prop({ required: false, default: false }) public inBanner: boolean;
  // TODO: use enums for types
  private types: ITransactionType[] = [
    { key: "ALL", type: -1 },
    { key: "TRANSFER", type: 0, typeGroup: 1 },
    { key: "SECOND_SIGNATURE", type: 1, typeGroup: 1 },
    { key: "DELEGATE_REGISTRATION", type: 2, typeGroup: 1 },
    { key: "VOTE", type: 3, typeGroup: 1 },
    { key: "MULTI_SIGNATURE", type: 4, typeGroup: 1 },
    { key: "IPFS", type: 5, typeGroup: 1 },
    { key: "MULTI_PAYMENT", type: 6, typeGroup: 1 },
    { key: "DELEGATE_RESIGNATION", type: 7, typeGroup: 1 },
    { key: "TIMELOCK", type: 8, typeGroup: 1 },
    { key: "TIMELOCK_CLAIM", type: 9, typeGroup: 1 },
    { key: "TIMELOCK_REFUND", type: 10, typeGroup: 1 },
    { key: "BUSINESS_REGISTRATION", type: 0, typeGroup: 2 },
    { key: "BUSINESS_RESIGNATION", type: 1, typeGroup: 2 },
    { key: "BUSINESS_UPDATE", type: 2, typeGroup: 2 },
    { key: "BRIDGECHAIN_REGISTRATION", type: 3, typeGroup: 2 },
    { key: "BRIDGECHAIN_RESIGNATION", type: 4, typeGroup: 2 },
    { key: "BRIDGECHAIN_UPDATE", type: 5, typeGroup: 2 },
  ];
  private transactionType: ITransactionType = { key: "ALL", type: -1 };
  private selectOpen: boolean = false;

  // TODO: add migration for new transactionType stuff

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
    return this.inBanner ? "grey" : "theme-text-secondary";
  }

  get bannerClasses() {
    return `bg-${this.backgroundColor} text-${this.secondaryTextColor}`;
  }

  public created() {
    const savedType = localStorage.getItem("transactionType");
    this.transactionType = savedType ? JSON.parse(savedType) : { key: "ALL", type: -1 }
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
