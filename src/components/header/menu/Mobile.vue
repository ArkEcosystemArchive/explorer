<template>
  <ul class="menu-container w-full max-w-480px bg-table-row absolute bottom-0 left-0 py-5 block xl:hidden">
    <li :class="[nightMode ? 'hover:bg-grey-dark' : 'hover:bg-grey-light', 'flex justify-center']">
      <RouterLink
        :to="{ name: 'home' }"
        tag="div"
        class="cursor-pointer py-5 w-64 flex-none border-b border-theme-nav-border"
      >
        {{ $t("PAGES.HOME.TITLE") }}
      </RouterLink>
    </li>
    <li :class="[nightMode ? 'hover:bg-grey-dark' : 'hover:bg-grey-light', 'flex justify-center']">
      <RouterLink
        :to="{ name: 'top-wallets', params: { page: 1 } }"
        tag="div"
        class="cursor-pointer py-5 w-64 flex-none border-b border-theme-nav-border"
      >
        {{ $t("PAGES.TOP_WALLETS.TITLE") }}
      </RouterLink>
    </li>
    <li :class="[nightMode ? 'hover:bg-grey-dark' : 'hover:bg-grey-light', 'flex justify-center']">
      <RouterLink
        :to="{ name: 'delegate-monitor' }"
        tag="div"
        class="cursor-pointer py-5 w-64 flex-none border-b border-theme-nav-border"
      >
        {{ $t("PAGES.DELEGATE_MONITOR.TITLE") }}
      </RouterLink>
    </li>
    <li :class="[nightMode ? 'hover:bg-grey-dark' : 'hover:bg-grey-light', 'flex justify-center']">
      <RouterLink
        :to="{ name: 'bridgechains', params: { page: 1 } }"
        tag="div"
        class="cursor-pointer py-5 w-64 flex-none border-b border-theme-nav-border"
      >
        {{ $t("PAGES.BRIDGECHAINS.TITLE") }}
      </RouterLink>
    </li>
    <li :class="[nightMode ? 'hover:bg-grey-dark' : 'hover:bg-grey-light', 'flex justify-center']">
      <RouterLink :to="{ name: 'businesses', params: { page: 1 } }" tag="div" class="cursor-pointer py-5 w-64 flex-none">
        {{ $t("PAGES.BUSINESSES.TITLE") }}
      </RouterLink>
        <a class="cursor-pointer py-5 w-64 flex-none border-b border-theme-nav-border" @click="closeMenu" href="https://uns.network" target="_blank" style="color:inherit">
          {{ $t("UNIK.MENU_ITEM.NETWORK") }}
        </a>
    </li>
    <li :class="[nightMode ? 'hover:bg-grey-dark' : 'hover:bg-grey-light', 'flex justify-center']">
        <a class="cursor-pointer py-5 w-64 flex-none border-b border-theme-nav-border" @click="closeMenu" href="https://forum.unik-name.com" target="_blank" style="color:inherit">
          {{ $t("UNIK.MENU_ITEM.FORUM") }}
        </a>
    </li>
    <li :class="[nightMode ? 'hover:bg-grey-dark' : 'hover:bg-grey-light', 'flex justify-center']">
        <a class="cursor-pointer py-5 w-64 flex-none border-b border-theme-nav-border" @click="closeMenu" href="https://docs.uns.network" target="_blank" style="color:inherit">
          {{ $t("UNIK.MENU_ITEM.DOCS") }}
        </a>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";

@Component({
  computed: {
    ...mapGetters("ui", ["nightMode"]),
  },
})
export default class HeaderMenuMobile extends Vue {
  private nightMode: boolean;
  private closeMenu(): void {
    this.$store.dispatch("ui/setMenuVisible", false);
  }
}
</script>

<style>
.menu-container {
  transform: translateY(100%);
}
</style>
