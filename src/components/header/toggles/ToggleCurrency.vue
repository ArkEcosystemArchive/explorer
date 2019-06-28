<template>
  <button
    class="px-2 md:px-4 py-3 md:py-6 flex items-center text-sm border-b-2 mt-2px border-transparent hover:border-red transition"
    @click="$store.dispatch('ui/setHeaderType', isCurrencyMenu ? null : 'currencies')"
  >
    <img
      :src="imageSource"
      class="md:mr-4 flex-none"
      style="height: 16px;"
    >
    <span class="whitespace-no-wrap text-theme-text-content hidden md:inline-block">
      {{ networkToken() }}/{{ currencyName }}: {{ rawCurrency(currencyRate, currencyName) }}
    </span>
  </button>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'

export default {
  name: 'ToggleCurrency',

  computed: {
    ...mapGetters('currency', {
      currencyName: 'name',
      currencyRate: 'rate'
    }),

    ...mapGetters('ui', ['headerType']),

    isCurrencyMenu () {
      return this.headerType === 'currencies'
    },

    imageSource () {
      return require(`@/assets/images/currencies/${this.currencyName}.svg`)
    }
  }
}
</script>
