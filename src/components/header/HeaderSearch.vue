<template>
  <div class="HeaderSearch px-5 sm:px-10">
    <button
      class="flex flex-none p-2"
      @click="$store.dispatch('ui/setHeaderType', null)"
    >
      <img src="@/assets/images/icons/cross.svg">
    </button>

    <label
      for="search"
      class="hidden"
    >
      {{ $t('SEARCH.PLACEHOLDER.SHORT') }}
    </label>

    <input
      ref="search"
      v-model="query"
      v-tooltip="{ show: nothingFound, content: $t('SEARCH.NO_RESULTS'), trigger: 'manual', placement: 'bottom-start', classes: 'search-tip' }"
      :placeholder="placeholder"
      :class="{ 'text-grey': nightMode }"
      type="search"
      class="search-input w-full flex-auto mr-2 py-4 pl-4 bg-transparent"
      @keyup.enter="search"
    >

    <button
      :disabled="!hasInput"
      class="search-icon text-grey hover:text-blue p-3 md:p-4 transition"
      @click="search"
    >
      <svg
        class="fill-current"
        width="20"
        height="20"
        viewBox="0 0 1792 1792"
        xmlns="http://www.w3.org/2000/svg"
      ><path d="M1216 832q0-185-131.5-316.5t-316.5-131.5-316.5 131.5-131.5 316.5 131.5 316.5 316.5 131.5 316.5-131.5 131.5-316.5zm512 832q0 52-38 90t-90 38q-54 0-90-38l-343-342q-179 124-399 124-143 0-273.5-55.5t-225-150-150-225-55.5-273.5 55.5-273.5 150-225 225-150 273.5-55.5 273.5 55.5 225 150 150 225 55.5 273.5q0 220-124 399l343 343q37 37 37 90z" /></svg>
    </button>
  </div>
</template>

<script type="text/ecmascript-6">
import SearchService from '@/services/search'
import { mapGetters } from 'vuex'

export default {
  name: 'HeaderSearch',

  data: () => ({
    query: null,
    nothingFound: false,
    searchCount: 0,
    placeholder: 'Search'
  }),

  computed: {
    ...mapGetters('delegates', ['delegates']),
    ...mapGetters('ui', ['nightMode']),
    ...mapGetters('network', ['knownWallets']),

    hasInput () {
      return !!this.query
    }
  },

  mounted () {
    this.$refs.search.focus()

    const WIDTH_THRESHOLD = 1024
    const widthQuery = window.matchMedia(`(max-width: ${WIDTH_THRESHOLD}px)`)

    widthQuery.addListener(e => this.setMobilePlaceholder(e.matches))

    this.setMobilePlaceholder(window.innerWidth < WIDTH_THRESHOLD)
  },

  methods: {
    async search () {
      if (!this.query) {
        return
      }

      this.nothingFound = false
      this.searchCount = 0
      this.query = this.query.trim()

      const address = this.findByNameInKnownWallets(this.query)
      if (address) {
        this.changePage('wallet', { address: address })
        return
      } else {
        this.updateSearchCount({ message: 'No known wallet with that name could be found' })
      }

      const del = this.delegates.find(d => d.username === this.query.toLowerCase())
      if (del) {
        this.changePage('wallet', { address: del.address })
        return
      } else {
        this.updateSearchCount({ message: 'No delegate with that username could be found' })
      }

      try {
        const responseAddress = await SearchService.walletByAddress(this.query)
        this.changePage('wallet', { address: responseAddress.address })
        return
      } catch (e) { this.updateSearchCount(e) }

      try {
        const responseDelegate = await SearchService.delegateByQuery(this.query.toLowerCase())
        this.changePage('wallet', { address: responseDelegate.address })
        return
      } catch (e) { this.updateSearchCount(e) }

      try {
        const responseBlock = await SearchService.blockByQuery(this.query)
        this.changePage('block', { id: responseBlock.id })
        return
      } catch (e) { this.updateSearchCount(e) }

      try {
        const responseTransaction = await SearchService.transactionById(this.query)
        this.changePage('transaction', { id: responseTransaction.id })
        return
      } catch (e) { this.updateSearchCount(e) }
    },

    updateSearchCount (err) {
      if (err !== null) {
        console.log(err.message || err.data.error)
      }

      // Increment counter to keep track of whether we found anything
      this.searchCount += 1
      if (this.searchCount === 6) { // Should match total amount of callbacks
        this.nothingFound = true
        setTimeout(() => (this.nothingFound = false), 1500)
      }
    },

    setMobilePlaceholder (showMobile) {
      if (!this.$i18n) return
      this.placeholder = showMobile
        ? this.$i18n.t('SEARCH.PLACEHOLDER.SHORT')
        : this.$i18n.t('SEARCH.PLACEHOLDER.LONG')
    },

    changePage (name, params) {
      this.$router.push({ name, params })
      this.$store.dispatch('ui/setHeaderType', null)
    },

    findByNameInKnownWallets (name) {
      if (name !== null) {
        for (const address in this.knownWallets) {
          if (this.knownWallets[address]) {
            if (name.toLowerCase() === this.knownWallets[address].toLowerCase()) {
              return address
            }
          }
        }
      }
    }
  }
}
</script>

<style>
.HeaderSearch {
  @apply .w-full .flex .items-center
}

.search-input::placeholder {
  color: var(--color-theme-text-placeholder);
}

.search-icon:hover:enabled {
  box-shadow: 0 0 13px 2px rgba(197, 197, 213, 0.24);
  cursor: pointer;
}
</style>
