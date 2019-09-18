import { I18N } from "@/config";
import store from "@/store";

class MigrationService {
  public executeMigrations(): void {
    const migrations = ["languageKey", "priceChart", "selectionType"];

    for (const migration of migrations) {
      // @ts-ignore
      this[migration]();
    }
  }

  public languageKey(): void {
    let language = localStorage.getItem("language");

    if (!language || I18N.enabledLocales.includes(language)) {
      return;
    }

    const parts = language.split("-");
    language = [parts[0], parts[parts.length > 1 ? 1 : 0].toUpperCase()].join("-");

    localStorage.setItem("language", language);
  }

  public priceChart(): void {
    let priceChart = localStorage.getItem("priceChart");
    let priceChartPeriod = localStorage.getItem("priceChartPeriod");

    if (!priceChart && !priceChartPeriod) {
      return;
    }

    const network = require(`../../networks/${process.env.VUE_APP_EXPLORER_CONFIG}`);

    priceChart =
      priceChart && priceChart !== "undefined" ? JSON.parse(priceChart) : network.defaults.priceChartOptions.enabled;
    priceChartPeriod = priceChartPeriod || network.defaults.priceChartOptions.period;

    localStorage.setItem(
      "priceChartOptions",
      JSON.stringify({
        ...store.getters["ui/priceChartOptions"],
        ...{
          enabled: priceChart,
          period: priceChartPeriod,
        },
      }),
    );

    localStorage.removeItem("priceChart");
    localStorage.removeItem("priceChartPeriod");
  }

  public selectionType(): void {
    const transactionType = localStorage.getItem("transactionType");

    if (!transactionType || isNaN(Number(transactionType))) {
      return;
    }

    localStorage.setItem("transactionType", JSON.stringify({ key: "ALL", type: -1 }));
  }
}

export default new MigrationService();
