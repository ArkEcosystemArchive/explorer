<template>
  <ul class="language-menu menu-container text-center max-w-480px justify-center bg-table-row list-reset absolute pin-b pin-r py-1 px-4 items-center hidden md:flex xl:hidden">
    <li v-for="lang in languages"
            @click="setLanguage(lang)"
            :key="lang"
            :class="[nightMode ? 'hover:bg-grey-dark' : 'hover:bg-grey-light', 'inline-flex justify-center']">
      <a href="#" class="cursor-pointer py-3 px-3 w-20 flex-none">
        <img :src="getLanguageFlag(lang)" class="flag-image">
      </a>
    </li>
  </ul>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
  computed: {
    ...mapGetters('ui', ['nightMode', 'language']),

    languages() {
      return Object.keys(this.$i18n.messages).filter(
        l => l.split('-')[0] != this.language
      )
    }
  },

  methods: {
    setLanguage(language) {
      this.$store.dispatch('ui/setLanguage', language)
      this.setI18nLanguage(language)

      const locale = language.split('-')[0]
      this.$store.dispatch('ui/setLocale', locale)
      this.setLocale(locale)

      this.$store.dispatch('ui/setHeaderType', null)
    },

    setI18nLanguage(language) {
      this.$i18n.locale = language
    },

    setLocale(locale) {
      moment.locale(locale)
    },

    getLanguageFlag(language) {
      return require(`@/assets/images/flags/${language}.svg`)
    }
  }
}
</script>

<style>
  .menu-container {
    transform: translateY(100%);
  }
</style>
