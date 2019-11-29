<template>
  <div>
    <div class="flex justify-between flex-wrap px-5 sm:px-10 xl:px-0">
      <h1 class="text-2xl md:text-3xl mb-5 md:mb-6 text-white sm:mr-5">
        <slot />
      </h1>
      <div
        class="hidden sm:flex items-center text-theme-text-tertiary text-2xs px-3 sm:px-8 xl:px-6 py-3 mb-5 md:mb-6 bg-stat-background rounded-md"
      >
        <div class="pr-6">{{ $t("COMMON.HEIGHT") }}: {{ readableNumber(height) }}</div>
        <div class="pr-6" :class="{ 'text-red font-black': !isMainWithCurrency }">
          {{ $t("HEADER.NETWORK") }}: {{ $t(`HEADER.${alias.toUpperCase()}`) }}
        </div>
        <div :class="{ 'pr-6': isMainWithCurrency }">
          {{ $t("HEADER.SUPPLY") }}:
          <span class="whitespace-no-wrap">{{ readableCrypto(supply, true, 0) }} / {{ unikSupply }} UNIK</span>
        </div>
        <div v-if="isMainWithCurrency">
          {{ $t("HEADER.MARKET_CAP") }}: <span class="whitespace-no-wrap">{{ readableCurrency(supply) }}</span>
        </div>
      </div>
    </div>
    <div
      class="sm:hidden flex items-center justify-between text-theme-text-tertiary text-2xs px-5 sm:px-8 xl:px-6 py-3 bg-stat-background"
    >
      <div class="mr-2">
        <span>{{ $t("COMMON.HEIGHT") }}:</span>
        <span class="block md:inline-block">{{ readableNumber(height) }}</span>
      </div>
      <div class="mr-2">
        <span>{{ networkToken() }}/{{ name }}:</span>
        <span class="block md:inline-block">{{ rawCurrency(rate, name) }}</span>
      </div>
      <div>
        <span>{{ $t("HEADER.SUPPLY") }}:</span>
        <span class="block md:inline-block whitespace-no-wrap"
          >{{ readableCrypto(supply, true, 0) }} / {{ unikSupply }} UNIK</span
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";

@Component({
  computed: {
    ...mapGetters("network", ["alias", "supply", "height", "unikSupply"]),
    ...mapGetters("currency", ["name", "rate", "symbol"]),
  },
})
export default class ContentHeader extends Vue {
  private alias: string;
  private supply: string;
  private height: number;
  private name: string;
  private rate: number;
  private symbol: string;

  get isMainWithCurrency() {
    return this.alias === "Main" && this.name && this.name !== "UNS";
  }
}
</script>
