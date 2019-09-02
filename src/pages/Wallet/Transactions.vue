<template>
  <div class="max-w-2xl mx-auto md:pt-5">
    <ContentHeader>{{ $t('COMMON.TRANSACTIONS') }}</ContentHeader>

    <section class="mb-5">
      <div class="px-5 sm:px-10 py-8 bg-theme-feature-background flex xl:rounded-lg items-center justify-between">
        <div class="mr-6 flex-none">
          <img
            class="block"
            src="@/assets/images/icons/transaction.svg"
          >
        </div>
        <div class="flex-auto min-w-0">
          <div class="text-grey mb-2">
            {{ $t('WALLET.ADDRESS') }}
          </div>
          <div class="flex">
            <div class="text-lg text-white semibold truncate">
              <span class="mr-2">{{ address }}</span>
            </div>
            <Clipboard
              v-if="address"
              :value="address"
            />
          </div>
        </div>
        <div class="flex flex-col ml-4">
          <div class="text-grey mb-2">
            {{ $t('COMMON.TYPE') }}
          </div>
          <div class="relative text-white z-20">
            <span
              v-click-outside="closeDropdown"
              class="cursor-pointer flex items-center"
              @click="selectOpen = !selectOpen"
            >
              <span class="mr-1">{{ $t(`TRANSACTION.TYPES.${type.toUpperCase()}`) }}</span>
              <svg
                :class="{ 'rotate-180': selectOpen }"
                class="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                width="16px"
                height="16px"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </span>
            <ul
              v-show="selectOpen"
              class="absolute right-0 mt-px bg-theme-content-background shadow-theme rounded border overflow-hidden text-sm"
            >
              <li
                v-for="txType in ['all', 'sent', 'received']"
                :key="txType"
              >
                <RouterLink
                  :to="{ name: 'wallet-transactions', params: { address: address, type: txType, page: 1 } }"
                  class="dropdown-button"
                >
                  {{ $t(`TRANSACTION.TYPES.${txType.toUpperCase()}`) }}
                </RouterLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="page-section py-5 md:py-10">
      <div class="hidden sm:block">
        <TableTransactionsDesktop
          :transactions="transactions"
          :sort-query="sortParams"
          @on-sort-change="onSortChange"
        />
      </div>
      <div class="sm:hidden">
        <TableTransactionsMobile :transactions="transactions" />
      </div>
      <Pagination
        v-if="showPagination"
        :meta="meta"
        :current-page="currentPage"
        @page-change="onPageChange"
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

  computed: {
    showPagination () {
      return this.meta && this.meta.pageCount > 1
    },

    address () {
      return this.$route.params.address
    },

    type () {
      return this.$route.params.type
    },

    sortParams: {
      get () {
        return this.$store.getters['ui/transactionSortParams']
      },

      set (params) {
        this.$store.dispatch('ui/setTransactionSortParams', {
          field: params.field,
          type: params.type
        })
      }
    }
  },

  watch: {
    currentPage () {
      this.changePage()
    }
  },

  async beforeRouteEnter (to, from, next) {
    try {
      const { meta, data } = await TransactionService[`${to.params.type}ByAddress`](to.params.address, to.params.page)

      next(vm => {
        vm.currentPage = Number(to.params.page)
        vm.setTransactions(data)
        vm.setMeta(meta)
      })
    } catch (e) { next({ name: '404' }) }
  },

  async beforeRouteUpdate (to, from, next) {
    this.selectOpen = false
    this.transactions = null
    this.meta = null

    try {
      const { meta, data } = await TransactionService[`${to.params.type}ByAddress`](to.params.address, to.params.page)

      this.currentPage = Number(to.params.page)
      this.setTransactions(data)
      this.setMeta(meta)
      next()
    } catch (e) { next({ name: '404' }) }
  },

  methods: {
    setTransactions (transactions) {
      if (!transactions) {
        return
      }

      this.transactions = transactions.map(transaction => ({ ...transaction, price: null }))
    },

    setMeta (meta) {
      this.meta = meta
    },

    onPageChange (page) {
      this.currentPage = page
    },

    closeDropdown () {
      this.selectOpen = false
    },

    changePage () {
      this.$router.push({
        name: 'wallet-transactions',
        params: {
          address: this.address,
          type: this.type,
          page: this.currentPage
        }
      })
    },

    onSortChange (params) {
      this.sortParams = params
    }
  }
}
</script>
