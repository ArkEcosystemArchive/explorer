<template>
  <span
    v-tooltip="{
      trigger: 'hover click',
      content: source && price ? readableCurrency(source, price) : '',
      placement: 'top',
    }"
    :class="
      !isFee
        ? {
            'text-red': transaction.sender === $route.params.address,
            'text-green': transaction.recipient === $route.params.address && isTransfer,
          }
        : ''
    "
    class="whitespace-no-wrap"
  >
    {{ readableCrypto(source) }}
  </span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ITransaction } from "@/interfaces";

@Component
export default class TransactionAmount extends Vue {
  @Prop({ required: true }) public transaction: ITransaction;
  @Prop({ required: false, default: null }) public type: number;
  @Prop({ required: false, default: 1 }) public typeGroup: number;
  @Prop({ required: false, default: false }) public isFee: boolean;

  get source() {
    if (this.isFee) {
      return this.transaction.fee;
    }
    if (this.type === 6 && this.typeGroup === 1) {
      return !this.$route.params.address || this.transaction.sender === this.$route.params.address
        ? // Needed for ts-ignore
          // @ts-ignore
          this.calculateMultipaymentAmount(this.transaction)
        : // Needed for ts-ignore
          // @ts-ignore
          this.fetchWalletAmountFromMultipayment(this.transaction, this.$route.params.address);
    }
    return this.transaction.amount;
  }

  get price() {
    return this.transaction.price;
  }

  get isTransfer() {
    if (this.type !== undefined) {
      // 0 = transfer, 8 = timelock
      return (this.type === 0 || this.type === 8) && this.typeGroup === 1;
      }
    return false;
  }
}
</script>
