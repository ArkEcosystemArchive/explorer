<template>
  <div>
    <div class="flex flex-wrap justify-between px-5 sm:px-10 xl:px-0">
      <h1 class="mb-5 text-2xl md:text-3xl md:mb-6 text-theme-text-primary sm:mr-5">
        <slot />
      </h1>
      <div
        class="items-center hidden px-3 py-3 mb-5 text-xs rounded-md sm:flex text-theme-text-tertiary sm:px-8 xl:px-6 md:mb-6 bg-stat-background"
      >
        <div class="pr-6">{{ $t("COMMON.HEIGHT") }}: {{ readableNumber(height) }}</div>
        <div class="pr-6">{{ $t("HEADER.NETWORK") }}: {{ $t(`HEADER.${alias.replace(" ", "_").toUpperCase()}`) }}</div>
        <div :class="{ 'pr-6': showMarketCap }">
          {{ $t("HEADER.SUPPLY") }}: <span class="whitespace-no-wrap">{{ readableCrypto(supply, true, 0) }}</span>
        </div>
        <div v-if="showMarketCap">
          {{ $t("HEADER.MARKET_CAP") }}: <span class="whitespace-no-wrap">{{ readableCurrency(supply) }}</span>
        </div>
      </div>
    </div>
    <div
      class="flex items-center justify-between px-5 py-3 text-xs sm:hidden text-theme-text-tertiary sm:px-8 xl:px-6 bg-stat-background"
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
        <span class="block whitespace-no-wrap md:inline-block">{{ readableCrypto(supply, true, 0) }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";

@Component({
  computed: {
    ...mapGetters("network", ["alias", "supply", "height", "isListed", "token"]),
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
  private isListed: boolean;
  private token: string;

  get showMarketCap() {
    return this.isListed && this.token !== this.name;
  }
}
</script>
