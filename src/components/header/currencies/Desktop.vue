<template>
  <div class="w-full px-5 hidden xl:flex items-center justify-end">
    <button
      v-for="(symbol, currency) in currencies"
      :key="currency"
      class="menu-button"
      @click="setCurrency(currency, symbol)"
    >
      <a href="#">{{ currency }}</a>
    </button>

    <button
      class="flex flex-none p-2 text-theme-button-close close-button"
      @click="$store.dispatch('ui/setHeaderType', null)"
    >
      <SvgIcon name="cross" view-box="0 0 14 14" />
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";
import CryptoCompareService from "@/services/crypto-compare";

@Component({
  computed: {
    ...mapGetters("currency", { currencyName: "name" }),
    ...mapGetters("network", ["currencies"]),
  },
})
export default class HeaderCurrenciesDesktop extends Vue {
  private currencyName: string;
  private currencies: string[];

  private async setCurrency(currency: string, symbol: string) {
    this.$store.dispatch("ui/setHeaderType", null);

    const rate = await CryptoCompareService.price(currency);
    this.storeCurrency(currency, rate!, symbol);
  }

  private storeCurrency(currency: string, rate: number, symbol: string) {
    this.$store.dispatch("currency/setName", currency);
    this.$store.dispatch("currency/setRate", rate);
    this.$store.dispatch("currency/setSymbol", symbol);
  }
}
</script>

<style scoped>
.close-button {
  margin-left: 0.825rem;
}
</style>
