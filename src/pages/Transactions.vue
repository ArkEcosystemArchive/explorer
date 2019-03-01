<template>
  <div class="max-w-2xl mx-auto md:pt-5">
    <content-header>{{ $t("Transactions") }}</content-header>

    <section class="hidden sm:block mb-5">
      <div class="px-5 sm:px-10 py-8 bg-theme-feature-background flex xl:rounded-lg items-center justify-between">
        <div class="flex-auto min-w-0">
          <div class="text-grey mb-2">{{ $t("Transaction type") }}</div>
          <div class="flex">
            <div class="text-lg text-white semibold truncate">
              <span class="mr-2">{{ types[transactionType + 1] }}</span>
            </div>
          </div>
        </div>
        <div class="flex flex-col w-full sm:w-auto sm:ml-4 sm:-mr-10">
          <selection-type :in-banner="true" @change="setType" />
        </div>
      </div>
    </section>

    <section class="page-section py-5 md:py-10">
      <div class="hidden sm:block">
        <table-transactions :transactions="transactions" />
      </div>
      <div class="sm:hidden">
        <div class="mx-5 mb-4">
          <selection-type @change="setType" />
        </div>

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
    showPaginator() {
      return this.meta && (this.meta.previous || this.meta.next)
    }
  },

  created() {
    this.transactionType = Number(localStorage.getItem('transactionType') || -1)
  },

  watch: {
    currentPage() {
      this.changePage()
    }
  },

  async beforeRouteEnter (to, from, next) {
    try {
      const { meta, data } = await TransactionService.filterByType(
        to.params.page,
        Number(localStorage.getItem('transactionType') || -1)
      )

      next(vm => {
        vm.currentPage = to.params.page
        vm.setTransactions(data)
        vm.setMeta(meta)
      })
    } catch(e) { next({ name: '404' }) }
  },

  async beforeRouteUpdate (to, from, next) {
    this.transactions = null
    this.meta = null

    try {
      const { meta, data } = await TransactionService.filterByType(
        to.params.page,
        Number(localStorage.getItem('transactionType') || -1)
      )

      this.currentPage = to.params.page
      this.setTransactions(data)
      this.setMeta(meta)
      next()
    } catch(e) { next({ name: '404' }) }
  },

  methods: {
    setTransactions(transactions) {
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

    setType(type) {
      if (this.transactionType !== type) {
        this.transactionType = type
        this.currentPage = 1

        this.changePage()
      }
    },

    changePage() {
      this.$router.push({
        name: 'transactions',
        params: {
          page: this.currentPage
        }
      })
    }
  }
}
</script>
