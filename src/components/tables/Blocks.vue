<template>
  <Loader :data="blocks">
    <TableWrapper
      v-bind="$attrs"
      :has-pagination="false"
      :columns="columns"
      :rows="blocks"
      :sort-query="{ field: 'height', type: 'desc' }"
      :no-data-message="$t('COMMON.NO_RESULTS')"
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

        <div v-else-if="data.column.field === 'generator'">
          <LinkWallet :address="data.row.generator.address" />
        </div>

        <div v-else-if="data.column.field === 'totalForged'">
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

        <div v-else-if="data.column.field === 'fee'">
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
          field: 'generator',
          thClass: 'text-right',
          tdClass: 'text-right'
        },
        {
          label: this.$t('BLOCK.TOTAL_FORGED'),
          field: 'totalForged',
          type: 'number'
        },
        {
          label: this.$t('BLOCK.FEES'),
          field: 'fee',
          type: 'number',
          thClass: 'end-cell',
          tdClass: 'end-cell'
        }
      ]

      return columns
    }
  },

  watch: {
    blocks () {
      this.updateBlocks()
    }
  },

  created () {
    this.updateBlocks()
  },

  methods: {
    async updateBlocks () {
      if (!this.blocks) {
        return
      }

      for (const block of this.blocks) {
        block.price = await CryptoCompareService.dailyAverage(block.timestamp.unix)
      }
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
