<template>
  <div class="w-full flex">
    <div class="px-4 md:px-8 flex-auto flex">
      <button
        :class="[
          menuVisible ? 'border-red' : 'border-transparent',
          'px-2 sm:px-4 py-3 md:py-6 flex-none flex items-center border-b-2 mt-2px hover:border-red text-theme-text-secondary transition'
        ]"
        @click="$store.dispatch('ui/setMenuVisible', !menuVisible)"
      >
        <!-- Inline this SVG so we can change color dynamically -->
        <svg
          class="flex-none mr-3 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          width="15px"
          height="13px"
        >
          <path
            fill-rule="evenodd"
            fill="currentColor"
            d="M13.499,3.000 L1.499,3.000 C0.671,3.000 -0.001,2.328 -0.001,1.500 C-0.001,0.671 0.671,-0.000 1.499,-0.000 L13.499,-0.000 C14.328,-0.000 14.999,0.671 14.999,1.500 C14.999,2.328 14.328,3.000 13.499,3.000 ZM1.499,5.000 L7.499,5.000 C8.328,5.000 9.000,5.671 9.000,6.500 C9.000,7.328 8.328,8.000 7.499,8.000 L1.499,8.000 C0.671,8.000 -0.001,7.328 -0.001,6.500 C-0.001,5.671 0.671,5.000 1.499,5.000 ZM1.499,10.000 L9.499,10.000 C10.328,10.000 11.000,10.671 11.000,11.500 C11.000,12.328 10.328,13.000 9.499,13.000 L1.499,13.000 C0.671,13.000 -0.001,12.328 -0.001,11.500 C-0.001,10.671 0.671,10.000 1.499,10.000 Z"
          />
        </svg>
        <span class="semibold">{{ $t("Menu") }}</span>
      </button>
      <span class="border-r mx-2 md:mx-4 lg:mx-6 my-4" />
      <div class="flex-auto flex items-center justify-center">
        <label
          for="search"
          class="hidden"
        >{{ $t("Search") }}</label>
        <input
          id="search"
          :placeholder="placeholder"
          class="search-input hidden sm:block w-full flex-auto sm:mr-2 py-2 md:py-4 sm:pl-4 bg-transparent"
          @focus="$store.dispatch('ui/setHeaderType', 'search')"
        >
        <label
          for="search"
          class="search-icon text-grey hover:text-blue p-3 md:p-4 transition"
          @click="$store.dispatch('ui/setHeaderType', 'search')"
        >
          <svg
            class="fill-current"
            width="20"
            height="20"
            viewBox="0 0 1792 1792"
            xmlns="http://www.w3.org/2000/svg"
          ><path d="M1216 832q0-185-131.5-316.5t-316.5-131.5-316.5 131.5-131.5 316.5 131.5 316.5 316.5 131.5 316.5-131.5 131.5-316.5zm512 832q0 52-38 90t-90 38q-54 0-90-38l-343-342q-179 124-399 124-143 0-273.5-55.5t-225-150-150-225-55.5-273.5 55.5-273.5 150-225 225-150 273.5-55.5 273.5 55.5 225 150 150 225 55.5 273.5q0 220-124 399l343 343q37 37 37 90z" /></svg>
        </label>
      </div>

      <span
        v-if="shouldDisplayCurrency"
        class="border-r mx-2 md:mx-4 lg:mx-6 my-4 block"
      />
      <ToggleCurrency v-if="shouldDisplayCurrency" />

      <span
        v-if="shouldDisplayChart"
        class="border-r mx-2 md:mx-4 lg:mx-6 my-4 hidden md:block"
      />
      <ToggleChart v-if="shouldDisplayChart" />

      <span class="border-r mx-2 md:mx-4 lg:mx-6 my-4" />
      <ToggleTheme />

      <span class="border-r mx-2 md:mx-4 lg:mx-6 my-4 hidden md:block" />
      <ToggleLanguage />
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {
  ToggleChart,
  ToggleCurrency,
  ToggleLanguage,
  ToggleTheme
} from '@/components/header/toggles'
import { mapGetters } from 'vuex'

export default {
  name: 'HeaderDefault',

  components: {
    ToggleTheme,
    ToggleCurrency,
    ToggleLanguage,
    ToggleChart
  },

  data: () => ({
    placeholder: 'Search'
  }),

  computed: {
    ...mapGetters('network', { networkDefaults: 'defaults' }),
    ...mapGetters('ui', ['menuVisible', 'priceChart']),

    shouldDisplayCurrency () {
      return this.networkDefaults.priceChart
    },

    shouldDisplayChart () {
      return this.$route.name === 'home' && this.networkDefaults.priceChart
    }
  },

  mounted () {
    const WIDTH_THRESHOLD = 1024
    const widthQuery = window.matchMedia(`(max-width: ${WIDTH_THRESHOLD}px)`)

    widthQuery.addListener(e => this.setMobilePlaceholder(e.matches))

    this.setMobilePlaceholder(window.innerWidth < WIDTH_THRESHOLD)
  },

  methods: {
    setMobilePlaceholder (showMobile) {
      this.placeholder = showMobile
        ? this.$i18n.t('Search')
        : this.$i18n.t('Find a block, transaction, address or delegate')
    }
  }
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
