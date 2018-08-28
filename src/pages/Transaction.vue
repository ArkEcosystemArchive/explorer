<template>
  <div class="max-w-2xl mx-auto md:pt-5" v-if="transaction">
    <content-header>{{ $t("Transaction") }}</content-header>

    <section class="mb-5">
      <div class="px-5 sm:px-10 py-8 bg-theme-feature-background flex xl:rounded-lg items-center">
        <div class="mr-6 flex-none">
          <img class="block" src="@/assets/images/icons/transaction.svg" />
        </div>
        <div class="flex-auto min-w-0">
          <div class="text-grey mb-2">{{ $t("Transaction ID") }}</div>
          <div class="flex">
            <div class="text-xl text-white semibold truncate">
              <span class="mr-2">{{ transaction.id }}</span>
            </div>
            <clipboard
              v-if="transaction.id"
              :value="transaction.id"></clipboard>
          </div>
        </div>
      </div>
    </section>

    <section class="page-section py-5 md:py-10 mb-5">
      <div class="px-5 sm:px-10">
        <div class="list-row-border-b">
          <div>{{ $t("Sender") }}</div>
          <div class="truncate">
            <link-wallet :address="transaction.senderId">{{ transaction.senderId }}</link-wallet>
          </div>
        </div>

        <div class="list-row-border-b">
          <div>{{ $t("Recipient") }}</div>
          <div class="truncate">
            <link-wallet :address="transaction.recipientId" :type="transaction.type">{{ transaction.recipientId }}</link-wallet>
          </div>
        </div>

        <div class="list-row-border-b">
          <div>{{ $t("Confirmations") }}</div>
          <div>{{ transaction.confirmations }}</div>
        </div>

        <div class="list-row-border-b">
          <div>{{ $t("Amount") }}</div>
          <div v-if="average" v-tooltip="{ content: `${readableCurrency(transaction.amount, average)} ${currencySymbol}`, placement: 'left' }">{{ readableCrypto(transaction.amount) }}</div>
          <div v-else>{{ readableCrypto(transaction.amount) }}</div>
        </div>

        <div class="list-row-border-b">
          <div>{{ $t("Fee") }}</div>
          <div>{{ readableCrypto(transaction.fee) }}</div>
        </div>

        <div class="list-row-border-b">
          <div>{{ $t("Timestamp") }}</div>
          <div>{{ readableTimestamp(transaction.timestamp) }}</div>
        </div>

        <div class="list-row-border-b-no-wrap" v-if="transaction.vendorField">
          <div class="mr-4">{{ $t("Smartbridge") }}</div>
          <div class="text-right">{{ transaction.vendorField }}</div>
        </div>

        <div class="list-row" v-if="transaction.blockid">
          <div>{{ $t("Block") }}</div>
          <div><link-block :id="transaction.blockid">{{ transaction.blockid }}</link-block></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
import TransactionService from '@/services/transaction'
import CryptoCompareService from '@/services/crypto-compare'

import { mapGetters } from 'vuex'

export default {
  data: () => ({
    transaction: {},
    average: 1
  }),

  computed: {
    ...mapGetters('delegates', ['delegates']),
    ...mapGetters('currency', { currencySymbol: 'symbol' })
  },

  async beforeRouteEnter(to, from, next) {
    try {
      const transaction = await TransactionService.find(to.params.id)
      const average = await CryptoCompareService.dailyAverage(transaction.timestamp)
      next(vm => {
        vm.setTransaction(transaction),
        vm.setAverage(average)
      })
    } catch(e) { next({ name: '404' }) }
  },

  async beforeRouteUpdate(to, from, next) {
    this.transaction = {}

    try {
      const transaction = await TransactionService.find(to.params.id)
      const average = await CryptoCompareService.dailyAverage(transaction.timestamp)
      this.setTransaction(transaction)
      this.setAverage(average)
      next()
    } catch(e) { next({ name: '404' }) }
  },

  methods: {
    setTransaction(transaction) {
      this.transaction = transaction
    },
    setAverage(average) {
      this.average = average
    }
  },
}
</script>
