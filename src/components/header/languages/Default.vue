<template>
  <div id="language-menu" class="bg-theme-nav-background menu-container max-w-480px absolute pin-b pin-r py-1 px-4 flex items-center"
          @mouseleave="$store.dispatch('ui/setLanguageMenuVisible', false)">
    <button v-for="lang in languages" @click="setLanguage(lang)" :key="lang" class="inline-flex justify-center">
      <a href="#" class="cursor-pointer px-3 py-3">
        <img :src="getLanguageFlag(lang)" class="flag-image"/>
      </a>
    </button>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  computed: {
    languages() {
      return Object.keys(this.$i18n.messages)
    },

  },
  methods: {
    setLanguage(language) {
      this.$store.dispatch('ui/setLanguage', language)
      this.$store.dispatch('ui/setLocale', language)
      this.setI18nLanguage(language)
      this.$store.dispatch('ui/setLanguageMenuVisible', false)
    },

    setI18nLanguage(language) {
      this.$i18n.locale = language
    },

    getLanguageFlag(language) {
      return require(`@/assets/images/flags/${language}.png`)
    }
  }
}
</script>

<style scoped>
  .menu-container {
    transform: translateY(100%);
  }
</style>
