<template>
  <div class="HeaderDefault">
    <div class="flex flex-auto px-4 md:px-8">
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
      <span class="mx-2 my-4 border-r md:mx-4 lg:mx-6" />
      <div class="flex items-center justify-center flex-auto">
        <label for="search" class="hidden">{{ $t("SEARCH.PLACEHOLDER.SHORT") }}</label>
        <input
          :placeholder="placeholder"
          class="flex-auto hidden w-full py-2 bg-transparent search-input sm:block sm:mr-2 md:py-4 sm:pl-4"
          @focus="$store.dispatch('ui/setHeaderType', 'search')"
        />
        <label
          for="search"
          class="p-3 transition search-icon text-grey hover:text-blue md:p-4"
          @click="$store.dispatch('ui/setHeaderType', 'search')"
        >
          <SvgIcon name="search" view-box="0 0 16 16" />
        </label>
      </div>

      <span v-if="showCurrency" class="block mx-2 my-4 border-r md:mx-4 lg:mx-6" />
      <HeaderCurrency v-if="showCurrency" />

      <span class="block mx-2 my-4 border-r md:mx-4 lg:mx-6" />
      <HeaderSettings />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";
import { LocaleMessage } from "vue-i18n";
import HeaderCurrency from "@/components/header/HeaderCurrency.vue";
import HeaderSettings from "@/components/header/HeaderSettings.vue";

@Component({
  components: {
    HeaderCurrency,
    HeaderSettings,
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

  get showCurrency(): boolean {
    return this.networkDefaults.priceChartOptions.enabled;
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
