<template>
  <div>
    <Loader :data="transactions">
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
      <div class="mx-5 sm:mx-10 mt-5 md:mt-10 flex flex-wrap">
        <RouterLink
          :to="{ name: 'transactions', params: { page: 2 } }"
          tag="button"
          class="show-more-button"
        >
          {{ $t("Show more") }}
        </RouterLink>
      </div>
    </Loader>
  </div>
</template>

<script type="text/ecmascript-6">
import TransactionService from '@/services/transaction'

export default {
  name: 'LatestTransactions',

  props: {
    transactionType: {
      type: Number,
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
    async transactionType () {
      this.transactions = null
      await this.getTransactions()
    }
  },

  async mounted () {
    await this.prepareComponent()
  },

  methods: {
    async prepareComponent () {
      await this.getTransactions()

      this.$store.watch(state => state.network.height, value => this.getTransactions())
    },

    async getTransactions () {
      const { data } = await TransactionService.filterByType(1, this.transactionType)
      this.transactions = data
    },

    onSortChange (params) {
      this.sortParams = params
    }
  }
}
</script>
