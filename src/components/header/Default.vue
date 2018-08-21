<template>
  <div class="w-full flex">
    <div class="px-4 md:px-8 flex-auto flex">
      <button
        @click="$store.dispatch('ui/setMenuVisible', !menuVisible)"
        :class="[
          menuVisible ? 'border-red' : 'border-transparent',
          'px-2 sm:px-4 py-3 md:py-6 flex-none flex items-center border-b-2 margin-t-2 hover:border-red text-theme-text-secondary'
        ]">
        <!-- Inline this SVG so we can change color dynamically -->
        <svg
          class="flex-none mr-3 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          width="15px" height="13px">
          <path fill-rule="evenodd"  fill="currenColor" d="M13.499,3.000 L1.499,3.000 C0.671,3.000 -0.001,2.328 -0.001,1.500 C-0.001,0.671 0.671,-0.000 1.499,-0.000 L13.499,-0.000 C14.328,-0.000 14.999,0.671 14.999,1.500 C14.999,2.328 14.328,3.000 13.499,3.000 ZM1.499,5.000 L7.499,5.000 C8.328,5.000 9.000,5.671 9.000,6.500 C9.000,7.328 8.328,8.000 7.499,8.000 L1.499,8.000 C0.671,8.000 -0.001,7.328 -0.001,6.500 C-0.001,5.671 0.671,5.000 1.499,5.000 ZM1.499,10.000 L9.499,10.000 C10.328,10.000 11.000,10.671 11.000,11.500 C11.000,12.328 10.328,13.000 9.499,13.000 L1.499,13.000 C0.671,13.000 -0.001,12.328 -0.001,11.500 C-0.001,10.671 0.671,10.000 1.499,10.000 Z"/>
        </svg>
        <span class="semibold">{{ $t("Menu") }}</span>
      </button>
      <span class="border-r mx-4 lg:mx-6 my-4"></span>
      <div class="flex-auto flex items-center justify-center">
        <label for="search" class="hidden">{{ $t("Search") }}</label>
        <input
          id="search"
          @focus="$store.dispatch('ui/setHeaderType', 'search')"
          :placeholder="placeholder"
          class="search-input hidden sm:block w-full flex-auto sm:mr-2 py-2 md:py-4 sm:pl-4 bg-transparent" />
        <label
          for="search" class="search-icon text-grey hover:text-blue p-3 md:p-4"
          @click="$store.dispatch('ui/setHeaderType', 'search')">
          <svg class="fill-current" width="20" height="20" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1216 832q0-185-131.5-316.5t-316.5-131.5-316.5 131.5-131.5 316.5 131.5 316.5 316.5 131.5 316.5-131.5 131.5-316.5zm512 832q0 52-38 90t-90 38q-54 0-90-38l-343-342q-179 124-399 124-143 0-273.5-55.5t-225-150-150-225-55.5-273.5 55.5-273.5 150-225 225-150 273.5-55.5 273.5 55.5 225 150 150 225 55.5 273.5q0 220-124 399l343 343q37 37 37 90z"/></svg>
        </label>
      </div>

      <span class="border-r mx-2 md:mx-4 lg:mx-6 my-4 block" v-if="shouldDisplayCurrency"></span>
      <toggle-currency v-if="shouldDisplayCurrency"></toggle-currency>

      <span class="border-r mx-2 md:mx-4 lg:mx-6 my-4 hidden md:block" v-if="shouldDisplayChart"></span>
      <toggle-chart v-if="shouldDisplayChart"></toggle-chart>

      <span class="border-r mx-2 md:mx-4 lg:mx-6 my-4"></span>
      <toggle-theme></toggle-theme>

      <span class="border-r mx-2 md:mx-4 lg:mx-6 my-4"></span>
      <button
        @click="$store.dispatch('ui/setHeaderType', 'server')"
        class="px-2 py-2 md:py-4 text-black flex-none flex items-center border-b-2 margin-t-2 border-transparent hover:border-red hover:text-blue" :class="{ 'text-grey': nightMode }">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          width="18px" height="17px">
          <path data-v-f97c03c8="" fill-rule="evenodd" fill="currentColor" d="M8.499,0.500 C4.099,0.500 0.500,4.100 0.500,8.499 C0.500,12.900 4.099,16.500 8.499,16.500 C12.900,16.500 16.499,12.900 16.499,8.499 C16.499,4.100 12.900,0.500 8.499,0.500 ZM13.700,5.800 C14.099,5.800 14.399,6.100 14.799,6.100 C14.500,6.500 13.200,6.500 12.800,6.000 C13.099,5.900 13.299,5.800 13.700,5.800 ZM1.500,8.499 C1.500,8.100 1.500,7.700 1.600,7.200 C1.700,7.200 1.799,7.299 1.899,7.299 C1.899,7.299 1.999,7.400 1.999,7.500 C1.999,7.799 2.299,8.000 2.500,8.000 C3.300,8.100 3.600,8.799 4.300,9.000 C4.500,9.099 4.400,9.299 4.300,9.500 C3.700,10.300 4.200,10.900 4.700,11.400 C5.200,11.799 5.200,12.200 5.300,12.799 C5.300,13.500 5.400,14.300 5.699,15.000 C3.199,13.800 1.500,11.400 1.500,8.499 ZM8.499,15.500 C7.799,15.500 6.999,15.400 6.399,15.200 C6.299,15.000 6.299,14.799 6.399,14.599 C6.799,13.800 7.200,13.099 7.699,12.400 C7.899,12.200 8.100,12.000 8.100,11.700 C8.100,11.500 8.200,11.200 8.299,11.000 C8.599,10.500 8.499,10.200 8.100,10.099 C7.299,9.900 6.899,9.200 6.299,8.899 C5.699,8.600 5.099,8.400 4.600,8.700 C4.400,8.799 4.099,8.899 4.099,8.600 C4.099,8.200 3.600,7.900 3.700,7.500 C3.600,7.500 3.500,7.500 3.400,7.600 C3.300,7.700 3.199,7.799 2.999,7.700 C2.799,7.500 2.899,7.299 2.899,7.100 C2.999,6.900 3.099,6.800 3.300,6.700 C3.700,6.600 4.099,6.600 4.300,7.100 C4.600,6.200 5.200,5.700 5.799,5.299 C5.799,5.299 6.599,4.600 6.699,4.600 C6.799,4.600 6.899,4.799 7.100,4.900 C7.299,4.900 7.399,4.900 7.399,4.700 C7.499,4.200 7.200,3.600 6.799,3.500 C6.799,3.400 6.899,3.400 6.899,3.400 C7.200,3.299 7.599,3.100 7.499,2.799 C7.499,2.400 7.100,2.200 6.699,2.200 C6.499,2.200 6.299,2.200 6.100,2.299 C5.699,2.500 5.200,2.700 4.600,2.700 C5.699,1.899 7.100,1.500 8.499,1.500 C8.799,1.500 9.000,1.500 9.299,1.500 C8.699,1.600 8.100,1.799 7.699,2.000 C8.299,2.100 8.399,2.400 8.200,2.900 C8.100,3.100 8.200,3.299 8.399,3.400 C8.599,3.500 8.799,3.500 8.899,3.299 C9.099,3.000 9.499,2.900 9.799,2.799 C10.200,2.700 10.499,2.500 10.799,2.100 C10.799,2.000 10.900,2.000 11.000,1.899 C11.599,2.100 12.200,2.500 12.800,2.900 C12.700,2.900 12.700,3.000 12.599,3.000 C12.400,3.200 12.099,3.299 12.400,3.700 C12.499,3.900 12.400,4.000 12.299,4.100 C12.099,4.200 12.000,4.100 11.900,4.000 C11.799,3.900 11.799,3.700 11.499,3.700 C11.400,3.900 11.099,4.000 11.099,4.300 C11.599,4.300 11.499,4.700 11.599,5.000 C11.000,5.100 10.799,5.400 11.099,5.900 C11.200,6.100 11.000,6.200 10.900,6.300 C10.499,6.900 10.099,7.299 10.099,8.000 C10.099,8.700 10.599,9.400 11.400,9.299 C12.299,9.200 12.299,9.200 12.599,10.000 C12.599,10.099 12.700,10.200 12.700,10.300 C12.800,10.500 12.900,10.700 12.800,10.900 C12.499,11.700 12.900,12.299 13.200,12.900 C13.299,13.099 13.399,13.200 13.499,13.299 C12.200,14.700 10.499,15.500 8.499,15.500 Z" />
        </svg>
      </button>
      
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import ToggleTheme from './ToggleTheme'
import ToggleChart from './ToggleChart'
import ToggleCurrency from './ToggleCurrency'
import { mapGetters } from 'vuex'

export default {
  components: {
    ToggleTheme,
    ToggleCurrency,
    ToggleChart
  },

  data: () => ({
    placeholder: 'Search',
  }),

  computed: {
    ...mapGetters('network', { networkDefaults: 'defaults' }),
    ...mapGetters('ui', ['menuVisible', 'priceChart', 'nightMode']),

    shouldDisplayCurrency() {
      return this.networkDefaults.config.priceChart
    },

    shouldDisplayChart() {
      return this.$route.name === 'home' && this.networkDefaults.config.priceChart
    },
  },

  mounted() {
    const WIDTH_THRESHOLD = 1024
    const widthQuery = window.matchMedia(`(max-width: ${WIDTH_THRESHOLD}px)`)

    widthQuery.addListener(e => this.setMobilePlaceholder(e.matches))

    this.setMobilePlaceholder(window.innerWidth < WIDTH_THRESHOLD)
  },

  methods: {
    setMobilePlaceholder(showMobile) {
      this.placeholder = showMobile
        ? this.$i18n.t('Search')
        : this.$i18n.t('Find a block, transaction, address or delegate')
    },
  },
}
</script>

<style scoped>
.search-input::placeholder {
  color: var(--color-theme-text-placeholder);
}
.search-icon:hover {
  box-shadow: 0 0 13px 2px rgba(197, 197, 213, 0.24);
  cursor: pointer;
}
</style>
