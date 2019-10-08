<template>
  <button
    class="px-2 md:px-4 py-3 md:py-6 flex items-center text-sm border-b-2 mt-2px border-transparent hover:border-theme-accents transition"
    @click="$store.dispatch('ui/setHeaderType', isCurrencyMenu ? null : 'currencies')"
  >
    <SvgIcon class="md:mr-2 flex-none text-link-color" :name="`currencies/${currencyName}`" view-box="0 0 22 16" />
    <span class="whitespace-no-wrap text-theme-text-content hidden md:inline-block">
      {{ networkToken() }}/{{ currencyName }}: {{ rawCurrency(currencyRate, currencyName) }}
    </span>
  </button>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";

@Component({
  computed: {
    ...mapGetters("currency", {
      currencyName: "name",
      currencyRate: "rate",
    }),
    ...mapGetters("ui", ["headerType"]),
  },
})
export default class ToggleCurrency extends Vue {
  private currencyName: string;
  private currencyRate: string;
  private headerType: string;

  get isCurrencyMenu(): boolean {
    return this.headerType === "currencies";
  }
}
</script>
