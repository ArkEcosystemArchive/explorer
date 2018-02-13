<template>
  <div class="w-full flex items-center px-5 sm:px-10">
    <button @click="$store.dispatch('ui/setHeaderType', null)">
      <img src="@/assets/images/icons/cross.svg" />
    </button>

    <label for="search" class="hidden">Search</label>

    <input
      type="search"
      ref="search"
      placeholder="Find a block, transaction, address or delegate"
      class="search-input w-full flex-auto mr-2 py-4 pl-4 bg-transparent"
      :class="{ 'text-grey': nightMode }"
      v-model="query"
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
  data: () => ({ query: null }),

  computed: {
    ...mapGetters('ui', ['nightMode']),
  },

  mounted() {
    this.$refs.search.focus()
  },

  methods: {
    search() {
      SearchService.findByAddress(this.query).then(response =>
        this.changePage('wallet', { address: response.account.address })
      ).catch(e => console.log(e.message || e.data.error))

      SearchService.findByUsername(this.query).then(response =>
        this.changePage('wallet', { address: response.delegate.address })
      ).catch(e => console.log(e.message || e.data.error))

      SearchService.findByPublicKey(this.query).then(response =>
        this.changePage('wallet', { address: response.delegate.address })
      ).catch(e => console.log(e.message || e.data.error))

      SearchService.findByBlockId(this.query).then(response =>
        this.changePage('block', { id: response.block.id })
      ).catch(e => console.log(e.message || e.data.error))

      SearchService.findByTransactionId(this.query).then(response =>
        this.changePage('transaction', { id: response.transaction.id })
      ).catch(e => console.log(e.message || e.data.error))
    },

    changePage(name, params) {
      this.$router.push({ name, params })
      this.$store.dispatch('ui/setHeaderType', null)
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
}
</style>
