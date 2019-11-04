<template>
  <span
    v-tooltip="{
      trigger: 'hover click',
      content: source && price ? readableCurrency(source, price) : '',
      placement: tooltipPlacement,
    }"
    :class="
      !isFee
        ? {
            'text-red': isOutgoing,
            'text-green': isIncoming,
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
import { CoreTransaction, MagistrateTransaction, TypeGroupTransaction } from "@/enums";

@Component
export default class TransactionAmount extends Vue {
  @Prop({ required: true }) public transaction: ITransaction;
  @Prop({ required: false, default: null }) public type: number;
  @Prop({ required: false, default: 1 }) public typeGroup: number;
  @Prop({ required: false, default: false }) public isFee: boolean;
  @Prop({ required: false, default: "top" }) public tooltipPlacement: string;

  get source() {
    if (this.isFee) {
      return this.transaction.fee;
    }
    if (this.type === CoreTransaction.MULTI_PAYMENT && this.typeGroup === TypeGroupTransaction.CORE) {
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
      return (
        (this.type === CoreTransaction.TRANSFER || this.type === CoreTransaction.TIMELOCK) &&
        this.typeGroup === TypeGroupTransaction.CORE
      );
    }
    return false;
  }

  get isOutgoing() {
    if (this.transaction.type === CoreTransaction.TIMELOCK && this.typeGroup === TypeGroupTransaction.CORE) {
      return (
        (this.$route.params.address !== this.transaction.recipient &&
          this.transaction.lockStatus === CoreTransaction.TIMELOCK_CLAIM) ||
        (this.$route.params.address !== this.transaction.sender &&
          this.transaction.lockStatus === CoreTransaction.TIMELOCK_REFUND)
      );
    }
    return this.transaction.sender === this.$route.params.address;
  }

  get isIncoming() {
    if (this.transaction.type === CoreTransaction.TIMELOCK && this.typeGroup === TypeGroupTransaction.CORE) {
      return (
        this.$route.params.address !== this.transaction.sender &&
        this.transaction.lockStatus === CoreTransaction.TIMELOCK_CLAIM
      );
    }
    return this.transaction.recipient === this.$route.params.address && this.isTransfer;
  }
}
</script>
