<template>
  <div>
    <Loader :data="blocks">
      <div
        v-for="block in blocks"
        :key="block.id"
        class="row-mobile"
      >
        <div class="list-row-border-b">
          <div class="mr-4">
            {{ $t('COMMON.ID') }}
          </div>
          <LinkBlock :id="block.id" />
        </div>

        <div class="list-row-border-b">
          <div class="mr-4">
            {{ $t('COMMON.HEIGHT') }}
          </div>
          <div>{{ block.height }}</div>
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

        <div class="list-row-border-b">
          <div class="mr-4">
            {{ $t('COMMON.TRANSACTIONS') }}
          </div>
          <div>{{ block.transactions }}</div>
        </div>

        <div class="list-row-border-b">
          <div class="mr-4">
            {{ $t('BLOCK.GENERATED_BY') }}
          </div>
          <div v-if="block.generator">
            <LinkWallet :address="block.generator.address" />
          </div>
        </div>

        <div class="list-row-border-b">
          <div class="mr-4">
            {{ $t('BLOCK.TOTAL_FORGED') }}
          </div>
          <div v-if="block.forged">
            {{ readableCrypto(block.forged.total) }}
          </div>
        </div>

        <div class="list-row">
          <div class="mr-4">
            {{ $t('BLOCK.FEES') }}
          </div>
          <div v-if="block.forged">
            {{ readableCrypto(block.forged.fee) }}
          </div>
        </div>
      </div>
      <div
        v-if="blocks && !blocks.length"
        class="px-5 md:px-10"
      >
        <span>{{ $t('COMMON.NO_RESULTS') }}</span>
      </div>
    </Loader>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'TableBlocksMobile',

  props: {
    blocks: {
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
