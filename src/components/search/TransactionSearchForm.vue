<template>
  <div class="mb-5 mx-5 sm:mx-10 mb-10" id="transactionForm">
    <p class="font-bold mb-4">Additional Parameters</p>

    <div class="flex flex-wrap justify-between">
      <div class="w-full lg:w-64 mb-4 lg:mb-0">
        <InputSelect
          @input="onTypeChange"
          :selectOptions="selectOptions"
          :label="$t('COMMON.TYPE')"
          name="Transaction Types"
          class="flex-1"
        />
      </div>

      <div class="flex w-full lg:w-56 mb-4 lg:mb-0">
        <div class="w-1/2">
          <InputNumber
            @input="onInputChange"
            @keyup.enter.native="onEnterKey"
            class="mr-3"
            :label="$t('PAGES.ADVANCED_SEARCH.TRANSACTION.AMOUNT_FROM')"
            name="amount-from"
            min="0"
          />
        </div>

        <div class="w-1/2">
          <InputNumber
            @input="onInputChange"
            @keyup.enter.native="onEnterKey"
            :label="$t('PAGES.ADVANCED_SEARCH.TRANSACTION.AMOUNT_TO')"
            name="amount-to"
          />
        </div>
      </div>

      <div class="flex w-full lg:w-56 mb-4 lg:mb-0">
        <div class="w-1/2">
          <InputNumber
            @input="onInputChange"
            @keyup.enter.native="onEnterKey"
            class="mr-3"
            :label="$t('PAGES.ADVANCED_SEARCH.TRANSACTION.FEE_FROM')"
            name="fee-from"
          />
        </div>
        <div class="w-1/2">
          <InputNumber
            @input="onInputChange"
            @keyup.enter.native="onEnterKey"
            :label="$t('PAGES.ADVANCED_SEARCH.TRANSACTION.FEE_TO')"
            name="fee-to"
          />
        </div>
      </div>

      <div class="flex w-full lg:w-auto mb-4 lg:mb-0">
        <div class="w-1/2">
          <InputDate
            @input="onInputChange"
            @keyup.enter.native="onEnterKey"
            class="mr-3"
            :label="$t('PAGES.ADVANCED_SEARCH.GENERIC.DATE_FROM')"
            name="timestamp-from"
          />
        </div>
        <div class="w-1/2">
          <InputDate
            @input="onInputChange"
            @keyup.enter.native="onEnterKey"
            :label="$t('PAGES.ADVANCED_SEARCH.GENERIC.DATE_TO')"
            name="timestamp-to"
          />
        </div>
      </div>
    </div>

    <InputText
      @input="onInputChange"
      @keyup.enter.native="onEnterKey"
      :label="$t('TRANSACTION.SMARTBRIDGE')"
      name="vendorField"
      class="pt-0"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { InputText, InputNumber, InputDate, InputSelect } from "./input";
import { CoreTransaction, MagistrateTransaction, TypeGroupTransaction } from "@/enums";
import { ITransactionType } from "@/interfaces";

@Component({
  components: {
    InputText,
    InputNumber,
    InputDate,
    InputSelect,
  },
})
export default class TransactionSearchForm extends Vue {
  private types: ITransactionType[] = [
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
  ];

  get selectOptions() {
    return this.types.map(type => ({ value: type.key, display: this.$t(`TRANSACTION.TYPES.${type.key}`) }));
  }

  private onInputChange(event: any) {
    const { name, value } = event.target;

    this.emitInput({ name, value });
  }

  private onTypeChange(event: any) {
    const index: number = this.types.findIndex(transaction => transaction.key === event.target.value);
    const { type, typeGroup } = this.types[index];

    this.emitInput({ name: "type", value: type });
    this.emitInput({ name: "typeGroup", value: typeGroup });
  }

  private emitInput(value: object) {
    this.$emit("formChange", value);
  }

  private onEnterKey(event: any) {
    this.$emit("search");
  }
}
</script>
