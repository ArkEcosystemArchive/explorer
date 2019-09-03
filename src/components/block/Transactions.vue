<template>
  <div v-if="transactions && transactions.length > 0">
    <h2 class="text-2xl mb-5 md:mb-6 px-5 sm:hidden text-theme-text-primary">
      {{ $t('COMMON.TRANSACTIONS') }}
    </h2>
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
      <div
        v-if="transactions.length >= 25"
        class="mx-5 sm:mx-10 mt-5 md:mt-10 flex flex-wrap"
      >
        <RouterLink
          :to="{ name: 'block-transactions', params: { block: block.id, page: 2 } }"
          tag="button"
          class="button-lg"
        >
          {{ $t('PAGINATION.SHOW_MORE') }}
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
import TransactionService from '@/services/transaction'

export default {
  name: 'BlockTransactions',

  props: {
    block: {
      type: Object,
      required: true
    }
  },

  data: () => ({
    transactions: null
  }),

  computed: {
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
    block () {
      this.resetTransactions()
      this.getTransactions()
    }
  },

  methods: {
    resetTransactions () {
      this.transactions = null
    },

    async getTransactions () {
      if (!this.block.id) return

      if (this.block.transactions) {
        const { data } = await TransactionService.byBlock(this.block.id)
        this.transactions = data.map(transaction => ({ ...transaction, price: null }))
      }
    },

    onSortChange (params) {
      this.sortParams = params
    }
  }
}
</script>
