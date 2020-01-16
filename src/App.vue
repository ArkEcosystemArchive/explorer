<template>
  <main
    :class="[
      nightMode ? 'theme-dark' : 'theme-light',
      'bg-theme-page-background text-theme-text-content min-h-screen font-sans xl:pt-8',
    ]"
  >
    <div :class="{ blur: hasBlurFilter }">
      <AppHeader />

      <RouterView />

      <AppFooter />
    </div>

    <PortalTarget name="modal" multiple @change="onPortalChange" />
  </main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AppHeader from "@/components/header/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import {
  BlockchainService,
  BusinessService,
  CryptoCompareService,
  DelegateService,
  MigrationService,
  NodeService,
  UnikService,
} from "@/services";
import { mapGetters } from "vuex";
import moment from "moment";

@Component({
  computed: {
    ...mapGetters("currency", { currencyName: "name" }),
    ...mapGetters("delegates", ["stateHasDelegates"]),
    ...mapGetters("network", ["token"]),
    ...mapGetters("ui", ["language", "locale", "nightMode"]),
  },
  components: { AppHeader, AppFooter },
})
export default class App extends Vue {
  public currencyTimer: NodeJS.Timeout;
  public networkTimer: NodeJS.Timeout;
  private currencyName: string;
  private stateHasDelegates: boolean;
  private token: string;
  private language: string;
  private locale: string;
  private nightMode: boolean;
  private hasBlurFilter: boolean = false;

  public async created() {
    MigrationService.executeMigrations();

    const network = require(`../networks/${process.env.VUE_APP_EXPLORER_CONFIG}`);

    const nightMode = localStorage.getItem("nightMode");

    let nightModeBoolean = nightMode === "true" ? true : false;
    if (nightMode === null) {
      // Only on first time
      nightModeBoolean = network.alias === "Development";
    }

    this.$store.dispatch("ui/setNightMode", nightModeBoolean);

    this.$store.dispatch("network/setDefaults", network.defaults);

    this.$store.dispatch("network/setServer", network.server);
    this.$store.dispatch("network/setAlias", network.alias);
    this.$store.dispatch("network/setActiveDelegates", network.activeDelegates);
    this.$store.dispatch("network/setRewardOffset", network.rewardOffset);
    this.$store.dispatch("network/setCurrencies", network.currencies);
    this.$store.dispatch("network/setKnownWallets", network.knownWallets);

    if (network.defaults.currency) {
      this.$store.dispatch("currency/setName", localStorage.getItem("currencyName") || network.defaults.currency.name);

      this.$store.dispatch(
        "currency/setSymbol",
        localStorage.getItem("currencySymbol") || network.defaults.currency.symbol,
      );
    }

    const response = await NodeService.config();
    this.$store.dispatch("network/setAddressPrefix", response.version);
    this.$store.dispatch("network/setToken", response.token);
    this.$store.dispatch("network/setSymbol", response.symbol);
    this.$store.dispatch("network/setNethash", response.nethash);
    this.$store.dispatch("network/setEpoch", response.constants.epoch);
    this.$store.dispatch("network/setBlocktime", response.constants.blocktime);

    this.$store.dispatch("ui/setLanguage", localStorage.getItem("language") || "en-GB");

    this.$store.dispatch("ui/setLocale", localStorage.getItem("locale") || navigator.language || "en-GB");

    const storedPriceChartOptions = localStorage.getItem("priceChartOptions") || "";
    this.$store.dispatch(
      "ui/setPriceChartOptions",
      storedPriceChartOptions ? JSON.parse(storedPriceChartOptions) : network.defaults.priceChartOptions,
    );

    this.updateI18n();
    this.updateLocale();
    this.updateCurrencyRate();
    this.updateSupply();
    this.updateUnikSupply();
    this.updateHeight();
    this.updateDelegates();
    this.checkForMagistrateEnabled();
  }

  public mounted() {
    this.prepareComponent();
  }

  public beforeDestroy() {
    this.clearTimers();
  }

  public prepareComponent() {
    this.initialiseTimers();
  }

  public setBlurFilter(isActive) {
    this.hasBlurFilter = isActive;
  }

  public onPortalChange(isActive) {
    this.hasBlurFilter = isActive;
  }

  public async updateCurrencyRate() {
    if (this.currencyName !== this.token) {
      const rate = await CryptoCompareService.price(this.currencyName);
      this.$store.dispatch("currency/setRate", rate);
    }
  }

  public async updateSupply() {
    const supply = await BlockchainService.supply();
    this.$store.dispatch("network/setSupply", supply);
  }

  public async updateUnikSupply() {
    const unikSupply = await UnikService.supply();
    this.$store.dispatch("network/setUnikSupply", unikSupply);
  }

  public async updateHeight() {
    const height = await BlockchainService.height();
    this.$store.dispatch("network/setHeight", height);
  }

  public async updateDelegates() {
    const fetchedAt: number = parseInt(localStorage.getItem("delegatesFetchedAt") || "0", 10);

    if (!this.stateHasDelegates || !fetchedAt || this.updateRequired(fetchedAt)) {
      const delegates = await DelegateService.fetchEveryDelegate();
      this.$store.dispatch("delegates/setDelegates", {
        delegates,
        timestamp: Math.floor(Date.now() / 1000),
      });
    }
  }

  public async checkForMagistrateEnabled() {
    const hasMagistrateEnabled = await BusinessService.isEnabled();
    this.$store.dispatch("network/setHasMagistrateEnabled", hasMagistrateEnabled);
  }

  public updateRequired(timestamp: number): boolean {
    return (
      timestamp <
      moment()
        .subtract(2, "minute")
        .unix()
    );
  }

  public updateI18n() {
    this.$i18n.locale = this.language;
  }

  public updateLocale() {
    moment.locale(this.locale);
  }

  public initialiseTimers() {
    this.currencyTimer = setInterval(() => {
      this.updateCurrencyRate();
    }, 5 * 60 * 1000);

    this.networkTimer = setInterval(() => {
      this.updateSupply();
      this.updateUnikSupply();
      this.updateHeight();
      this.updateDelegates();
    }, 8 * 1000);
  }

  public clearTimers() {
    clearInterval(this.currencyTimer);
    clearInterval(this.networkTimer);
  }
}
</script>

<style scoped>
.blur {
  filter: blur(4px);
}
</style>
