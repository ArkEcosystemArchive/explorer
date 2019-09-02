<template>
  <div>
    <img
      v-if="!nightMode"
      class="mx-auto"
      src="@/assets/images/not-found/light.png"
    >
    <img
      v-else
      class="mx-auto"
      src="@/assets/images/not-found/dark.png"
    >

    <h1 class="text-3xl">
      {{ $t('PAGES.NOT_FOUND.TITLE') }}
    </h1>

    <i18n
      tag="p"
      path="PAGES.NOT_FOUND.DATA"
      class="mt-2"
    >
      <span place="dataType">{{ dataType }}</span>
      <span
        class="semibold"
        place="dataId"
      >
        {{ dataId }}
      </span>
    </i18n>

    <button
      :disabled="isLoading"
      class="button-lg mt-4"
      @click="emitReload"
    >
      <span v-if="!isLoading">{{ $t('COMMON.RELOAD') }}</span>
      <Loader
        v-else
        :data="null"
      />
    </button>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'

export default {
  name: 'NotFound',

  props: {
    isLoading: {
      type: Boolean,
      required: true
    },

    dataType: {
      type: String,
      required: true
    },

    dataId: {
      type: String,
      required: true
    }
  },

  computed: {
    ...mapGetters('ui', ['nightMode'])
  },

  methods: {
    emitReload () {
      this.$emit('reload')
    }
  }
}
</script>
