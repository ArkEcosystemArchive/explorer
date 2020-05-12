<template>
  <Modal @close="emitClose">
    <div class="SettingsModal">
      <div class="SettingsModal__header">
        <h2 class="text-3xl mb-4">{{ $t("MODAL_SETTINGS.TITLE") }}</h2>
        <p class="semibold text-grey mb-6">{{ $t("MODAL_SETTINGS.DESCRIPTION") }}</p>
      </div>

      <div class="SettingsModal__content">
        <ListDivided>
          <ListDividedItem
            :label="$t('MODAL_SETTINGS.CURRENCY.LABEL')"
            :label-description="$t('MODAL_SETTINGS.CURRENCY.DESCRIPTION')"
          >
            <InputSelect
              :select-options="selectOptions"
              :value="currencyName"
              name="currency"
              class="SettingsModal__input__currency"
              @input="onChangeCurrency"
            />
          </ListDividedItem>
          <ListDividedItem
            :label="$t('MODAL_SETTINGS.DARK_THEME.LABEL')"
            :label-description="$t('MODAL_SETTINGS.DARK_THEME.DESCRIPTION')"
          >
            <ButtonSwitch :is-active="nightMode" @change="toggleTheme" />
          </ListDividedItem>
          <ListDividedItem
            :label="$t('MODAL_SETTINGS.CHART.LABEL')"
            :label-description="$t('MODAL_SETTINGS.CHART.DESCRIPTION')"
          >
            <ButtonSwitch :is-active="chartMode" @change="toggleChart" />
          </ListDividedItem>
          <ListDividedItem
            :label="$t('MODAL_SETTINGS.TRANSLATIONS.LABEL')"
            :label-description="$t('MODAL_SETTINGS.TRANSLATIONS.DESCRIPTION')"
          >
            <button>ARK/USD</button>
          </ListDividedItem>
        </ListDivided>
      </div>

      <div class="SettingsModal__footer flex flex-row mt-5">
        <button class="pager-button mr-3" @click="emitClose">
          {{ $t("COMMON.CANCEL") }}
        </button>
        <button class="action-button py-4 px-8" @click="save">
          {{ $t("COMMON.SAVE") }}
        </button>
      </div>
    </div>
  </Modal>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";
import CryptoCompareService from "@/services/crypto-compare";
import { ListDivided, ListDividedItem } from "@/components/utils/listDivided";
import { InputSelect } from "@/components/search/input";

@Component({
  components: {
    InputSelect,
    ListDivided,
    ListDividedItem,
  },
  computed: {
    ...mapGetters("network", ["currencies"]),
  },
})
export default class SettingsModal extends Vue {
  private currencyName: string;
  private currencySymbol: string;
  private currencies: string[];
  private nightMode: boolean;
  private chartMode: boolean;

  get selectOptions() {
    return Object.keys(this.currencies).map((currency) => ({
      value: currency,
      display: currency,
    }));
  }

  public created() {
    this.currencyName = this.$store.getters["currency/name"];
    this.currencySymbol = this.$store.getters["currency/symbol"];
    this.nightMode = this.$store.getters["ui/nightMode"];
    this.chartMode = this.$store.getters["ui/priceChartOptions"].enabled;
  }

  private onChangeCurrency(event: any) {
    const { value } = event.target;
    this.currencyName = value;
    this.currencySymbol = this.currencies[value];
  }

  private storeCurrency(currency: string, rate: number, symbol: string) {
    this.$store.dispatch("currency/setName", currency);
    this.$store.dispatch("currency/setRate", rate);
    this.$store.dispatch("currency/setSymbol", symbol);
  }

  private toggleTheme(enabled: boolean) {
    this.nightMode = enabled;
  }

  private toggleChart(enabled: boolean) {
    this.chartMode = enabled;
  }

  private async save() {
    const rate = await CryptoCompareService.price(this.currencyName);
    this.storeCurrency(this.currencyName, rate!, this.currencySymbol);
    this.$store.dispatch("ui/setNightMode", this.nightMode);
    this.$store.dispatch("ui/setPriceChartOption", { option: "enabled", value: this.chartMode });
    this.emitClose();
  }

  public emitClose() {
    this.$emit("close");
  }
}
</script>

<style>
.SettingsModal .ListDividedItem__container__label {
  @apply .mr-10;
}
.SettingsModal .ListDividedItem__label__description {
  @apply .max-w-xs;
}

.SettingsModal .SettingsModal__input__currency .InputField__wrapper {
  @apply .h-full .mb-0;
}
.SettingsModal .SettingsModal__input__currency .InputField__input {
  @apply .border-none .pt-0 .h-full;
}
</style>
