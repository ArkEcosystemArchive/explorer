<template>
  <div class="w-full px-10 hidden xl:flex">
    <button @click="$store.dispatch('ui/setHeaderType', null)" class="mr-4">
      <img src="@/assets/images/icons/cross.svg" />
    </button>

    <button v-for="(symbol, currency) in currencies" @click="setCurrency(currency, symbol)" :key="currency" class="menu-button">
      <a href="#">{{ currency }}</a>
    </button>
  </div>
</template>

<script type="text/ecmascript-6">
import CoinMarketCapService from '@/services/coin-market-cap'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('currency', { currencyName: 'name' }),
    ...mapGetters('network', ['currencies'])
  },

  methods: {
    setCurrency(currency, symbol) {
      CoinMarketCapService
        .price(currency)
        .then(rate => this.storeCurrency(currency, rate, symbol))
    },

    storeCurrency(currency, rate, symbol) {
      this.$store.dispatch('currency/setName', currency)
      this.$store.dispatch('currency/setRate', rate)
      this.$store.dispatch('currency/setSymbol', symbol)

      this.$store.dispatch('ui/setHeaderType', null)
    }
  }
}
</script>

<style>
  .search-input::placeholder {
    color: var(--color-theme-text-placeholder);
  }

  .search-icon:hover {
    box-shadow: 0 0 13px 2px rgba(197, 197, 213, 0.24);
  }
</style>
