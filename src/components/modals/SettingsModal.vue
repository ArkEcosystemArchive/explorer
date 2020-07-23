<template>
  <Modal container-classes="bg-theme-content-background" @close="emitClose">
    <div class="SettingsModal">
      <div class="SettingsModal__header">
        <h2 class="mb-4 text-3xl">{{ $t("MODAL_SETTINGS.TITLE") }}</h2>
        <p class="mb-6 semibold text-grey">{{ $t("MODAL_SETTINGS.DESCRIPTION") }}</p>
      </div>

      <div v-if="isLoading" class="absolute inset-0 z-10 flex flex-col items-center justify-center">
        <Loader :data="null" />
      </div>

      <div :class="{ 'SettingsModal__content__disclaimer--show': showDisclaimer }" class="p-0 SettingsModal__content">
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
          <ListDividedItem :label="$t('MODAL_SETTINGS.SMARTBRIDGE_FILTER')">
            <InputSelect
              :select-options="selectSmartbridgeFilter"
              :value="smartbridgeFilter"
              name="smartbridge-filter"
              class="SettingsModal__inputSelect SettingsModal__select__smartbridge-filter"
              @input="onSelectChange"
            />
          </ListDividedItem>
          <ListDividedItem :label="$t('MODAL_SETTINGS.DARK_THEME')">
            <ButtonSwitch :is-active="nightMode" class="mt-2 SettingsModal__toggle__darkTheme" @change="toggleTheme" />
          </ListDividedItem>
          <ListDividedItem v-if="showCurrency" :label="$t('MODAL_SETTINGS.PRICE_CHART')">
            <ButtonSwitch :is-active="chartMode" class="mt-2 SettingsModal__toggle__priceChart" @change="toggleChart" />
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

        <div v-if="showDisclaimer" class="text-justify SettingsModal__disclaimer">
          <div class="pt-4 my-5 border-t border-theme-line-separator"></div>
          <p class="mb-2 text-red semibold">{{ $t("DISCLAIMER.TITLE") }}:</p>
          <i18n path="DISCLAIMER.TEXT3" tag="p">
            <template v-slot:website>
              <a href="https://ark.io/" target="_blank">ARK.io</a>
            </template>
          </i18n>
          <div class="flex justify-center mt-3 mb-9">
            <label class="flex items-center text-gray-500">
              <input
                type="checkbox"
                class="mr-2 leading-tight SettingsModal__disclaimer__terms__checkbox"
                :checked="hasAcceptedTerms"
                @change="toggleAcceptTerms"
              />
              <span class="text-sm font-bold">{{ $t("COMMON.I_AGREE") }}</span>
            </label>
          </div>
        </div>
      </div>

      <div class="flex flex-row justify-center mt-5 SettingsModal__footer md:justify-start">
        <button class="mr-3 SettingsModal__cancel__button pager-button" :disabled="isLoading" @click="emitClose">
          {{ $t("COMMON.CANCEL") }}
        </button>
        <button
          class="px-8 py-4 SettingsModal__save__button action-button"
          :disabled="(showDisclaimer && !hasAcceptedTerms) || isLoading"
          @click="save"
        >
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
  private networkCurrencies: string[];
  private networkDefaults: any;
  private currencyName: string;
  private currencySymbol: string;
  private smartbridgeFilter = "filtered";
  private nightMode: boolean;
  private chartMode: boolean;
  private language: string;
  private isAcceptTerms = false;
  private notShowDisclaimer = false;
  private isLoading = false;

  private readonly smartbridgeFilterTypes = {
    unfiltered: "COMMON.UNFILTERED",
    filtered: "COMMON.FILTERED",
    hidden: "COMMON.HIDDEN",
  };

  get showCurrency(): boolean {
    return this.networkDefaults.priceChartOptions.enabled;
  }

  get selectCurrencies() {
    return Object.keys(this.networkCurrencies).map((currency: string) => ({
      value: currency,
      display: currency,
    }));
  }

  get selectSmartbridgeFilter() {
    return Object.keys(this.smartbridgeFilterTypes).map((type: string) => ({
      value: type,
      display: this.$t(this.smartbridgeFilterTypes[type]),
    }));
  }

  get selectLanguages() {
    return Object.keys(I18N.languages).map((language: string) => ({
      value: language,
      display: I18N.languages[language],
    }));
  }

  // No longer show the disclaimer if the user has accepted the terms
  get showDisclaimer() {
    return this.smartbridgeFilter === "unfiltered" && !this.notShowDisclaimer;
  }

  get hasAcceptedTerms() {
    return this.isAcceptTerms;
  }

  public created() {
    this.currencyName = this.$store.getters["currency/name"];
    this.currencySymbol = this.$store.getters["currency/symbol"];
    this.smartbridgeFilter = this.$store.getters["ui/smartbridgeFilter"];
    this.nightMode = this.$store.getters["ui/nightMode"];
    this.chartMode = this.$store.getters["ui/priceChartOptions"].enabled;
    this.language = this.$store.getters["ui/language"];

    if (this.smartbridgeFilter === "unfiltered") {
      this.isAcceptTerms = true;
      this.notShowDisclaimer = true;
    }
  }

  private onSelectChange(event: any) {
    const { name, value } = event.target;

    if (name === "currency") {
      this.currencyName = value;
      this.currencySymbol = this.networkCurrencies[value];
    } else if (name === "smartbridge-filter") {
      this.smartbridgeFilter = value;
      this.isAcceptTerms = false;
      this.notShowDisclaimer = false;
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

  private toggleAcceptTerms() {
    this.isAcceptTerms = !this.isAcceptTerms;
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

    if (this.smartbridgeFilter !== this.$store.getters["ui/smartbridgeFilter"]) {
      this.$store.dispatch("ui/setSmartbridgeFilter", this.smartbridgeFilter);
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
.SettingsModal {
  max-width: 400px;
}

.SettingsModal .ListDividedItem__container__label {
  @apply .mr-10;
}

.SettingsModal .SettingsModal__inputSelect .InputField__wrapper {
  @apply .h-full .mb-0;
}
.SettingsModal .SettingsModal__inputSelect .InputField__input {
  @apply .border-none .pt-0 .h-full;
}

.SettingsModal .SettingsModal__save__button:disabled {
  @apply .bg-theme-button .opacity-75 .cursor-not-allowed;
}

@media (max-height: 768px) {
  .SettingsModal .SettingsModal__content__disclaimer--show {
    @apply .pr-3 .overflow-auto;
    max-height: 400px;
  }
}
</style>
