<template>
  <section class="page-section py-5 md:py-10 mb-5">
    <div class="px-5 sm:px-10">
      <div class="list-row-border-b">
        <div class="mr-4">
          {{ $t('COMMON.TRANSACTIONS') }}
        </div>
        <div>{{ block.transactions }}</div>
      </div>

      <div class="list-row-border-b">
        <div class="mr-4">
          {{ $t('COMMON.CONFIRMATIONS') }}
        </div>
        <div v-if="confirmations >= 0">
          {{ confirmations }}
        </div>
      </div>

      <div class="list-row-border-b">
        <div class="mr-4">
          {{ $t('COMMON.HEIGHT') }}
        </div>
        <div>{{ block.height }}</div>
      </div>

      <div class="list-row-border-b">
        <div class="mr-4">
          {{ $t('BLOCK.REWARD') }}
        </div>
        <div
          v-if="block.forged"
          v-tooltip="{
            trigger: 'hover click',
            content: price ? readableCurrency(block.forged.reward, price) : '',
            placement: 'left'
          }"
        >
          {{ readableCrypto(block.forged.reward) }}
        </div>
      </div>

      <div class="list-row-border-b">
        <div class="mr-4">
          {{ $t('BLOCK.FEES') }}
        </div>
        <div
          v-if="block.forged"
          v-tooltip="{
            trigger: 'hover click',
            content: price ? readableCurrency(block.forged.fee, price) : '',
            placement: 'left'
          }"
        >
          {{ readableCrypto(block.forged.fee) }}
        </div>
      </div>

      <div class="list-row-border-b">
        <div class="mr-4">
          {{ $t('BLOCK.TOTAL_FORGED') }}
        </div>
        <div
          v-if="block.forged"
          v-tooltip="{
            trigger: 'hover click',
            content: price ? readableCurrency(block.forged.total, price) : '',
            placement: 'left'
          }"
        >
          {{ readableCrypto(block.forged.total) }}
        </div>
      </div>

      <div class="list-row-border-b">
        <div class="mr-4">
          {{ $t('BLOCK.PROCESSED_AMOUNT') }}
        </div>
        <div
          v-if="block.forged"
          v-tooltip="{
            trigger: 'hover click',
            content: price ? readableCurrency(block.forged.amount, price) : '',
            placement: 'left'
          }"
        >
          {{ readableCrypto(block.forged.amount) }}
        </div>
      </div>

      <div class="list-row-border-b-no-wrap">
        <div class="mr-4">
          {{ $t('COMMON.TIMESTAMP') }}
        </div>
        <div
          v-if="block.timestamp"
          class="text-right"
        >
          {{ readableTimestamp(block.timestamp.unix) }}
        </div>
      </div>

      <div class="list-row">
        <div class="mr-4">
          {{ $t('BLOCK.GENERATED_BY') }}
        </div>
        <div v-if="block.generator">
          <LinkWallet
            :address="block.generator.address"
            tooltip-placement="left"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
import CryptoCompareService from '@/services/crypto-compare'
import { mapGetters } from 'vuex'

export default {
  name: 'BlockDetails',

  props: {
    block: {
      type: Object,
      required: true
    }
  },

  data: () => ({
    price: 0
  }),

  computed: {
    ...mapGetters('currency', { currencySymbol: 'symbol' }),
    ...mapGetters('network', ['height']),

    confirmations () {
      return this.height - this.block.height
    }
  },

  watch: {
    block () {
      this.updatePrice()
    },

    currencySymbol () {
      this.updatePrice()
    }
  },

  methods: {
    async updatePrice () {
      if (!this.block.id) {
        return
      }

      this.price = await CryptoCompareService.dailyAverage(this.block.timestamp.unix)
    }
  }
}
</script>
