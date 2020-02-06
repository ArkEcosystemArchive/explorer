<template>
  <div class="mb-5 mx-5 sm:mx-10 mb-10" id="blockForm">
    <p class="font-bold mb-4">{{ $t("PAGES.ADVANCED_SEARCH.ADDITIONAL_PARAMETERS") }}</p>

    <div class="flex flex-wrap justify-between">
      <div class="flex w-full lg:w-1/3 mb-4 lg:mb-0">
        <div class="w-1/2 mr-3">
          <InputNumber
            @input="onInputChange"
            @keyup.enter.native="onEnterKey"
            :label="$t('PAGES.ADVANCED_SEARCH.BLOCK.TOTAL_AMOUNT_FROM')"
            name="totalAmount-from"
          />
        </div>
        <div class="w-1/2">
          <InputNumber
            @input="onInputChange"
            @keyup.enter.native="onEnterKey"
            :label="$t('PAGES.ADVANCED_SEARCH.BLOCK.TOTAL_AMOUNT_TO')"
            name="totalAmount-to"
          />
        </div>
      </div>

      <div class="flex w-full lg:w-1/3 mb-4 lg:mb-0">
        <div class="w-1/2 mr-3">
          <InputNumber
            @input="onInputChange"
            @keyup.enter.native="onEnterKey"
            :label="$t('PAGES.ADVANCED_SEARCH.BLOCK.TOTAL_FEE_FROM')"
            name="totalFee-from"
          />
        </div>
        <div class="w-1/2">
          <InputNumber
            @input="onInputChange"
            @keyup.enter.native="onEnterKey"
            :label="$t('PAGES.ADVANCED_SEARCH.BLOCK.TOTAL_FEE_TO')"
            name="totalFee-to"
          />
        </div>
      </div>

      <div class="flex w-full lg:w-auto mb-4 lg:mb-0">
        <div class="w-1/2 mr-3">
          <InputDate
            @input="onInputChange"
            @keyup.enter.native="onEnterKey"
            :label="$t('PAGES.ADVANCED_SEARCH.GENERIC.DATE_FROM')"
            name="timestamp-from"
          />
        </div>
        <div class="w-1/2">
          <InputDate
            @input="onInputChange"
            @keyup.enter.native="onEnterKey"
            :label="$t('PAGES.ADVANCED_SEARCH.GENERIC.DATE_TO')"
            name="timestamp-to"
          />
        </div>
      </div>
    </div>

    <div class="flex flex-wrap justify-between mb-4">
      <div class="w-full mb-4 md:mb-0">
        <InputText
          @input="onInputChange"
          @keyup.enter.native="onEnterKey"
          :label="$t('BLOCK.GENERATED_BY')"
          name="generatorPublicKey"
          class="pt-0"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { InputText, InputNumber, InputDate, InputSelect } from "./input";

@Component({
  components: {
    InputText,
    InputNumber,
    InputDate,
    InputSelect,
  },
})
export default class BlockSearchForm extends Vue {
  private onInputChange(event: any) {
    const { name, value } = event.target;

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
