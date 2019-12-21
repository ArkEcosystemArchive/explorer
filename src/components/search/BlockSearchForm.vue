<template>
  <section class="page-section mb-5 py-5 md:py-10 ">
    <GenericSearchForm
      :searchTypes="searchTypes"
      :selectedType="selectedType"
      :onSearchTypeChange="onSearchTypeChange"
      :onInputChange="onInputChange"
      :search="search"
    />

    <div class="mb-5 mx-5 sm:mx-10 mb-10">
      <p class="font-bold mb-4">Additional Parameters</p>

      <div class="flex flex-wrap justify-between mb-4">
        <div class="flex w-full md:w-1/3 mb-4 md:mb-0">
          <div class="w-1/2">
            <InputNumber
              @input="onInputChange"
              @keyup.enter.native="search"
              :label="$t('PAGES.ADVANCED_SEARCH.BLOCK.TOTAL_AMOUNT_FROM')"
              name="totalAmount-from"
              class="mr-3"
              errors=""
            />
          </div>
          <div class="w-1/2">
            <InputNumber
              @input="onInputChange"
              @keyup.enter.native="search"
              :label="$t('PAGES.ADVANCED_SEARCH.BLOCK.TOTAL_AMOUNT_TO')"
              name="totalAmount-to"
              errors=""
            />
          </div>
        </div>

        <div class="flex w-full md:w-1/3 mb-4 md:mb-0">
          <div class="w-1/2">
            <InputNumber
              @input="onInputChange"
              @keyup.enter.native="search"
              :label="$t('PAGES.ADVANCED_SEARCH.BLOCK.TOTAL_FEE_FROM')"
              name="totalFee-from"
              class="mr-3"
              errors=""
            />
          </div>
          <div class="w-1/2">
            <InputNumber
              @input="onInputChange"
              @keyup.enter.native="search"
              :label="$t('PAGES.ADVANCED_SEARCH.BLOCK.TOTAL_FEE_TO')"
              name="totalFee-to"
              errors=""
            />
          </div>
        </div>

        <div class="flex w-full md:w-64 mb-4 md:mb-0">
          <div class="w-1/2">
            <InputDate
              @input="onInputChange"
              @keyup.enter.native="search"
              :label="$t('PAGES.ADVANCED_SEARCH.GENERIC.DATE_FROM')"
              name="timestamp-from"
              class="mr-3"
              errors=""
            />
          </div>
          <div class="w-1/2">
            <InputDate
              @input="onInputChange"
              @keyup.enter.native="search"
              :label="$t('PAGES.ADVANCED_SEARCH.GENERIC.DATE_TO')"
              name="timestamp-to"
              errors=""
            />
          </div>
        </div>
      </div>

      <div class="flex flex-wrap justify-between mb-4">
        <div class="w-full mb-4 md:mb-0">
          <InputText
            @input="onInputChange"
            @keyup.enter.native="search"
            :label="$t('BLOCK.GENERATED_BY')"
            name="generatorPublicKey"
            errors=""
            class="pt-0"
          />
        </div>
      </div>
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
export default class BlockSearchForm extends Vue {
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
