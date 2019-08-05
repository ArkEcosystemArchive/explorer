<template>
  <div>
    <div class="flex justify-between flex-wrap px-5 sm:px-10 xl:px-0">
      <h1 class="text-2xl md:text-3xl mb-5 md:mb-6 text-theme-text-primary sm:mr-5">
        <slot />
      </h1>
      <div class="hidden sm:flex items-center text-theme-text-tertiary text-2xs px-3 sm:px-8 xl:px-6 py-3 mb-5 md:mb-6 bg-stat-background rounded-md">
        <div class="pr-6">
          {{ $t('COMMON.HEIGHT') }}: {{ readableNumber(height, 0) }}
        </div>
        <div class="pr-6">
          {{ $t('HEADER.NETWORK') }}: {{ $t(`HEADER.${alias.toUpperCase()}`) }}
        </div>
        <div :class="{ 'pr-6': isMain }">
          {{ $t('HEADER.SUPPLY') }}: <span class="whitespace-no-wrap">{{ readableCrypto(supply, true, 0) }}</span>
        </div>
        <div v-if="isMain">
          {{ $t('HEADER.MARKET_CAP') }}: <span class="whitespace-no-wrap">{{ readableCurrency(supply) }}</span>
        </div>
      </div>
    </div>
    <div class="sm:hidden flex items-center justify-between text-theme-text-tertiary text-2xs px-5 sm:px-8 xl:px-6 py-3 bg-stat-background">
      <div class="mr-2">
        <span>{{ $t('COMMON.HEIGHT') }}:</span>
        <span class="block md:inline-block">{{ readableNumber(height, 0) }}</span>
      </div>
      <div class="mr-2">
        <span>{{ networkToken() }}/{{ name }}:</span>
        <span class="block md:inline-block">{{ rawCurrency(rate, name) }}</span>
      </div>
      <div>
        <span>{{ $t('HEADER.SUPPLY') }}:</span>
        <span class="block md:inline-block whitespace-no-wrap">{{ readableCrypto(supply, true, 0) }}</span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'

export default {
  name: 'ContentHeader',

  computed: {
    ...mapGetters('network', ['alias', 'supply', 'height']),
    ...mapGetters('currency', ['name', 'rate', 'symbol']),

    isMain () {
      return this.alias === 'Main'
    }
  }
}
</script>
