<template>
  <div id="genericForm" class="flex flex-wrap items-center mx-5 mb-10 sm:mx-10">
    <div class="w-full md:w-64 md:mr-6">
      <InputSelect
        :value="selectedType"
        :select-options="selectOptions"
        :label="$t('PAGES.ADVANCED_SEARCH.SEARCH_TYPE')"
        name="search-type"
        class="flex-1"
        @input="onSelectChange"
      />
    </div>

    <div class="flex-grow w-full md:w-auto">
      <InputText
        :label="$t(types[selectedType].label)"
        :name="types[selectedType].name"
        :value="input"
        class="my-3"
        @input="onInputChange"
        @keyup.enter.native="onEnterKey"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class GenericSearchForm extends Vue {
  @Prop({ required: true }) private selectedType: string;
  @Prop({ required: true }) private searchTypes: string[];
  @Prop({ required: true }) private onSearchTypeChange: any;

  private input = "";

  private types = {
    transaction: { optionText: "COMMON.TRANSACTION", label: "TRANSACTION.ID", name: "id" },
    block: { optionText: "COMMON.BLOCK", label: "BLOCK.ID", name: "id" },
    wallet: { optionText: "COMMON.WALLET", label: "WALLET.ADDRESS", name: "address" },
  };

  get selectOptions() {
    return this.searchTypes.map((type) => ({ value: type, display: this.$t(this.types[type].optionText) }));
  }

  private onSelectChange(event: any) {
    this.onSearchTypeChange(event);
    this.input = "";
  }

  private onInputChange(event: any) {
    const { name, value } = event.target;
    this.input = value;

    this.emitInput({ name, value });
  }

  private emitInput(value: object) {
    this.$emit("formChange", value);
  }

  private onEnterKey(event: any) {
    this.$emit("search");
  }
}
</script>
