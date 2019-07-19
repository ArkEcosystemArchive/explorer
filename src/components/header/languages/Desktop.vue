<template>
  <div class="language-menu w-full px-5 hidden xl:flex items-center justify-end">
    <button
      v-for="lang in languages"
      :key="lang"
      class="menu-button"
      @click="setLanguage(lang)"
    >
      <img
        :src="getLanguageFlag(lang)"
        class="flag-image"
      >
    </button>

    <button
      class="flex flex-none p-2 close-button"
      @click="$store.dispatch('ui/setHeaderType', null)"
    >
      <img src="@/assets/images/icons/cross.svg">
    </button>
  </div>
</template>

<script type="text/ecmascript-6">
import { I18N } from '@/config'
import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
  name: 'HeaderLanguagesDesktop',

  computed: {
    ...mapGetters('ui', ['language']),

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
      // TODO: consider using flag plugin, for example `flag-icon-css`
      try {
        return require(`@/assets/images/flags/${language}.svg`)
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped>
  .close-button {
    margin-left: 0.825rem;
  }
</style>
