import store from "@/store";
import { BigNumber } from "@/utils";

const locale = store.getters["ui/locale"];

export default {
  methods: {
    // Note: due to BigNumber config the max decimals is 8
    readableCrypto(value: string | undefined, appendCurrency: boolean = true, decimals: number = 8): string | void {
      if (value) {
        const bigNumberValue = BigNumber.make(value);
        const normalizedValue: string = Number(bigNumberValue.dividedBy(1e8)).toLocaleString(locale, {
          maximumFractionDigits: decimals,
        });

        return appendCurrency
          ? `${normalizedValue} ${store.getters["network/symbol"] || store.getters["network/defaults"].symbol || ""}`
          : normalizedValue;
      }
    },

    readableCurrency(
      value: string | number,
      rate: number | null = null,
      currency: string | null = null,
      normalise: boolean = true,
    ): string {
      const currencyName: string = currency || store.getters["currency/name"];

      if (normalise) {
        value = parseInt(value.toString(), 10) / 1e8;
      }

      let bigNumberValue = BigNumber.make(value);

      bigNumberValue = bigNumberValue.times(rate) || BigNumber.make(store.getters["currency/rate"]);

      const cryptos: { [key: string]: string } = {
        ARK: "Ѧ",
        BTC: "Ƀ",
        ETH: "Ξ",
        LTC: "Ł",
      };

      return [store.getters["network/token"], "BTC", "ETH", "LTC"].some(c => currencyName.indexOf(c) > -1)
        ? `${Number(value).toLocaleString(locale, {
            maximumFractionDigits: 8,
          })} ${cryptos[currencyName]}`
        : Number(value).toLocaleString(locale, {
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
