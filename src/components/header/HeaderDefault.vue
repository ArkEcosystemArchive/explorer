<template>
  <div class="HeaderDefault">
    <div class="px-4 md:px-8 flex-auto flex">
      <button
        :class="[
          menuVisible ? 'border-theme-accents' : 'border-transparent',
          'px-2 sm:px-4 py-3 md:py-6 flex-none flex items-center border-b-2 mt-2px hover:border-theme-accents text-theme-text-secondary transition',
        ]"
        @click="$store.dispatch('ui/setMenuVisible', !menuVisible)"
      >
        <SvgIcon class="flex-none mr-3" name="menu" view-box="0 0 15 13" />
        <span class="semibold">{{ $t("HEADER.MENU") }}</span>
      </button>
      <span class="border-r mx-2 md:mx-4 lg:mx-6 my-4" />
      <div class="flex-auto flex items-center justify-center">
        <label for="search" class="hidden">{{ $t("SEARCH.PLACEHOLDER.SHORT") }}</label>
        <input
          :placeholder="placeholder"
          class="search-input hidden sm:block w-full flex-auto sm:mr-2 py-2 md:py-4 sm:pl-4 bg-transparent"
          @focus="$store.dispatch('ui/setHeaderType', 'search')"
        />
        <label
          for="search"
          class="search-icon text-grey hover:text-blue p-3 md:p-4 transition"
          @click="$store.dispatch('ui/setHeaderType', 'search')"
        >
          <SvgIcon name="search" view-box="0 0 16 16" />
        </label>
      </div>

      <span v-if="showToggleCurrency" class="border-r mx-2 md:mx-4 lg:mx-6 my-4 block" />
      <ToggleCurrency v-if="showToggleCurrency" />

      <span v-if="showChart" class="border-r mx-2 md:mx-4 lg:mx-6 my-4 hidden md:block" />
      <ToggleChart v-if="showChart" />

      <span class="border-r mx-2 md:mx-4 lg:mx-6 my-4" />
      <ToggleTheme />

      <span class="border-r mx-2 md:mx-4 lg:mx-6 my-4 hidden md:block" />
      <ToggleLanguage />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";
import { ToggleChart, ToggleCurrency, ToggleLanguage, ToggleTheme } from "@/components/header/toggles";
import { LocaleMessage } from "vue-i18n";

@Component({
  components: {
    ToggleTheme,
    ToggleCurrency,
    ToggleLanguage,
    ToggleChart,
  },
  computed: {
    ...mapGetters("network", { networkDefaults: "defaults" }),
    ...mapGetters("ui", ["menuVisible"]),
  },
})
export default class HeaderDefault extends Vue {
  private placeholder: LocaleMessage | string = "Search";
  private networkDefaults: any;
  private menuVisible: boolean;

  get showToggleCurrency(): boolean {
    return this.networkDefaults.priceChartOptions.enabled;
  }

  get showChart(): boolean {
    return this.$route.name === "home" && this.networkDefaults.priceChartOptions.enabled;
  }

  public mounted() {
    const WIDTH_THRESHOLD = 1024;
    const widthQuery = window.matchMedia(`(max-width: ${WIDTH_THRESHOLD}px)`);

    widthQuery.addListener((e) => this.setMobilePlaceholder(e.matches));

    this.setMobilePlaceholder(window.innerWidth < WIDTH_THRESHOLD);
  }

  private setMobilePlaceholder(showMobile: boolean) {
    if (!this.$i18n) {
      return;
    }
    this.placeholder = showMobile ? this.$i18n.t("SEARCH.PLACEHOLDER.SHORT") : this.$i18n.t("SEARCH.PLACEHOLDER.LONG");
  }
}
</script>

<style scoped>
.HeaderDefault {
  @apply .w-full .flex;
}

.search-input::placeholder {
  color: var(--color-theme-text-placeholder);
}

.search-icon:hover {
  box-shadow: 0 0 13px 2px rgba(197, 197, 213, 0.24);
  cursor: pointer;
}
</style>
