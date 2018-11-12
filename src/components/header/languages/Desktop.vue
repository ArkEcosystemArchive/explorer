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
import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
  computed: {
    ...mapGetters('ui', ['language']),

    languages() {
      return Object.keys(this.$i18n.messages).filter(
        l => l != this.language
      )
    }
  },

  methods: {
    setLanguage(language) {
      this.$store.dispatch('ui/setLanguage', language)
      this.$i18n.locale = language

      this.$store.dispatch('ui/setLocale', language)
      moment.locale(language)

      this.$store.dispatch('ui/setHeaderType', null)
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
