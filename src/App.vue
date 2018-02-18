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
    timer: null,
  }),

  created() {
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

    LoaderService.config().then(response => {
      this.$store.dispatch('network/setToken', response.token)
      this.$store.dispatch('network/setSymbol', response.symbol)
      this.$store.dispatch('network/setNethash', response.nethash)

      this.$store.dispatch(
        'ui/setLanguage',
        localStorage.getItem('language') || 'en'
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
      this.updateForged()
    })
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
      this.initialiseTimer()
    },

    updateCurrencyRate() {
      if (this.currencyName !== this.token) {
        CoinMarketCapService.price(this.currencyName).then(rate => {
          this.$store.dispatch('currency/setRate', rate)
        })
      }
    },

    updateSupply() {
      BlockService.supply().then(supply =>
        this.$store.dispatch('network/setSupply', supply)
      )
    },

    updateHeight() {
      BlockService.height().then(height =>
        this.$store.dispatch('network/setHeight', height)
      )
    },

    updateDelegates() {
      DelegateService.all().then(delegates => {
        this.$store.dispatch('delegates/setDelegates', delegates)
      })
    },

    updateForged() {
      DelegateService.forged().then(response => {
        this.$store.dispatch('delegates/setForged', response)
      })
    },

    initialiseTimer() {
      this.timer = setInterval(() => {
        this.updateCurrencyRate()
        this.updateSupply()
        this.updateHeight()
        this.updateDelegates()
        this.updateForged()
      }, 5 * 60 * 1000)
    },
  },

  beforeDestroy() {
    clearInterval(this.timer)
  },
}
</script>
