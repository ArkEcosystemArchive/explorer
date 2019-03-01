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

      <transaction-details :transaction="transaction" />
    </template>
  </div>
</template>

<script type="text/ecmascript-6">
import NotFound from '@/components/utils/NotFound'
import TransactionDetails from '@/components/transaction/Details'
import TransactionService from '@/services/transaction'
import { mapGetters } from 'vuex'

export default {
  components: {
    NotFound,
    TransactionDetails
  },

  data: () => ({
    transaction: {},
    transactionNotFound: false,
    isFetching: false
  }),

  computed: {
    ...mapGetters('network', ['height'])
  },

  async beforeRouteEnter(to, from, next) {
    try {
      const transaction = await TransactionService.find(to.params.id)
      next(vm => {
        vm.setTransaction(transaction)
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
        this.transactionNotFound = false
      } catch(e) {
        console.log(e.message || e.data.error)
      } finally {
        this.isFetching = false
      }
    },

    setTransaction(transaction) {
      this.transaction = transaction
    },
  },
}
</script>
