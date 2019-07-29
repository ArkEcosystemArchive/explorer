<template>
  <div>
    <Loader :data="wallets">
      <div
        v-for="(row, index) in wallets"
        :key="row.address"
        class="row-mobile"
      >
        <div class="list-row-border-b">
          <div class="mr-4">
            {{ $t("Rank") }}
          </div>
          <div>{{ getRank(index) }}</div>
        </div>

        <div class="list-row-border-b">
          <div class="mr-4">
            {{ $t("Address") }}
          </div>
          <LinkWallet :address="row.address" />
        </div>

        <div class="list-row-border-b">
          <div class="mr-4">
            {{ $t("Balance") }}
          </div>
          <div>{{ readableCrypto(row.balance) }}</div>
        </div>

        <div class="list-row">
          <div class="mr-4">
            {{ $t("Supply") }}
          </div>
          <div>{{ percentageString((row.balance / total) * 100) }}</div>
        </div>
      </div>
      <div
        v-if="wallets && !wallets.length"
        class="px-5 md:px-10"
      >
        <span>{{ $t("No results") }}</span>
      </div>
    </Loader>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'

export default {
  name: 'TableWalletsMobile',

  props: {
    wallets: {
      validator: value => {
        return Array.isArray(value) || value === null
      },
      required: true
    },

    total: {
      type: Number,
      required: true
    }
  },

  computed: {
    ...mapGetters('network', ['supply'])
  },

  methods: {
    getRank (index) {
      const page = this.$route.params.page > 1 ? this.$route.params.page - 1 : 0

      return page * 25 + (index + 1)
    }
  }
}
</script>

<style scoped>
.row-mobile:nth-child(even) {
  background-color: var(--color-theme-table-row);
}
</style>
