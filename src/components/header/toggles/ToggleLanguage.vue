<template>
  <button
    id="language-icon"
    class="text-language-icon px-2 py-3 hidden md:flex items-center text-sm border-b-2 mt-2px border-transparent hover:border-theme-accents hover:text-blue transition"
    @click="$store.dispatch('ui/setHeaderType', isLanguagesMenu ? null : 'languages')"
  >
    <SvgIcon name="globe" view-box="0 0 22 22" />
  </button>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'

export default {
  name: 'ToggleLanguage',

  computed: {
    ...mapGetters('ui', ['headerType']),

    isLanguagesMenu () {
      return this.headerType === 'languages'
    }
  }
}
</script>
