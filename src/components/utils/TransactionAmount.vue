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

  get transactionTab() {
    return this.$store.getters["ui/walletTransactionTab"];
  }

  get source() {
    if (this.isFee) {
      return this.transaction.fee;
    }

    // @ts-ignore
    if (this.isMultiPayment(this.type, this.typeGroup)) {
      const address =
        this.$route.params.address || this.transaction.sender !== this.$route.params.address
          ? this.$route.params.address
          : undefined;

      // @ts-ignore
      return this.calculateMultipaymentAmount(this.transaction, address, this.transactionTab);
    }

    return this.transaction.amount;
  }

  get price() {
    return this.transaction.price;
  }

  get isOutgoing() {
    // @ts-ignore
    if (this.isTimelock(this.type, this.typeGroup)) {
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
    // @ts-ignore
    if (this.isTimelock(this.type, this.typeGroup)) {
      return (
        this.$route.params.address !== this.transaction.sender &&
        this.transaction.lockStatus === CoreTransaction.TIMELOCK_CLAIM
      );
    }

    // @ts-ignore
    if (this.isMultiPayment(this.type, this.typeGroup)) {
      return (
        this.transaction.asset.payments.find(payment => payment.recipientId === this.$route.params.address) &&
        (this.transactionTab === "received" || this.transaction.sender !== this.$route.params.address)
      );
    }

    return (
      this.transaction.recipient === this.$route.params.address &&
      // @ts-ignore
      this.isTransfer(this.transaction.type, this.transaction.typeGroup)
    );
  }
}
</script>
