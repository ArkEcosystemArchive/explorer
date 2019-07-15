<template>
  <button
    class="px-2 py-2 md:py-4 text-yellow flex-none flex items-center border-b-2 mt-2px border-transparent hover:border-red transition"
    @click="$store.dispatch('ui/setNightMode', !nightMode)"
    @mouseover="changeImageSource"
    @mouseleave="setImageSource"
  >
    <img
      :src="imageSource"
      width="30"
    >
  </button>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'

export default {
  name: 'ToggleTheme',

  data: () => ({
    imageSource: null
  }),

  computed: {
    ...mapGetters('ui', ['nightMode'])
  },

  mounted () {
    this.prepareComponent()
  },

  methods: {
    prepareComponent () {
      this.setImageSource()

      this.$store.watch((state) => state.ui.nightMode, (value) => this.setImageSource())
    },

    setImageSource () {
      const name = this.nightMode ? 'sun' : 'moon'

      this.imageSource = require(`@/assets/images/theme/${name}.svg`)
    },

    changeImageSource () {
      const name = this.nightMode ? 'sun' : 'moon'

      this.imageSource = require(`@/assets/images/theme/hover/${name}.svg`)
    }
  }
}
</script>
