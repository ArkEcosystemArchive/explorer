<template>
  <section class="page-section mb-5 py-5 md:py-10 ">
    <GenericSearchForm
      :searchTypes="searchTypes"
      :selectedType="selectedType"
      :onSearchTypeChange="onSearchTypeChange"
      :onInputChange="onInputChange"
      :search="search"
    />

    <div class="mb-5 mx-5 sm:mx-10">
      <p class="font-bold mb-4">Additional Parameters</p>

      <div class="flex flex-wrap justify-between mb-4">
        <div class="w-full md:w-1/4">
          <InputText
            @input="onInputChange"
            @keyup.enter.native="search"
            :label="$t('WALLET.DELEGATE.USERNAME')"
            name="username"
            errors=""
          />
        </div>
        <div class="w-full md:w-1/4">
          <InputText
            @input="onInputChange"
            @keyup.enter.native="search"
            :label="$t('WALLET.VOTING_FOR')"
            name="vote"
            errors=""
            class="pt-0"
          />
        </div>

        <div class="flex w-full md:w-auto">
          <div class="w-1/2">
            <InputNumber
              @input="onInputChange"
              @keyup.enter.native="search"
              class="mr-3"
              :label="$t('PAGES.ADVANCED_SEARCH.WALLET.BALANCE_FROM')"
              name="balance-from"
              errors=""
              min="0"
            />
          </div>

          <div class="w-1/2">
            <InputNumber
              @input="onInputChange"
              @keyup.enter.native="search"
              :label="$t('PAGES.ADVANCED_SEARCH.WALLET.BALANCE_TO')"
              name="balance-to"
              errors=""
            />
          </div>
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
