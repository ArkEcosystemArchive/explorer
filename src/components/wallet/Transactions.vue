<template>
  <div>
    <h2 class="text-2xl mb-5 md:mb-6 px-5 sm:hidden text-theme-text-primary">
      {{ $t("Transactions") }}
    </h2>
    <section class="page-section py-5 md:py-10">
      <nav class="mx-5 md:mx-10 mb-8 border-b flex items-end">
        <div
          @click="setType('all')"
          :class="[
            !isTypeSent && !isTypeReceived ? 'text-2xl border-blue text-theme-text-primary' : 'text-lg text-theme-text-secondary border-transparent',
            'mr-4 py-4 px-2 cursor-pointer border-b-3 hover:text-theme-primary hover:border-blue'
          ]"
        >
          {{ $t("All") }}
        </div>
        <div
          @click="setType('sent')"
          :class="[
            isTypeSent ? 'text-2xl border-blue text-theme-text-primary' : 'text-lg text-theme-text-secondary border-transparent',
            !sentCount ? 'pointer-events-none text-theme-text-tertiary' : '',
            'mr-4 py-4 px-2 cursor-pointer border-b-3 hover:text-theme-text-primary hover:border-blue'
          ]"
        >
          {{ $t("Sent") }}
          <span
            :class="isTypeSent ? 'text-theme-text-secondary' : 'text-theme-text-tertiary'"
            class="text-xs text-theme-text-secondary"
          >
            {{ sentCount }}
          </span>
        </div>
        <div
          @click="setType('received')"
          :class="[
            isTypeReceived ? 'text-2xl border-blue text-theme-text-primary' : 'text-lg text-theme-text-secondary border-transparent',
            !receivedCount ? 'pointer-events-none text-theme-text-tertiary' : '',
            'mr-4 py-4 px-2 cursor-pointer border-b-3 hover:text-theme-text-primary hover:border-blue'
          ]"
        >
          {{ $t("Received") }}
          <span
            :class="isTypeReceived ? 'text-theme-text-secondary' : 'text-theme-text-tertiary'"
            class="text-xs"
          >
            {{ receivedCount }}
          </span>
        </div>
      </nav>
      <div class="hidden sm:block">
        <table-transactions-detail :transactions="transactions" />
      </div>
      <div class="sm:hidden">
        <table-transactions-detail-mobile :transactions="transactions" />
      </div>
      <div 
        v-if="transactions && transactions.length >= 25"
        class="mx-5 sm:mx-10 mt-5 md:mt-10 flex flex-wrap"
      >
        <router-link
          :to="{ name: 'wallet-transactions', params: { address: this.wallet.address, type, page: 2 } }"
          tag="button"
          class="show-more-button"
        >
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
    receivedCount: 0,
    sentCount: 0,
  }),

  computed: {
    isTypeSent() {
      return this.type === 'sent'
    },

    isTypeReceived() {
      return this.type === 'received'
    }
  },

  watch: {
    wallet() {
      this.getTransactions()

      this.getSentCount()
      this.getReceivedCount()
    },
    type() {
      this.getTransactions()

      this.getSentCount()
      this.getReceivedCount()
    }
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

    async getReceivedCount() {
      const response = await TransactionService.receivedByAddressCount(this.wallet.address)
      this.receivedCount = response
    },

    async getSentCount() {
      const response = await TransactionService.sentByAddressCount(this.wallet.address)
      this.sentCount = response
    },

    setType(type) {
      this.type = type
    }
  },
}
</script>
