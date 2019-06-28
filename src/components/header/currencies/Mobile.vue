<template>
  <ul class="menu-container w-full text-center max-w-480px justify-center bg-table-row absolute bottom-0 right-0 py-5 block xl:hidden">
    <li
      v-for="(symbol, currency) in currencies"
      :key="currency"
      :class="[nightMode ? 'hover:bg-grey-dark' : 'hover:bg-grey-light', 'inline-flex justify-center']"
      @click="setCurrency(currency, symbol)"
    >
      <a
        href="#"
        class="cursor-pointer py-3 w-32 flex-none"
      >{{ currency }}</a>
    </li>
  </ul>
</template>

<script type="text/ecmascript-6">
import CryptoCompareService from '@/services/crypto-compare'
import { mapGetters } from 'vuex'

export default {
  name: 'HeaderCurrenciesMobile',

  computed: {
    ...mapGetters('ui', ['nightMode']),
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

<style>
  .menu-container {
    transform: translateY(100%);
  }
</style>
