<template>
  <div class="HeaderMenuDesktop md:px-8 sm:flex xl:rounded-r-md">
    <button
      class="px-4 py-3 md:py-6 flex-none flex items-center border-b-2 mt-2px mr-3 border-transparent hover:border-orange text-theme-text-secondary"
      @click="closeMenu"
    >
      <SvgIcon class="flex-none" name="menu" view-box="0 0 15 13" />
    </button>

    <RouterLink :to="{ name: 'home' }" tag="button" class="menu-button" @click.native="closeMenu">
      {{ $t("PAGES.HOME.TITLE") }}
    </RouterLink>

    <RouterLink
      :to="{ name: 'top-wallets', params: { page: 1 } }"
      tag="button"
      class="menu-button"
      @click.native="closeMenu"
    >
      {{ $t("PAGES.TOP_WALLETS.TITLE") }}
    </RouterLink>

    <RouterLink :to="{ name: 'delegate-monitor' }" tag="button" class="menu-button" @click.native="closeMenu">
      {{ $t("PAGES.DELEGATE_MONITOR.TITLE") }}
    </RouterLink>

    <RouterLink
      v-if="hasMagistrateEnabled"
      :to="{ name: 'bridgechains', params: { page: 1 } }"
      tag="button"
      class="menu-button"
      @click.native="closeMenu"
    >
      {{ $t("PAGES.BRIDGECHAINS.TITLE") }}
    </RouterLink>

    <RouterLink
      v-if="hasMagistrateEnabled"
      :to="{ name: 'businesses', params: { page: 1 } }"
      tag="button"
      class="menu-button"
      @click.native="closeMenu"
    >
      {{ $t("PAGES.BUSINESSES.TITLE") }}
    </RouterLink>
    <button
    class="px-4 py-3 md:py-6 flex-none flex items-center border-b-2 mt-2px mr-3 border-transparent hover:border-orange text-theme-text-secondary"
    @click="closeMenu">
      <a href="https://uns.network" target="_blank" style="color: inherit">
        {{ $t("UNIK.MENU_ITEM.NETWORK") }}
      </a>
    </button>

    <button
    class="px-4 py-3 md:py-6 flex-none flex items-center border-b-2 mt-2px mr-3 border-transparent hover:border-orange text-theme-text-secondary"
    @click="closeMenu">
      <a href="https://forum.unik-name.com" target="_blank" style="color: inherit">
        {{ $t("UNIK.MENU_ITEM.FORUM") }}
      </a>
    </button>

    <button
    class="px-4 py-3 md:py-6 flex-none flex items-center border-b-2 mt-2px mr-3 border-transparent hover:border-orange text-theme-text-secondary"
    @click="closeMenu">
      <a href="https://docs.uns.network" target="_blank" style="color: inherit">
        {{ $t("UNIK.MENU_ITEM.DOCS") }}
      </a>
    </button>

    <RouterLink
      :to="{ name: 'advanced-search', params: { page: 1 } }"
      tag="button"
      class="menu-button"
      @click.native="closeMenu"
    >
      {{ $t("PAGES.ADVANCED_SEARCH.TITLE") }}
    </RouterLink>

    <div class="flex-auto" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";

@Component({
  computed: {
    ...mapGetters("network", ["hasMagistrateEnabled"]),
  },
})
export default class HeaderMenuDesktop extends Vue {
  private closeMenu(): void {
    this.$store.dispatch("ui/setMenuVisible", false);
  }
}
</script>

<style>
.HeaderMenuDesktop {
  @apply .absolute .inset-0 .px-4 .bg-theme-nav-background;
}
</style>
