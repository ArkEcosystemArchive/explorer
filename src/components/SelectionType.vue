<template>
  <span
    v-click-outside="closeDropdown"
    :class="{ 'sm:mb-4': !inBanner }"
    class="w-full SelectionType sm:w-auto sm:mr-10"
  >
    <div class="flex w-full sm:hidden">
      <span
        :class="`bg-${backgroundColor} text-${secondaryTextColor}`"
        class="flex items-center px-6 py-4 text-xs rounded-l"
      >
        {{ $t("COMMON.TYPE") }}
      </span>

      <span
        :class="`border-${backgroundColor} text-${primaryTextColor}`"
        class="flex items-center justify-between flex-1 p-4 border rounded-r cursor-pointer"
        @click="toggleDropdown"
      >
        <span class="font-bold">
          {{ $t(`TRANSACTION.TYPES.${transactionType.key}`) }}
        </span>

        <SvgIcon :class="{ 'rotate-180': isOpen }" name="caret" view-box="0 0 16 16" />
      </span>

      <ul v-show="isOpen" class="inset-x-0 mt-10 SelectionType--options">
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

      <ul v-show="isOpen" class="right-0 mt-2 SelectionType--options">
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
import { ITransactionType } from "@/interfaces";

@Component
export default class SelectionType extends Vue {
  @Prop({ required: false, default: false }) public inBanner: boolean;
  private transactionType: ITransactionType = { key: "ALL", type: -1 };
  private selectOpen = false;

  get types() {
    return this.$store.getters["network/enabledTransactionTypes"];
  }

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
