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
      class="flex flex-none p-2 close-button"
      @click="$store.dispatch('ui/setHeaderType', null)"
    >
      <img src="@/assets/images/icons/cross.svg">
    </button>
  </div>
</template>

<script type="text/ecmascript-6">
import CryptoCompareService from '@/services/crypto-compare'
import { mapGetters } from 'vuex'

export default {
  name: 'HeaderCurrenciesDesktop',

  computed: {
    ...mapGetters('currency', { currencyName: 'name' }),
    ...mapGetters('network', ['currencies'])
  },

  methods: {
    async setCurrency (currency, symbol) {
      this.$store.dispatch('ui/setHeaderType', null)

      const rate = await CryptoCompareService.price(currency)
      this.storeCurrency(currency, rate, symbol)
    },

    storeCurrency (currency, rate, symbol) {
      this.$store.dispatch('currency/setName', currency)
      this.$store.dispatch('currency/setRate', rate)
      this.$store.dispatch('currency/setSymbol', symbol)
    }
  }
}
</script>

<style scoped>
  .close-button {
    margin-left: 0.825rem;
  }
</style>
