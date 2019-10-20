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
  @Prop({ required: false, default: false }) public isFee: boolean;
  @Prop({ required: false, default: "top" }) public tooltipPlacement: string;

  get source() {
    return this.isFee ? this.transaction.fee : this.transaction.amount;
  }

  get price() {
    return this.transaction.price;
  }

  get isTransfer() {
    if (this.type !== undefined) {
      // 0 = transfer, 6 = timelock transfer, 7 = multipayment
      return this.type === 0 || this.type === 6 || this.type === 7;
    }
    return false;
  }
}
</script>
