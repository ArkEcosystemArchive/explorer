import store from "@/store";

const locale = store.getters["ui/locale"];

export default {
  methods: {
    readableCrypto(value: number | undefined, appendCurrency: boolean = true, decimals: number = 8): string | void {
      if (value) {
        const normalizedValue: string = (value /= 1e8).toLocaleString(locale, {
          maximumFractionDigits: decimals,
        });

        return appendCurrency
          ? `${normalizedValue} ${store.getters["network/symbol"] || store.getters["network/defaults"].symbol || ""}`
          : normalizedValue;
      }
    },

    readableCurrency(
      value: number,
      rate: number | null = null,
      currency: string | null = null,
      normalise: boolean = true,
    ): string {
      const currencyName: string = currency || store.getters["currency/name"];

      if (normalise) {
        value = parseInt(value.toString(), 10) / 1e8;
      }

      value *= rate || store.getters["currency/rate"];

      const cryptos: { [key: string]: string } = {
        ARK: "Ѧ",
        BTC: "Ƀ",
        ETH: "Ξ",
        LTC: "Ł",
      };

      return [store.getters["network/token"], "BTC", "ETH", "LTC"].some(c => currencyName.indexOf(c) > -1)
        ? `${value.toLocaleString(locale, {
            maximumFractionDigits: 8,
          })} ${cryptos[currencyName]}`
        : value.toLocaleString(locale, {
            style: "currency",
            currency: currencyName,
          });
    },

    rawCurrency(value: number, currencyName: string): string {
      return [store.getters["network/token"], "BTC", "ETH", "LTC"].some(c => currencyName.indexOf(c) > -1)
        ? value.toLocaleString(locale, {
            maximumFractionDigits: 8,
          })
        : value.toLocaleString(locale, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });
    },
  },
};
