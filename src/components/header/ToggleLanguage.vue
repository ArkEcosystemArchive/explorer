<template>
  <button id="current-language"
    @mouseover="$store.dispatch('ui/setLanguageMenuVisible', true)"
    class="px-2 py-3 md:py-6 flex items-center text-sm border-b-2 margin-t-2 border-transparent hover:border-red">
    <img :src="imageSource" class="flag-image"/>
  </button>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('ui', ['language']),

    imageSource() {
      let language = this.language.split("-")[0]
      return require(`@/assets/images/flags/${language}.png`)
    }
  }
}
</script>
