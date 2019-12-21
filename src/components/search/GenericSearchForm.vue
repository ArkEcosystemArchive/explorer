<template>
  <div class="flex flex-wrap items-center mb-10 mx-5 sm:mx-10">
    <div class="w-full md:w-64 md:mr-6">
      <InputSelect
        v-on:input="onSearchTypeChange"
        @keyup.enter.native="search"
        :value="selectedType"
        :items="searchTypes"
        :label="$t('PAGES.ADVANCED_SEARCH.SEARCH_TYPE')"
        :name="$t('PAGES.ADVANCED_SEARCH.SEARCH_TYPE')"
        class="flex-1"
      />
    </div>

    <div class="flex-grow w-full md:w-auto">
      <InputText
        @input="onInputChange"
        @keyup.enter.native="search"
        :label="$t(types[selectedType].label)"
        :name="types[selectedType].name"
        class="my-3"
        errors=""
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { InputText, InputSelect } from "./input";
@Component({
  components: {
    InputText,
    InputSelect,
  },
})
export default class TransactionSearchForm extends Vue {
  @Prop({ required: true }) private selectedType: string;
  @Prop({ required: true }) private searchTypes: string[];
  @Prop({ required: true }) private onSearchTypeChange: any;
  @Prop({ required: true }) private onInputChange: any;
  @Prop({ required: true }) private search: any;

  private types = {
    transaction: { label: "TRANSACTION.ID", name: "id" },
    block: { label: "BLOCK.ID", name: "id" },
    wallet: { label: "WALLET.ADDRESS", name: "address" },
  };
}
</script>
