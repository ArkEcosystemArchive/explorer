<template>
  <Loader :data="blocks">
    <TableWrapper
      v-bind="$attrs"
      :columns="columns"
      :rows="blocks"
      :no-data-message="$t('COMMON.NO_RESULTS')"
      @on-sort-change="emitSortChange"
    >
      <template
        slot-scope="data"
      >
        <div v-if="data.column.field === 'id'">
          <LinkBlock :id="data.row.id" />
        </div>

        <div v-else-if="data.column.field === 'height'">
          <span>
            {{ data.row.height }}
          </span>
        </div>

        <div v-else-if="data.column.field === 'timestamp.unix'">
          <span>
            {{ readableTimestamp(data.row.timestamp.unix) }}
          </span>
        </div>

        <div v-else-if="data.column.field === 'transactions'">
          <span>
            {{ data.row.transactions }}
          </span>
        </div>

        <div v-else-if="data.column.field === 'generator.username'">
          <LinkWallet :address="data.row.generator.address" />
        </div>

        <div v-else-if="data.column.field === 'forged.total'">
          <span
            v-tooltip="{
              trigger: 'hover',
              content: readableCurrency(data.row.forged.total, data.row.price)
            }"
            class="whitespace-no-wrap"
          >
            {{ readableCrypto(data.row.forged.total) }}
          </span>
        </div>

        <div v-else-if="data.column.field === 'forged.fee'">
          <span
            v-tooltip="{
              trigger: 'hover',
              content: data.row.forged.fee ? readableCurrency(data.row.forged.fee, data.row.price) : ''
            }"
            class="whitespace-no-wrap"
          >
            {{ readableCrypto(data.row.forged.fee) }}
          </span>
        </div>
      </template>
    </TableWrapper>
  </Loader>
</template>

<script type="text/ecmascript-6">
import CryptoCompareService from '@/services/crypto-compare'

export default {
  name: 'TableBlocksDesktop',

  props: {
    blocks: {
      validator: value => {
        return Array.isArray(value) || value === null
      },
      required: true
    }
  },

  computed: {
    columns () {
      const columns = [
        {
          label: this.$t('COMMON.ID'),
          field: 'id',
          thClass: 'start-cell',
          tdClass: 'start-cell'
        },
        {
          label: this.$t('COMMON.HEIGHT'),
          field: 'height',
          type: 'number',
          thClass: 'text-left hidden md:table-cell',
          tdClass: 'text-left hidden md:table-cell wrap-timestamp'
        },
        {
          label: this.$t('COMMON.TIMESTAMP'),
          field: 'timestamp.unix',
          type: 'number',
          thClass: 'text-left hidden md:table-cell',
          tdClass: 'text-left hidden md:table-cell wrap-timestamp'
        },
        {
          label: this.$t('COMMON.TRANSACTIONS'),
          field: 'transactions',
          type: 'number'
        },
        {
          label: this.$t('BLOCK.GENERATED_BY'),
          field: 'generator.username',
          thClass: 'text-right',
          tdClass: 'text-right'
        },
        {
          label: this.$t('BLOCK.TOTAL_FORGED'),
          field: 'forged.total',
          type: 'number',
          thClass: 'end-cell lg:base-cell',
          tdClass: 'end-cell lg:base-cell'
        },
        {
          label: this.$t('BLOCK.FEES'),
          field: 'forged.fee',
          type: 'number',
          thClass: 'end-cell hidden lg:table-cell',
          tdClass: 'end-cell hidden lg:table-cell'
        }
      ]

      return columns
    },

    currencySymbol () {
      return this.$store.getters['currency/symbol']
    }
  },

  watch: {
    async blocks () {
      await this.prepareBlocks()
    },

    async currencySymbol () {
      await this.updatePrices()
    }
  },

  async created () {
    this.prepareBlocks()
  },

  methods: {
    async prepareBlocks () {
      await this.updatePrices()
    },

    async fetchPrice (block) {
      block.price = await CryptoCompareService.dailyAverage(block.timestamp.unix)
    },

    async updatePrices () {
      if (!this.blocks) {
        return
      }

      const promises = this.blocks.map(this.fetchPrice)
      await Promise.all(promises)
    },

    emitSortChange (params) {
      this.$emit('on-sort-change', params[0])
    }
  }
}
</script>

<style>
  .wrap-timestamp {
    white-space: normal;
  }

  @media(min-width: 870px) {
    .wrap-timestamp {
      white-space: nowrap;
    }
  }
</style>
