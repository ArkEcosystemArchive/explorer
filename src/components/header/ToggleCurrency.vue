<template>
  <button
    @click="$store.dispatch('ui/setHeaderType', isCurrencyMenu ? null : 'currencies')"
    class="px-2 md:px-4 py-3 md:py-6 flex items-center text-sm border-b-2 margin-t-2 border-transparent hover:border-red">
    <img class="md:mr-4 flex-none" :src="imageSource" style="height: 16px;" />
    <span class="whitespace-no-wrap text-theme-text-content hidden md:inline-block">
      ARK/{{ currencyName }}: {{ rawCurrency(currencyRate, currencyName) }}
    </span>
  </button>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('currency', {
      currencyName: 'name',
      currencyRate: 'rate'
    }),

    ...mapGetters('ui', ['headerType']),

    isCurrencyMenu() {
      return this.headerType === 'currencies'
    },

    imageSource() {
      return require(`@/assets/images/currencies/${this.currencyName}.svg`)
    }
  }
}
</script>
