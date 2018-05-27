<template>
  <div class="w-full px-10 hidden xl:flex items-center">
    <button @click="$store.dispatch('ui/setHeaderType', null)" class="close-button">
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

<style scoped>
  .close-button {
    margin-right: 0.825rem;
  }
</style>
