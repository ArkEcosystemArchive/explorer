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
  data: () => ({
    transactions: null
  }),

  async mounted() {
    await this.prepareComponent()
  },

  methods: {
    async prepareComponent() {
      await this.getTransactions()

      this.$store.watch(state => state.network.height, value => this.getTransactions())
    },

    async getTransactions() {
      const response = await TransactionService.latest()
      this.transactions = response
    }
  }
}
</script>
