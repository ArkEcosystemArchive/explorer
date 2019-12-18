<template>
  <section class="page-section mb-5 py-5 md:py-10 ">
    <GenericSearchForm
      :searchTypes="searchTypes"
      :searchType="searchType"
      :onSearchTypeChange="onSearchTypeChange"
      :onInputChange="onInputChange"
    />

    <div class="mb-5 mx-5 sm:mx-10">
      <p class="font-bold">Additional Parameters</p>

      <div class="flex flex-wrap justify-between my-4">
        <div class="w-full md:w-64 mb-4 md:mb-0">
          <InputSelect
            @input="onTypeChange"
            :items="typesLocale"
            :label="$t('COMMON.TYPE')"
            name="time-format"
            class="flex-1"
          />
        </div>

        <div class="flex w-full md:w-64 mb-4 md:mb-0">
          <div class="w-1/2">
            <InputDate
              @input="onInputChange"
              class="mr-3"
              :label="$t('PAGES.ADVANCED_SEARCH.TRANSACTION.DATE_FROM')"
              name="timestamp-from"
              errors=""
            />
          </div>
          <div class="w-1/2">
            <InputDate
              @input="onInputChange"
              :label="$t('PAGES.ADVANCED_SEARCH.TRANSACTION.DATE_TO')"
              name="timestamp-to"
              errors=""
            />
          </div>
        </div>

        <div class="flex w-full md:w-64 mb-4 md:mb-0">
          <div class="w-1/2">
            <InputNumber
              @input="onInputChange"
              class="mr-3"
              :label="$t('PAGES.ADVANCED_SEARCH.TRANSACTION.AMOUNT_FROM')"
              name="amount-from"
              errors=""
              min="0"
            />
          </div>

          <div class="w-1/2">
            <InputNumber
              @input="onInputChange"
              :label="$t('PAGES.ADVANCED_SEARCH.TRANSACTION.AMOUNT_TO')"
              name="amount-to"
              errors=""
            />
          </div>
        </div>

        <div class="flex w-full md:w-64 mb-4 md:mb-0">
          <div class="w-1/2">
            <InputNumber
              @input="onInputChange"
              class="mr-3"
              :label="$t('PAGES.ADVANCED_SEARCH.TRANSACTION.FEE_FROM')"
              name="fee-from"
              errors=""
            />
          </div>
          <div class="w-1/2">
            <InputNumber
              @input="onInputChange"
              :label="$t('PAGES.ADVANCED_SEARCH.TRANSACTION.FEE_TO')"
              name="fee-to"
              errors=""
            />
          </div>
        </div>
      </div>

      <InputText
        @input="onInputChange"
        :label="$t('TRANSACTION.SMARTBRIDGE')"
        name="vendorField"
        errors=""
        class="pt-0"
      />
    </div>

    <button class="button-lg" @click="search">
      Search
    </button>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { InputText, InputNumber, InputDate, InputSelect } from "./input";
import { CoreTransaction, MagistrateTransaction, TypeGroupTransaction } from "@/enums";
import { ITransactionType } from "@/interfaces";
import GenericSearchForm from "./GenericSearchForm.vue";

@Component({
  components: {
    InputText,
    InputNumber,
    InputDate,
    InputSelect,
    GenericSearchForm,
  },
})
export default class TransactionSearchForm extends Vue {
  @Prop({ required: true }) private searchType: string;
  @Prop({ required: true }) private searchTypes: string[];
  @Prop({ required: true }) private onSearchTypeChange: any;
  @Prop({ required: true }) private search: any;

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

  get typesLocale() {
    return this.types.map(type => this.$t(`TRANSACTION.TYPES.${type.key}`));
  }

  private onInputChange(e) {
    const { name, value } = e.target;

    this.emitInput({ name, value });
  }

  private onTypeChange(localeType: string) {
    const index: any = this.typesLocale.findIndex(key => key === localeType);

    const { type, typeGroup } = this.types[index];

    this.emitInput({ name: "type", value: type });
    this.emitInput({ name: "typeGroup", value: typeGroup });
  }

  private emitInput(value: object) {
    this.$emit("formChange", value);
  }
}
</script>
