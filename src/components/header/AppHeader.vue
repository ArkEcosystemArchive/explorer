<template>
  <header
    v-click-outside="closeHeader"
    class="header min-h-50px md:min-h-80px z-50 max-w-2xl mx-auto flex bg-theme-nav-background shadow-theme xl:rounded-md mb-5 sm:mb-10"
  >
    <router-link
      :to="{ name: 'home' }"
      class="logo-container w-50px md:w-80px h-50px md:h-80px flex-none bg-red text-2xl xl:rounded-l-md flex justify-center items-center"
    >
      <img
        class="logo max-w-25px md:max-w-38px"
        src="@/assets/images/logo.png"
      >
    </router-link>
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

<script type="text/ecmascript-6">
import {
  HeaderDefault,
  HeaderSearch,
  HeaderCurrenciesDesktop,
  HeaderCurrenciesMobile,
  HeaderLanguagesDesktop,
  HeaderLanguagesMobile,
  HeaderMenuDesktop,
  HeaderMenuMobile
} from '@/components/header'
import { mapGetters } from 'vuex'

export default {
  name: 'AppHeader',

  components: {
    HeaderDefault,
    HeaderSearch,
    HeaderCurrenciesDesktop,
    HeaderCurrenciesMobile,
    HeaderLanguagesDesktop,
    HeaderLanguagesMobile,
    HeaderMenuDesktop,
    HeaderMenuMobile
  },

  computed: {
    ...mapGetters('ui', ['headerType', 'menuVisible'])
  },

  methods: {
    closeHeader () {
      this.$store.dispatch('ui/setHeaderType', null)
    }
  }
}
</script>

<style scoped>
.header {
  position: sticky;
  top: 0;
}
</style>
