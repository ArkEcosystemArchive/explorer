<template>
  <div class="max-w-2xl mx-auto md:pt-5" v-if="transaction">
    <content-header>{{ $t("Transaction") }}</content-header>

    <template v-if="transactionNotFound">
      <section class="page-section py-5 md:py-10 px-6">
        <div class="my-10 text-center">
          <not-found data-type="transaction" :data-id="transaction.id" />

          <button @click="fetchTransaction" :disabled="isFetching" class="mt-4 pager-button items-center">
            <span>{{ !isFetching ? $t('Reload this page') : $t('Loading...') }}</span>
          </button>
        </div>
      </section>
    </template>

    <template v-else>
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
                :value="transaction.id"
              />
            </div>
          </div>
        </div>
      </section>

      <section class="page-section py-5 md:py-10 mb-5">
        <div class="px-5 sm:px-10">
          <div class="list-row-border-b">
            <div>{{ $t("Sender") }}</div>
            <div class="truncate">
              <link-wallet :address="transaction.sender" :trunc="false" />
            </div>
          </div>

          <div class="list-row-border-b">
            <div>{{ $t("Recipient") }}</div>
            <div class="truncate">
              <link-wallet :address="transaction.recipient" :type="transaction.type" :asset="transaction.asset" :trunc="false" />
            </div>
          </div>

          <div class="list-row-border-b">
            <div>{{ $t("Confirmations") }}</div>
            <div>{{ confirmations }}</div>
          </div>

          <div class="list-row-border-b">
            <div>{{ $t("Amount") }}</div>
            <div v-if="price" v-tooltip="{ trigger: 'hover click', content: `${readableCurrency(transaction.amount, price)}`, placement: 'left' }">{{ readableCrypto(transaction.amount) }}</div>
            <div v-else>{{ readableCrypto(transaction.amount) }}</div>
          </div>

          <div class="list-row-border-b">
            <div>{{ $t("Fee") }}</div>
            <div v-if="price" v-tooltip="{ trigger: 'hover click', content: `${readableCurrency(transaction.fee, price)}`, placement: 'left' }">{{ readableCrypto(transaction.fee) }}</div>
            <div v-else>{{ readableCrypto(transaction.fee) }}</div>
          </div>

          <div class="list-row-border-b">
            <div>{{ $t("Timestamp") }}</div>
            <div v-if="transaction.timestamp">{{ readableTimestamp(transaction.timestamp.unix) }}</div>
          </div>

          <div class="list-row-border-b-no-wrap" v-if="transaction.vendorField">
            <div class="mr-4">{{ $t("Smartbridge") }}</div>
            <div class="text-right">{{ emojify(transaction.vendorField) }}</div>
          </div>

          <div class="list-row" v-if="transaction.blockId">
            <div>{{ $t("Block") }}</div>
            <div><link-block :id="transaction.blockId">{{ transaction.blockId }}</link-block></div>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>

<script type="text/ecmascript-6">
import NotFound from '@/components/utils/NotFound'
import TransactionService from '@/services/transaction'
import CryptoCompareService from '@/services/crypto-compare'

import { mapGetters } from 'vuex'

export default {
  components: {NotFound},

  data: () => ({
    transaction: {},
    transactionNotFound: false,
    initialBlockHeight: 0,
    isFetching: false,
    price: 1
  }),

  computed: {
    ...mapGetters('delegates', ['delegates']),
    ...mapGetters('currency', { currencySymbol: 'symbol' }),
    ...mapGetters('network', ['height']),

    confirmations() {
      return this.initialBlockHeight ? this.height - this.initialBlockHeight : this.transaction.confirmations
    }
  },

  watch: {
    async currencySymbol() {
      await this.updatePrice(this.transaction)
    }
  },

  async beforeRouteEnter(to, from, next) {
    try {
      const transaction = await TransactionService.find(to.params.id)
      next(vm => {
        vm.setTransaction(transaction),
        vm.updatePrice(transaction)
      })
    } catch(e) {
      next(vm => {
        console.log(e.message || e.data.error)

        vm.transactionNotFound = true
        vm.transaction = { id: to.params.id }
      })
    }
  },

  async beforeRouteUpdate(to, from, next) {
    this.transaction = {}

    try {
      const transaction = await TransactionService.find(to.params.id)
      this.setTransaction(transaction)
      this.updatePrice(transaction)
      next()
    } catch(e) {
      console.log(e.message || e.data.error)

      this.transactionNotFound = true
      this.transaction = { id: to.params.id }
    }
  },

  methods: {
    async fetchTransaction() {
      this.isFetching = true

      try {
        const transaction = await TransactionService.find(this.transaction.id)
        this.setTransaction(transaction)
        this.updatePrice(transaction)
        this.transactionNotFound = false
      } catch(e) {
        console.log(e.message || e.data.error)
      } finally {
        this.isFetching = false
      }
    },

    async updatePrice(transaction) {
      this.price = await CryptoCompareService.dailyAverage(transaction.timestamp.unix)
    },

    setTransaction(transaction) {
      this.transaction = transaction
      this.initialBlockHeight = this.height - this.transaction.confirmations
    },
  },
}
</script>
