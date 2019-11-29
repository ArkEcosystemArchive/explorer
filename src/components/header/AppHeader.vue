<template>
  <header v-click-outside="closeHeader" class="AppHeader min-h-50px md:min-h-80px mb-5 sm:mb-10 xl:rounded-md">
    <RouterLink
      :to="{ name: 'home' }"
      class="logo-container w-50px md:w-80px h-50px md:h-80px flex-none bg-orange text-2xl xl:rounded-l-md flex justify-center items-center"
    >
      <img class="logo max-w-25px md:max-w-38px" src="@/assets/images/logo.png" />
    </RouterLink>

    <div class="w-full relative hidden xl:flex">
      <HeaderSearch v-if="headerType === 'search'" />
      <HeaderCurrenciesDesktop v-else-if="headerType === 'currencies'" />
      <HeaderLanguagesDesktop v-else-if="headerType === 'languages'" />
      <HeaderDefault v-else />
      <HeaderMenuDesktop v-if="menuVisible" />
    </div>

    <div class="w-full relative flex xl:hidden">
      <HeaderSearch v-if="headerType === 'search'" />
      <HeaderDefault v-else />
    </div>

    <HeaderMenuMobile v-if="menuVisible" />
    <HeaderCurrenciesMobile v-else-if="headerType === 'currencies'" />
    <HeaderLanguagesMobile v-else-if="headerType === 'languages'" />
  </header>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";
import {
  HeaderDefault,
  HeaderSearch,
  HeaderCurrenciesDesktop,
  HeaderCurrenciesMobile,
  HeaderLanguagesDesktop,
  HeaderLanguagesMobile,
  HeaderMenuDesktop,
  HeaderMenuMobile,
} from "@/components/header";

@Component({
  components: {
    HeaderDefault,
    HeaderSearch,
    HeaderCurrenciesDesktop,
    HeaderCurrenciesMobile,
    HeaderLanguagesDesktop,
    HeaderLanguagesMobile,
    HeaderMenuDesktop,
    HeaderMenuMobile,
  },
  computed: {
    ...mapGetters("ui", ["headerType", "menuVisible"]),
  },
})
export default class AppHeader extends Vue {
  private headerType: string;
  private menuVisible: boolean;

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
