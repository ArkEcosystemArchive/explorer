<template>
  <div class="max-w-2xl mx-auto md:pt-5" v-if="transaction">
    <content-header>Transaction</content-header>

    <section class="mb-5">
      <div class="px-5 sm:px-10 py-8 bg-theme-feature-background flex xl:rounded-lg items-end">
        <div class="mr-6 flex-none">
          <img class="block" src="@/assets/images/icons/transaction.svg" />
        </div>
        <div  class="flex-auto min-w-0">
          <div class="text-grey mb-2">Transaction ID</div>
          <div class="text-xl text-white semibold truncate">{{ transaction.id }}</div>
        </div>
        <clipboard
          v-if="transaction.id"
          :value="transaction.id"></clipboard>
      </div>
    </section>

    <section class="page-section py-8 mb-5">
      <div class="px-5 sm:px-10 py-4">
        <div class="list-row-border-b">
          <div>Sender</div>
          <div class="truncate">
            <link-wallet :address="transaction.senderId">{{ transaction.senderId }}</link-wallet>
          </div>
        </div>

        <div class="list-row-border-b">
          <div>Recipient</div>
          <div class="truncate">
            <link-wallet :address="transaction.recipientId" :type="transaction.type">{{ transaction.recipientId }}</link-wallet>
          </div>
        </div>

        <div class="list-row-border-b">
          <div>Confirmations</div>
          <div>{{ transaction.confirmations }}</div>
        </div>

        <div class="list-row-border-b">
          <div>Amount</div>
          <div>{{ readableCrypto(transaction.amount) }}</div>
        </div>

        <div class="list-row-border-b">
          <div>Fee</div>
          <div>{{ readableCrypto(transaction.fee) }}</div>
        </div>

        <div class="list-row-border-b">
          <div>Timestamp</div>
          <div>{{ readableTimestamp(transaction.timestamp) }}</div>
        </div>

        <div class="list-row-border-b" v-if="transaction.vendorField">
          <div>Vendor field</div>
          <div>{{ transaction.vendorField }}</div>
        </div>

        <div class="list-row" v-if="transaction.blockid">
          <div>Block</div>
          <div><link-block :id="transaction.blockid">{{ transaction.blockid }}</link-block></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
import TransactionService from '@/services/transaction'
import { mapGetters } from 'vuex'

export default {
  data: () => ({
    transaction: {},
  }),

  computed: {
    ...mapGetters('delegates', ['delegates']),
  },

  beforeRouteEnter(to, from, next) {
    TransactionService.find(to.params.id)
      .then(response => next(vm => vm.setTransaction(response)))
      .catch(() => next({ name: '404' }))
  },

  beforeRouteUpdate(to, from, next) {
    this.transaction = {}

    TransactionService.find(to.params.id)
      .then(response => this.setTransaction(response))
      .then(() => next())
      .catch(() => next({ name: '404' }))
  },

  methods: {
    setTransaction(transaction) {
      this.transaction = transaction
    },
  },
}
</script>
