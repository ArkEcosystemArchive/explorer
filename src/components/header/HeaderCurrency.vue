<template>
  <div class="flex items-center px-2 py-3 text-sm md:px-4 md:py-6 mt-2px">
    <SvgIcon class="flex-none md:mr-2 text-link-color" :name="`currencies/${currencyName}`" view-box="0 0 22 16" />
    <span class="hidden whitespace-no-wrap text-theme-text-content md:inline-block">
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
