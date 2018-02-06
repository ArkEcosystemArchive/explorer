<template>
  <div>
    <h2 class="text-2xl mb-5 md:mb-6 px-10 sm:hidden text-theme-text-primary">Transactions</h2>
    <section class="bg-theme-content-background shadow-theme xl:rounded-lg py-8">
      <nav class="mx-5 md:mx-10 mb-8 border-b flex items-end">
        <div
          @click="type = 'all'"
          :class="[
            type === 'all' ? 'text-2xl border-blue text-theme-text-primary' : 'text-lg text-theme-text-secondary border-transparent',
            'mr-4 py-4 px-2 cursor-pointer border-b-3 hover:text-theme-primary hover:border-blue'
          ]">
          All
        </div>
        <div
          @click="type = 'sent'"
          :class="[
            type === 'sent' ? 'text-2xl border-blue text-theme-text-primary' : 'text-lg text-theme-text-secondary border-transparent',
            'mr-4 py-4 px-2 cursor-pointer border-b-3 hover:text-theme-text-primary hover:border-blue'
          ]">
          Sent
        </div>
        <div
          @click="type = 'received'"
          :class="[
            type === 'received' ? 'text-2xl border-blue text-theme-text-primary' : 'text-lg text-theme-text-secondary border-transparent',
            'mr-4 py-4 px-2 cursor-pointer border-b-3 hover:text-theme-text-primary hover:border-blue'
          ]">
          Received
        </div>
      </nav>
      <div class="hidden sm:block" v-if="transactions.length > 0">
        <table-transactions-detail :transactions="transactions"></table-transactions-detail>
      </div>
      <div class="sm:hidden" v-if="transactions.length > 0">
        <table-transactions-detail-mobile :transactions="transactions"></table-transactions-detail-mobile>
      </div>
      <div class="mx-10 mt-10 flex flex-wrap" v-if="transactions.length >= 25">
        <router-link :to="{ name: 'wallet-transactions', params: { address: this.wallet.address, type, page: 1 } }" tag="button" class="mx-auto bg-theme-button hover:bg-blue text-theme-button-text semibold hover:text-white py-5 px-8 border-transparent rounded hover-button-shadow">
          Show more
        </router-link>
      </div>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
import ContentHeader from '@/components/ContentHeader'
import TableTransactionsDetail from '@/components/tables/TransactionsDetail'
import TableTransactionsDetailMobile from '@/components//tables/mobile/TransactionsDetail'
import TransactionService from '@/services/transaction'
import { mapGetters } from 'vuex'

export default {
  components: {
    ContentHeader,
    TableTransactionsDetail,
    TableTransactionsDetailMobile,
  },

  props: {
    wallet: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    transactions: [],
    type: 'all',
  }),

  watch: {
    wallet() {
      this.getTransactions()
    },
    type() {
      this.getTransactions()
    },
  },

  methods: {
    getTransactions() {
      TransactionService[`${this.type}ByAddress`](
        this.wallet.address,
        this.page
      ).then(transactions => (this.transactions = transactions))
    },
  },
}
</script>
