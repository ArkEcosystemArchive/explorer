<template>
  <span
    :class="
      !isFee
        ? {
            'text-red': isOutgoing,
            'text-green': isIncoming,
          }
        : ''
    "
    class="flex items-center whitespace-no-wrap"
  >
    <span
      v-tooltip="{
        trigger: 'hover click',
        content: source && price ? readableCurrency(source, price) : '',
        placement: tooltipPlacement,
      }"
      class="ml-auto"
    >
      {{ readableCrypto(source) }}
    </span>
    <SvgIcon
      v-if="showAmountInformation"
      v-tooltip="{
        trigger: 'hover click',
        content: $t('TRANSACTION.AMOUNT_TO_SELF', { amount: readableCrypto(amountToSelf) }),
      }"
      class="ml-2"
      name="information"
      view-box="0 0 16 16"
    />
  </span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ITransaction } from "@/interfaces";
import { CoreTransaction, MagistrateTransaction, TypeGroupTransaction } from "@/enums";

@Component
export default class TransactionAmount extends Vue {
  @Prop({ required: true }) public transaction: ITransaction;
  @Prop({ required: false, default: false }) public isFee: boolean;
  @Prop({ required: false, default: "top" }) public tooltipPlacement: string;

  get transactionTab() {
    return this.$store.getters["ui/walletTransactionTab"];
  }

  get address() {
    return this.$route.params.address || this.transaction.sender !== this.$route.params.address
      ? this.$route.params.address
      : undefined;
  }

  get showAmountInformation() {
    return (
      !this.isFee && this.transactionTab === "all" && this.address && this.amountToSelf && !this.amountToSelf.isZero()
    );
  }

  get source() {
    if (this.isFee) {
      return this.transaction.fee;
    }

    // @ts-ignore
    if (this.isMultiPayment(this.transaction.type, this.transaction.typeGroup)) {
      // @ts-ignore
      return this.calculateMultipaymentAmount(this.transaction, this.address, this.transactionTab);
    }

    return this.transaction.amount;
  }

  get amountToSelf() {
    // @ts-ignore
    if (
      this.transaction.sender === this.address &&
      // @ts-ignore
      this.isMultiPayment(this.transaction.type, this.transaction.typeGroup)
    ) {
      // @ts-ignore
      return this.calculateMultipaymentAmount(this.transaction, this.address, "received");
    }
  }

  get price() {
    return this.transaction.price;
  }

  get isOutgoing() {
    // @ts-ignore
    if (this.isTimelock(this.transaction.type, this.transaction.typeGroup)) {
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
    if (this.isTimelock(this.transaction.type, this.transaction.typeGroup)) {
      return (
        this.$route.params.address !== this.transaction.sender &&
        this.transaction.lockStatus === CoreTransaction.TIMELOCK_CLAIM
      );
    }

    // @ts-ignore
    if (this.isMultiPayment(this.transaction.type, this.transaction.typeGroup)) {
      return (
        this.transaction.asset.payments.find((payment) => payment.recipientId === this.$route.params.address) &&
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
