<template>
  <div class="w-full flex items-center px-5 sm:px-10">
    <button @click="$store.dispatch('ui/setHeaderType', null)">
      <img src="@/assets/images/icons/cross.svg" />
    </button>

    <label for="search" class="hidden">{{ $t("Search") }}</label>

    <input
      type="search"
      ref="search"
      :placeholder=placeholder
      class="search-input w-full flex-auto mr-2 py-4 pl-4 bg-transparent"
      :class="{ 'text-grey': nightMode }"
      v-model="query"
      v-tooltip="{show: nothingFound, content: $t('Nothing matched your search'), trigger: 'manual', placement: 'bottom-start', classes: 'search-tip' }"
      @keyup.enter="search" />

    <div class="search-icon text-grey hover:text-blue p-3 md:p-4" @click="search">
      <svg class="fill-current" width="20" height="20" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1216 832q0-185-131.5-316.5t-316.5-131.5-316.5 131.5-131.5 316.5 131.5 316.5 316.5 131.5 316.5-131.5 131.5-316.5zm512 832q0 52-38 90t-90 38q-54 0-90-38l-343-342q-179 124-399 124-143 0-273.5-55.5t-225-150-150-225-55.5-273.5 55.5-273.5 150-225 225-150 273.5-55.5 273.5 55.5 225 150 150 225 55.5 273.5q0 220-124 399l343 343q37 37 37 90z"/></svg>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import SearchService from '@/services/search'
import { mapGetters } from 'vuex'

export default {
  data: () => ({
    query: null,
    nothingFound: false,
    searchCount: 0,
    placeholder: 'Search'
  }),

  computed: {
    ...mapGetters('ui', ['nightMode']),
    ...mapGetters('network', ['knownWallets'])
  },

  mounted() {
    this.$refs.search.focus()

    const WIDTH_THRESHOLD = 1024
    const widthQuery = window.matchMedia(`(max-width: ${WIDTH_THRESHOLD}px)`)

    widthQuery.addListener(e => this.setMobilePlaceholder(e.matches))

    this.setMobilePlaceholder(window.innerWidth < WIDTH_THRESHOLD)
  },

  methods: {
    async search() {
      this.nothingFound = false
      this.searchCount = 0

      try {
        const responseAddress = await SearchService.findByAddress(this.query)
        this.changePage('wallet', { address: responseAddress.account.address })
      } catch(e) { this.updateSearchCount(e) }

      try {
        const responseUsername = await SearchService.findByUsername(this.query)
        this.changePage('wallet', { address: responseUsername.delegate.address })
      } catch(e) { this.updateSearchCount(e) }

      try {
        const responsePublicKey = await SearchService.findByPublicKey(this.query)
        this.changePage('wallet', { address: responsePublicKey.delegate.address })
      } catch(e) { this.updateSearchCount(e) }

      try {
        const responseBlock = await SearchService.findByBlockId(this.query)
        this.changePage('block', { id: responseBlock.block.id })
      } catch(e) { this.updateSearchCount(e) }

      try {
        const responseTransaction = await SearchService.findByTransactionId(this.query)
        this.changePage('transaction', { id: responseTransaction.transaction.id })
      } catch(e) { this.updateSearchCount(e) }

      const address = this.findByNameInKnownWallets(this.query)
      if (address) {
        this.changePage('wallet', { address: address })
      } else {
        this.updateSearchCount(null)
      }
    },

    updateSearchCount(err) {
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

    setMobilePlaceholder(showMobile) {
      this.placeholder = showMobile
        ? this.$i18n.t('Search')
        : this.$i18n.t('Find a block, transaction, address or delegate')
    },

    changePage(name, params) {
      this.$router.push({ name, params })
      this.$store.dispatch('ui/setHeaderType', null)
    },

    findByNameInKnownWallets(name) {
      if (name !== null) {
        for (const address in this.knownWallets) {
          if (this.knownWallets.hasOwnProperty(address)) {
            if (this.query.toLowerCase() === this.knownWallets[address].toLowerCase()) {
              return address
            }
          }
        }
      }
    },
  },
}
</script>

<style>
.search-input::placeholder {
  color: var(--color-theme-text-placeholder);
}

.search-icon:hover {
  box-shadow: 0 0 13px 2px rgba(197, 197, 213, 0.24);
  cursor: pointer;
}

.tooltip.search-tip .tooltip-inner {
  background-color: #ef192d;
  color: white;
}

.tooltip.search-tip .tooltip-arrow {
  border-color: #ef192d;
}
</style>
