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
            {{ $t("ID") }}
          </div>
          <LinkTransaction
            :id="transaction.id"
            :smart-bridge="transaction.vendorField"
          />
        </div>

        <div class="list-row-border-b-no-wrap">
          <div class="mr-4">
            {{ $t("Timestamp") }}
          </div>
          <div
            v-if="transaction.timestamp"
            class="text-right"
          >
            {{ readableTimestamp(transaction.timestamp.unix) }}
          </div>
        </div>

        <div class="list-row-border-b">
          <div class="mr-4">
            {{ $t("Sender") }}
          </div>
          <LinkWallet :address="transaction.sender" />
        </div>

        <div class="list-row-border-b">
          <div class="mr-4">
            {{ $t("Recipient") }}
          </div>
          <LinkWallet
            :address="transaction.recipient"
            :type="transaction.type"
            :asset="transaction.asset"
          />
        </div>

        <div
          v-if="truncate(transaction.vendorField || '')"
          class="list-row-border-b-no-wrap"
        >
          <div class="mr-4">
            {{ $t("Smartbridge") }}
          </div>
          <div class="text-right truncate">
            {{ emojify(transaction.vendorField) }}
          </div>
        </div>

        <div class="list-row-border-b">
          <div class="mr-4">
            {{ $t("Amount (token)", { token: networkToken() }) }}
          </div>
          <div>
            <TransactionAmount
              :transaction="transaction"
              :type="transaction.type"
            />
          </div>
        </div>

        <div class="list-row">
          <div class="mr-4">
            {{ $t("Fee (token)", { token: networkToken() }) }}
          </div>
          <div>{{ readableCrypto(transaction.fee) }}</div>
        </div>
      </div>
      <div
        v-if="transactions && !transactions.length"
        class="px-5 md:px-10"
      >
        <span>{{ $t("No results") }}</span>
      </div>
    </Loader>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'TableTransactionsMobile',

  props: {
    transactions: {
      validator: value => {
        return Array.isArray(value) || value === null
      },
      required: true
    }
  }
}
</script>

<style scoped>
.row-mobile:nth-child(even) {
  background-color: var(--color-theme-table-row);
}
</style>
