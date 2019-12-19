<template>
  <div class="flex flex-wrap items-center mb-10 mx-5 sm:mx-10">
    <div class="w-full md:w-64 md:mr-6">
      <InputSelect
        v-on:input="onSearchTypeChange"
        :value="searchType"
        :items="searchTypes"
        :label="$t('PAGES.ADVANCED_SEARCH.SEARCH_TYPE')"
        :name="$t('PAGES.ADVANCED_SEARCH.SEARCH_TYPE')"
        class="flex-1"
      />
    </div>

    <div class="flex-grow w-full md:w-auto">
      <InputText
        @input="onInputChange"
        :label="$t(typeValues[searchType].label)"
        :name="typeValues[searchType].name"
        class="my-3"
        errors=""
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
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
  @Prop({ required: true }) private searchType: string;
  @Prop({ required: true }) private searchTypes: string[];
  @Prop({ required: true }) private onSearchTypeChange: any;
  @Prop({ required: true }) private onInputChange: any;

  private typeValues = {
    transaction: { label: "TRANSACTION.ID", name: "id" },
    block: { label: "BLOCK.ID", name: "id" },
    wallet: { label: "WALLET.ADDRESS", name: "address" },
  };
}
</script>
