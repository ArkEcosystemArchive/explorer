<template>
  <header v-click-outside="closeHeader" class="mb-5 AppHeader min-h-50px md:min-h-80px sm:mb-10 xl:rounded-md">
    <RouterLink
      :to="{ name: 'home' }"
      class="flex items-center justify-center flex-none text-2xl logo-container w-50px md:w-80px h-50px md:h-80px bg-theme-accents xl:rounded-l-md"
    >
      <img class="logo max-w-25px md:max-w-38px" src="@/assets/images/logo.png" />
    </RouterLink>

    <div class="relative hidden w-full xl:flex">
      <HeaderSearch v-if="headerType === 'search'" />
      <HeaderDefault v-else />
      <HeaderMenuDesktop v-if="menuVisible" :entries="menuEntries" />
    </div>

    <div class="relative flex w-full xl:hidden">
      <HeaderSearch v-if="headerType === 'search'" />
      <HeaderDefault v-else />
    </div>

    <HeaderMenuMobile v-if="menuVisible" :entries="menuEntries" />
  </header>
</template>

<script lang="ts">
import { Component, Provide, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";
import { HeaderDefault, HeaderSearch, HeaderMenuDesktop, HeaderMenuMobile } from "@/components/header";

@Component({
  components: {
    HeaderDefault,
    HeaderSearch,
    HeaderMenuDesktop,
    HeaderMenuMobile,
  },
  computed: {
    ...mapGetters("ui", ["headerType", "menuVisible"]),
    ...mapGetters("network", ["hasMagistrateEnabled"]),

    menuEntries() {
      const entries = [{ name: "home" }, { name: "top-wallets", params: { page: 1 } }, { name: "delegate-monitor" }];

      entries.push({ name: "advanced-search", params: { page: 1 } });

      return entries;
    },
  },
})
export default class AppHeader extends Vue {
  @Provide("normalizeName") public foo = this.normalizeName;

  private headerType: string;
  private menuVisible: boolean;

  public normalizeName(name: string): string {
    return name.replace("-", "_").toUpperCase();
  }

  private closeHeader(): void {
    this.$store.dispatch("ui/setHeaderType", null);
  }
}
</script>

<style scoped>
.AppHeader {
  @apply .flex .sticky .top-0 .z-50 .max-w-2xl .mx-auto .bg-theme-nav-background .shadow-theme;
}
</style>
