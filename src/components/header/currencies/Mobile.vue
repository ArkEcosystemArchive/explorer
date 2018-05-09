<template>
  <ul class="menu-container w-full text-center max-w-480px justify-center bg-table-row list-reset absolute pin-b pin-r py-5 block md:hidden">
    <li v-for="(symbol, currency) in currencies"
            @click="setCurrency(currency, symbol)"
            :key="currency"
            class="inline-flex hover:bg-grey-light">
      <a href="#" class="cursor-pointer py-3 w-32 flex-none">{{ currency }}</a>
    </li>
  </ul>
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

  .menu-container {
    transform: translateY(100%);
  }
</style>
