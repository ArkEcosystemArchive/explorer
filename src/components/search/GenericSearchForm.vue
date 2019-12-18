<template>
  <div class="flex flex-wrap items-center mb-10 mx-5 sm:mx-10">
    <div class="w-full md:w-64 md:mr-6">
      <InputSelect
        v-on:input="onSearchTypeChange"
        :value="searchType"
        :items="searchTypes"
        :label="$t('PAGES.ADVANCED_SEARCH.TYPE')"
        name="time-format"
        class="flex-1"
      />
    </div>

    <div class="flex-grow w-full md:w-auto">
      <InputText
        @input="onInputChange"
        :label="$t('PAGES.ADVANCED_SEARCH.TRANSACTION.SEARCH')"
        class="my-3"
        name="id"
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
}
</script>
