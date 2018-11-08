<template>
  <div class="language-menu w-full px-5 hidden xl:flex items-center justify-end">
    <button v-for="lang in languages" @click="setLanguage(lang)" :key="lang" class="menu-button">
      <img :src="getLanguageFlag(lang)" class="flag-image">
    </button>

    <button @click="$store.dispatch('ui/setHeaderType', null)" class="px-2 close-button">
      <img src="@/assets/images/icons/cross.svg" />
    </button>
  </div>
</template>

<script type="text/ecmascript-6">
import moment from 'moment'

export default {
  computed: {
    languages() {
      return Object.keys(this.$i18n.messages)
    },

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
      // TODO: consider using flag plugin, for example `flag-icon-css`
      return require(`@/assets/images/flags/${language}.svg`)
    }
  }
}
</script>

<style scoped>
  .close-button {
    margin-left: 0.825rem;
  }
</style>
