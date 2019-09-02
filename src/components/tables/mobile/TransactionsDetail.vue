<template>
  <div>
    <Loader :data="transactions">
      <div
        v-for="transaction in transactions"
        :key="transaction.id"
        class="row-mobile"
      >
        <div class="list-row-border-b">
          <div class="mr-4">
            {{ $t('COMMON.ID') }}
          </div>
          <LinkTransaction :id="transaction.id" />
        </div>

        <div
          v-if="transaction.timestamp"
          class="list-row-border-b-no-wrap"
        >
          <div class="mr-4">
            {{ $t('COMMON.TIMESTAMP') }}
          </div>
          <div>{{ readableTimestamp(transaction.timestamp.unix) }}</div>
        </div>

        <div class="list-row-border-b">
          <div class="mr-4">
            {{ $t('TRANSACTION.SENDER') }}
          </div>
          <LinkWallet :address="transaction.sender" />
        </div>

        <div class="list-row-border-b">
          <div class="mr-4">
            {{ $t('TRANSACTION.RECIPIENT') }}
          </div>
          <LinkWallet
            :address="transaction.recipient"
            :type="transaction.type"
            :asset="transaction.asset"
          />
        </div>

        <div
          v-if="transaction.vendorField"
          class="list-row-border-b-no-wrap"
        >
          <div class="mr-4">
            {{ $t('TRANSACTION.SMARTBRIDGE') }}
          </div>
          <div class="text-right truncate">
            {{ emojify(transaction.vendorField) }}
          </div>
        </div>

        <div class="list-row-border-b">
          <div class="mr-4">
            {{ $t('TRANSACTION.AMOUNT') }}
          </div>
          <div>
            <TransactionAmount
              :transaction="transaction"
              :type="transaction.type"
            />
          </div>
        </div>

        <div class="list-row-border-b">
          <div class="mr-4">
            {{ $t('TRANSACTION.FEE') }}
          </div>
          <div>
            <TransactionAmount
              :transaction="data.row"
              :is-fee="true"
            />
          </div>
        </div>

        <div class="list-row">
          <div class="mr-4">
            {{ $t('COMMON.CONFIRMATIONS') }}
          </div>
          <div class="flex items-center justify-end">
            <div
              v-if="transaction.confirmations <= activeDelegates"
              class="flex items-center justify-end whitespace-no-wrap"
            >
              <span class="text-green inline-block mr-2">{{ transaction.confirmations }}</span>
              <img
                class="icon flex-none"
                src="@/assets/images/icons/clock.svg"
              >
            </div>
            <div v-else>
              {{ $t('TRANSACTION.WELL_CONFIRMED') }}
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="transactions && !transactions.length"
        class="px-5 md:px-10"
      >
        <span>{{ $t('COMMON.NO_RESULTS') }}</span>
      </div>
    </Loader>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'

export default {
  name: 'TableTransactionsDetailMobile',

  props: {
    transactions: {
      validator: value => {
        return Array.isArray(value) || value === null
      },
      required: true
    }
  },

  computed: {
    ...mapGetters('network', ['activeDelegates'])
  }
}
</script>

<style scoped>
.row-mobile:nth-child(even) {
  background-color: var(--color-theme-table-row);
}
</style>
