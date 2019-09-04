<template>
  <div class="max-w-2xl mx-auto md:pt-5">
    <ContentHeader>{{ $t('COMMON.TRANSACTIONS') }}</ContentHeader>

    <section class="hidden sm:block mb-5">
      <div class="px-5 sm:px-10 py-8 bg-theme-feature-background flex xl:rounded-lg items-center justify-between">
        <div class="flex-auto min-w-0">
          <div class="text-grey mb-2">
            {{ $t('TRANSACTION.TYPE') }}
          </div>
          <div class="flex">
            <div class="text-lg text-white semibold truncate">
              <span class="mr-2">{{ types[transactionType + 1] }}</span>
            </div>
          </div>
        </div>
        <div class="flex flex-col w-full sm:w-auto sm:ml-4 sm:-mr-10">
          <SelectionType
            :in-banner="true"
            @change="setType"
          />
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
        <div class="mx-5 mb-4">
          <SelectionType @change="setType" />
        </div>

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
import SelectionType from '@/components/SelectionType'
import TransactionService from '@/services/transaction'

export default {
  components: {
    SelectionType
  },

  data: () => ({
    transactions: null,
    meta: null,
    currentPage: 0,
    types: [
      'All', 'Transfer', 'Second Signature', 'Delegate Registration', 'Vote', 'Multisignature Registration'
    ],
    transactionType: -1
  }),

  computed: {
    showPagination () {
      return this.meta && this.meta.pageCount > 1
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

  created () {
    this.transactionType = Number(localStorage.getItem('transactionType') || -1)
  },

  async beforeRouteEnter (to, from, next) {
    try {
      const { meta, data } = await TransactionService.filterByType(
        to.params.page,
        Number(localStorage.getItem('transactionType') || -1)
      )

      next(vm => {
        vm.currentPage = Number(to.params.page)
        vm.setTransactions(data)
        vm.setMeta(meta)
      })
    } catch (e) {
      next({ name: '404' })
    }
  },

  async beforeRouteUpdate (to, from, next) {
    this.transactions = null
    this.meta = null

    try {
      const { meta, data } = await TransactionService.filterByType(
        to.params.page,
        Number(localStorage.getItem('transactionType') || -1)
      )

      this.currentPage = Number(to.params.page)
      this.setTransactions(data)
      this.setMeta(meta)
      next()
    } catch (e) {
      next({ name: '404' })
    }
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

    setType (type) {
      if (this.transactionType !== type) {
        this.transactionType = type
        this.currentPage = 1

        this.transactions = null
        this.meta = null

        this.getTransactions()
      }
    },

    async getTransactions () {
      try {
        const { meta, data } = await TransactionService.filterByType(
          this.currentPage,
          this.transactionType
        )

        this.setTransactions(data)
        this.setMeta(meta)
      } catch (e) {
        console.log(e.message || e.data.error)
      }
    },

    changePage () {
      this.$router.push({
        name: 'transactions',
        params: {
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
