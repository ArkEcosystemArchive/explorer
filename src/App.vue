<template>
  <main :class="[
    nightMode ? 'theme-dark' : 'theme-light',
    'bg-theme-page-background text-theme-text-content min-h-screen font-sans xl:pt-8'
  ]">
    <app-header></app-header>

    <router-view></router-view>

    <app-footer></app-footer>
  </main>
</template>

<script type="text/ecmascript-6">
import AppHeader from '@/components/header/Main'
import AppFooter from '@/components/Footer'
import CoinMarketCapService from '@/services/coin-market-cap'
import BlockService from '@/services/block'
import DelegateService from '@/services/delegate'
import LoaderService from '@/services/loader'
import { mapGetters } from 'vuex'

import '@/styles/style.css'

export default {
  components: { AppHeader, AppFooter },

  data: () => ({
    currencyTimer: null,
    networkTimer: null
  }),

  async created() {
    const network = require(`../networks/${process.env.EXPLORER_CONFIG}`)

    this.$store.dispatch('network/setDefaults', network)

    this.$store.dispatch('network/setServer', network.server)
    this.$store.dispatch('network/setAlias', network.alias)
    this.$store.dispatch('network/setActiveDelegates', network.activeDelegates)
    this.$store.dispatch('network/setRewardOffset', network.rewardOffset)
    this.$store.dispatch('network/setCurrencies', network.currencies)
    this.$store.dispatch('network/setKnownWallets', network.knownWallets)

    if (network.defaults.currency) {
      this.$store.dispatch(
        'currency/setName',
        localStorage.getItem('currencyName') || network.defaults.currency.name
      )

      this.$store.dispatch(
        'currency/setSymbol',
        localStorage.getItem('currencySymbol') || network.defaults.currency.symbol
      )
    }

    const response = await LoaderService.config()
    this.$store.dispatch('network/setToken', response.token)
    this.$store.dispatch('network/setSymbol', response.symbol)
    this.$store.dispatch('network/setNethash', response.nethash)

    this.$store.dispatch(
      'ui/setLanguage',
      localStorage.getItem('language') || 'en'
    )

    this.$store.dispatch(
      'ui/setLocale',
      localStorage.getItem('locale') || navigator.language || 'en'
    )

    this.$store.dispatch(
      'ui/setPriceChart',
      localStorage.getItem('priceChart') || network.config.priceChart
    )

    this.$store.dispatch(
      'ui/setNightMode',
      localStorage.getItem('nightMode') || false
    )

    this.updateCurrencyRate()
    this.updateSupply()
    this.updateHeight()
    this.updateDelegates()
  },

  mounted() {
    this.prepareComponent()
  },

  computed: {
    ...mapGetters('currency', { currencyName: 'name' }),
    ...mapGetters('ui', ['nightMode']),
    ...mapGetters('network', ['token']),
  },

  methods: {
    prepareComponent() {
      this.initialiseTimers()
    },

    async updateCurrencyRate() {
      if (this.currencyName !== this.token) {
        const rate = await CoinMarketCapService.price(this.currencyName)
        this.$store.dispatch('currency/setRate', rate)
      }
    },

    async updateSupply() {
      const supply = await BlockService.supply()
      this.$store.dispatch('network/setSupply', supply)
    },

    async updateHeight() {
      const height = await BlockService.height()
      this.$store.dispatch('network/setHeight', height)
    },

    async updateDelegates() {
      const delegates = await DelegateService.all()
      this.$store.dispatch('delegates/setDelegates', delegates)
    },

    initialiseTimers() {
      this.currencyTimer = setInterval(() => {
        this.updateCurrencyRate()
      }, 5 * 60 * 1000)

      this.networkTimer = setInterval(() => {
        this.updateSupply()
        this.updateHeight()
        this.updateDelegates()
      }, 8 * 1000)
    },

    clearTimers() {
      clearInterval(this.currencyTimer)
      clearInterval(this.networkTimer)
    }
  },

  beforeDestroy() {
    this.clearTimers()
  },
}
</script>
