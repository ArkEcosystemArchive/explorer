<template>
  <header
    class="header min-h-50px md:min-h-80px z-50 max-w-2xl mx-auto flex bg-theme-nav-background shadow-theme xl:rounded-md mb-5 sm:mb-10">
    <router-link
      :to="{ name: 'home' }"
      class="logo-container w-50px md:w-80px h-50px md:h-80px flex-none bg-red text-2xl xl:rounded-l-md flex justify-center items-center">
      <img class="logo max-w-25px md:max-w-38px" src="@/assets/images/ark-logo.png" />
    </router-link>

    <div class="w-full relative hidden xl:flex">
      <header-search v-if="headerType === 'search'"></header-search>

      <header-desktop-currencies v-else-if="headerType === 'currencies'"></header-desktop-currencies>

      <header-default v-else></header-default>

      <header-desktop-menu v-if="menuVisible"></header-desktop-menu>
    </div>
    <div class="w-full relative flex xl:hidden">
      <header-search v-if="headerType === 'search'"></header-search>

      <header-default v-else></header-default>
    </div>
    <header-mobile-menu v-if="menuVisible"></header-mobile-menu>

    <header-mobile-currencies v-else-if="headerType === 'currencies'"></header-mobile-currencies>
  </header>
</template>

<script type="text/ecmascript-6">
import HeaderDefault from '@/components/header/Default'
import HeaderSearch from '@/components/header/Search'
import HeaderDesktopCurrencies from '@/components/header/currencies/Desktop'
import HeaderMobileCurrencies from '@/components/header/currencies/Mobile'
import HeaderDesktopMenu from '@/components/header/menu/Desktop'
import HeaderMobileMenu from '@/components/header/menu/Mobile'
import { mapGetters } from 'vuex'

export default {
  components: {
    HeaderDefault,
    HeaderSearch,
    HeaderDesktopCurrencies,
    HeaderMobileCurrencies,
    HeaderDesktopMenu,
    HeaderMobileMenu,
  },

  computed: {
    ...mapGetters('ui', ['headerType', 'menuVisible']),
  },
}
</script>

<style scoped>
.header {
  position: sticky;
  top: 0;
}
</style>
