<template>
  <div class="max-w-2xl mx-auto md:pt-5">
    <content-header>{{ $t("Transactions") }}</content-header>

    <section class="mb-5">
      <div class="px-5 sm:px-10 py-8 bg-theme-feature-background flex xl:rounded-lg items-center justify-between">
        <div class="mr-6 flex-none">
          <img class="block" src="@/assets/images/icons/transaction.svg" />
        </div>
        <div class="flex-auto min-w-0">
          <div class="text-grey mb-2">{{ $t("Address") }}</div>
          <div class="flex">
            <div class="text-lg text-white semibold truncate">
              <span class="mr-2">{{ address }}</span>
            </div>
            <clipboard v-if="address" :value="address" />
          </div>
        </div>
        <div class="flex flex-col ml-4">
          <div class="text-grey mb-2">{{ $t("Type") }}</div>
          <div class="relative text-white z-20">
            <span @click="selectOpen = !selectOpen" class="cursor-pointer flex items-center">
              <span class="mr-1">{{ $t(capitalize(type)) }}</span>
              <svg :class="{ 'rotate-180': selectOpen }" class="fill-current" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                width="16px" height="16px">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </span>
            <ul v-show="selectOpen" class="absolute pin-r mt-px bg-white shadow rounded border overflow-hidden list-reset text-sm">
              <li v-for="txType in ['all', 'sent', 'received']">
                <router-link :to="{ name: 'wallet-transactions', params: { address: address, type: txType, page: 1 } }" class="dropdown-button">{{ $t(capitalize(txType)) }}</router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="page-section py-5 md:py-10">
      <div class="hidden sm:block">
        <table-transactions :transactions="transactions" />
      </div>
      <div class="sm:hidden">
        <table-transactions-mobile :transactions="transactions" />
      </div>
      <paginator
        v-if="showPaginator"
        :previous="this.meta.previous"
        :next="this.meta.next"
        @previous="onPrevious"
        @next="onNext"
      />
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
import TransactionService from '@/services/transaction'

export default {
  data: () => ({
    transactions: null,
    meta: null,
    currentPage: 0,
    selectOpen: false
  }),

  watch: {
    currentPage() {
      this.changePage()
    }
  },

  async beforeRouteEnter (to, from, next) {
    try {
      const { meta, data } = await TransactionService[`${to.params.type}ByAddress`](to.params.address, to.params.page)

      next(vm => {
        vm.currentPage = to.params.page
        vm.setTransactions(data)
        vm.setMeta(meta)
      })
    } catch(e) { next({ name: '404' }) }
  },

  async beforeRouteUpdate (to, from, next) {
    this.selectOpen = false
    this.transactions = null
    this.meta = null

    try {
      const { meta, data } = await TransactionService[`${to.params.type}ByAddress`](to.params.address, to.params.page)

      this.currentPage = to.params.page
      this.setTransactions(data)
      this.setMeta(meta)
      next()
    } catch(e) { next({ name: '404' }) }
  },

  computed: {
    showPaginator() {
      return this.meta && (this.meta.previous || this.meta.next)
    },

    address() {
      return this.$route.params.address
    },

    type() {
      return this.$route.params.type
    }
  },

  methods: {
    setTransactions (transactions) {
      if (!transactions) {
        return
      }

      this.transactions = transactions
    },

    setMeta(meta) {
      this.meta = meta
    },

    onPrevious() {
      this.currentPage = Number(this.currentPage) - 1
    },

    onNext() {
      this.currentPage = Number(this.currentPage) + 1
    },

    changePage() {
      this.$router.push({
        name: 'wallet-transactions',
        params: {
          address: this.address,
          type: this.type,
          page: this.currentPage
        }
      })
    }
  }
}
</script>
