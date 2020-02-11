<template>
  <div id="walletForm" class="mb-5 mx-5 sm:mx-10 mb-10">
    <p class="font-bold mb-4">{{ $t("PAGES.ADVANCED_SEARCH.ADDITIONAL_PARAMETERS") }}</p>

    <div class="flex flex-wrap justify-between mb-4">
      <div class="w-full lg:w-1/4">
        <InputText
          :label="$t('WALLET.DELEGATE.USERNAME')"
          name="username"
          @input="onInputChange"
          @keyup.enter.native="onEnterKey"
        />
      </div>
      <div class="w-full lg:w-1/4">
        <InputText
          :label="$t('WALLET.VOTING_FOR')"
          name="vote"
          class="pt-0"
          @input="onInputChange"
          @keyup.enter.native="onEnterKey"
        />
      </div>

      <div class="flex w-full lg:w-auto">
        <div class="w-1/2 mr-3">
          <InputNumber
            :label="$t('PAGES.ADVANCED_SEARCH.WALLET.BALANCE_FROM')"
            name="balance-from"
            min="0"
            @input="onInputChange"
            @keyup.enter.native="onEnterKey"
          />
        </div>

        <div class="w-1/2">
          <InputNumber
            :label="$t('PAGES.ADVANCED_SEARCH.WALLET.BALANCE_TO')"
            name="balance-to"
            @input="onInputChange"
            @keyup.enter.native="onEnterKey"
          />
        </div>
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
export default class WalletSearchForm extends Vue {
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
