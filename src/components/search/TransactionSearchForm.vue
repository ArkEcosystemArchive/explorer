<template>
  <div id="transactionForm" class="mx-5 mb-5 mb-10 sm:mx-10">
    <p class="mb-4 font-bold">
      {{ $t("PAGES.ADVANCED_SEARCH.ADDITIONAL_PARAMETERS") }}
    </p>

    <div class="flex flex-wrap justify-between">
      <div class="w-full mb-4 lg:w-64 lg:mb-0">
        <InputSelect
          :select-options="selectOptions"
          :label="$t('COMMON.TYPE')"
          :value="transactionType.key"
          name="Transaction Types"
          class="flex-1"
          @input="onTypeChange"
        />
      </div>

      <div class="flex w-full mb-4 lg:w-56 lg:mb-0">
        <div class="w-1/2 mr-3">
          <InputNumber
            :label="$t('PAGES.ADVANCED_SEARCH.TRANSACTION.AMOUNT_FROM')"
            name="amount-from"
            min="0"
            @input="onInputChange"
            @keyup.enter.native="onEnterKey"
          />
        </div>

        <div class="w-1/2">
          <InputNumber
            :label="$t('PAGES.ADVANCED_SEARCH.TRANSACTION.AMOUNT_TO')"
            name="amount-to"
            @input="onInputChange"
            @keyup.enter.native="onEnterKey"
          />
        </div>
      </div>

      <div class="flex w-full mb-4 lg:w-56 lg:mb-0">
        <div class="w-1/2 mr-3">
          <InputNumber
            :label="$t('PAGES.ADVANCED_SEARCH.TRANSACTION.FEE_FROM')"
            name="fee-from"
            @input="onInputChange"
            @keyup.enter.native="onEnterKey"
          />
        </div>
        <div class="w-1/2">
          <InputNumber
            :label="$t('PAGES.ADVANCED_SEARCH.TRANSACTION.FEE_TO')"
            name="fee-to"
            @input="onInputChange"
            @keyup.enter.native="onEnterKey"
          />
        </div>
      </div>

      <div class="flex w-full mb-4 lg:w-auto lg:mb-0">
        <div class="w-1/2 mr-3">
          <InputDate
            :label="$t('PAGES.ADVANCED_SEARCH.GENERIC.DATE_FROM')"
            name="timestamp-from"
            @input="onInputChange"
            @keyup.enter.native="onEnterKey"
          />
        </div>
        <div class="w-1/2">
          <InputDate
            :label="$t('PAGES.ADVANCED_SEARCH.GENERIC.DATE_TO')"
            name="timestamp-to"
            @input="onInputChange"
            @keyup.enter.native="onEnterKey"
          />
        </div>
      </div>
    </div>

    <InputText
      :label="$t('TRANSACTION.SMARTBRIDGE')"
      name="vendorField"
      class="pt-0"
      @input="onInputChange"
      @keyup.enter.native="onEnterKey"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ITransactionType } from "@/interfaces";

@Component
export default class TransactionSearchForm extends Vue {
  private transactionType: ITransactionType = { key: "ALL", type: -1 };

  get types() {
    return this.$store.getters["network/enabledTransactionTypes"];
  }

  get selectOptions() {
    return this.types.map((type) => ({
      value: type.key,
      display: this.$t(`TRANSACTION.TYPES.${type.key}`),
    }));
  }

  private onInputChange(event: any) {
    const { name, value } = event.target;

    this.emitInput({ name, value });
  }

  private onTypeChange(event: any) {
    const index: number = this.types.findIndex((transaction) => transaction.key === event.target.value);
    const { type, typeGroup, asset } = this.types[index];

    this.emitInput({ name: "type", value: type !== -1 ? type : null });
    this.emitInput({ name: "typeGroup", value: typeGroup });
    this.emitInput({ name: "asset", value: asset });
  }

  private emitInput(value: object) {
    this.$emit("formChange", value);
  }

  private onEnterKey(event: any) {
    this.$emit("search");
  }
}
</script>
