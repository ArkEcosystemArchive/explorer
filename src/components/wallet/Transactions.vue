<template>
  <div>
    <h2 class="text-2xl mb-5 md:mb-6 px-5 sm:hidden text-theme-text-primary">{{ $t("Transactions") }}</h2>
    <section class="page-section py-5 md:py-10">
      <nav class="mx-5 md:mx-10 mb-8 border-b flex items-end">
        <div
          @click="type = 'all'"
          :class="[
            type === 'all' ? 'text-2xl border-blue text-theme-text-primary' : 'text-lg text-theme-text-secondary border-transparent',
            'mr-4 py-4 px-2 cursor-pointer border-b-3 hover:text-theme-primary hover:border-blue'
          ]">
          {{ $t("All") }}
        </div>
        <div
          @click="type = 'sent'"
          :class="[
            type === 'sent' ? 'text-2xl border-blue text-theme-text-primary' : 'text-lg text-theme-text-secondary border-transparent',
            'mr-4 py-4 px-2 cursor-pointer border-b-3 hover:text-theme-text-primary hover:border-blue'
          ]">
          {{ $t("Sent") }}
        </div>
        <div
          @click="type = 'received'"
          :class="[
            type === 'received' ? 'text-2xl border-blue text-theme-text-primary' : 'text-lg text-theme-text-secondary border-transparent',
            'mr-4 py-4 px-2 cursor-pointer border-b-3 hover:text-theme-text-primary hover:border-blue'
          ]">
          {{ $t("Received") }}
        </div>
      </nav>
      <div class="hidden sm:block">
        <table-transactions-detail :transactions="transactions"></table-transactions-detail>
      </div>
      <div class="sm:hidden">
        <table-transactions-detail-mobile :transactions="transactions"></table-transactions-detail-mobile>
      </div>
      <div class="mx-5 sm:mx-10 mt-5 md:mt-10 flex flex-wrap" v-if="transactions && transactions.length >= 25">
        <router-link :to="{ name: 'wallet-transactions', params: { address: this.wallet.address, type, page: 2 } }" tag="button" class="show-more-button">
          {{ $t("Show more") }}
        </router-link>
      </div>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
import TransactionService from '@/services/transaction'
import { mapGetters } from 'vuex'

export default {
  props: {
    wallet: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    transactions: null,
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
    async getTransactions() {
      this.transactions = null

      if (this.wallet.address !== undefined) {
        const transactions = await TransactionService[`${this.type}ByAddress`](
          this.wallet.address,
          this.page
        )
        this.transactions = transactions
      }
    },
  },
}
</script>
