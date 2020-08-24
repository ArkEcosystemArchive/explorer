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
import { Managers } from "@arkecosystem/crypto";
import { Component, Vue } from "vue-property-decorator";
import AppHeader from "@/components/header/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import { transactionTypes } from "@/constants";
import { TypeGroupTransaction } from "@/enums";
import {
  BlockchainService,
  CryptoCompareService,
  DelegateService,
  EntityService,
  MigrationService,
  NodeService,
} from "@/services";
import { knownWalletsUrls } from "@/config";
import { mapGetters } from "vuex";
import axios from "axios";
import moment from "moment";

@Component({
  computed: {
    ...mapGetters("currency", { currencyName: "name" }),
    ...mapGetters("delegates", ["stateHasDelegates"]),
    ...mapGetters("network", ["hasHtlcEnabled", "hasMagistrateEnabled", "token"]),
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
  private hasHtlcEnabled: boolean;
  private hasMagistrateEnabled: boolean;
  private language: string;
  private locale: string;
  private nightMode: boolean;
  private hasBlurFilter = false;

  public async created() {
    MigrationService.executeMigrations();

    const network = require(`../networks/${process.env.VUE_APP_EXPLORER_CONFIG}`);

    Managers.configManager.setFromPreset(process.env.VUE_APP_EXPLORER_CONFIG || ("devnet" as any));

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

    let knownWallets;

    try {
      knownWallets = (await axios.get(knownWalletsUrls[process.env.VUE_APP_EXPLORER_CONFIG])).data;
    } catch (error) {
      knownWallets = {};
    } finally {
      this.$store.dispatch("network/setKnownWallets", knownWallets);
    }

    this.fetchInitialSupply();

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
    this.$store.dispatch("network/setHasHtlcEnabled", !!response.constants.htlcEnabled);

    if (network.alias === "Main") {
      try {
        await CryptoCompareService.price(response.token);
        this.$store.dispatch("network/setIsListed", true);
      } catch (e) {
        // tslint:disable-next-line:no-console
        console.log(e.message || e.data.error);
      }
    }

    this.$store.dispatch("ui/setSmartbridgeFilter", localStorage.getItem("smartbridgeFilter") || "filtered");

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
    this.updateHeight();
    this.updateDelegates();

    await this.checkForMagistrateEnabled();
    this.setEnabledTransactionTypes();
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

  public async fetchInitialSupply() {
    let initialSupply = localStorage.getItem("initialSupply");

    if (!initialSupply) {
      const crypto = await NodeService.crypto();
      initialSupply = crypto.genesisBlock.totalAmount;
    }

    this.$store.dispatch("network/setInitialSupply", initialSupply);
  }

  public async updateCurrencyRate() {
    if (this.$store.getters["network/isListed"] && this.currencyName !== this.token) {
      try {
        const rate = await CryptoCompareService.price(this.currencyName);
        this.$store.dispatch("currency/setRate", rate);
      } catch (e) {
        // tslint:disable-next-line:no-console
        console.log(e.message || e.data.error);
      }
    }
  }

  public async updateSupply() {
    const supply = await BlockchainService.supply();
    this.$store.dispatch("network/setSupply", supply);
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
    const hasMagistrateEnabled = await EntityService.isEnabled();
    this.$store.dispatch("network/setHasMagistrateEnabled", hasMagistrateEnabled);
  }

  public setEnabledTransactionTypes() {
    let types = transactionTypes;

    if (!this.hasMagistrateEnabled) {
      types = types.filter((type) => type.typeGroup !== TypeGroupTransaction.MAGISTRATE);
    }

    if (!this.hasHtlcEnabled) {
      types = types.filter((type) => !type.key.startsWith("TIMELOCK"));
    }

    this.$store.dispatch("network/setEnabledTransactionTypes", types);
  }

  public updateRequired(timestamp: number): boolean {
    return timestamp < moment().subtract(2, "minute").unix();
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
