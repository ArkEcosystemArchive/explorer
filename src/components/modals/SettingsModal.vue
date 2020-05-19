<template>
  <Modal @close="emitClose">
    <div class="SettingsModal">
      <div class="SettingsModal__header">
        <h2 class="text-3xl mb-4">{{ $t("MODAL_SETTINGS.TITLE") }}</h2>
        <p class="semibold text-grey mb-6">{{ $t("MODAL_SETTINGS.DESCRIPTION") }}</p>
      </div>

      <div v-if="isLoading" class="absolute inset-0 flex flex-col items-center justify-center z-10">
        <Loader :data="null" />
      </div>

      <div class="SettingsModal__content">
        <ListDivided>
          <ListDividedItem v-if="showCurrency" :label="$t('MODAL_SETTINGS.CURRENCY')">
            <InputSelect
              :select-options="selectCurrencies"
              :value="currencyName"
              name="currency"
              class="SettingsModal__inputSelect SettingsModal__select__currency"
              @input="onSelectChange"
            />
          </ListDividedItem>
          <ListDividedItem :label="$t('MODAL_SETTINGS.DARK_THEME')">
            <ButtonSwitch :is-active="nightMode" class="SettingsModal__toggle__darkTheme mt-2" @change="toggleTheme" />
          </ListDividedItem>
          <ListDividedItem v-if="showCurrency" :label="$t('MODAL_SETTINGS.PRICE_CHART')">
            <ButtonSwitch :is-active="chartMode" class="SettingsModal__toggle__priceChart mt-2" @change="toggleChart" />
          </ListDividedItem>
          <ListDividedItem :label="$t('MODAL_SETTINGS.LANGUAGE')">
            <InputSelect
              :select-options="selectLanguages"
              :value="language"
              name="language"
              class="SettingsModal__inputSelect SettingsModal__select__language"
              @input="onSelectChange"
            />
          </ListDividedItem>
        </ListDivided>
      </div>

      <div class="SettingsModal__footer flex flex-row justify-center md:justify-start mt-5">
        <button :disabled="isLoading" class="pager-button mr-3" @click="emitClose">
          {{ $t("COMMON.CANCEL") }}
        </button>
        <button :disabled="isLoading" class="action-button py-4 px-8" @click="save">
          {{ $t("COMMON.SAVE") }}
        </button>
      </div>
    </div>
  </Modal>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";
import moment from "moment";
import { I18N } from "@/config";
import CryptoCompareService from "@/services/crypto-compare";
import { ListDivided, ListDividedItem } from "@/components/utils/listDivided";

@Component({
  components: {
    ListDivided,
    ListDividedItem,
  },
  computed: {
    ...mapGetters("network", { networkCurrencies: "currencies", networkDefaults: "defaults" }),
  },
})
export default class SettingsModal extends Vue {
  private isLoading = false;
  private networkCurrencies: string[];
  private networkDefaults: any;
  private currencyName: string;
  private currencySymbol: string;
  private nightMode: boolean;
  private chartMode: boolean;
  private language: string;

  get showCurrency(): boolean {
    return this.networkDefaults.priceChartOptions.enabled;
  }

  get selectCurrencies() {
    return Object.keys(this.networkCurrencies).map((currency: string) => ({
      value: currency,
      display: currency,
    }));
  }

  get selectLanguages() {
    return Object.keys(I18N.languages).map((language: string) => ({
      value: language,
      display: I18N.languages[language],
    }));
  }

  public created() {
    this.currencyName = this.$store.getters["currency/name"];
    this.currencySymbol = this.$store.getters["currency/symbol"];
    this.nightMode = this.$store.getters["ui/nightMode"];
    this.chartMode = this.$store.getters["ui/priceChartOptions"].enabled;
    this.language = this.$store.getters["ui/language"];
  }

  private onSelectChange(event: any) {
    const { name, value } = event.target;

    if (name === "currency") {
      this.currencyName = value;
      this.currencySymbol = this.networkCurrencies[value];
    } else if (name === "language") {
      this.language = value;
    }
  }

  private storeCurrency(currency: string, rate: number, symbol: string) {
    this.$store.dispatch("currency/setName", currency);
    this.$store.dispatch("currency/setRate", rate);
    this.$store.dispatch("currency/setSymbol", symbol);
  }

  private setLanguage(language: string) {
    this.$store.dispatch("ui/setLanguage", language);
    this.$i18n.locale = language;

    this.$store.dispatch("ui/setLocale", language);
    moment.locale(language);
  }

  private toggleTheme() {
    this.nightMode = !this.nightMode;
  }

  private toggleChart() {
    this.chartMode = !this.chartMode;
  }

  private async save() {
    this.isLoading = true;

    if (this.currencyName !== this.$store.getters["currency/name"]) {
      const rate = await CryptoCompareService.price(this.currencyName);
      this.storeCurrency(this.currencyName, rate!, this.currencySymbol);
    }

    if (this.nightMode !== this.$store.getters["ui/nightMode"]) {
      this.$store.dispatch("ui/setNightMode", this.nightMode);
    }

    if (this.chartMode !== this.$store.getters["ui/priceChartOptions"].enabled) {
      this.$store.dispatch("ui/setPriceChartOption", { option: "enabled", value: this.chartMode });
    }

    if (this.language !== this.$store.getters["ui/language"]) {
      this.setLanguage(this.language);
    }

    this.isLoading = false;
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

.SettingsModal .SettingsModal__inputSelect .InputField__wrapper {
  @apply .h-full .mb-0;
}
.SettingsModal .SettingsModal__inputSelect .InputField__input {
  @apply .border-none .pt-0 .h-full;
}
</style>
