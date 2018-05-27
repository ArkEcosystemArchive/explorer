<template>
  <ul class="menu-container w-full text-center max-w-480px justify-center bg-table-row list-reset absolute pin-b pin-r py-5 block xl:hidden">
    <li v-for="(symbol, currency) in currencies"
            @click="setCurrency(currency, symbol)"
            :key="currency"
            :class="[nightMode ? 'hover:bg-grey-dark' : 'hover:bg-grey-light', 'inline-flex justify-center']">
      <a href="#" class="cursor-pointer py-3 w-32 flex-none">{{ currency }}</a>
    </li>
  </ul>
</template>

<script type="text/ecmascript-6">
import CoinMarketCapService from '@/services/coin-market-cap'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('ui', ['nightMode']),
    ...mapGetters('currency', { currencyName: 'name' }),
    ...mapGetters('network', ['currencies'])
  },

  methods: {
    async setCurrency(currency, symbol) {
      const rate = await CoinMarketCapService.price(currency)
      this.storeCurrency(currency, rate, symbol)
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
  .menu-container {
    transform: translateY(100%);
  }
</style>
