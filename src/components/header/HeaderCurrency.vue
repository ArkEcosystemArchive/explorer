<template>
  <div class="px-2 md:px-4 py-3 md:py-6 flex items-center text-sm mt-2px">
    <SvgIcon class="md:mr-2 flex-none text-link-color" :name="`currencies/${currencyName}`" view-box="0 0 22 16" />
    <span class="whitespace-no-wrap text-theme-text-content hidden md:inline-block">
      {{ networkToken() }}/{{ currencyName }}: {{ rawCurrency(currencyRate, currencyName) }}
    </span>
  </div>
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
  },
})
export default class ToggleCurrency extends Vue {
  private currencyName: string;
  private currencyRate: string;
}
</script>
