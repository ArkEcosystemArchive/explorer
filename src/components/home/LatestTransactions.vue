<template>
  <div>
    <loader :data="transactions">
      <div class="hidden sm:block">
        <table-transactions :transactions="transactions"></table-transactions>
      </div>
      <div class="sm:hidden">
          <table-transactions-mobile :transactions="transactions"></table-transactions-mobile>
      </div>
      <div class="mx-5 sm:mx-10 mt-5 md:mt-10 flex flex-wrap">
        <router-link :to="{ name: 'transactions', params: { page: 2 } }" tag="button" class="show-more-button">
          {{ $t("Show more") }}
        </router-link>
      </div>
    </loader>
  </div>
</template>

<script type="text/ecmascript-6">
import TransactionService from '@/services/transaction'

export default {
  props: ['transactionType'],
  data: () => ({
    transactions: null,
    transactionType: null
  }),

  async mounted() {
    await this.prepareComponent()
  },

  computed: {
    computeTransactionType() {
      return this.transactionType || Number(localStorage.getItem('transactionType'))
    }
  },

  methods: {
    async prepareComponent() {
      await this.getTransactions()

      this.$store.watch(state => state.network.height, value => this.getTransactions())
    },

    async getTransactions() {
      const response = await TransactionService.filterByType(0, this.computeTransactionType)
      localStorage.setItem('transactionType', this.computeTransactionType)
      this.transactions = response
    }
  }
}
</script>
