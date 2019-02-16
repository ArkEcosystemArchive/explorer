<template>
  <div>
    <div class="flex justify-between flex-wrap px-5 sm:px-10 xl:px-0">
      <h1 class="text-2xl md:text-3xl mb-5 md:mb-6 text-theme-text-primary sm:mr-5">
        <slot />
      </h1>
      <div class="hidden sm:flex items-center text-theme-text-tertiary text-2xs px-3 sm:px-8 xl:px-6 py-3 mb-5 md:mb-6 bg-stat-background rounded-md">
        <div class="pr-6">{{ $t("Height") }}: {{ height.toLocaleString() }}</div>
        <div class="pr-6">{{ $t("Network") }}: {{ $t(alias) }}</div>
        <div :class="{ 'pr-6': alias == 'Main' }">{{ $t("Supply") }}: <span class="whitespace-no-wrap">{{ readableCrypto(supply, true, 0) }}</span></div>
        <div v-if="alias == 'Main'">{{ $t("Market Cap") }}: <currency :amount="+supply" /></div>
      </div>
    </div>
    <div class="sm:hidden flex items-center justify-between text-theme-text-tertiary text-2xs px-5 sm:px-8 xl:px-6 py-3 bg-stat-background">
      <div class="mr-2">
        <span>{{ $t("Height") }}:</span>
        <span class="block md:inline-block">{{ height.toLocaleString() }}</span>
      </div>
      <div class="mr-2">
        <span>{{ networkToken() }}/{{ name }}:</span>
        <span class="block md:inline-block">{{ rawCurrency(rate, name) }}</span>
      </div>
      <div>
        <span>{{ $t("Supply") }}:</span>
        <span class="block md:inline-block whitespace-no-wrap">{{ readableCrypto(supply, true, 0) }}</span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('network', ['alias', 'supply', 'height']),
    ...mapGetters('currency', ['name', 'rate', 'symbol']),
  },
}
</script>
