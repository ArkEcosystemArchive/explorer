<template>
  <div class="flex flex-wrap items-center mb-10 mx-5 sm:mx-10" id="genericForm">
    <div class="w-full md:w-64 md:mr-6">
      <InputSelect
        v-on:input="onSelectChange"
        :value="selectedType"
        :selectOptions="selectOptions"
        :label="$t('PAGES.ADVANCED_SEARCH.SEARCH_TYPE')"
        name="search-type"
        class="flex-1"
      />
    </div>

    <div class="flex-grow w-full md:w-auto">
      <InputText
        @input="onInputChange"
        @keyup.enter.native="onEnterKey"
        :label="$t(types[selectedType].label)"
        :name="types[selectedType].name"
        :value="input"
        class="my-3"
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
export default class GenericSearchForm extends Vue {
  @Prop({ required: true }) private selectedType: string;
  @Prop({ required: true }) private searchTypes: string[];
  @Prop({ required: true }) private onSearchTypeChange: any;

  private input: string = "";

  private types = {
    transaction: { optionText: "COMMON.TRANSACTION", label: "TRANSACTION.ID", name: "id" },
    block: { optionText: "COMMON.BLOCK", label: "BLOCK.ID", name: "id" },
    wallet: { optionText: "COMMON.WALLET", label: "WALLET.ADDRESS", name: "address" },
  };

  get selectOptions() {
    return this.searchTypes.map(type => ({ value: type, display: this.$t(this.types[type].optionText) }));
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
