<template>
  <section class="page-section mb-5 py-5 md:py-10 ">
    <GenericSearchForm
      :searchTypes="searchTypes"
      :selectedType="selectedType"
      :onSearchTypeChange="onSearchTypeChange"
      :onInputChange="onInputChange"
    />

    <div class="mb-5 mx-5 sm:mx-10">
      <p class="font-bold">Additional Parameters</p>

      <p>ye</p>
      <p></p>
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
export default class WalletSearchForm extends Vue {
  @Prop({ required: true }) private selectedType: string;
  @Prop({ required: true }) private searchTypes: string[];
  @Prop({ required: true }) private onSearchTypeChange: any;
  @Prop({ required: true }) private search: any;

  private onInputChange(e) {
    const { name, value } = e.target;

    this.emitInput({ name, value });
  }

  private emitInput(value: object) {
    this.$emit("formChange", value);
  }
}
</script>
