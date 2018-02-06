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

    <section class="bg-theme-content-background shadow-theme xl:rounded-lg py-8 mb-5">
      <div class="px-5 sm:px-10 py-4">
        <div class="border-b py-4 flex justify-between flex-wrap">
          <div>Sender</div>
          <div class="truncate">
            <wallet-link :address="transaction.senderId">{{ transaction.senderId }}</wallet-link>
          </div>
        </div>

        <div class="border-b py-4 flex justify-between flex-wrap">
          <div>Recipient</div>
          <div class="truncate">
            <wallet-link :address="transaction.recipientId">{{ transaction.recipientId }}</wallet-link>
          </div>
        </div>

        <div class="border-b py-4 flex justify-between flex-wrap">
          <div>Confirmations</div>
          <div>{{ transaction.confirmations }}</div>
        </div>

        <div class="border-b py-4 flex justify-between flex-wrap">
          <div>Amount</div>
          <div>{{ readableCrypto(transaction.amount) }}</div>
        </div>

        <div class="border-b py-4 flex justify-between flex-wrap">
          <div>Fee</div>
          <div>{{ readableCrypto(transaction.fee) }}</div>
        </div>

        <div class="border-b py-4 flex justify-between flex-wrap">
          <div>Timestamp</div>
          <div>{{ readableTimestamp(transaction.timestamp) }}</div>
        </div>

        <div class="border-b py-4 flex justify-between flex-wrap" v-if="transaction.vendorField">
          <div>Vendor field</div>
          <div>{{ transaction.vendorField }}</div>
        </div>

        <div class="py-4 flex justify-between flex-wrap" v-if="transaction.blockid">
          <div>Block</div>
          <div><block-link :id="transaction.blockid">{{ transaction.blockid }}</block-link></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
import Currency from '@/components/utils/Currency'
import WalletLink from '@/components/links/Wallet'
import BlockLink from '@/components/links/Block'

// Components
import ContentHeader from '@/components/ContentHeader'
import Clipboard from '@/components/utils/Clipboard'

import TransactionService from '@/services/transaction'
import { mapGetters } from 'vuex'

export default {
  components: {
    ContentHeader,
    BlockLink,
    WalletLink,
    Currency,
    Clipboard,
  },

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
