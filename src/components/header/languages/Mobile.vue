<template>
  <ul class="language-menu menu-container text-center max-w-480px justify-center bg-table-row absolute bottom-0 right-0 py-1 px-4 items-center hidden md:flex xl:hidden">
    <li
      v-for="lang in languages"
      :key="lang"
      :class="[nightMode ? 'hover:bg-grey-dark' : 'hover:bg-grey-light', 'inline-flex justify-center']"
      @click="setLanguage(lang)"
    >
      <a
        href="#"
        class="cursor-pointer py-3 px-3 w-20 flex-none"
      >
        <img
          :src="getLanguageFlag(lang)"
          class="flag-image"
        >
      </a>
    </li>
  </ul>
</template>

<script type="text/ecmascript-6">
import { I18N } from '@/config'
import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
  name: 'HeaderLanguagesMobile',

  computed: {
    ...mapGetters('ui', ['nightMode', 'language']),

    languages () {
      return I18N.enabledLocales.filter(
        locale => locale !== this.language
      )
    }
  },

  methods: {
    setLanguage (language) {
      this.$store.dispatch('ui/setLanguage', language)
      this.$i18n.locale = language

      this.$store.dispatch('ui/setLocale', language)
      moment.locale(language)

      this.$store.dispatch('ui/setHeaderType', null)
    },

    getLanguageFlag (language) {
      try {
        return require(`@/assets/images/flags/${language}.svg`)
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style>
  .menu-container {
    transform: translateY(100%);
  }
</style>
