<template>
  <div class="hidden lg:flex items-center">
    <div class="mr-6 flex-none">
      <img
        class="block"
        src="@/assets/images/icons/group.svg"
      >
    </div>
    <div>
      <div class="text-grey mb-2">
        {{ $t('COMMON.DELEGATES') }}
      </div>
      <div class="text-lg text-white semibold truncate">
        {{ count }}
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'

export default {
  name: 'DelegateCount',

  data: () => ({
    count: 0
  }),

  computed: {
    ...mapGetters('delegates', ['delegates'])
  },

  mounted () {
    this.prepareComponent()
  },

  methods: {
    prepareComponent () {
      this.getDelegateCount()

      this.$store.watch(state => state.delegates.delegates, value => this.getDelegateCount())
    },

    getDelegateCount () {
      this.count = this.delegates.length
    }
  }
}
</script>
